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

const palettes = {
  yard: {
    sky: "#fff1bd",
    sky2: "#d8f1dc",
    grass: "#54a86f",
    grass2: "#2f865d",
    orange: "#ff982a",
    orange2: "#d95618",
    leaf: "#278866",
    wood: "#8d5d39",
    dark: "#1f2c24",
    cream: "#fffdf2",
    accent: "#ffd568",
    water: "#4ba7b9",
    berry: "#8b4aaa",
  },
  storehouse: {
    sky: "#ffe1a8",
    sky2: "#fff7dc",
    grass: "#b27a48",
    grass2: "#72462b",
    orange: "#f08b2b",
    orange2: "#b9511e",
    leaf: "#35684f",
    wood: "#7b4f2f",
    dark: "#201713",
    cream: "#fff9e8",
    accent: "#ffd568",
    water: "#4b8aa8",
    berry: "#9a5bb4",
  },
  onsen: {
    sky: "#d8f7f2",
    sky2: "#fff7dc",
    grass: "#75b8a4",
    grass2: "#287c9a",
    orange: "#ff9d35",
    orange2: "#d95618",
    leaf: "#278866",
    wood: "#8d5d39",
    dark: "#1f2c24",
    cream: "#fffdf2",
    accent: "#bcecf4",
    water: "#4ba7b9",
    berry: "#8b4aaa",
  },
  bamboo: {
    sky: "#e9f6c7",
    sky2: "#fff8d9",
    grass: "#69b873",
    grass2: "#246f4d",
    orange: "#ff982a",
    orange2: "#d95618",
    leaf: "#278866",
    wood: "#7b4f2f",
    dark: "#1f2c24",
    cream: "#fffdf2",
    accent: "#f5d85f",
    water: "#4ba7b9",
    berry: "#8b4aaa",
  },
  golden: {
    sky: "#fff0a6",
    sky2: "#efe2ff",
    grass: "#9a7d2d",
    grass2: "#278866",
    orange: "#ff982a",
    orange2: "#d95618",
    leaf: "#c2942d",
    wood: "#7b4f2f",
    dark: "#251b18",
    cream: "#fffdf2",
    accent: "#ffd568",
    water: "#5aa2bd",
    berry: "#8b4aaa",
  },
};

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

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function hashText(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function tierFor(key) {
  if (/gold|leaf|prestige|memory|observatory|moon/.test(key)) return "golden";
  if (/bamboo|chime|lantern|festival|clap/.test(key)) return "bamboo";
  if (/onsen|pond|steam|towel|snack|mineral|stream|warm/.test(key)) return "onsen";
  if (/storehouse|crate|sorting|table|cart|fragrance|shelf|warehouse/.test(key)) return "storehouse";
  return "yard";
}

function paletteFor(key) {
  return palettes[tierFor(key)];
}

function bgDefs(key, p) {
  const id = safeName(key);
  return `<defs>
    <linearGradient id="bg-${id}" x1="32" y1="18" x2="288" y2="304" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${p.sky}"/>
      <stop offset="0.56" stop-color="${p.sky2}"/>
      <stop offset="1" stop-color="${p.accent}"/>
    </linearGradient>
    <linearGradient id="grass-${id}" x1="0" y1="168" x2="320" y2="304" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${p.grass}"/>
      <stop offset="1" stop-color="${p.grass2}"/>
    </linearGradient>
    <filter id="shadow-${id}" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="12" stdDeviation="9" flood-color="#1f2c24" flood-opacity="0.18"/>
    </filter>
    <filter id="soft-${id}" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#1f2c24" flood-opacity="0.14"/>
    </filter>
  </defs>`;
}

function sparkles(key, p) {
  const seed = hashText(key);
  const dots = [];
  for (let i = 0; i < 7; i += 1) {
    const x = 42 + ((seed >>> (i + 2)) + i * 31) % 236;
    const y = 42 + ((seed >>> (i + 6)) + i * 37) % 210;
    const r = 3 + ((seed + i) % 6);
    dots.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 2 ? p.orange : p.cream}" opacity="${i % 2 ? 0.18 : 0.26}"/>`);
  }
  return dots.join("\n    ");
}

function iconShell(key, label, content, options = {}) {
  const p = paletteFor(key);
  const id = safeName(key);
  const ring = options.ring ?? p.cream;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320" role="img" aria-label="${escapeXml(label)}">
  ${bgDefs(key, p)}
  <rect x="18" y="18" width="284" height="284" rx="64" fill="url(#bg-${id})"/>
  <path d="M18 221 C 62 198, 94 225, 134 202 C 178 176, 214 207, 302 154 L302 302 L18 302 Z" fill="url(#grass-${id})" opacity="0.34"/>
  <path d="M44 66 C 79 39, 124 48, 148 75 C 181 43, 236 45, 276 86" fill="none" stroke="${ring}" stroke-width="10" stroke-linecap="round" opacity="0.56"/>
  ${sparkles(key, p)}
  <g filter="url(#shadow-${id})">
    ${content}
  </g>
  <path d="M65 273 C 106 286, 213 287, 255 270" fill="none" stroke="${p.dark}" stroke-width="8" stroke-linecap="round" opacity="0.08"/>
</svg>
`;
}

function orangeCluster(p, x = 160, y = 160, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <circle cx="-28" cy="20" r="42" fill="${p.orange2}"/>
    <circle cx="18" cy="-4" r="50" fill="${p.orange}"/>
    <circle cx="40" cy="44" r="34" fill="#ffb64b"/>
    <circle cx="2" cy="-18" r="11" fill="#ffe8a3" opacity="0.82"/>
    <path d="M-3 -58 C 21 -95, 65 -85, 72 -48 C 43 -53, 18 -37, -3 -58 Z" fill="${p.leaf}"/>
    <path d="M-18 -48 C 1 -71, 28 -69, 39 -46" fill="none" stroke="${p.dark}" stroke-width="4" stroke-linecap="round" opacity="0.16"/>
  </g>`;
}

