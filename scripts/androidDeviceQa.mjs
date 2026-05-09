#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(new URL("..", import.meta.url).pathname);
const incomingDir = join(root, "device-qa", "incoming");
const debugApk = join(root, "android", "app", "build", "outputs", "apk", "debug", "app-debug.apk");
const packageName = "com.capybarabutler.game";
const activityName = `${packageName}/.${"MainActivity"}`;
const adbCandidates = [
  process.env.ADB,
  process.env.ANDROID_HOME ? join(process.env.ANDROID_HOME, "platform-tools", "adb") : null,
  process.env.ANDROID_SDK_ROOT ? join(process.env.ANDROID_SDK_ROOT, "platform-tools", "adb") : null,
  "/opt/homebrew/share/android-commandlinetools/platform-tools/adb",
  "/opt/homebrew/share/android-sdk/platform-tools/adb",
  "adb",
].filter(Boolean);
const adb = adbCandidates.find((candidate) => candidate === "adb" || existsSync(candidate)) ?? "adb";

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function ensureDir() {
  mkdirSync(incomingDir, { recursive: true });
}

function runAdb(args, options = {}) {
  const result = spawnSync(adb, args, {
    encoding: options.binary ? "buffer" : "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });

  if (result.error) {
    throw new Error(`${adb} 실행 실패: ${result.error.message}`);
  }
  if (result.status !== 0) {
    const stderr = Buffer.isBuffer(result.stderr) ? result.stderr.toString("utf8") : result.stderr;
    throw new Error(`${adb} ${args.join(" ")} 실패\n${stderr.trim()}`);
  }
  return result.stdout;
}

function printHelp() {
  console.log(`Android Device QA helper

Usage:
  npm run device:qa:devices
  npm run device:qa:install
  npm run device:qa:launch
  npm run device:qa:info
  npm run device:qa:capture -- <screen-name>
  npm run device:qa:record -- <screen-name> [seconds]

Outputs:
  device-qa/incoming/<timestamp>-<screen-name>.png
  device-qa/incoming/<timestamp>-<screen-name>.mp4
  device-qa/incoming/<timestamp>-device-info.txt

Notes:
  - Requires Android platform-tools 'adb' on PATH, or set ADB=/path/to/adb.
  - Requires one connected Android device with USB debugging enabled.
  - Uses the debug APK at ${debugApk}
`);
}

function devices() {
  process.stdout.write(runAdb(["devices", "-l"]));
}

function install() {
  if (!existsSync(debugApk)) {
    throw new Error(`Debug APK가 없습니다: ${debugApk}\n먼저 npm run cap:sync 후 Android assembleDebug를 실행하세요.`);
  }
  process.stdout.write(runAdb(["install", "-r", debugApk]));
}

function launch() {
  process.stdout.write(runAdb(["shell", "am", "start", "-n", activityName]));
}

function deviceInfo() {
  ensureDir();
  const commands = [
    ["shell", "getprop", "ro.product.manufacturer"],
    ["shell", "getprop", "ro.product.model"],
    ["shell", "getprop", "ro.build.version.release"],
    ["shell", "getprop", "ro.build.version.sdk"],
    ["shell", "wm", "size"],
    ["shell", "wm", "density"],
    ["shell", "settings", "get", "system", "font_scale"],
    ["shell", "settings", "get", "secure", "navigation_mode"],
    ["shell", "dumpsys", "package", packageName],
  ];

  const lines = [`Captured at: ${new Date().toISOString()}`, `Package: ${packageName}`, ""];
  for (const args of commands) {
    lines.push(`$ ${adb} ${args.join(" ")}`);
    try {
      const output = runAdb(args).trim();
      lines.push(output || "(empty)");
    } catch (error) {
      lines.push(error.message);
    }
    lines.push("");
  }

  const file = join(incomingDir, `${stamp()}-device-info.txt`);
  writeFileSync(file, lines.join("\n"));
  console.log(file);
}

function capture(name = "screen") {
  ensureDir();
  const safeName = name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "screen";
  const file = join(incomingDir, `${stamp()}-${safeName}.png`);
  const png = runAdb(["exec-out", "screencap", "-p"], { binary: true });
  writeFileSync(file, png);
  console.log(file);
}

function record(name = "screen", secondsInput = "12") {
  ensureDir();
  const seconds = Math.max(1, Math.min(180, Number.parseInt(secondsInput, 10) || 12));
  const safeName = name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "screen";
  const remote = `/sdcard/capybara-qa-${safeName}.mp4`;
  const file = join(incomingDir, `${stamp()}-${safeName}.mp4`);

  console.log(`Recording ${seconds}s from device...`);
  runAdb(["shell", "screenrecord", "--time-limit", String(seconds), remote]);
  runAdb(["pull", remote, file]);
  try {
    runAdb(["shell", "rm", remote]);
  } catch {
    // Non-fatal cleanup failure. The pulled file is the evidence we need.
  }
  console.log(file);
}

const [command, ...args] = process.argv.slice(2);

try {
  switch (command) {
    case undefined:
    case "-h":
    case "--help":
    case "help":
      printHelp();
      break;
    case "devices":
      devices();
      break;
    case "install":
      install();
      break;
    case "launch":
      launch();
      break;
    case "info":
      deviceInfo();
      break;
    case "capture":
      capture(args[0] ?? "screen");
      break;
    case "record":
      record(args[0] ?? "screen", args[1] ?? "12");
      break;
    default:
      throw new Error(`알 수 없는 명령: ${command}`);
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
