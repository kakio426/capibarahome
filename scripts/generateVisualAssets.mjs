import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const srcDir = join(root, "src");
const outDir = join(srcDir, "assets", "generated");

const sourceFiles = [
  "config/BalanceConfig.ts",
  "config/AchievementConfig.ts",
  "config/QuestConfig.ts",
  "config/DecorationConfig.ts",
  "config/StoryConfig.ts",
  "config/ProgressionConfig.ts",
  "app/routes.ts",
];

function readSource(relativePath) {
  return readFileSync(join(srcDir, relativePath), "utf8");
}

function captureAll(pattern, text) {
  const matches = [];
  let match = pattern.exec(text);
  while (match) {
    matches.push(match[1]);
    match = pattern.exec(text);
  }
  return matches;
}

function safeName(value) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "_");
}

function unique(values) {
  return [...new Set(values)].filter(Boolean).sort((a, b) => a.localeCompare(b));
}

function hashText(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function paletteFor(key, index) {
  const palettes = [
    ["#ff8a2a", "#ffd166", "#3c8f72", "#fff3dc", "#7d583b"],
    ["#4b8aa8", "#bfe5d9", "#ffb23f", "#fffaf0", "#2f6f88"],
    ["#9a5bb4", "#ffd166", "#ff8a2a", "#f6edf9", "#704098"],
    ["#3c8f72", "#69b47a", "#ffd166", "#eef9f3", "#245f4b"],
    ["#d3843f", "#b88656", "#ffdf9a", "#fff3dc", "#6b4a30"],
  ];
  return palettes[(hashText(key) + index) % palettes.length];
}

function motif(key, size, index) {
  const [a, b, c, d, e] = paletteFor(key, index);
  const seed = hashText(key);
  const rings = [];
  for (let i = 0; i < size; i += 1) {
    const x = 18 + ((seed >>> (i % 14)) + i * 37) % 284;
    const y = 18 + ((seed >>> ((i + 5) % 14)) + i * 53) % 284;
    const r = 1.8 + ((seed + i * 11) % 18) / 10;
    const color = [a, b, c, d][i % 4];
    rings.push(`<circle cx="${x}" cy="${y}" r="${r.toFixed(1)}" fill="${color}" opacity="${(0.12 + (i % 5) * 0.035).toFixed(2)}"/>`);
  }
  const lines = [];
  for (let i = 0; i < Math.floor(size / 2); i += 1) {
    const y = 42 + i * 8;
    const offset = (seed + i * 17) % 28;
    lines.push(`<path d="M${28 + offset} ${y} C ${90 + offset} ${y - 18}, ${190 - offset} ${y + 18}, ${292 - offset} ${y}" fill="none" stroke="${i % 2 ? c : e}" stroke-width="1.4" stroke-linecap="round" opacity="0.11"/>`);
  }
  return [...rings, ...lines].join("\n  ");
}

function stickerSvg(key, label, kind, index) {
  const [a, b, c, d, e] = paletteFor(key, index);
  const short = label.slice(0, 10);
  const seal = (hashText(key) % 9) + 1;
  const detailSize = kind === "tier" ? 126 : kind === "quest" ? 98 : 76;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg-${safeName(key)}" x1="36" y1="18" x2="284" y2="302" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${d}"/>
      <stop offset="0.42" stop-color="${b}"/>
      <stop offset="1" stop-color="${a}"/>
    </linearGradient>
    <linearGradient id="ink-${safeName(key)}" x1="88" y1="66" x2="232" y2="248" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${e}"/>
    </linearGradient>
    <filter id="shadow-${safeName(key)}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#28322d" flood-opacity="0.18"/>
    </filter>
    <pattern id="grain-${safeName(key)}" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M0 20 C 9 12, 18 28, 28 16" fill="none" stroke="${e}" stroke-width="1" opacity="0.08"/>
      <circle cx="8" cy="8" r="1.5" fill="${a}" opacity="0.12"/>
      <circle cx="22" cy="21" r="1.2" fill="${c}" opacity="0.12"/>
    </pattern>
  </defs>
  <rect x="16" y="16" width="288" height="288" rx="54" fill="url(#bg-${safeName(key)})" filter="url(#shadow-${safeName(key)})"/>
  <rect x="28" y="28" width="264" height="264" rx="44" fill="url(#grain-${safeName(key)})" opacity="0.9"/>
  <path d="M58 232 C 92 210, 130 220, 160 199 C 194 176, 238 178, 264 148 L264 262 L58 262 Z" fill="${c}" opacity="0.16"/>
  <path d="M52 92 C 89 62, 137 68, 160 96 C 186 65, 237 62, 268 96" fill="none" stroke="${d}" stroke-width="10" stroke-linecap="round" opacity="0.62"/>
  <g opacity="0.98">
    <ellipse cx="160" cy="168" rx="78" ry="58" fill="${e}" opacity="0.22"/>
    <ellipse cx="160" cy="156" rx="70" ry="52" fill="url(#ink-${safeName(key)})"/>
    <circle cx="122" cy="122" r="23" fill="${e}" opacity="0.28"/>
    <circle cx="198" cy="122" r="23" fill="${e}" opacity="0.28"/>
    <ellipse cx="160" cy="166" rx="44" ry="30" fill="${d}" opacity="0.32"/>
    <circle cx="136" cy="152" r="7" fill="#28322d"/>
    <circle cx="184" cy="152" r="7" fill="#28322d"/>
    <ellipse cx="160" cy="174" rx="12" ry="8" fill="#28322d"/>
    <path d="M146 188 C 154 196, 166 196, 174 188" fill="none" stroke="#28322d" stroke-width="5" stroke-linecap="round"/>
  </g>
  <g transform="translate(214 200)">
    <circle cx="0" cy="0" r="34" fill="${a}"/>
    <path d="M-10 -25 C 0 -42, 22 -38, 22 -19 C 9 -22, -2 -15, -10 -25 Z" fill="${c}"/>
    <circle cx="-8" cy="-6" r="4" fill="#fffaf0" opacity="0.72"/>
    <path d="M-20 8 C -2 18, 16 14, 24 -4" fill="none" stroke="${e}" stroke-width="4" stroke-linecap="round" opacity="0.24"/>
  </g>
  <g transform="translate(64 204)">
    <path d="M0 24 L32 0 L64 24 L52 24 L52 56 L12 56 L12 24 Z" fill="${d}" opacity="0.86"/>
    <rect x="24" y="30" width="16" height="26" rx="5" fill="${e}" opacity="0.34"/>
  </g>
  <g transform="translate(58 54)">
    <rect x="0" y="0" width="204" height="42" rx="21" fill="#fffaf0" opacity="0.78"/>
    <circle cx="24" cy="21" r="11" fill="${a}" opacity="0.82"/>
    <path d="M42 18 L178 18" stroke="${e}" stroke-width="4" stroke-linecap="round" opacity="0.24"/>
    <path d="M42 28 L132 28" stroke="${e}" stroke-width="3" stroke-linecap="round" opacity="0.16"/>
  </g>
  <g transform="translate(252 48)">
    <circle cx="0" cy="0" r="26" fill="${d}" opacity="0.9"/>
    <text x="0" y="8" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="900" fill="${e}">${seal}</text>
  </g>
  ${motif(key, detailSize, index)}
  <g transform="translate(40 258)">
    <rect x="0" y="0" width="240" height="34" rx="17" fill="#fffaf0" opacity="0.78"/>
    <text x="120" y="23" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="900" fill="${e}">${short}</text>
  </g>
</svg>
`;
}

function tierSvg(key, label, index) {
  const [a, b, c, d, e] = paletteFor(key, index);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="360" viewBox="0 0 720 360" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="tier-${safeName(key)}" x1="0" y1="0" x2="720" y2="360" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${d}"/>
      <stop offset="0.5" stop-color="${b}"/>
      <stop offset="1" stop-color="${a}"/>
    </linearGradient>
    <radialGradient id="glow-${safeName(key)}" cx="72%" cy="22%" r="62%">
      <stop offset="0" stop-color="#fffaf0" stop-opacity="0.78"/>
      <stop offset="1" stop-color="#fffaf0" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="720" height="360" rx="42" fill="url(#tier-${safeName(key)})"/>
  <rect width="720" height="360" rx="42" fill="url(#glow-${safeName(key)})"/>
  <path d="M0 268 C 96 218, 142 284, 238 230 C 332 177, 397 247, 494 199 C 586 153, 650 186, 720 142 L720 360 L0 360 Z" fill="${c}" opacity="0.28"/>
  <path d="M0 304 C 104 263, 160 322, 250 272 C 340 222, 435 300, 526 252 C 610 208, 662 224, 720 192 L720 360 L0 360 Z" fill="${e}" opacity="0.2"/>
  <g transform="translate(486 122)">
    <ellipse cx="0" cy="52" rx="96" ry="56" fill="${e}" opacity="0.22"/>
    <ellipse cx="0" cy="24" rx="82" ry="58" fill="${e}" opacity="0.62"/>
    <circle cx="-28" cy="6" r="8" fill="#28322d"/>
    <circle cx="30" cy="6" r="8" fill="#28322d"/>
    <ellipse cx="1" cy="28" rx="14" ry="9" fill="#28322d"/>
  </g>
  <g transform="translate(80 70)">
    <text x="0" y="0" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="900" fill="${e}" opacity="0.7">${label}</text>
    <path d="M0 24 L260 24" stroke="${e}" stroke-width="7" stroke-linecap="round" opacity="0.22"/>
    <path d="M0 48 L190 48" stroke="${e}" stroke-width="5" stroke-linecap="round" opacity="0.16"/>
  </g>
  ${motif(key, 168, index)}
</svg>
`;
}

function writeAsset(kind, key, label, index) {
  const folder = join(outDir, kind);
  mkdirSync(folder, { recursive: true });
  const filename = `${safeName(key)}.svg`;
  const svg = kind === "tiers" ? tierSvg(key, label, index) : stickerSvg(key, label, kind, index);
  writeFileSync(join(folder, filename), svg, "utf8");
  return { key, kind, filename };
}

const combinedSource = sourceFiles.map(readSource).join("\n");
const ids = captureAll(/\bid:\s*"([^"]+)"/g, combinedSource);
const icons = captureAll(/\bicon:\s*"([^"]+)"/g, combinedSource);
const tierIds = captureAll(/\bid:\s*"(yard|storehouse|onsen|bamboo_garden|golden_forest)"/g, readSource("config/ProgressionConfig.ts"));
const capybaraIds = captureAll(/\bid:\s*"([^"]+)"/g, readSource("config/StoryConfig.ts"));
const mascotStates = ["mascot-default", "mascot-happy", "mascot-sleepy", "mascot-eating", "mascot-celebrate"];
const releaseAssets = ["app-icon-draft", "splash-draft", "store-card-preview", "privacy-card-preview", "qa-screenshot-frame"];