function goldenLeaf(p, x = 160, y = 160, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M-10 -88 C 72 -84, 106 -20, 30 68 C -42 36, -58 -38, -10 -88 Z" fill="${p.accent}"/>
    <path d="M-10 -88 C 44 -62, 58 2, 30 68" fill="none" stroke="#9a7d2d" stroke-width="8" stroke-linecap="round" opacity="0.72"/>
    <path d="M-2 -47 C 24 -48, 46 -35, 61 -13 M2 -14 C 28 -16, 46 -7, 58 11 M-2 17 C 18 18, 33 28, 42 43" fill="none" stroke="#fff7dc" stroke-width="5" stroke-linecap="round" opacity="0.72"/>
    <circle cx="-28" cy="-58" r="12" fill="#fffdf2" opacity="0.52"/>
  </g>`;
}

function capybaraHead(p, x = 160, y = 160, scale = 1, mood = "default") {
  const sleepy = mood === "sleepy";
  const happy = mood === "happy" || mood === "celebrate";
  const mouth = happy
    ? `<path d="M-24 34 C -8 50, 13 50, 30 34" fill="none" stroke="${p.dark}" stroke-width="8" stroke-linecap="round"/>`
    : `<path d="M-21 36 L26 36" stroke="${p.dark}" stroke-width="8" stroke-linecap="round"/>`;
  const eyes = sleepy
    ? `<path d="M-52 -8 L-28 -8 M32 -8 L56 -8" stroke="${p.dark}" stroke-width="8" stroke-linecap="round"/>`
    : `<circle cx="-40" cy="-10" r="10" fill="${p.dark}"/><circle cx="44" cy="-10" r="10" fill="${p.dark}"/>`;
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <ellipse cx="0" cy="44" rx="92" ry="58" fill="${p.wood}" opacity="0.24"/>
    <circle cx="-64" cy="-50" r="31" fill="#6d472d"/>
    <circle cx="66" cy="-50" r="31" fill="#6d472d"/>
    <ellipse cx="0" cy="0" rx="104" ry="86" fill="#936643"/>
    <path d="M-86 6 C -80 61, -38 82, 3 82 C 50 82, 86 54, 91 3 C 66 30, -62 31, -86 6 Z" fill="#7b4f2f" opacity="0.24"/>
    <ellipse cx="0" cy="16" rx="62" ry="46" fill="#c2956a"/>
    ${eyes}
    <ellipse cx="4" cy="23" rx="22" ry="17" fill="${p.dark}"/>
    ${mouth}
  </g>`;
}

function paw(p) {
  return `<g transform="translate(160 162)">
    <ellipse cx="0" cy="44" rx="68" ry="48" fill="#8f6747"/>
    <circle cx="-48" cy="-18" r="24" fill="#a77b53"/>
    <circle cx="0" cy="-34" r="26" fill="#a77b53"/>
    <circle cx="48" cy="-18" r="24" fill="#a77b53"/>
    <ellipse cx="0" cy="34" rx="34" ry="25" fill="#ffd6a2" opacity="0.58"/>
  </g>`;
}

function basket(p) {
  return `<g transform="translate(160 168)">
    <path d="M-78 -16 C -68 -86, 66 -86, 78 -16" fill="none" stroke="${p.wood}" stroke-width="16" stroke-linecap="round"/>
    <path d="M-94 -18 L92 -18 L72 76 L-72 76 Z" fill="#aa6b3a"/>
    <path d="M-78 12 H78 M-68 42 H68 M-42 -18 V76 M0 -18 V76 M42 -18 V76" stroke="#754528" stroke-width="7" opacity="0.36"/>
    ${orangeCluster(p, -26, -26, 0.5)}
    ${orangeCluster(p, 38, -22, 0.42)}
  </g>`;
}

function glove(p) {
  return `<g transform="translate(160 162)">
    <path d="M-54 42 C -82 -4, -51 -58, -12 -28 C -7 -84, 28 -84, 28 -26 C 51 -63, 84 -34, 58 12 C 92 19, 83 72, 30 72 L-26 72 C -43 72, -51 58, -54 42 Z" fill="#fff1cf"/>
    <path d="M-36 22 C -12 34, 22 34, 52 18" fill="none" stroke="${p.orange}" stroke-width="8" stroke-linecap="round"/>
    <path d="M-28 -28 C -19 -7, -16 12, -14 38 M26 -25 C 23 -2, 21 16, 19 42" stroke="${p.dark}" stroke-width="5" opacity="0.15" stroke-linecap="round"/>
  </g>`;
}

function spoon(p) {
  return `<g transform="translate(160 160)">
    <ellipse cx="-20" cy="-46" rx="46" ry="32" fill="#fff1cf" transform="rotate(-22 -20 -46)"/>
    <path d="M8 -18 C 41 18, 66 49, 84 88" fill="none" stroke="${p.wood}" stroke-width="18" stroke-linecap="round"/>
    <circle cx="-22" cy="-48" r="18" fill="${p.orange}"/>
    <path d="M-46 -50 C -30 -60, -15 -59, -3 -48" fill="none" stroke="${p.orange2}" stroke-width="5" stroke-linecap="round" opacity="0.38"/>
  </g>`;
}

function mat(p) {
  return `<g transform="translate(160 166)">
    <path d="M-98 12 C -78 -38, 74 -38, 98 12 L80 68 L-80 68 Z" fill="${p.grass}"/>
    <path d="M-76 0 C -38 16, 43 15, 78 0 M-84 28 H84 M-62 52 H62" fill="none" stroke="${p.cream}" stroke-width="7" opacity="0.42" stroke-linecap="round"/>
    ${capybaraHead(p, -24, -24, 0.38, "sleepy")}
  </g>`;
}

function parasol(p) {
  return `<g transform="translate(160 164)">
    <path d="M-98 -18 C -40 -88, 50 -88, 100 -18 Z" fill="${p.orange}"/>
    <path d="M-98 -18 C -63 5, -38 5, -7 -18 C 22 6, 58 7, 100 -18" fill="${p.orange2}" opacity="0.36"/>
    <path d="M0 -18 L0 90" stroke="${p.wood}" stroke-width="14" stroke-linecap="round"/>
    <path d="M0 -18 L-42 -55 M0 -18 L42 -55" stroke="${p.cream}" stroke-width="5" stroke-linecap="round" opacity="0.5"/>
    <ellipse cx="0" cy="94" rx="56" ry="14" fill="${p.dark}" opacity="0.1"/>
  </g>`;
}

function waterPath(p) {
  return `<g transform="translate(160 160)">
    <path d="M-112 56 C -68 -10, -17 48, 22 -12 C 55 -62, 93 -18, 112 -76" fill="none" stroke="${p.water}" stroke-width="32" stroke-linecap="round"/>
    <path d="M-106 52 C -58 4, -17 52, 26 -6 C 55 -44, 84 -27, 106 -65" fill="none" stroke="#d9fbff" stroke-width="8" stroke-linecap="round" opacity="0.72"/>
    ${orangeCluster(p, -74, -38, 0.36)}
    ${orangeCluster(p, 72, 48, 0.32)}
  </g>`;
}

function storehouse(p) {
  return `<g transform="translate(160 168)">
    <path d="M-102 -40 L0 -96 L104 -40 L88 -28 L88 82 L-88 82 L-88 -28 Z" fill="${p.wood}"/>
    <path d="M-78 -24 H78 V82 H-78 Z" fill="#b87542"/>
    <path d="M-102 -40 L0 -96 L104 -40" fill="none" stroke="${p.cream}" stroke-width="8" opacity="0.48" stroke-linecap="round"/>
    <rect x="-28" y="16" width="56" height="66" rx="8" fill="#623923"/>
    <path d="M-68 4 H68 M-68 34 H68 M-68 62 H68" stroke="#623923" stroke-width="6" opacity="0.34"/>
    ${orangeCluster(p, 58, -8, 0.36)}
  </g>`;
}

function crate(p) {
  return `<g transform="translate(160 162)">
    <rect x="-94" y="-38" width="188" height="114" rx="18" fill="#b87542"/>
    <path d="M-80 -12 H80 M-76 26 H76 M-44 -38 V76 M42 -38 V76 M-82 -34 L78 72 M80 -34 L-78 72" stroke="#6b3f25" stroke-width="8" opacity="0.32" stroke-linecap="round"/>
    ${orangeCluster(p, 0, -58, 0.42)}
  </g>`;
}

function table(p) {
  return `<g transform="translate(160 164)">
    <rect x="-100" y="-36" width="200" height="52" rx="16" fill="${p.wood}"/>
    <path d="M-72 14 V82 M72 14 V82" stroke="#6b3f25" stroke-width="14" stroke-linecap="round"/>
    <circle cx="-50" cy="-48" r="24" fill="${p.orange}"/>
    <circle cx="0" cy="-50" r="24" fill="#ffb64b"/>
    <circle cx="50" cy="-48" r="24" fill="${p.orange2}"/>
    <path d="M-74 -16 H74" stroke="${p.cream}" stroke-width="6" opacity="0.36" stroke-linecap="round"/>
  </g>`;
}

function cart(p) {
  return `<g transform="translate(160 166)">
    <path d="M-98 -36 H58 C 86 -36, 98 -18, 88 8 L68 56 H-70 Z" fill="#b87542"/>
    <path d="M-84 -8 H80 M-70 22 H72 M70 -30 L108 -56" stroke="#6b3f25" stroke-width="8" stroke-linecap="round" opacity="0.4"/>
    <circle cx="-54" cy="66" r="24" fill="${p.dark}"/>
    <circle cx="46" cy="66" r="24" fill="${p.dark}"/>
    <circle cx="-54" cy="66" r="10" fill="${p.accent}"/>
    <circle cx="46" cy="66" r="10" fill="${p.accent}"/>
    ${orangeCluster(p, -8, -48, 0.42)}
  </g>`;
}

function onsen(p) {
  return `<g transform="translate(160 166)">
    <ellipse cx="0" cy="36" rx="104" ry="54" fill="${p.water}"/>
    <ellipse cx="0" cy="24" rx="90" ry="36" fill="#bcecf4" opacity="0.74"/>
    <path d="M-94 36 C -72 72, 72 72, 94 36" fill="none" stroke="${p.wood}" stroke-width="14" stroke-linecap="round"/>
    <path d="M-54 -74 C -78 -42, -31 -31, -52 0 M3 -84 C -26 -43, 26 -30, 2 8 M58 -72 C 34 -39, 82 -29, 58 0" fill="none" stroke="${p.cream}" stroke-width="9" stroke-linecap="round" opacity="0.72"/>
    ${capybaraHead(p, -22, 0, 0.34, "happy")}
  </g>`;
}

function towel(p) {
  return `<g transform="translate(160 162)">
    <path d="M-80 -76 C -34 -106, 36 -106, 82 -76" fill="none" stroke="${p.wood}" stroke-width="12" stroke-linecap="round"/>
    <rect x="-78" y="-50" width="156" height="110" rx="24" fill="#fff1cf"/>
    <path d="M-44 -30 H44 M-48 -2 H48 M-46 28 H46" stroke="${p.water}" stroke-width="8" opacity="0.38" stroke-linecap="round"/>
    <path d="M-74 68 C -42 88, 43 88, 76 68" fill="none" stroke="${p.orange}" stroke-width="10" stroke-linecap="round"/>
  </g>`;
}

function snack(p) {
  return `<g transform="translate(160 166)">
    <rect x="-94" y="18" width="188" height="54" rx="20" fill="${p.wood}"/>
    <path d="M-64 16 C -38 -38, 48 -38, 74 16" fill="#fff1cf"/>
    ${orangeCluster(p, -24, -24, 0.38)}
    <path d="M14 -36 C 28 -62, 66 -56, 70 -26 C 46 -29, 30 -21, 14 -36 Z" fill="${p.leaf}"/>
    <path d="M-70 48 H70" stroke="#6b3f25" stroke-width="8" opacity="0.34" stroke-linecap="round"/>
  </g>`;
}

function bamboo(p) {
  return `<g transform="translate(160 164)">
    <path d="M-68 76 L-48 -96 M-8 84 L4 -104 M54 78 L72 -88" stroke="${p.leaf}" stroke-width="22" stroke-linecap="round"/>
    <path d="M-61 -26 H-37 M-54 28 H-30 M-6 -42 H18 M-11 18 H13 M62 -18 H82 M58 34 H78" stroke="${p.cream}" stroke-width="7" opacity="0.52" stroke-linecap="round"/>
    ${cart(p).replace('<g transform="translate(160 166)">', '<g transform="translate(0 36) scale(0.58)">').replace("</g>", "</g>")}
  </g>`;
}

function lantern(p) {
  return `<g transform="translate(160 160)">
    <path d="M-98 -76 C -40 -28, 46 -28, 100 -76" fill="none" stroke="${p.wood}" stroke-width="10" stroke-linecap="round"/>
    <g transform="translate(-56 -36)"><ellipse cx="0" cy="34" rx="24" ry="34" fill="${p.orange}"/><path d="M-18 34 H18 M0 4 V64" stroke="${p.cream}" stroke-width="5" opacity="0.44"/></g>
    <g transform="translate(4 -18)"><ellipse cx="0" cy="34" rx="28" ry="38" fill="${p.accent}"/><path d="M-20 34 H20 M0 1 V67" stroke="${p.orange2}" stroke-width="5" opacity="0.38"/></g>
    <g transform="translate(66 -42)"><ellipse cx="0" cy="34" rx="22" ry="32" fill="${p.orange2}"/><path d="M-15 34 H15 M0 7 V62" stroke="${p.cream}" stroke-width="5" opacity="0.44"/></g>
  </g>`;
}