const rawAssetInputs = [
  ...unique(ids).map((key) => ({ key, label: key.replace(/_/g, " "), kind: "items" })),
  ...unique(icons).map((key) => ({ key, label: key.replace(/_/g, " "), kind: "icons" })),
  ...unique(tierIds).map((key) => ({ key: `tier-${key}`, label: key.replace(/_/g, " "), kind: "tiers" })),
  ...unique(capybaraIds).map((key) => ({ key: `capybara-${key}`, label: key.replace(/_/g, " "), kind: "portraits" })),
  ...mascotStates.map((key) => ({ key, label: key.replace(/-/g, " "), kind: "mascots" })),
  ...releaseAssets.map((key) => ({ key, label: key.replace(/-/g, " "), kind: "release" })),
];
const assetInputs = [...new Map(rawAssetInputs.map((item) => [item.key, item])).values()];

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
const written = assetInputs.map((item, index) => writeAsset(item.kind, item.key, item.label, index));

const registryEntries = written
  .sort((a, b) => a.key.localeCompare(b.key))
  .map((asset) => `  ${JSON.stringify(asset.key)}: new URL("./${asset.kind}/${asset.filename}", import.meta.url).href,`)
  .join("\n");

writeFileSync(
  join(outDir, "GeneratedAssetRegistry.ts"),
  `export const GeneratedAssetRegistry: Record<string, string> = {\n${registryEntries}\n};\n\nexport function getGeneratedAsset(key: string) {\n  return GeneratedAssetRegistry[key] ?? null;\n}\n`,
  "utf8",
);

console.info(`generated ${written.length} visual assets in ${outDir}`);