function windChime(p) {
  return `<g transform="translate(160 158)">
    <path d="M-74 -70 H76" stroke="${p.wood}" stroke-width="12" stroke-linecap="round"/>
    <path d="M-48 -64 V50 M0 -64 V70 M48 -64 V45" stroke="${p.dark}" stroke-width="5" opacity="0.28" stroke-linecap="round"/>
    <rect x="-70" y="-20" width="44" height="74" rx="18" fill="${p.accent}"/>
    <rect x="-22" y="-2" width="44" height="88" rx="18" fill="${p.water}"/>
    <rect x="30" y="-28" width="44" height="74" rx="18" fill="${p.orange}"/>
    <circle cx="-48" cy="68" r="9" fill="${p.orange2}"/>
    <circle cx="0" cy="100" r="9" fill="${p.orange2}"/>
    <circle cx="48" cy="62" r="9" fill="${p.orange2}"/>
  </g>`;
}

function toolbox(p) {
  return `<g transform="translate(160 164)">
    <rect x="-86" y="-26" width="172" height="112" rx="20" fill="#b87542"/>
    <path d="M-48 -28 C -42 -64, 42 -64, 50 -28" fill="none" stroke="${p.wood}" stroke-width="14" stroke-linecap="round"/>
    <path d="M-86 20 H86" stroke="#6b3f25" stroke-width="8" opacity="0.34"/>
    <rect x="-18" y="8" width="36" height="28" rx="8" fill="${p.accent}"/>
    <path d="M-54 58 H54" stroke="${p.cream}" stroke-width="6" stroke-linecap="round" opacity="0.42"/>
  </g>`;
}

function greenhouse(p) {
  return `<g transform="translate(160 166)">
    <path d="M-92 72 V-18 C -64 -78, 64 -78, 92 -18 V72 Z" fill="#bfead3"/>
    <path d="M-72 72 V-8 C -48 -56, 48 -56, 72 -8 V72 M0 -62 V72 M-82 10 H82 M-82 44 H82" fill="none" stroke="${p.leaf}" stroke-width="7" opacity="0.42"/>
    ${goldenLeaf(p, -32, 2, 0.32)}
    ${orangeCluster(p, 38, 28, 0.32)}
  </g>`;
}

function observatory(p) {
  return `<g transform="translate(160 166)">
    <path d="M-76 76 H76 L60 18 H-60 Z" fill="${p.wood}"/>
    <circle cx="0" cy="-30" r="58" fill="${p.berry}"/>
    <circle cx="22" cy="-50" r="42" fill="${p.sky}" opacity="0.9"/>
    <path d="M-90 76 H90" stroke="${p.dark}" stroke-width="8" opacity="0.16" stroke-linecap="round"/>
    <circle cx="-56" cy="-80" r="8" fill="${p.accent}"/>
    <circle cx="70" cy="-64" r="6" fill="${p.cream}"/>
    ${orangeCluster(p, 40, 44, 0.28)}
  </g>`;
}

function memoryGate(p) {
  return `<g transform="translate(160 166)">
    <path d="M-88 74 V-28 C -88 -82, 88 -82, 88 -28 V74" fill="none" stroke="${p.berry}" stroke-width="24" stroke-linecap="round"/>
    <path d="M-52 74 V-20 C -52 -43, 52 -43, 52 -20 V74" fill="none" stroke="${p.accent}" stroke-width="11" stroke-linecap="round" opacity="0.86"/>
    <circle cx="0" cy="-26" r="32" fill="${p.cream}" opacity="0.28"/>
    ${goldenLeaf(p, 0, -20, 0.36)}
  </g>`;
}

function releaseBoard(p) {
  return `<g transform="translate(160 162)">
    <rect x="-88" y="-72" width="176" height="150" rx="22" fill="${p.cream}"/>
    <path d="M-54 -34 H50 M-54 4 H56 M-54 42 H24" stroke="${p.dark}" stroke-width="9" opacity="0.24" stroke-linecap="round"/>
    <circle cx="-64" cy="-34" r="12" fill="${p.leaf}"/>
    <circle cx="-64" cy="4" r="12" fill="${p.orange}"/>
    <circle cx="-64" cy="42" r="12" fill="${p.accent}"/>
    <path d="M52 34 L76 58 L112 14" fill="none" stroke="${p.leaf}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;
}

function album(p) {
  return `<g transform="translate(160 162)">
    <rect x="-88" y="-76" width="176" height="150" rx="22" fill="${p.cream}"/>
    <path d="M-50 -76 V74" stroke="${p.wood}" stroke-width="10" opacity="0.42"/>
    ${capybaraHead(p, 20, -18, 0.42, "happy")}
    ${orangeCluster(p, -38, 38, 0.3)}
    <path d="M-72 -36 H-58 M-72 0 H-58 M-72 36 H-58" stroke="${p.dark}" stroke-width="7" opacity="0.24" stroke-linecap="round"/>
  </g>`;
}

function home(p) {
  return `<g transform="translate(160 164)">
    <path d="M-88 54 V-20 L0 -78 L90 -20 V54 Z" fill="${p.wood}"/>
    <path d="M-102 -18 L0 -90 L104 -18" fill="none" stroke="${p.orange}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="-28" y="6" width="56" height="48" rx="10" fill="#5f3924"/>
    <circle cx="-66" cy="-68" r="25" fill="${p.leaf}"/>
    <circle cx="-57" cy="-71" r="8" fill="${p.orange}"/>
    <circle cx="72" cy="-46" r="23" fill="${p.leaf}"/>
    <circle cx="79" cy="-48" r="8" fill="${p.orange}"/>
  </g>`;
}

function symbolFor(key, kind, index) {
  const p = paletteFor(key);
  if (kind === "icons" || kind === "items") {
    if (/^home$|yard|sunny/.test(key)) return home(p);
    if (/collection|album/.test(key)) return album(p);
    if (/shop|gift|sandbox|ad_festival/.test(key)) return lantern(p);
    if (/settings|release|export|privacy|qa/.test(key)) return releaseBoard(p);
    if (/prestige|gold|leaf/.test(key)) return goldenLeaf(p, 160, 160, 1.05);
    if (/^orange$|orange_1k|first_orange|citrus/.test(key)) return orangeCluster(p, 160, 158, 0.94);
    if (/basket/.test(key)) return basket(p);
    if (/paw|tap|soft/.test(key)) return paw(p);
    if (/glove|butler_hand|butler/.test(key)) return glove(p);
    if (/spoon/.test(key)) return spoon(p);
    if (/recipe|snack/.test(key)) return snack(p);
    if (/mat|nap/.test(key)) return mat(p);
    if (/parasol|shade/.test(key)) return parasol(p);
    if (/water_path|watering|stream|mineral/.test(key)) return waterPath(p);
    if (/pond|onsen|steam|towel|warm/.test(key)) return /towel/.test(key) ? towel(p) : onsen(p);
    if (/storehouse|fragrance|shelf/.test(key)) return storehouse(p);
    if (/crate/.test(key)) return crate(p);
    if (/sorting|table|metronome|rhythm/.test(key)) return table(p);
    if (/cart/.test(key)) return cart(p);
    if (/bamboo/.test(key)) return bamboo(p);
    if (/lantern|festival|clap/.test(key)) return lantern(p);
    if (/chime|wind/.test(key)) return windChime(p);
    if (/toolbox/.test(key)) return toolbox(p);
    if (/compost|greenhouse/.test(key)) return greenhouse(p);
    if (/observatory|moon/.test(key)) return observatory(p);
    if (/memory|gate/.test(key)) return memoryGate(p);
  }
  const moods = ["default", "happy", "sleepy", "eating", "celebrate"];
  const mood = moods[index % moods.length];
  return `${capybaraHead(p, 130, 154, 0.62, mood)}${orangeCluster(p, 220, 190, 0.42)}`;
}

function portraitAccessory(id, p) {
  const accessories = {
    momo: `<path d="M102 112 C 122 86, 198 86, 220 112" fill="none" stroke="${p.orange}" stroke-width="13" stroke-linecap="round"/><circle cx="112" cy="110" r="10" fill="${p.cream}"/>`,
    narin: `<rect x="108" y="94" width="104" height="26" rx="13" fill="${p.wood}"/><path d="M118 106 H202" stroke="${p.cream}" stroke-width="5" opacity="0.54" stroke-linecap="round"/>`,
    dami: `<path d="M104 112 C 128 72, 194 72, 218 112 Z" fill="${p.water}"/><path d="M124 99 H198" stroke="${p.cream}" stroke-width="7" opacity="0.6" stroke-linecap="round"/>`,
    biro: `<path d="M100 206 C 124 238, 196 238, 220 206" fill="none" stroke="${p.leaf}" stroke-width="14" stroke-linecap="round"/><circle cx="108" cy="206" r="9" fill="${p.accent}"/><circle cx="212" cy="206" r="9" fill="${p.accent}"/>`,
    soda: `<path d="M108 210 C 134 238, 186 238, 212 210 L214 236 C 184 256, 136 256, 106 236 Z" fill="${p.water}"/><path d="M120 222 C 146 237, 174 237, 200 222" fill="none" stroke="${p.cream}" stroke-width="5" stroke-linecap="round"/>`,
    ruru: `<path d="M94 116 C 114 88, 206 88, 226 116" fill="none" stroke="${p.orange}" stroke-width="9" stroke-linecap="round"/><circle cx="116" cy="104" r="12" fill="${p.accent}"/><circle cx="204" cy="104" r="12" fill="${p.accent}"/>`,
    hanul: `<path d="M112 108 C 134 72, 186 72, 208 108" fill="none" stroke="${p.accent}" stroke-width="15" stroke-linecap="round"/><path d="M148 82 L160 56 L172 82" fill="${p.leaf}"/><circle cx="160" cy="56" r="8" fill="${p.orange}"/>`,
    podo: `<path d="M106 94 C 138 70, 182 70, 214 94 L202 108 C 174 92, 146 92, 118 108 Z" fill="${p.berry}"/><circle cx="137" cy="90" r="7" fill="${p.accent}"/><circle cx="160" cy="84" r="7" fill="${p.accent}"/><circle cx="183" cy="90" r="7" fill="${p.accent}"/>`,
  };
  return accessories[id] ?? "";
}

function portraitSvg(key, label, index) {
  const id = key.replace("capybara-", "");
  const p = paletteFor(["momo", "podo"].includes(id) ? "yard" : id === "dami" || id === "soda" ? "onsen" : id === "biro" || id === "ruru" ? "bamboo" : "golden");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320" role="img" aria-label="${escapeXml(label)}">
  ${bgDefs(key, p)}
  <rect x="18" y="18" width="284" height="284" rx="72" fill="url(#bg-${safeName(key)})"/>
  <path d="M18 224 C 72 184, 104 226, 156 196 C 210 164, 246 200, 302 154 L302 302 L18 302 Z" fill="url(#grass-${safeName(key)})" opacity="0.38"/>
  ${sparkles(key, p)}
  <g filter="url(#shadow-${safeName(key)})">
    ${capybaraHead(p, 160, 170, 0.86, index % 2 ? "happy" : "default")}
    ${portraitAccessory(id, p)}
    ${orangeCluster(p, 222, 226, 0.33)}
  </g>
</svg>
`;
}

function mascotSvg(key, label) {
  const p = paletteFor("yard");
  const mood = key.replace("mascot-", "");
  const extras = {
    eating: orangeCluster(p, 222, 206, 0.34),
    celebrate: `${goldenLeaf(p, 80, 92, 0.28)}${lantern(p).replace('<g transform="translate(160 160)">', '<g transform="translate(218 72) scale(0.42)">')}`,
    sleepy: `<path d="M216 82 h28 M226 62 h22 M238 42 h18" stroke="${p.dark}" stroke-width="8" stroke-linecap="round" opacity="0.28"/>`,
    happy: orangeCluster(p, 220, 216, 0.28),
    default: "",
  }[mood] ?? "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <filter id="mascot-shadow-${safeName(key)}" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="18" stdDeviation="10" flood-color="#1f2c24" flood-opacity="0.24"/>
    </filter>
  </defs>
  <g filter="url(#mascot-shadow-${safeName(key)})">
    ${capybaraHead(p, 154, 174, 0.92, mood)}
    ${extras}
  </g>
</svg>
`;
}

function tierSvg(key, label) {
  const tier = key.replace("tier-", "");
  const p = palettes[tier === "bamboo_garden" ? "bamboo" : tier === "golden_forest" ? "golden" : tier] ?? palettes.yard;
  const id = safeName(key);
  const scene =
    tier === "storehouse" ? `${storehouse(p).replace('<g transform="translate(160 168)">', '<g transform="translate(198 198) scale(0.86)">')}${cart(p).replace('<g transform="translate(160 166)">', '<g transform="translate(498 228) scale(0.66)">')}` :
    tier === "onsen" ? `${onsen(p).replace('<g transform="translate(160 166)">', '<g transform="translate(208 206) scale(0.9)">')}${towel(p).replace('<g transform="translate(160 162)">', '<g transform="translate(502 198) scale(0.58)">')}` :
    tier === "bamboo_garden" ? `${bamboo(p).replace('<g transform="translate(160 164)">', '<g transform="translate(230 196) scale(0.92)">')}${lantern(p).replace('<g transform="translate(160 160)">', '<g transform="translate(514 168) scale(0.64)">')}` :
    tier === "golden_forest" ? `${memoryGate(p).replace('<g transform="translate(160 166)">', '<g transform="translate(230 196) scale(0.9)">')}${goldenLeaf(p, 522, 178, 0.72)}` :
    `${home(p).replace('<g transform="translate(160 164)">', '<g transform="translate(206 202) scale(0.92)">')}${basket(p).replace('<g transform="translate(160 168)">', '<g transform="translate(506 226) scale(0.62)">')}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="360" viewBox="0 0 720 360" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <linearGradient id="tier-bg-${id}" x1="0" y1="0" x2="720" y2="360" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${p.sky}"/>
      <stop offset="0.58" stop-color="${p.sky2}"/>
      <stop offset="1" stop-color="${p.accent}"/>
    </linearGradient>
    <linearGradient id="tier-ground-${id}" x1="0" y1="210" x2="720" y2="360" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${p.grass}"/>
      <stop offset="1" stop-color="${p.grass2}"/>
    </linearGradient>
    <filter id="tier-shadow-${id}" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="16" stdDeviation="10" flood-color="#1f2c24" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="720" height="360" rx="42" fill="url(#tier-bg-${id})"/>
  <circle cx="594" cy="72" r="52" fill="${p.accent}" opacity="0.74"/>
  <path d="M0 246 C 110 188, 188 274, 286 220 C 394 160, 474 246, 584 190 C 648 156, 690 166, 720 138 L720 360 L0 360 Z" fill="url(#tier-ground-${id})" opacity="0.34"/>
  <path d="M0 304 C 112 260, 170 320, 270 266 C 368 214, 444 306, 540 250 C 624 202, 682 224, 720 196 L720 360 L0 360 Z" fill="${p.dark}" opacity="0.08"/>
  <g filter="url(#tier-shadow-${id})">
    ${scene}
    ${capybaraHead(p, 378, 228, 0.48, "happy")}
  </g>
  ${sparkles(key, p)}
</svg>
`;
}

function mainHeroFinalSvg(key, label) {
  const p = palettes.yard;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="720" viewBox="0 0 1024 720" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <linearGradient id="hero-final-sky" x1="0" y1="0" x2="1024" y2="720" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fff6c9"/>
      <stop offset="0.48" stop-color="#dff3e9"/>
      <stop offset="1" stop-color="#94d2a3"/>
    </linearGradient>
    <linearGradient id="hero-final-ground" x1="0" y1="390" x2="1024" y2="720" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#8fcf92"/>
      <stop offset="1" stop-color="#3f8f61"/>
    </linearGradient>
    <filter id="hero-final-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="22" stdDeviation="16" flood-color="#1f2c24" flood-opacity="0.22"/>
    </filter>
  </defs>
  <rect width="1024" height="720" rx="52" fill="url(#hero-final-sky)"/>
  <circle cx="738" cy="112" r="118" fill="#ffd568" opacity="0.58"/>
  <path d="M0 455 C 142 360, 260 506, 404 406 C 548 306, 676 446, 828 350 C 930 286, 986 304, 1024 272 L1024 720 L0 720 Z" fill="url(#hero-final-ground)" opacity="0.68"/>
  <path d="M0 598 C 170 520, 300 642, 482 540 C 646 448, 776 600, 1024 470 L1024 720 L0 720 Z" fill="#1f2c24" opacity="0.08"/>
  <g opacity="0.88" filter="url(#hero-final-shadow)">
    ${home(p).replace('<g transform="translate(160 164)">', '<g transform="translate(176 472) scale(1.05)">')}
    ${basket(p).replace('<g transform="translate(160 168)">', '<g transform="translate(292 538) scale(0.88)">')}
    ${waterPath(p).replace('<g transform="translate(160 160)">', '<g transform="translate(778 520) scale(0.88)">')}
  </g>
  <g filter="url(#hero-final-shadow)">
    <ellipse cx="518" cy="604" rx="210" ry="42" fill="#1f2c24" opacity="0.12"/>
    <ellipse cx="518" cy="430" rx="188" ry="134" fill="#a5754e"/>
    <ellipse cx="386" cy="428" rx="62" ry="76" fill="#8d5d39"/>
    <ellipse cx="650" cy="428" rx="62" ry="76" fill="#8d5d39"/>
    <ellipse cx="518" cy="458" rx="136" ry="88" fill="#c2956a"/>
    <circle cx="462" cy="416" r="16" fill="#1f2c24"/>
    <circle cx="576" cy="416" r="16" fill="#1f2c24"/>
    <ellipse cx="520" cy="466" rx="42" ry="30" fill="#1f2c24"/>
    <path d="M464 506 C 492 538, 548 540, 582 506" fill="none" stroke="#1f2c24" stroke-width="14" stroke-linecap="round"/>
    <path d="M374 520 C 452 580, 604 582, 672 520" fill="#8d5d39" opacity="0.38"/>
    ${goldenLeaf(p, 388, 316, 0.42)}
    ${orangeCluster(p, 704, 476, 0.6)}
  </g>
  <g opacity="0.72">
    <circle cx="186" cy="202" r="18" fill="#ff982a"/>
    <circle cx="834" cy="246" r="22" fill="#ffb64b"/>
    <circle cx="856" cy="286" r="16" fill="#d95618"/>
    <path d="M804 228 C 840 206, 876 214, 898 244" fill="none" stroke="#278866" stroke-width="10" stroke-linecap="round"/>
  </g>
</svg>
`;
}

function prestigeRitualFinalSvg(key, label) {
  const p = palettes.golden;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="460" viewBox="0 0 760 460" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <radialGradient id="ritual-glow" cx="50%" cy="32%" r="70%">
      <stop offset="0" stop-color="#fff7dc"/>
      <stop offset="0.46" stop-color="#ffd568"/>
      <stop offset="1" stop-color="#245f49"/>
    </radialGradient>
    <filter id="ritual-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="12" flood-color="#1f2c24" flood-opacity="0.28"/>
    </filter>
  </defs>
  <rect width="760" height="460" rx="42" fill="url(#ritual-glow)"/>
  <path d="M0 340 C 110 292, 206 370, 330 314 C 452 258, 552 358, 760 276 L760 460 L0 460 Z" fill="#1f2c24" opacity="0.16"/>
  <g filter="url(#ritual-shadow)">
    ${memoryGate(p).replace('<g transform="translate(160 166)">', '<g transform="translate(380 238) scale(1.24)">')}
    ${goldenLeaf(p, 382, 106, 0.72)}
    ${capybaraHead(p, 184, 292, 0.5, "celebrate")}
    ${capybaraHead(p, 582, 292, 0.5, "happy")}
  </g>
  <path d="M178 366 C 278 404, 486 404, 588 366" fill="none" stroke="#fff7dc" stroke-width="16" stroke-linecap="round" opacity="0.72"/>
  <circle cx="380" cy="238" r="132" fill="none" stroke="#fff7dc" stroke-width="10" opacity="0.42"/>
  <circle cx="380" cy="238" r="90" fill="none" stroke="#ffd568" stroke-width="8" opacity="0.72"/>
</svg>
`;
}

function shopRewardBannerFinalSvg(key, label) {
  const p = palettes.bamboo;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="360" viewBox="0 0 760 360" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <linearGradient id="shop-final-bg" x1="0" y1="0" x2="760" y2="360" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#245f49"/>
      <stop offset="0.56" stop-color="#3f8f61"/>
      <stop offset="1" stop-color="#ffb64b"/>
    </linearGradient>
    <filter id="shop-final-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="10" flood-color="#1f2c24" flood-opacity="0.24"/>
    </filter>
  </defs>
  <rect width="760" height="360" rx="40" fill="url(#shop-final-bg)"/>
  <circle cx="628" cy="88" r="92" fill="#ffd568" opacity="0.5"/>
  <path d="M0 260 C 120 198, 218 294, 344 232 C 492 160, 590 250, 760 190 L760 360 L0 360 Z" fill="#fff7dc" opacity="0.18"/>
  <g filter="url(#shop-final-shadow)">
    ${basket(p).replace('<g transform="translate(160 168)">', '<g transform="translate(174 226) scale(0.86)">')}
    ${releaseBoard(p).replace('<g transform="translate(160 160)">', '<g transform="translate(394 198) scale(1.08)">')}
    ${orangeCluster(p, 564, 218, 0.72)}
    ${capybaraHead(p, 616, 236, 0.42, "happy")}
  </g>
  <path d="M94 86 H486" stroke="#fffdf2" stroke-width="18" stroke-linecap="round" opacity="0.66"/>
  <path d="M94 128 H384" stroke="#fffdf2" stroke-width="12" stroke-linecap="round" opacity="0.42"/>
</svg>
`;
}

function offlineReturnFinalSvg(key, label) {
  const p = palettes.onsen;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="420" viewBox="0 0 720 420" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <linearGradient id="offline-final-bg" x1="0" y1="0" x2="720" y2="420" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#d8f7f2"/>
      <stop offset="0.52" stop-color="#fff7dc"/>
      <stop offset="1" stop-color="#ffd568"/>
    </linearGradient>
    <filter id="offline-final-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="11" flood-color="#1f2c24" flood-opacity="0.22"/>
    </filter>
  </defs>
  <rect width="720" height="420" rx="42" fill="url(#offline-final-bg)"/>
  <path d="M0 304 C 110 250, 212 338, 336 282 C 470 222, 558 304, 720 238 L720 420 L0 420 Z" fill="#75b8a4" opacity="0.42"/>
  <g filter="url(#offline-final-shadow)">
    ${onsen(p).replace('<g transform="translate(160 166)">', '<g transform="translate(184 254) scale(0.72)">')}
    ${basket(p).replace('<g transform="translate(160 168)">', '<g transform="translate(372 258) scale(0.94)">')}
    ${orangeCluster(p, 492, 220, 0.68)}
    ${capybaraHead(p, 584, 252, 0.48, "sleepy")}
  </g>
  <path d="M106 108 C 166 72, 230 72, 288 108" fill="none" stroke="#fffdf2" stroke-width="12" stroke-linecap="round" opacity="0.72"/>
  <path d="M94 142 C 152 110, 214 112, 270 144" fill="none" stroke="#fffdf2" stroke-width="8" stroke-linecap="round" opacity="0.52"/>
</svg>
`;
}

function storeKeyVisualFinalSvg(key, label) {
  const p = palettes.yard;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="920" height="920" viewBox="0 0 920 920" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <radialGradient id="store-key-glow" cx="50%" cy="44%" r="62%">
      <stop offset="0" stop-color="#fffdf2"/>
      <stop offset="0.58" stop-color="#ffd568"/>
      <stop offset="1" stop-color="#3f8f61"/>
    </radialGradient>
    <filter id="store-key-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="26" stdDeviation="18" flood-color="#1f2c24" flood-opacity="0.24"/>
    </filter>
  </defs>
  <circle cx="460" cy="460" r="430" fill="url(#store-key-glow)" opacity="0.92"/>
  <path d="M90 660 C 226 586, 346 728, 496 626 C 634 532, 746 646, 850 580 L850 840 L90 840 Z" fill="#278866" opacity="0.22"/>
  <g filter="url(#store-key-shadow)">
    ${capybaraHead(p, 456, 500, 1.42, "happy")}
    ${orangeCluster(p, 684, 552, 1.06)}
    ${goldenLeaf(p, 292, 322, 0.76)}
    ${basket(p).replace('<g transform="translate(160 168)">', '<g transform="translate(246 658) scale(0.86)">')}
  </g>
  <circle cx="194" cy="238" r="34" fill="#ff982a" opacity="0.76"/>
  <circle cx="744" cy="274" r="42" fill="#ffb64b" opacity="0.78"/>
  <circle cx="768" cy="348" r="26" fill="#d95618" opacity="0.68"/>
</svg>
`;
}

function releaseSvg(key, label) {
  const p = palettes.yard;
  if (key === "main-hero-final") return mainHeroFinalSvg(key, label);
  if (key === "prestige-ritual-final") return prestigeRitualFinalSvg(key, label);
  if (key === "shop-reward-banner-final") return shopRewardBannerFinalSvg(key, label);
  if (key === "offline-return-final") return offlineReturnFinalSvg(key, label);
  if (key === "store-key-visual-final") return storeKeyVisualFinalSvg(key, label);
  if (key.includes("app-icon")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <linearGradient id="app-bg" x1="80" y1="52" x2="944" y2="984" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fff7dc"/>
      <stop offset="0.48" stop-color="#dff3e9"/>
      <stop offset="1" stop-color="#ff982a"/>
    </linearGradient>
    <filter id="app-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="34" stdDeviation="28" flood-color="#1f2c24" flood-opacity="0.24"/>
    </filter>
  </defs>
  <rect width="1024" height="1024" rx="224" fill="url(#app-bg)"/>
  <circle cx="796" cy="196" r="112" fill="#ffd568" opacity="0.82"/>
  <path d="M0 712 C 160 616, 276 744, 422 642 C 558 548, 660 652, 806 560 C 912 494, 970 516, 1024 470 L1024 1024 L0 1024 Z" fill="#278866" opacity="0.28"/>
  <g transform="translate(0 10) scale(3.05)" filter="url(#app-shadow)">
    ${capybaraHead(p, 160, 178, 0.9, "happy")}
    ${orangeCluster(p, 232, 226, 0.45)}
  </g>
</svg>
`;
  }
  if (key.includes("splash")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="2732" height="2732" viewBox="0 0 2732 2732" role="img" aria-label="${escapeXml(label)}">
  <rect width="2732" height="2732" fill="#fff7dc"/>
  <circle cx="2092" cy="582" r="260" fill="#ffd568" opacity="0.72"/>
  <path d="M0 1890 C 410 1688, 642 1924, 1008 1716 C 1392 1496, 1702 1770, 2052 1554 C 2310 1396, 2524 1458, 2732 1290 L2732 2732 L0 2732 Z" fill="#dff3e9"/>
  <path d="M0 2116 C 476 1888, 740 2196, 1130 1978 C 1532 1756, 1838 2060, 2198 1852 C 2422 1722, 2588 1746, 2732 1656 L2732 2732 L0 2732 Z" fill="#278866" opacity="0.32"/>
  <g transform="translate(884 796) scale(3.0)">
    ${capybaraHead(p, 160, 162, 0.95, "happy")}
    ${orangeCluster(p, 232, 228, 0.48)}
  </g>
  <text x="1366" y="2078" text-anchor="middle" font-family="Pretendard, Arial, sans-serif" font-size="144" font-weight="900" fill="#1f2c24">카피바라 집사기</text>
  <text x="1366" y="2226" text-anchor="middle" font-family="Pretendard, Arial, sans-serif" font-size="66" font-weight="800" fill="#7b4f2f">귤 정원을 돌보는 방치형 클리커</text>
</svg>
`;
  }
  if (key.includes("store-screenshot-frame")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1290" height="2796" viewBox="0 0 1290 2796" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <linearGradient id="frame-bg" x1="0" y1="0" x2="1290" y2="2796" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fff7dc"/>
      <stop offset="0.56" stop-color="#dff3e9"/>
      <stop offset="1" stop-color="#ffd568"/>
    </linearGradient>
  </defs>
  <rect width="1290" height="2796" fill="url(#frame-bg)"/>
  <circle cx="1048" cy="314" r="166" fill="#ffd568" opacity="0.72"/>
  <path d="M0 2444 C 254 2320, 480 2504, 746 2342 C 962 2210, 1120 2264, 1290 2174 L1290 2796 L0 2796 Z" fill="#278866" opacity="0.28"/>
  <rect x="194" y="560" width="902" height="1840" rx="112" fill="#1f2c24" opacity="0.18"/>
  <rect x="224" y="526" width="842" height="1840" rx="104" fill="#fffdf2" stroke="#1f2c24" stroke-opacity="0.16" stroke-width="10"/>
  <rect x="284" y="604" width="722" height="1684" rx="42" fill="#ffffff" opacity="0.68"/>
</svg>
`;
  }
  return iconShell(key, label, releaseBoard(p));
}

function stickerSvg(key, label, kind, index) {
  return iconShell(key, label, symbolFor(key, kind, index));
}

function writeAsset(kind, key, label, index) {
  const folder = join(outDir, kind);
  mkdirSync(folder, { recursive: true });
  const filename = `${safeName(key)}.svg`;
  const svg =
    kind === "tiers" ? tierSvg(key, label, index) :
    kind === "portraits" ? portraitSvg(key, label, index) :
    kind === "mascots" ? mascotSvg(key, label, index) :
    kind === "release" ? releaseSvg(key, label, index) :
    stickerSvg(key, label, kind, index);
  writeFileSync(join(folder, filename), svg.replace(/[ \t]+$/gm, ""), "utf8");
  return { key, kind, filename };
}

const combinedSource = sourceFiles.map(readSource).join("\n");
const ids = captureAll(/\bid:\s*"([^"]+)"/g, combinedSource);
const icons = captureAll(/\bicon:\s*"([^"]+)"/g, combinedSource);
const tierIds = captureAll(/\bid:\s*"(yard|storehouse|onsen|bamboo_garden|golden_forest)"/g, readSource("config/ProgressionConfig.ts"));
const capybaraIds = captureAll(/\bid:\s*"([^"]+)"/g, readSource("config/StoryConfig.ts"));
const mascotStates = ["mascot-default", "mascot-happy", "mascot-sleepy", "mascot-eating", "mascot-celebrate"];
const releaseAssets = [
  "app-icon-draft",
  "splash-draft",
  "store-card-preview",
  "privacy-card-preview",
  "qa-screenshot-frame",
  "app-icon-rc2",
  "splash-rc2",
  "store-screenshot-frame-rc2",
  "main-hero-final",
  "prestige-ritual-final",
  "shop-reward-banner-final",
  "offline-return-final",
  "store-key-visual-final",
  "app-icon-final",
  "splash-final",
  "store-screenshot-frame-final",
];

const rawAssetInputs = [
  ...unique(ids).map((key) => ({ key, label: key.replace(/_/g, " "), kind: "items" })),
  ...unique(icons).map((key) => ({ key, label: key.replace(/_/g, " "), kind: "icons" })),
  ...unique(tierIds).map((key) => ({ key: `tier-${key}`, label: key.replace(/_/g, " "), kind: "tiers" })),
  ...unique(capybaraIds).map((key) => ({ key: `capybara-${key}`, label: key.replace(/_/g, " "), kind: "portraits" })),
  ...mascotStates.map((key) => ({ key, label: key.replace(/-/g, " "), kind: "mascots" })),
  ...releaseAssets.map((key) => ({ key, label: key.replace(/-/g, " "), kind: "release" })),
];
const assetInputs = [...new Map(rawAssetInputs.map((item) => [`${item.kind}:${item.key}`, item])).values()];

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
const written = assetInputs.map((item, index) => writeAsset(item.kind, item.key, item.label, index));

const registryAssets = [...written.reduce((assets, asset) => {
  if (!assets.has(asset.key)) assets.set(asset.key, asset);
  return assets;
}, new Map()).values()];

const registryEntries = registryAssets
  .sort((a, b) => a.key.localeCompare(b.key))
  .map((asset) => `  ${JSON.stringify(asset.key)}: new URL("./${asset.kind}/${asset.filename}", import.meta.url).href,`)
  .join("\n");

writeFileSync(
  join(outDir, "GeneratedAssetRegistry.ts"),
  `export const GeneratedAssetRegistry: Record<string, string> = {\n${registryEntries}\n};\n\nexport function getGeneratedAsset(key: string) {\n  return GeneratedAssetRegistry[key] ?? null;\n}\n`,
  "utf8",
);

console.info(`generated ${written.length} handcrafted visual assets in ${outDir}`);
