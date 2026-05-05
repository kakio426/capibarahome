import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { GeneratedAssetRegistry } from "../../assets/generated/GeneratedAssetRegistry";

const expectedAssetKeys = [
  "ad_festival",
  "afternoon",
  "album",
  "all_yard_core",
  "app-icon-draft",
  "bamboo",
  "bamboo_1m",
  "bamboo_5m",
  "bamboo_cart",
  "bamboo_cart_first",
  "bamboo_cart_track",
  "bamboo_eps_100k",
  "bamboo_festival_clap",
  "bamboo_garden",
  "bamboo_gate",
  "bamboo_lantern",
  "bamboo_open",
  "bamboo_toolbox",
  "bamboo_total_levels",
  "bamboo_touch",
  "bamboo_wind_bridge",
  "basket",
  "basket_1",
  "basket_25",
  "biro",
  "butler_gloves",
  "butler_hand",
  "butler_toolbox",
  "capybara-biro",
  "capybara-dami",
  "capybara-hanul",
  "capybara-momo",
  "capybara-narin",
  "capybara-podo",
  "capybara-ruru",
  "capybara-soda",
  "cart_stop",
  "cart_stop_flag",
  "chime",
  "citrus_recipe",
  "clap",
  "collection",
  "compost",
  "compost_greenhouse",
  "crate",
  "crate_lane",
  "dami",
  "eps_10",
  "eps_100k",
  "eps_1k",
  "eps_1m",
  "facility_suite",
  "festival",
  "festival_clap",
  "festival_ribbon",
  "first_100_oranges",
  "first_1k_oranges",
  "first_leaf",
  "first_leaf_plaque",
  "first_orange",
  "first_prestige",
  "five_leaf",
  "fragrance_shelf",
  "fragrance_storehouse",
  "fragrant_25k",
  "generator_suite_120",
  "generator_suite_20",
  "gift",
  "glove",
  "gold_path",
  "gold_path_first",
  "golden_25m",
  "golden_compost",
  "golden_first_prestige",
  "golden_five_leaves",
  "golden_forest",
  "golden_forest_arch",
  "golden_forest_path",
  "golden_leaf_path",
  "golden_leaf_polish",
  "golden_memory_gate",
  "golden_memory_touch",
  "golden_observatory",
  "golden_open",
  "hanul",
  "home",
  "hundred_taps",
  "key",
  "lantern",
  "late_game_marker",
  "leaf",
  "leaf_5",
  "leaf_compost_house",
  "leaf_polish",
  "mascot-celebrate",
  "mascot-default",
  "mascot-eating",
  "mascot-happy",
  "mascot-sleepy",
  "mat",
  "memory",
  "memory_butler",
  "memory_gate",
  "memory_gate_halo",
  "memory_touch_first",
  "metronome",
  "mineral_stream",
  "momo",
  "moon_observatory",
  "moon_orange_observatory",
  "nap_mat",
  "nap_mat_set",
  "narin",
  "observatory",
  "onsen",
  "onsen_300k",
  "onsen_75k",
  "onsen_eps_1k",
  "onsen_first",
  "onsen_mist",
  "onsen_open",
  "onsen_snack_counter",
  "onsen_snack_recipe",
  "onsen_towel_rack",
  "onsen_towel_touch",
  "onsen_warm_pond",
  "orange",
  "orange_1k",
  "orange_basket",
  "orange_basket_corner",
  "orange_lantern_road",
  "orange_lanterns",
  "orange_spoon",
  "parasol",
  "paw",
  "paw_10",
  "podo",
  "pond",
  "prestige",
  "prestige_3",
  "privacy-card-preview",
  "qa-screenshot-frame",
  "recipe",
  "release",
  "release_ad_festival",
  "release_album_basket",
  "release_album_first",
  "release_export_ready",
  "release_shop_gift",
  "release_stamp_board",
  "ruru",
  "sandbox_gift",
  "sandbox_shelf",
  "schedule",
  "season_memory_gate",
  "settings",
  "shade_parasol",
  "shelf",
  "shop",
  "snack",
  "snack_counter",
  "snack_counter_table",
  "soda",
  "soft_paw",
  "soft_paw_1",
  "soft_paw_10",
  "soft_paw_stamp",
  "sorting_rhythm",
  "sorting_table",
  "splash-draft",
  "spoon",
  "steam",
  "steam_towel",
  "steam_towel_rack",
  "store-card-preview",
  "storehouse",
  "storehouse_25k",
  "storehouse_5k",
  "storehouse_cart_stop",
  "storehouse_crate_line",
  "storehouse_first",
  "storehouse_fragrance",
  "storehouse_open",
  "storehouse_rhythm",
  "storehouse_sign",
  "storehouse_sorting_table",
  "storehouse_total_levels",
  "stream",
  "sun",
  "sunny_yard",
  "table",
  "tap",
  "tap_100",
  "tap_1000",
  "tap_suite",
  "tap_suite_100",
  "tap_suite_20",
  "ten_taps",
  "third_prestige",
  "thousand_taps",
  "tier-bamboo_garden",
  "tier-golden_forest",
  "tier-onsen",
  "tier-storehouse",
  "tier-yard",
  "tiny_watering_path",
  "toolbox",
  "toolbox_first",
  "towel",
  "towel_rack_corner",
  "upgrades",
  "warm_pond",
  "warm_pond_stones",
  "warm_towel",
  "water_path",
  "watering_rill",
  "welcome_first_basket",
  "welcome_first_orange",
  "welcome_soft_paw",
  "welcome_steady_ten",
  "wind_chime_bridge",
  "wooden_crate_line",
  "yard",
  "yard_first_100",
  "yard_nap_mat",
  "yard_one_thousand",
  "yard_parasol",
  "yard_set",
  "yard_spoon",
  "yard_tap_100",
  "yard_water_path",
] as const;

describe("generated visual asset registry matrix", () => {
  it("keeps the generated registry size release-scale", () => {
    expect(expectedAssetKeys.length).toBeGreaterThanOrEqual(220);
    expect(Object.keys(GeneratedAssetRegistry).length).toBeGreaterThanOrEqual(expectedAssetKeys.length);
  });

  it("validates generated SVG asset ad_festival", () => {
    const href = GeneratedAssetRegistry["ad_festival"];
    expect(href, "ad_festival").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "ad_festival").toBe(true);
    expect(body, "ad_festival").toContain("aria-label");
    expect(body.length, "ad_festival").toBeGreaterThan(10_000);
    expect(body, "ad_festival").toContain("</svg>");
  });

  it("validates generated SVG asset afternoon", () => {
    const href = GeneratedAssetRegistry["afternoon"];
    expect(href, "afternoon").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "afternoon").toBe(true);
    expect(body, "afternoon").toContain("aria-label");
    expect(body.length, "afternoon").toBeGreaterThan(10_000);
    expect(body, "afternoon").toContain("</svg>");
  });

  it("validates generated SVG asset album", () => {
    const href = GeneratedAssetRegistry["album"];
    expect(href, "album").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "album").toBe(true);
    expect(body, "album").toContain("aria-label");
    expect(body.length, "album").toBeGreaterThan(10_000);
    expect(body, "album").toContain("</svg>");
  });

  it("validates generated SVG asset all_yard_core", () => {
    const href = GeneratedAssetRegistry["all_yard_core"];
    expect(href, "all_yard_core").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "all_yard_core").toBe(true);
    expect(body, "all_yard_core").toContain("aria-label");
    expect(body.length, "all_yard_core").toBeGreaterThan(10_000);
    expect(body, "all_yard_core").toContain("</svg>");
  });

  it("validates generated SVG asset app-icon-draft", () => {
    const href = GeneratedAssetRegistry["app-icon-draft"];
    expect(href, "app-icon-draft").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "app-icon-draft").toBe(true);
    expect(body, "app-icon-draft").toContain("aria-label");
    expect(body.length, "app-icon-draft").toBeGreaterThan(10_000);
    expect(body, "app-icon-draft").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo", () => {
    const href = GeneratedAssetRegistry["bamboo"];
    expect(href, "bamboo").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo").toBe(true);
    expect(body, "bamboo").toContain("aria-label");
    expect(body.length, "bamboo").toBeGreaterThan(10_000);
    expect(body, "bamboo").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_1m", () => {
    const href = GeneratedAssetRegistry["bamboo_1m"];
    expect(href, "bamboo_1m").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_1m").toBe(true);
    expect(body, "bamboo_1m").toContain("aria-label");
    expect(body.length, "bamboo_1m").toBeGreaterThan(10_000);
    expect(body, "bamboo_1m").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_5m", () => {
    const href = GeneratedAssetRegistry["bamboo_5m"];
    expect(href, "bamboo_5m").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_5m").toBe(true);
    expect(body, "bamboo_5m").toContain("aria-label");
    expect(body.length, "bamboo_5m").toBeGreaterThan(10_000);
    expect(body, "bamboo_5m").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_cart", () => {
    const href = GeneratedAssetRegistry["bamboo_cart"];
    expect(href, "bamboo_cart").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_cart").toBe(true);
    expect(body, "bamboo_cart").toContain("aria-label");
    expect(body.length, "bamboo_cart").toBeGreaterThan(10_000);
    expect(body, "bamboo_cart").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_cart_first", () => {
    const href = GeneratedAssetRegistry["bamboo_cart_first"];
    expect(href, "bamboo_cart_first").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_cart_first").toBe(true);
    expect(body, "bamboo_cart_first").toContain("aria-label");
    expect(body.length, "bamboo_cart_first").toBeGreaterThan(10_000);
    expect(body, "bamboo_cart_first").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_cart_track", () => {
    const href = GeneratedAssetRegistry["bamboo_cart_track"];
    expect(href, "bamboo_cart_track").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_cart_track").toBe(true);
    expect(body, "bamboo_cart_track").toContain("aria-label");
    expect(body.length, "bamboo_cart_track").toBeGreaterThan(10_000);
    expect(body, "bamboo_cart_track").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_eps_100k", () => {
    const href = GeneratedAssetRegistry["bamboo_eps_100k"];
    expect(href, "bamboo_eps_100k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_eps_100k").toBe(true);
    expect(body, "bamboo_eps_100k").toContain("aria-label");
    expect(body.length, "bamboo_eps_100k").toBeGreaterThan(10_000);
    expect(body, "bamboo_eps_100k").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_festival_clap", () => {
    const href = GeneratedAssetRegistry["bamboo_festival_clap"];
    expect(href, "bamboo_festival_clap").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_festival_clap").toBe(true);
    expect(body, "bamboo_festival_clap").toContain("aria-label");
    expect(body.length, "bamboo_festival_clap").toBeGreaterThan(10_000);
    expect(body, "bamboo_festival_clap").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_garden", () => {
    const href = GeneratedAssetRegistry["bamboo_garden"];
    expect(href, "bamboo_garden").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_garden").toBe(true);
    expect(body, "bamboo_garden").toContain("aria-label");
    expect(body.length, "bamboo_garden").toBeGreaterThan(10_000);
    expect(body, "bamboo_garden").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_gate", () => {
    const href = GeneratedAssetRegistry["bamboo_gate"];
    expect(href, "bamboo_gate").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_gate").toBe(true);
    expect(body, "bamboo_gate").toContain("aria-label");
    expect(body.length, "bamboo_gate").toBeGreaterThan(10_000);
    expect(body, "bamboo_gate").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_lantern", () => {
    const href = GeneratedAssetRegistry["bamboo_lantern"];
    expect(href, "bamboo_lantern").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_lantern").toBe(true);
    expect(body, "bamboo_lantern").toContain("aria-label");
    expect(body.length, "bamboo_lantern").toBeGreaterThan(10_000);
    expect(body, "bamboo_lantern").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_open", () => {
    const href = GeneratedAssetRegistry["bamboo_open"];
    expect(href, "bamboo_open").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_open").toBe(true);
    expect(body, "bamboo_open").toContain("aria-label");
    expect(body.length, "bamboo_open").toBeGreaterThan(10_000);
    expect(body, "bamboo_open").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_toolbox", () => {
    const href = GeneratedAssetRegistry["bamboo_toolbox"];
    expect(href, "bamboo_toolbox").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_toolbox").toBe(true);
    expect(body, "bamboo_toolbox").toContain("aria-label");
    expect(body.length, "bamboo_toolbox").toBeGreaterThan(10_000);
    expect(body, "bamboo_toolbox").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_total_levels", () => {
    const href = GeneratedAssetRegistry["bamboo_total_levels"];
    expect(href, "bamboo_total_levels").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_total_levels").toBe(true);
    expect(body, "bamboo_total_levels").toContain("aria-label");
    expect(body.length, "bamboo_total_levels").toBeGreaterThan(10_000);
    expect(body, "bamboo_total_levels").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_touch", () => {
    const href = GeneratedAssetRegistry["bamboo_touch"];
    expect(href, "bamboo_touch").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_touch").toBe(true);
    expect(body, "bamboo_touch").toContain("aria-label");
    expect(body.length, "bamboo_touch").toBeGreaterThan(10_000);
    expect(body, "bamboo_touch").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_wind_bridge", () => {
    const href = GeneratedAssetRegistry["bamboo_wind_bridge"];
    expect(href, "bamboo_wind_bridge").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_wind_bridge").toBe(true);
    expect(body, "bamboo_wind_bridge").toContain("aria-label");
    expect(body.length, "bamboo_wind_bridge").toBeGreaterThan(10_000);
    expect(body, "bamboo_wind_bridge").toContain("</svg>");
  });

  it("validates generated SVG asset basket", () => {
    const href = GeneratedAssetRegistry["basket"];
    expect(href, "basket").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "basket").toBe(true);
    expect(body, "basket").toContain("aria-label");
    expect(body.length, "basket").toBeGreaterThan(10_000);
    expect(body, "basket").toContain("</svg>");
  });

  it("validates generated SVG asset basket_1", () => {
    const href = GeneratedAssetRegistry["basket_1"];
    expect(href, "basket_1").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "basket_1").toBe(true);
    expect(body, "basket_1").toContain("aria-label");
    expect(body.length, "basket_1").toBeGreaterThan(10_000);
    expect(body, "basket_1").toContain("</svg>");
  });

  it("validates generated SVG asset basket_25", () => {
    const href = GeneratedAssetRegistry["basket_25"];
    expect(href, "basket_25").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "basket_25").toBe(true);
    expect(body, "basket_25").toContain("aria-label");
    expect(body.length, "basket_25").toBeGreaterThan(10_000);
    expect(body, "basket_25").toContain("</svg>");
  });

  it("validates generated SVG asset biro", () => {
    const href = GeneratedAssetRegistry["biro"];
    expect(href, "biro").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "biro").toBe(true);
    expect(body, "biro").toContain("aria-label");
    expect(body.length, "biro").toBeGreaterThan(10_000);
    expect(body, "biro").toContain("</svg>");
  });

  it("validates generated SVG asset butler_gloves", () => {
    const href = GeneratedAssetRegistry["butler_gloves"];
    expect(href, "butler_gloves").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "butler_gloves").toBe(true);
    expect(body, "butler_gloves").toContain("aria-label");
    expect(body.length, "butler_gloves").toBeGreaterThan(10_000);
    expect(body, "butler_gloves").toContain("</svg>");
  });

  it("validates generated SVG asset butler_hand", () => {
    const href = GeneratedAssetRegistry["butler_hand"];
    expect(href, "butler_hand").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "butler_hand").toBe(true);
    expect(body, "butler_hand").toContain("aria-label");
    expect(body.length, "butler_hand").toBeGreaterThan(10_000);
    expect(body, "butler_hand").toContain("</svg>");
  });

  it("validates generated SVG asset butler_toolbox", () => {
    const href = GeneratedAssetRegistry["butler_toolbox"];
    expect(href, "butler_toolbox").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "butler_toolbox").toBe(true);
    expect(body, "butler_toolbox").toContain("aria-label");
    expect(body.length, "butler_toolbox").toBeGreaterThan(10_000);
    expect(body, "butler_toolbox").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-biro", () => {
    const href = GeneratedAssetRegistry["capybara-biro"];
    expect(href, "capybara-biro").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-biro").toBe(true);
    expect(body, "capybara-biro").toContain("aria-label");
    expect(body.length, "capybara-biro").toBeGreaterThan(10_000);
    expect(body, "capybara-biro").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-dami", () => {
    const href = GeneratedAssetRegistry["capybara-dami"];
    expect(href, "capybara-dami").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-dami").toBe(true);
    expect(body, "capybara-dami").toContain("aria-label");
    expect(body.length, "capybara-dami").toBeGreaterThan(10_000);
    expect(body, "capybara-dami").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-hanul", () => {
    const href = GeneratedAssetRegistry["capybara-hanul"];
    expect(href, "capybara-hanul").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-hanul").toBe(true);
    expect(body, "capybara-hanul").toContain("aria-label");
    expect(body.length, "capybara-hanul").toBeGreaterThan(10_000);
    expect(body, "capybara-hanul").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-momo", () => {
    const href = GeneratedAssetRegistry["capybara-momo"];
    expect(href, "capybara-momo").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-momo").toBe(true);
    expect(body, "capybara-momo").toContain("aria-label");
    expect(body.length, "capybara-momo").toBeGreaterThan(10_000);
    expect(body, "capybara-momo").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-narin", () => {
    const href = GeneratedAssetRegistry["capybara-narin"];
    expect(href, "capybara-narin").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-narin").toBe(true);
    expect(body, "capybara-narin").toContain("aria-label");
    expect(body.length, "capybara-narin").toBeGreaterThan(10_000);
    expect(body, "capybara-narin").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-podo", () => {
    const href = GeneratedAssetRegistry["capybara-podo"];
    expect(href, "capybara-podo").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-podo").toBe(true);
    expect(body, "capybara-podo").toContain("aria-label");
    expect(body.length, "capybara-podo").toBeGreaterThan(10_000);
    expect(body, "capybara-podo").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-ruru", () => {
    const href = GeneratedAssetRegistry["capybara-ruru"];
    expect(href, "capybara-ruru").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-ruru").toBe(true);
    expect(body, "capybara-ruru").toContain("aria-label");
    expect(body.length, "capybara-ruru").toBeGreaterThan(10_000);
    expect(body, "capybara-ruru").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-soda", () => {
    const href = GeneratedAssetRegistry["capybara-soda"];
    expect(href, "capybara-soda").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-soda").toBe(true);
    expect(body, "capybara-soda").toContain("aria-label");
    expect(body.length, "capybara-soda").toBeGreaterThan(10_000);
    expect(body, "capybara-soda").toContain("</svg>");
  });

  it("validates generated SVG asset cart_stop", () => {
    const href = GeneratedAssetRegistry["cart_stop"];
    expect(href, "cart_stop").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "cart_stop").toBe(true);
    expect(body, "cart_stop").toContain("aria-label");
    expect(body.length, "cart_stop").toBeGreaterThan(10_000);
    expect(body, "cart_stop").toContain("</svg>");
  });

  it("validates generated SVG asset cart_stop_flag", () => {
    const href = GeneratedAssetRegistry["cart_stop_flag"];
    expect(href, "cart_stop_flag").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "cart_stop_flag").toBe(true);
    expect(body, "cart_stop_flag").toContain("aria-label");
    expect(body.length, "cart_stop_flag").toBeGreaterThan(10_000);
    expect(body, "cart_stop_flag").toContain("</svg>");
  });

  it("validates generated SVG asset chime", () => {
    const href = GeneratedAssetRegistry["chime"];
    expect(href, "chime").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "chime").toBe(true);
    expect(body, "chime").toContain("aria-label");
    expect(body.length, "chime").toBeGreaterThan(10_000);
    expect(body, "chime").toContain("</svg>");
  });

  it("validates generated SVG asset citrus_recipe", () => {
    const href = GeneratedAssetRegistry["citrus_recipe"];
    expect(href, "citrus_recipe").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "citrus_recipe").toBe(true);
    expect(body, "citrus_recipe").toContain("aria-label");
    expect(body.length, "citrus_recipe").toBeGreaterThan(10_000);
    expect(body, "citrus_recipe").toContain("</svg>");
  });

  it("validates generated SVG asset clap", () => {
    const href = GeneratedAssetRegistry["clap"];
    expect(href, "clap").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "clap").toBe(true);
    expect(body, "clap").toContain("aria-label");
    expect(body.length, "clap").toBeGreaterThan(10_000);
    expect(body, "clap").toContain("</svg>");
  });

  it("validates generated SVG asset collection", () => {
    const href = GeneratedAssetRegistry["collection"];
    expect(href, "collection").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "collection").toBe(true);
    expect(body, "collection").toContain("aria-label");
    expect(body.length, "collection").toBeGreaterThan(10_000);
    expect(body, "collection").toContain("</svg>");
  });

  it("validates generated SVG asset compost", () => {
    const href = GeneratedAssetRegistry["compost"];
    expect(href, "compost").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "compost").toBe(true);
    expect(body, "compost").toContain("aria-label");
    expect(body.length, "compost").toBeGreaterThan(10_000);
    expect(body, "compost").toContain("</svg>");
  });

  it("validates generated SVG asset compost_greenhouse", () => {
    const href = GeneratedAssetRegistry["compost_greenhouse"];
    expect(href, "compost_greenhouse").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "compost_greenhouse").toBe(true);
    expect(body, "compost_greenhouse").toContain("aria-label");
    expect(body.length, "compost_greenhouse").toBeGreaterThan(10_000);
    expect(body, "compost_greenhouse").toContain("</svg>");
  });

  it("validates generated SVG asset crate", () => {
    const href = GeneratedAssetRegistry["crate"];
    expect(href, "crate").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "crate").toBe(true);
    expect(body, "crate").toContain("aria-label");
    expect(body.length, "crate").toBeGreaterThan(10_000);
    expect(body, "crate").toContain("</svg>");
  });

  it("validates generated SVG asset crate_lane", () => {
    const href = GeneratedAssetRegistry["crate_lane"];
    expect(href, "crate_lane").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "crate_lane").toBe(true);
    expect(body, "crate_lane").toContain("aria-label");
    expect(body.length, "crate_lane").toBeGreaterThan(10_000);
    expect(body, "crate_lane").toContain("</svg>");
  });

  it("validates generated SVG asset dami", () => {
    const href = GeneratedAssetRegistry["dami"];
    expect(href, "dami").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "dami").toBe(true);
    expect(body, "dami").toContain("aria-label");
    expect(body.length, "dami").toBeGreaterThan(10_000);
    expect(body, "dami").toContain("</svg>");
  });

  it("validates generated SVG asset eps_10", () => {
    const href = GeneratedAssetRegistry["eps_10"];
    expect(href, "eps_10").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "eps_10").toBe(true);
    expect(body, "eps_10").toContain("aria-label");
    expect(body.length, "eps_10").toBeGreaterThan(10_000);
    expect(body, "eps_10").toContain("</svg>");
  });

  it("validates generated SVG asset eps_100k", () => {
    const href = GeneratedAssetRegistry["eps_100k"];
    expect(href, "eps_100k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "eps_100k").toBe(true);
    expect(body, "eps_100k").toContain("aria-label");
    expect(body.length, "eps_100k").toBeGreaterThan(10_000);
    expect(body, "eps_100k").toContain("</svg>");
  });

  it("validates generated SVG asset eps_1k", () => {
    const href = GeneratedAssetRegistry["eps_1k"];
    expect(href, "eps_1k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "eps_1k").toBe(true);
    expect(body, "eps_1k").toContain("aria-label");
    expect(body.length, "eps_1k").toBeGreaterThan(10_000);
    expect(body, "eps_1k").toContain("</svg>");
  });

  it("validates generated SVG asset eps_1m", () => {
    const href = GeneratedAssetRegistry["eps_1m"];
    expect(href, "eps_1m").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "eps_1m").toBe(true);
    expect(body, "eps_1m").toContain("aria-label");
    expect(body.length, "eps_1m").toBeGreaterThan(10_000);
    expect(body, "eps_1m").toContain("</svg>");
  });

  it("validates generated SVG asset facility_suite", () => {
    const href = GeneratedAssetRegistry["facility_suite"];
    expect(href, "facility_suite").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "facility_suite").toBe(true);
    expect(body, "facility_suite").toContain("aria-label");
    expect(body.length, "facility_suite").toBeGreaterThan(10_000);
    expect(body, "facility_suite").toContain("</svg>");
  });

  it("validates generated SVG asset festival", () => {
    const href = GeneratedAssetRegistry["festival"];
    expect(href, "festival").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "festival").toBe(true);
    expect(body, "festival").toContain("aria-label");
    expect(body.length, "festival").toBeGreaterThan(10_000);
    expect(body, "festival").toContain("</svg>");
  });

  it("validates generated SVG asset festival_clap", () => {
    const href = GeneratedAssetRegistry["festival_clap"];
    expect(href, "festival_clap").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "festival_clap").toBe(true);
    expect(body, "festival_clap").toContain("aria-label");
    expect(body.length, "festival_clap").toBeGreaterThan(10_000);
    expect(body, "festival_clap").toContain("</svg>");
  });

  it("validates generated SVG asset festival_ribbon", () => {
    const href = GeneratedAssetRegistry["festival_ribbon"];
    expect(href, "festival_ribbon").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "festival_ribbon").toBe(true);
    expect(body, "festival_ribbon").toContain("aria-label");
    expect(body.length, "festival_ribbon").toBeGreaterThan(10_000);
    expect(body, "festival_ribbon").toContain("</svg>");
  });

  it("validates generated SVG asset first_100_oranges", () => {
    const href = GeneratedAssetRegistry["first_100_oranges"];
    expect(href, "first_100_oranges").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "first_100_oranges").toBe(true);
    expect(body, "first_100_oranges").toContain("aria-label");
    expect(body.length, "first_100_oranges").toBeGreaterThan(10_000);
    expect(body, "first_100_oranges").toContain("</svg>");
  });

  it("validates generated SVG asset first_1k_oranges", () => {
    const href = GeneratedAssetRegistry["first_1k_oranges"];
    expect(href, "first_1k_oranges").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "first_1k_oranges").toBe(true);
    expect(body, "first_1k_oranges").toContain("aria-label");
    expect(body.length, "first_1k_oranges").toBeGreaterThan(10_000);
    expect(body, "first_1k_oranges").toContain("</svg>");
  });

  it("validates generated SVG asset first_leaf", () => {
    const href = GeneratedAssetRegistry["first_leaf"];
    expect(href, "first_leaf").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "first_leaf").toBe(true);
    expect(body, "first_leaf").toContain("aria-label");
    expect(body.length, "first_leaf").toBeGreaterThan(10_000);
    expect(body, "first_leaf").toContain("</svg>");
  });

  it("validates generated SVG asset first_leaf_plaque", () => {
    const href = GeneratedAssetRegistry["first_leaf_plaque"];
    expect(href, "first_leaf_plaque").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "first_leaf_plaque").toBe(true);
    expect(body, "first_leaf_plaque").toContain("aria-label");
    expect(body.length, "first_leaf_plaque").toBeGreaterThan(10_000);
    expect(body, "first_leaf_plaque").toContain("</svg>");
  });

  it("validates generated SVG asset first_orange", () => {
    const href = GeneratedAssetRegistry["first_orange"];
    expect(href, "first_orange").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "first_orange").toBe(true);
    expect(body, "first_orange").toContain("aria-label");
    expect(body.length, "first_orange").toBeGreaterThan(10_000);
    expect(body, "first_orange").toContain("</svg>");
  });

  it("validates generated SVG asset first_prestige", () => {
    const href = GeneratedAssetRegistry["first_prestige"];
    expect(href, "first_prestige").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "first_prestige").toBe(true);
    expect(body, "first_prestige").toContain("aria-label");
    expect(body.length, "first_prestige").toBeGreaterThan(10_000);
    expect(body, "first_prestige").toContain("</svg>");
  });

  it("validates generated SVG asset five_leaf", () => {
    const href = GeneratedAssetRegistry["five_leaf"];
    expect(href, "five_leaf").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "five_leaf").toBe(true);
    expect(body, "five_leaf").toContain("aria-label");
    expect(body.length, "five_leaf").toBeGreaterThan(10_000);
    expect(body, "five_leaf").toContain("</svg>");
  });

  it("validates generated SVG asset fragrance_shelf", () => {
    const href = GeneratedAssetRegistry["fragrance_shelf"];
    expect(href, "fragrance_shelf").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "fragrance_shelf").toBe(true);
    expect(body, "fragrance_shelf").toContain("aria-label");
    expect(body.length, "fragrance_shelf").toBeGreaterThan(10_000);
    expect(body, "fragrance_shelf").toContain("</svg>");
  });

  it("validates generated SVG asset fragrance_storehouse", () => {
    const href = GeneratedAssetRegistry["fragrance_storehouse"];
    expect(href, "fragrance_storehouse").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "fragrance_storehouse").toBe(true);
    expect(body, "fragrance_storehouse").toContain("aria-label");
    expect(body.length, "fragrance_storehouse").toBeGreaterThan(10_000);
    expect(body, "fragrance_storehouse").toContain("</svg>");
  });

  it("validates generated SVG asset fragrant_25k", () => {
    const href = GeneratedAssetRegistry["fragrant_25k"];
    expect(href, "fragrant_25k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "fragrant_25k").toBe(true);
    expect(body, "fragrant_25k").toContain("aria-label");
    expect(body.length, "fragrant_25k").toBeGreaterThan(10_000);
    expect(body, "fragrant_25k").toContain("</svg>");
  });

  it("validates generated SVG asset generator_suite_120", () => {
    const href = GeneratedAssetRegistry["generator_suite_120"];
    expect(href, "generator_suite_120").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "generator_suite_120").toBe(true);
    expect(body, "generator_suite_120").toContain("aria-label");
    expect(body.length, "generator_suite_120").toBeGreaterThan(10_000);
    expect(body, "generator_suite_120").toContain("</svg>");
  });

  it("validates generated SVG asset generator_suite_20", () => {
    const href = GeneratedAssetRegistry["generator_suite_20"];
    expect(href, "generator_suite_20").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "generator_suite_20").toBe(true);
    expect(body, "generator_suite_20").toContain("aria-label");
    expect(body.length, "generator_suite_20").toBeGreaterThan(10_000);
    expect(body, "generator_suite_20").toContain("</svg>");
  });

  it("validates generated SVG asset gift", () => {
    const href = GeneratedAssetRegistry["gift"];
    expect(href, "gift").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "gift").toBe(true);
    expect(body, "gift").toContain("aria-label");
    expect(body.length, "gift").toBeGreaterThan(10_000);
    expect(body, "gift").toContain("</svg>");
  });

  it("validates generated SVG asset glove", () => {
    const href = GeneratedAssetRegistry["glove"];
    expect(href, "glove").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "glove").toBe(true);
    expect(body, "glove").toContain("aria-label");
    expect(body.length, "glove").toBeGreaterThan(10_000);
    expect(body, "glove").toContain("</svg>");
  });

  it("validates generated SVG asset gold_path", () => {
    const href = GeneratedAssetRegistry["gold_path"];
    expect(href, "gold_path").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "gold_path").toBe(true);
    expect(body, "gold_path").toContain("aria-label");
    expect(body.length, "gold_path").toBeGreaterThan(10_000);
    expect(body, "gold_path").toContain("</svg>");
  });

  it("validates generated SVG asset gold_path_first", () => {
    const href = GeneratedAssetRegistry["gold_path_first"];
    expect(href, "gold_path_first").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "gold_path_first").toBe(true);
    expect(body, "gold_path_first").toContain("aria-label");
    expect(body.length, "gold_path_first").toBeGreaterThan(10_000);
    expect(body, "gold_path_first").toContain("</svg>");
  });

  it("validates generated SVG asset golden_25m", () => {
    const href = GeneratedAssetRegistry["golden_25m"];
    expect(href, "golden_25m").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_25m").toBe(true);
    expect(body, "golden_25m").toContain("aria-label");
    expect(body.length, "golden_25m").toBeGreaterThan(10_000);
    expect(body, "golden_25m").toContain("</svg>");
  });

  it("validates generated SVG asset golden_compost", () => {
    const href = GeneratedAssetRegistry["golden_compost"];
    expect(href, "golden_compost").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_compost").toBe(true);
    expect(body, "golden_compost").toContain("aria-label");
    expect(body.length, "golden_compost").toBeGreaterThan(10_000);
    expect(body, "golden_compost").toContain("</svg>");
  });

  it("validates generated SVG asset golden_first_prestige", () => {
    const href = GeneratedAssetRegistry["golden_first_prestige"];
    expect(href, "golden_first_prestige").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_first_prestige").toBe(true);
    expect(body, "golden_first_prestige").toContain("aria-label");
    expect(body.length, "golden_first_prestige").toBeGreaterThan(10_000);
    expect(body, "golden_first_prestige").toContain("</svg>");
  });

  it("validates generated SVG asset golden_five_leaves", () => {
    const href = GeneratedAssetRegistry["golden_five_leaves"];
    expect(href, "golden_five_leaves").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_five_leaves").toBe(true);
    expect(body, "golden_five_leaves").toContain("aria-label");
    expect(body.length, "golden_five_leaves").toBeGreaterThan(10_000);
    expect(body, "golden_five_leaves").toContain("</svg>");
  });

  it("validates generated SVG asset golden_forest", () => {
    const href = GeneratedAssetRegistry["golden_forest"];
    expect(href, "golden_forest").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_forest").toBe(true);
    expect(body, "golden_forest").toContain("aria-label");
    expect(body.length, "golden_forest").toBeGreaterThan(10_000);
    expect(body, "golden_forest").toContain("</svg>");
  });

  it("validates generated SVG asset golden_forest_arch", () => {
    const href = GeneratedAssetRegistry["golden_forest_arch"];
    expect(href, "golden_forest_arch").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_forest_arch").toBe(true);
    expect(body, "golden_forest_arch").toContain("aria-label");
    expect(body.length, "golden_forest_arch").toBeGreaterThan(10_000);
    expect(body, "golden_forest_arch").toContain("</svg>");
  });

  it("validates generated SVG asset golden_forest_path", () => {
    const href = GeneratedAssetRegistry["golden_forest_path"];
    expect(href, "golden_forest_path").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_forest_path").toBe(true);
    expect(body, "golden_forest_path").toContain("aria-label");
    expect(body.length, "golden_forest_path").toBeGreaterThan(10_000);
    expect(body, "golden_forest_path").toContain("</svg>");
  });

  it("validates generated SVG asset golden_leaf_path", () => {
    const href = GeneratedAssetRegistry["golden_leaf_path"];
    expect(href, "golden_leaf_path").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_leaf_path").toBe(true);
    expect(body, "golden_leaf_path").toContain("aria-label");
    expect(body.length, "golden_leaf_path").toBeGreaterThan(10_000);
    expect(body, "golden_leaf_path").toContain("</svg>");
  });

  it("validates generated SVG asset golden_leaf_polish", () => {
    const href = GeneratedAssetRegistry["golden_leaf_polish"];
    expect(href, "golden_leaf_polish").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_leaf_polish").toBe(true);
    expect(body, "golden_leaf_polish").toContain("aria-label");
    expect(body.length, "golden_leaf_polish").toBeGreaterThan(10_000);
    expect(body, "golden_leaf_polish").toContain("</svg>");
  });

  it("validates generated SVG asset golden_memory_gate", () => {
    const href = GeneratedAssetRegistry["golden_memory_gate"];
    expect(href, "golden_memory_gate").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_memory_gate").toBe(true);
    expect(body, "golden_memory_gate").toContain("aria-label");
    expect(body.length, "golden_memory_gate").toBeGreaterThan(10_000);
    expect(body, "golden_memory_gate").toContain("</svg>");
  });

  it("validates generated SVG asset golden_memory_touch", () => {
    const href = GeneratedAssetRegistry["golden_memory_touch"];
    expect(href, "golden_memory_touch").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_memory_touch").toBe(true);
    expect(body, "golden_memory_touch").toContain("aria-label");
    expect(body.length, "golden_memory_touch").toBeGreaterThan(10_000);
    expect(body, "golden_memory_touch").toContain("</svg>");
  });

  it("validates generated SVG asset golden_observatory", () => {
    const href = GeneratedAssetRegistry["golden_observatory"];
    expect(href, "golden_observatory").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_observatory").toBe(true);
    expect(body, "golden_observatory").toContain("aria-label");
    expect(body.length, "golden_observatory").toBeGreaterThan(10_000);
    expect(body, "golden_observatory").toContain("</svg>");
  });

  it("validates generated SVG asset golden_open", () => {
    const href = GeneratedAssetRegistry["golden_open"];
    expect(href, "golden_open").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_open").toBe(true);
    expect(body, "golden_open").toContain("aria-label");
    expect(body.length, "golden_open").toBeGreaterThan(10_000);
    expect(body, "golden_open").toContain("</svg>");
  });

  it("validates generated SVG asset hanul", () => {
    const href = GeneratedAssetRegistry["hanul"];
    expect(href, "hanul").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "hanul").toBe(true);
    expect(body, "hanul").toContain("aria-label");
    expect(body.length, "hanul").toBeGreaterThan(10_000);
    expect(body, "hanul").toContain("</svg>");
  });

  it("validates generated SVG asset home", () => {
    const href = GeneratedAssetRegistry["home"];
    expect(href, "home").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "home").toBe(true);
    expect(body, "home").toContain("aria-label");
    expect(body.length, "home").toBeGreaterThan(10_000);
    expect(body, "home").toContain("</svg>");
  });

  it("validates generated SVG asset hundred_taps", () => {
    const href = GeneratedAssetRegistry["hundred_taps"];
    expect(href, "hundred_taps").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "hundred_taps").toBe(true);
    expect(body, "hundred_taps").toContain("aria-label");
    expect(body.length, "hundred_taps").toBeGreaterThan(10_000);
    expect(body, "hundred_taps").toContain("</svg>");
  });

  it("validates generated SVG asset key", () => {
    const href = GeneratedAssetRegistry["key"];
    expect(href, "key").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "key").toBe(true);
    expect(body, "key").toContain("aria-label");
    expect(body.length, "key").toBeGreaterThan(10_000);
    expect(body, "key").toContain("</svg>");
  });

  it("validates generated SVG asset lantern", () => {
    const href = GeneratedAssetRegistry["lantern"];
    expect(href, "lantern").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "lantern").toBe(true);
    expect(body, "lantern").toContain("aria-label");
    expect(body.length, "lantern").toBeGreaterThan(10_000);
    expect(body, "lantern").toContain("</svg>");
  });

  it("validates generated SVG asset late_game_marker", () => {
    const href = GeneratedAssetRegistry["late_game_marker"];
    expect(href, "late_game_marker").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "late_game_marker").toBe(true);
    expect(body, "late_game_marker").toContain("aria-label");
    expect(body.length, "late_game_marker").toBeGreaterThan(10_000);
    expect(body, "late_game_marker").toContain("</svg>");
  });

  it("validates generated SVG asset leaf", () => {
    const href = GeneratedAssetRegistry["leaf"];
    expect(href, "leaf").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "leaf").toBe(true);
    expect(body, "leaf").toContain("aria-label");
    expect(body.length, "leaf").toBeGreaterThan(10_000);
    expect(body, "leaf").toContain("</svg>");
  });

  it("validates generated SVG asset leaf_5", () => {
    const href = GeneratedAssetRegistry["leaf_5"];
    expect(href, "leaf_5").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "leaf_5").toBe(true);
    expect(body, "leaf_5").toContain("aria-label");
    expect(body.length, "leaf_5").toBeGreaterThan(10_000);
    expect(body, "leaf_5").toContain("</svg>");
  });

  it("validates generated SVG asset leaf_compost_house", () => {
    const href = GeneratedAssetRegistry["leaf_compost_house"];
    expect(href, "leaf_compost_house").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "leaf_compost_house").toBe(true);
    expect(body, "leaf_compost_house").toContain("aria-label");
    expect(body.length, "leaf_compost_house").toBeGreaterThan(10_000);
    expect(body, "leaf_compost_house").toContain("</svg>");
  });

  it("validates generated SVG asset leaf_polish", () => {
    const href = GeneratedAssetRegistry["leaf_polish"];
    expect(href, "leaf_polish").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "leaf_polish").toBe(true);
    expect(body, "leaf_polish").toContain("aria-label");
    expect(body.length, "leaf_polish").toBeGreaterThan(10_000);
    expect(body, "leaf_polish").toContain("</svg>");
  });

  it("validates generated SVG asset mascot-celebrate", () => {
    const href = GeneratedAssetRegistry["mascot-celebrate"];
    expect(href, "mascot-celebrate").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "mascot-celebrate").toBe(true);
    expect(body, "mascot-celebrate").toContain("aria-label");
    expect(body.length, "mascot-celebrate").toBeGreaterThan(10_000);
    expect(body, "mascot-celebrate").toContain("</svg>");
  });

  it("validates generated SVG asset mascot-default", () => {
    const href = GeneratedAssetRegistry["mascot-default"];
    expect(href, "mascot-default").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "mascot-default").toBe(true);
    expect(body, "mascot-default").toContain("aria-label");
    expect(body.length, "mascot-default").toBeGreaterThan(10_000);
    expect(body, "mascot-default").toContain("</svg>");
  });

  it("validates generated SVG asset mascot-eating", () => {
    const href = GeneratedAssetRegistry["mascot-eating"];
    expect(href, "mascot-eating").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "mascot-eating").toBe(true);
    expect(body, "mascot-eating").toContain("aria-label");
    expect(body.length, "mascot-eating").toBeGreaterThan(10_000);
    expect(body, "mascot-eating").toContain("</svg>");
  });

  it("validates generated SVG asset mascot-happy", () => {
    const href = GeneratedAssetRegistry["mascot-happy"];
    expect(href, "mascot-happy").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "mascot-happy").toBe(true);
    expect(body, "mascot-happy").toContain("aria-label");
    expect(body.length, "mascot-happy").toBeGreaterThan(10_000);
    expect(body, "mascot-happy").toContain("</svg>");
  });

  it("validates generated SVG asset mascot-sleepy", () => {
    const href = GeneratedAssetRegistry["mascot-sleepy"];
    expect(href, "mascot-sleepy").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "mascot-sleepy").toBe(true);
    expect(body, "mascot-sleepy").toContain("aria-label");
    expect(body.length, "mascot-sleepy").toBeGreaterThan(10_000);
    expect(body, "mascot-sleepy").toContain("</svg>");
  });

  it("validates generated SVG asset mat", () => {
    const href = GeneratedAssetRegistry["mat"];
    expect(href, "mat").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "mat").toBe(true);
    expect(body, "mat").toContain("aria-label");
    expect(body.length, "mat").toBeGreaterThan(10_000);
    expect(body, "mat").toContain("</svg>");
  });

  it("validates generated SVG asset memory", () => {
    const href = GeneratedAssetRegistry["memory"];
    expect(href, "memory").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "memory").toBe(true);
    expect(body, "memory").toContain("aria-label");
    expect(body.length, "memory").toBeGreaterThan(10_000);
    expect(body, "memory").toContain("</svg>");
  });

  it("validates generated SVG asset memory_butler", () => {
    const href = GeneratedAssetRegistry["memory_butler"];
    expect(href, "memory_butler").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "memory_butler").toBe(true);
    expect(body, "memory_butler").toContain("aria-label");
    expect(body.length, "memory_butler").toBeGreaterThan(10_000);
    expect(body, "memory_butler").toContain("</svg>");
  });

  it("validates generated SVG asset memory_gate", () => {
    const href = GeneratedAssetRegistry["memory_gate"];
    expect(href, "memory_gate").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "memory_gate").toBe(true);
    expect(body, "memory_gate").toContain("aria-label");
    expect(body.length, "memory_gate").toBeGreaterThan(10_000);
    expect(body, "memory_gate").toContain("</svg>");
  });

  it("validates generated SVG asset memory_gate_halo", () => {
    const href = GeneratedAssetRegistry["memory_gate_halo"];
    expect(href, "memory_gate_halo").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "memory_gate_halo").toBe(true);
    expect(body, "memory_gate_halo").toContain("aria-label");
    expect(body.length, "memory_gate_halo").toBeGreaterThan(10_000);
    expect(body, "memory_gate_halo").toContain("</svg>");
  });

  it("validates generated SVG asset memory_touch_first", () => {
    const href = GeneratedAssetRegistry["memory_touch_first"];
    expect(href, "memory_touch_first").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "memory_touch_first").toBe(true);
    expect(body, "memory_touch_first").toContain("aria-label");
    expect(body.length, "memory_touch_first").toBeGreaterThan(10_000);
    expect(body, "memory_touch_first").toContain("</svg>");
  });

  it("validates generated SVG asset metronome", () => {
    const href = GeneratedAssetRegistry["metronome"];
    expect(href, "metronome").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "metronome").toBe(true);
    expect(body, "metronome").toContain("aria-label");
    expect(body.length, "metronome").toBeGreaterThan(10_000);
    expect(body, "metronome").toContain("</svg>");
  });

  it("validates generated SVG asset mineral_stream", () => {
    const href = GeneratedAssetRegistry["mineral_stream"];
    expect(href, "mineral_stream").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "mineral_stream").toBe(true);
    expect(body, "mineral_stream").toContain("aria-label");
    expect(body.length, "mineral_stream").toBeGreaterThan(10_000);
    expect(body, "mineral_stream").toContain("</svg>");
  });

  it("validates generated SVG asset momo", () => {
    const href = GeneratedAssetRegistry["momo"];
    expect(href, "momo").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "momo").toBe(true);
    expect(body, "momo").toContain("aria-label");
    expect(body.length, "momo").toBeGreaterThan(10_000);
    expect(body, "momo").toContain("</svg>");
  });

  it("validates generated SVG asset moon_observatory", () => {
    const href = GeneratedAssetRegistry["moon_observatory"];
    expect(href, "moon_observatory").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "moon_observatory").toBe(true);
    expect(body, "moon_observatory").toContain("aria-label");
    expect(body.length, "moon_observatory").toBeGreaterThan(10_000);
    expect(body, "moon_observatory").toContain("</svg>");
  });

  it("validates generated SVG asset moon_orange_observatory", () => {
    const href = GeneratedAssetRegistry["moon_orange_observatory"];
    expect(href, "moon_orange_observatory").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "moon_orange_observatory").toBe(true);
    expect(body, "moon_orange_observatory").toContain("aria-label");
    expect(body.length, "moon_orange_observatory").toBeGreaterThan(10_000);
    expect(body, "moon_orange_observatory").toContain("</svg>");
  });

  it("validates generated SVG asset nap_mat", () => {
    const href = GeneratedAssetRegistry["nap_mat"];
    expect(href, "nap_mat").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "nap_mat").toBe(true);
    expect(body, "nap_mat").toContain("aria-label");
    expect(body.length, "nap_mat").toBeGreaterThan(10_000);
    expect(body, "nap_mat").toContain("</svg>");
  });

  it("validates generated SVG asset nap_mat_set", () => {
    const href = GeneratedAssetRegistry["nap_mat_set"];
    expect(href, "nap_mat_set").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "nap_mat_set").toBe(true);
    expect(body, "nap_mat_set").toContain("aria-label");
    expect(body.length, "nap_mat_set").toBeGreaterThan(10_000);
    expect(body, "nap_mat_set").toContain("</svg>");
  });

  it("validates generated SVG asset narin", () => {
    const href = GeneratedAssetRegistry["narin"];
    expect(href, "narin").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "narin").toBe(true);
    expect(body, "narin").toContain("aria-label");
    expect(body.length, "narin").toBeGreaterThan(10_000);
    expect(body, "narin").toContain("</svg>");
  });

  it("validates generated SVG asset observatory", () => {
    const href = GeneratedAssetRegistry["observatory"];
    expect(href, "observatory").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "observatory").toBe(true);
    expect(body, "observatory").toContain("aria-label");
    expect(body.length, "observatory").toBeGreaterThan(10_000);
    expect(body, "observatory").toContain("</svg>");
  });

  it("validates generated SVG asset onsen", () => {
    const href = GeneratedAssetRegistry["onsen"];
    expect(href, "onsen").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen").toBe(true);
    expect(body, "onsen").toContain("aria-label");
    expect(body.length, "onsen").toBeGreaterThan(10_000);
    expect(body, "onsen").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_300k", () => {
    const href = GeneratedAssetRegistry["onsen_300k"];
    expect(href, "onsen_300k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_300k").toBe(true);
    expect(body, "onsen_300k").toContain("aria-label");
    expect(body.length, "onsen_300k").toBeGreaterThan(10_000);
    expect(body, "onsen_300k").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_75k", () => {
    const href = GeneratedAssetRegistry["onsen_75k"];
    expect(href, "onsen_75k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_75k").toBe(true);
    expect(body, "onsen_75k").toContain("aria-label");
    expect(body.length, "onsen_75k").toBeGreaterThan(10_000);
    expect(body, "onsen_75k").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_eps_1k", () => {
    const href = GeneratedAssetRegistry["onsen_eps_1k"];
    expect(href, "onsen_eps_1k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_eps_1k").toBe(true);
    expect(body, "onsen_eps_1k").toContain("aria-label");
    expect(body.length, "onsen_eps_1k").toBeGreaterThan(10_000);
    expect(body, "onsen_eps_1k").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_first", () => {
    const href = GeneratedAssetRegistry["onsen_first"];
    expect(href, "onsen_first").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_first").toBe(true);
    expect(body, "onsen_first").toContain("aria-label");
    expect(body.length, "onsen_first").toBeGreaterThan(10_000);
    expect(body, "onsen_first").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_mist", () => {
    const href = GeneratedAssetRegistry["onsen_mist"];
    expect(href, "onsen_mist").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_mist").toBe(true);
    expect(body, "onsen_mist").toContain("aria-label");
    expect(body.length, "onsen_mist").toBeGreaterThan(10_000);
    expect(body, "onsen_mist").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_open", () => {
    const href = GeneratedAssetRegistry["onsen_open"];
    expect(href, "onsen_open").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_open").toBe(true);
    expect(body, "onsen_open").toContain("aria-label");
    expect(body.length, "onsen_open").toBeGreaterThan(10_000);
    expect(body, "onsen_open").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_snack_counter", () => {
    const href = GeneratedAssetRegistry["onsen_snack_counter"];
    expect(href, "onsen_snack_counter").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_snack_counter").toBe(true);
    expect(body, "onsen_snack_counter").toContain("aria-label");
    expect(body.length, "onsen_snack_counter").toBeGreaterThan(10_000);
    expect(body, "onsen_snack_counter").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_snack_recipe", () => {
    const href = GeneratedAssetRegistry["onsen_snack_recipe"];
    expect(href, "onsen_snack_recipe").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_snack_recipe").toBe(true);
    expect(body, "onsen_snack_recipe").toContain("aria-label");
    expect(body.length, "onsen_snack_recipe").toBeGreaterThan(10_000);
    expect(body, "onsen_snack_recipe").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_towel_rack", () => {
    const href = GeneratedAssetRegistry["onsen_towel_rack"];
    expect(href, "onsen_towel_rack").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_towel_rack").toBe(true);
    expect(body, "onsen_towel_rack").toContain("aria-label");
    expect(body.length, "onsen_towel_rack").toBeGreaterThan(10_000);
    expect(body, "onsen_towel_rack").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_towel_touch", () => {
    const href = GeneratedAssetRegistry["onsen_towel_touch"];
    expect(href, "onsen_towel_touch").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_towel_touch").toBe(true);
    expect(body, "onsen_towel_touch").toContain("aria-label");
    expect(body.length, "onsen_towel_touch").toBeGreaterThan(10_000);
    expect(body, "onsen_towel_touch").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_warm_pond", () => {
    const href = GeneratedAssetRegistry["onsen_warm_pond"];
    expect(href, "onsen_warm_pond").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_warm_pond").toBe(true);
    expect(body, "onsen_warm_pond").toContain("aria-label");
    expect(body.length, "onsen_warm_pond").toBeGreaterThan(10_000);
    expect(body, "onsen_warm_pond").toContain("</svg>");
  });

  it("validates generated SVG asset orange", () => {
    const href = GeneratedAssetRegistry["orange"];
    expect(href, "orange").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "orange").toBe(true);
    expect(body, "orange").toContain("aria-label");
    expect(body.length, "orange").toBeGreaterThan(10_000);
    expect(body, "orange").toContain("</svg>");
  });

  it("validates generated SVG asset orange_1k", () => {
    const href = GeneratedAssetRegistry["orange_1k"];
    expect(href, "orange_1k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "orange_1k").toBe(true);
    expect(body, "orange_1k").toContain("aria-label");
    expect(body.length, "orange_1k").toBeGreaterThan(10_000);
    expect(body, "orange_1k").toContain("</svg>");
  });

  it("validates generated SVG asset orange_basket", () => {
    const href = GeneratedAssetRegistry["orange_basket"];
    expect(href, "orange_basket").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "orange_basket").toBe(true);
    expect(body, "orange_basket").toContain("aria-label");
    expect(body.length, "orange_basket").toBeGreaterThan(10_000);
    expect(body, "orange_basket").toContain("</svg>");
  });

  it("validates generated SVG asset orange_basket_corner", () => {
    const href = GeneratedAssetRegistry["orange_basket_corner"];
    expect(href, "orange_basket_corner").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "orange_basket_corner").toBe(true);
    expect(body, "orange_basket_corner").toContain("aria-label");
    expect(body.length, "orange_basket_corner").toBeGreaterThan(10_000);
    expect(body, "orange_basket_corner").toContain("</svg>");
  });

  it("validates generated SVG asset orange_lantern_road", () => {
    const href = GeneratedAssetRegistry["orange_lantern_road"];
    expect(href, "orange_lantern_road").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "orange_lantern_road").toBe(true);
    expect(body, "orange_lantern_road").toContain("aria-label");
    expect(body.length, "orange_lantern_road").toBeGreaterThan(10_000);
    expect(body, "orange_lantern_road").toContain("</svg>");
  });

  it("validates generated SVG asset orange_lanterns", () => {
    const href = GeneratedAssetRegistry["orange_lanterns"];
    expect(href, "orange_lanterns").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "orange_lanterns").toBe(true);
    expect(body, "orange_lanterns").toContain("aria-label");
    expect(body.length, "orange_lanterns").toBeGreaterThan(10_000);
    expect(body, "orange_lanterns").toContain("</svg>");
  });

  it("validates generated SVG asset orange_spoon", () => {
    const href = GeneratedAssetRegistry["orange_spoon"];
    expect(href, "orange_spoon").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "orange_spoon").toBe(true);
    expect(body, "orange_spoon").toContain("aria-label");
    expect(body.length, "orange_spoon").toBeGreaterThan(10_000);
    expect(body, "orange_spoon").toContain("</svg>");
  });

  it("validates generated SVG asset parasol", () => {
    const href = GeneratedAssetRegistry["parasol"];
    expect(href, "parasol").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "parasol").toBe(true);
    expect(body, "parasol").toContain("aria-label");
    expect(body.length, "parasol").toBeGreaterThan(10_000);
    expect(body, "parasol").toContain("</svg>");
  });

  it("validates generated SVG asset paw", () => {
    const href = GeneratedAssetRegistry["paw"];
    expect(href, "paw").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "paw").toBe(true);
    expect(body, "paw").toContain("aria-label");
    expect(body.length, "paw").toBeGreaterThan(10_000);
    expect(body, "paw").toContain("</svg>");
  });

  it("validates generated SVG asset paw_10", () => {
    const href = GeneratedAssetRegistry["paw_10"];
    expect(href, "paw_10").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "paw_10").toBe(true);
    expect(body, "paw_10").toContain("aria-label");
    expect(body.length, "paw_10").toBeGreaterThan(10_000);
    expect(body, "paw_10").toContain("</svg>");
  });

  it("validates generated SVG asset podo", () => {
    const href = GeneratedAssetRegistry["podo"];
    expect(href, "podo").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "podo").toBe(true);
    expect(body, "podo").toContain("aria-label");
    expect(body.length, "podo").toBeGreaterThan(10_000);
    expect(body, "podo").toContain("</svg>");
  });

  it("validates generated SVG asset pond", () => {
    const href = GeneratedAssetRegistry["pond"];
    expect(href, "pond").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "pond").toBe(true);
    expect(body, "pond").toContain("aria-label");
    expect(body.length, "pond").toBeGreaterThan(10_000);
    expect(body, "pond").toContain("</svg>");
  });

  it("validates generated SVG asset prestige", () => {
    const href = GeneratedAssetRegistry["prestige"];
    expect(href, "prestige").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "prestige").toBe(true);
    expect(body, "prestige").toContain("aria-label");
    expect(body.length, "prestige").toBeGreaterThan(10_000);
    expect(body, "prestige").toContain("</svg>");
  });

  it("validates generated SVG asset prestige_3", () => {
    const href = GeneratedAssetRegistry["prestige_3"];
    expect(href, "prestige_3").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "prestige_3").toBe(true);
    expect(body, "prestige_3").toContain("aria-label");
    expect(body.length, "prestige_3").toBeGreaterThan(10_000);
    expect(body, "prestige_3").toContain("</svg>");
  });

  it("validates generated SVG asset privacy-card-preview", () => {
    const href = GeneratedAssetRegistry["privacy-card-preview"];
    expect(href, "privacy-card-preview").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "privacy-card-preview").toBe(true);
    expect(body, "privacy-card-preview").toContain("aria-label");
    expect(body.length, "privacy-card-preview").toBeGreaterThan(10_000);
    expect(body, "privacy-card-preview").toContain("</svg>");
  });

  it("validates generated SVG asset qa-screenshot-frame", () => {
    const href = GeneratedAssetRegistry["qa-screenshot-frame"];
    expect(href, "qa-screenshot-frame").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "qa-screenshot-frame").toBe(true);
    expect(body, "qa-screenshot-frame").toContain("aria-label");
    expect(body.length, "qa-screenshot-frame").toBeGreaterThan(10_000);
    expect(body, "qa-screenshot-frame").toContain("</svg>");
  });

  it("validates generated SVG asset recipe", () => {
    const href = GeneratedAssetRegistry["recipe"];
    expect(href, "recipe").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "recipe").toBe(true);
    expect(body, "recipe").toContain("aria-label");
    expect(body.length, "recipe").toBeGreaterThan(10_000);
    expect(body, "recipe").toContain("</svg>");
  });

  it("validates generated SVG asset release", () => {
    const href = GeneratedAssetRegistry["release"];
    expect(href, "release").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "release").toBe(true);
    expect(body, "release").toContain("aria-label");
    expect(body.length, "release").toBeGreaterThan(10_000);
    expect(body, "release").toContain("</svg>");
  });

  it("validates generated SVG asset release_ad_festival", () => {
    const href = GeneratedAssetRegistry["release_ad_festival"];
    expect(href, "release_ad_festival").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "release_ad_festival").toBe(true);
    expect(body, "release_ad_festival").toContain("aria-label");
    expect(body.length, "release_ad_festival").toBeGreaterThan(10_000);
    expect(body, "release_ad_festival").toContain("</svg>");
  });

  it("validates generated SVG asset release_album_basket", () => {
    const href = GeneratedAssetRegistry["release_album_basket"];
    expect(href, "release_album_basket").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "release_album_basket").toBe(true);
    expect(body, "release_album_basket").toContain("aria-label");
    expect(body.length, "release_album_basket").toBeGreaterThan(10_000);
    expect(body, "release_album_basket").toContain("</svg>");
  });

  it("validates generated SVG asset release_album_first", () => {
    const href = GeneratedAssetRegistry["release_album_first"];
    expect(href, "release_album_first").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "release_album_first").toBe(true);
    expect(body, "release_album_first").toContain("aria-label");
    expect(body.length, "release_album_first").toBeGreaterThan(10_000);
    expect(body, "release_album_first").toContain("</svg>");
  });

  it("validates generated SVG asset release_export_ready", () => {
    const href = GeneratedAssetRegistry["release_export_ready"];
    expect(href, "release_export_ready").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "release_export_ready").toBe(true);
    expect(body, "release_export_ready").toContain("aria-label");
    expect(body.length, "release_export_ready").toBeGreaterThan(10_000);
    expect(body, "release_export_ready").toContain("</svg>");
  });

  it("validates generated SVG asset release_shop_gift", () => {
    const href = GeneratedAssetRegistry["release_shop_gift"];
    expect(href, "release_shop_gift").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "release_shop_gift").toBe(true);
    expect(body, "release_shop_gift").toContain("aria-label");
    expect(body.length, "release_shop_gift").toBeGreaterThan(10_000);
    expect(body, "release_shop_gift").toContain("</svg>");
  });

  it("validates generated SVG asset release_stamp_board", () => {
    const href = GeneratedAssetRegistry["release_stamp_board"];
    expect(href, "release_stamp_board").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "release_stamp_board").toBe(true);
    expect(body, "release_stamp_board").toContain("aria-label");
    expect(body.length, "release_stamp_board").toBeGreaterThan(10_000);
    expect(body, "release_stamp_board").toContain("</svg>");
  });

  it("validates generated SVG asset ruru", () => {
    const href = GeneratedAssetRegistry["ruru"];
    expect(href, "ruru").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "ruru").toBe(true);
    expect(body, "ruru").toContain("aria-label");
    expect(body.length, "ruru").toBeGreaterThan(10_000);
    expect(body, "ruru").toContain("</svg>");
  });

  it("validates generated SVG asset sandbox_gift", () => {
    const href = GeneratedAssetRegistry["sandbox_gift"];
    expect(href, "sandbox_gift").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "sandbox_gift").toBe(true);
    expect(body, "sandbox_gift").toContain("aria-label");
    expect(body.length, "sandbox_gift").toBeGreaterThan(10_000);
    expect(body, "sandbox_gift").toContain("</svg>");
  });

  it("validates generated SVG asset sandbox_shelf", () => {
    const href = GeneratedAssetRegistry["sandbox_shelf"];
    expect(href, "sandbox_shelf").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "sandbox_shelf").toBe(true);
    expect(body, "sandbox_shelf").toContain("aria-label");
    expect(body.length, "sandbox_shelf").toBeGreaterThan(10_000);
    expect(body, "sandbox_shelf").toContain("</svg>");
  });

  it("validates generated SVG asset schedule", () => {
    const href = GeneratedAssetRegistry["schedule"];
    expect(href, "schedule").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "schedule").toBe(true);
    expect(body, "schedule").toContain("aria-label");
    expect(body.length, "schedule").toBeGreaterThan(10_000);
    expect(body, "schedule").toContain("</svg>");
  });

  it("validates generated SVG asset season_memory_gate", () => {
    const href = GeneratedAssetRegistry["season_memory_gate"];
    expect(href, "season_memory_gate").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "season_memory_gate").toBe(true);
    expect(body, "season_memory_gate").toContain("aria-label");
    expect(body.length, "season_memory_gate").toBeGreaterThan(10_000);
    expect(body, "season_memory_gate").toContain("</svg>");
  });

  it("validates generated SVG asset settings", () => {
    const href = GeneratedAssetRegistry["settings"];
    expect(href, "settings").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "settings").toBe(true);
    expect(body, "settings").toContain("aria-label");
    expect(body.length, "settings").toBeGreaterThan(10_000);
    expect(body, "settings").toContain("</svg>");
  });

  it("validates generated SVG asset shade_parasol", () => {
    const href = GeneratedAssetRegistry["shade_parasol"];
    expect(href, "shade_parasol").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "shade_parasol").toBe(true);
    expect(body, "shade_parasol").toContain("aria-label");
    expect(body.length, "shade_parasol").toBeGreaterThan(10_000);
    expect(body, "shade_parasol").toContain("</svg>");
  });

  it("validates generated SVG asset shelf", () => {
    const href = GeneratedAssetRegistry["shelf"];
    expect(href, "shelf").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "shelf").toBe(true);
    expect(body, "shelf").toContain("aria-label");
    expect(body.length, "shelf").toBeGreaterThan(10_000);
    expect(body, "shelf").toContain("</svg>");
  });

  it("validates generated SVG asset shop", () => {
    const href = GeneratedAssetRegistry["shop"];
    expect(href, "shop").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "shop").toBe(true);
    expect(body, "shop").toContain("aria-label");
    expect(body.length, "shop").toBeGreaterThan(10_000);
    expect(body, "shop").toContain("</svg>");
  });

  it("validates generated SVG asset snack", () => {
    const href = GeneratedAssetRegistry["snack"];
    expect(href, "snack").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "snack").toBe(true);
    expect(body, "snack").toContain("aria-label");
    expect(body.length, "snack").toBeGreaterThan(10_000);
    expect(body, "snack").toContain("</svg>");
  });

  it("validates generated SVG asset snack_counter", () => {
    const href = GeneratedAssetRegistry["snack_counter"];
    expect(href, "snack_counter").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "snack_counter").toBe(true);
    expect(body, "snack_counter").toContain("aria-label");
    expect(body.length, "snack_counter").toBeGreaterThan(10_000);
    expect(body, "snack_counter").toContain("</svg>");
  });

  it("validates generated SVG asset snack_counter_table", () => {
    const href = GeneratedAssetRegistry["snack_counter_table"];
    expect(href, "snack_counter_table").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "snack_counter_table").toBe(true);
    expect(body, "snack_counter_table").toContain("aria-label");
    expect(body.length, "snack_counter_table").toBeGreaterThan(10_000);
    expect(body, "snack_counter_table").toContain("</svg>");
  });

  it("validates generated SVG asset soda", () => {
    const href = GeneratedAssetRegistry["soda"];
    expect(href, "soda").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "soda").toBe(true);
    expect(body, "soda").toContain("aria-label");
    expect(body.length, "soda").toBeGreaterThan(10_000);
    expect(body, "soda").toContain("</svg>");
  });

  it("validates generated SVG asset soft_paw", () => {
    const href = GeneratedAssetRegistry["soft_paw"];
    expect(href, "soft_paw").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "soft_paw").toBe(true);
    expect(body, "soft_paw").toContain("aria-label");
    expect(body.length, "soft_paw").toBeGreaterThan(10_000);
    expect(body, "soft_paw").toContain("</svg>");
  });

  it("validates generated SVG asset soft_paw_1", () => {
    const href = GeneratedAssetRegistry["soft_paw_1"];
    expect(href, "soft_paw_1").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "soft_paw_1").toBe(true);
    expect(body, "soft_paw_1").toContain("aria-label");
    expect(body.length, "soft_paw_1").toBeGreaterThan(10_000);
    expect(body, "soft_paw_1").toContain("</svg>");
  });

  it("validates generated SVG asset soft_paw_10", () => {
    const href = GeneratedAssetRegistry["soft_paw_10"];
    expect(href, "soft_paw_10").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "soft_paw_10").toBe(true);
    expect(body, "soft_paw_10").toContain("aria-label");
    expect(body.length, "soft_paw_10").toBeGreaterThan(10_000);
    expect(body, "soft_paw_10").toContain("</svg>");
  });

  it("validates generated SVG asset soft_paw_stamp", () => {
    const href = GeneratedAssetRegistry["soft_paw_stamp"];
    expect(href, "soft_paw_stamp").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "soft_paw_stamp").toBe(true);
    expect(body, "soft_paw_stamp").toContain("aria-label");
    expect(body.length, "soft_paw_stamp").toBeGreaterThan(10_000);
    expect(body, "soft_paw_stamp").toContain("</svg>");
  });

  it("validates generated SVG asset sorting_rhythm", () => {
    const href = GeneratedAssetRegistry["sorting_rhythm"];
    expect(href, "sorting_rhythm").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "sorting_rhythm").toBe(true);
    expect(body, "sorting_rhythm").toContain("aria-label");
    expect(body.length, "sorting_rhythm").toBeGreaterThan(10_000);
    expect(body, "sorting_rhythm").toContain("</svg>");
  });

  it("validates generated SVG asset sorting_table", () => {
    const href = GeneratedAssetRegistry["sorting_table"];
    expect(href, "sorting_table").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "sorting_table").toBe(true);
    expect(body, "sorting_table").toContain("aria-label");
    expect(body.length, "sorting_table").toBeGreaterThan(10_000);
    expect(body, "sorting_table").toContain("</svg>");
  });

  it("validates generated SVG asset splash-draft", () => {
    const href = GeneratedAssetRegistry["splash-draft"];
    expect(href, "splash-draft").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "splash-draft").toBe(true);
    expect(body, "splash-draft").toContain("aria-label");
    expect(body.length, "splash-draft").toBeGreaterThan(10_000);
    expect(body, "splash-draft").toContain("</svg>");
  });

  it("validates generated SVG asset spoon", () => {
    const href = GeneratedAssetRegistry["spoon"];
    expect(href, "spoon").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "spoon").toBe(true);
    expect(body, "spoon").toContain("aria-label");
    expect(body.length, "spoon").toBeGreaterThan(10_000);
    expect(body, "spoon").toContain("</svg>");
  });

  it("validates generated SVG asset steam", () => {
    const href = GeneratedAssetRegistry["steam"];
    expect(href, "steam").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "steam").toBe(true);
    expect(body, "steam").toContain("aria-label");
    expect(body.length, "steam").toBeGreaterThan(10_000);
    expect(body, "steam").toContain("</svg>");
  });

  it("validates generated SVG asset steam_towel", () => {
    const href = GeneratedAssetRegistry["steam_towel"];
    expect(href, "steam_towel").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "steam_towel").toBe(true);
    expect(body, "steam_towel").toContain("aria-label");
    expect(body.length, "steam_towel").toBeGreaterThan(10_000);
    expect(body, "steam_towel").toContain("</svg>");
  });

  it("validates generated SVG asset steam_towel_rack", () => {
    const href = GeneratedAssetRegistry["steam_towel_rack"];
    expect(href, "steam_towel_rack").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "steam_towel_rack").toBe(true);
    expect(body, "steam_towel_rack").toContain("aria-label");
    expect(body.length, "steam_towel_rack").toBeGreaterThan(10_000);
    expect(body, "steam_towel_rack").toContain("</svg>");
  });

  it("validates generated SVG asset store-card-preview", () => {
    const href = GeneratedAssetRegistry["store-card-preview"];
    expect(href, "store-card-preview").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "store-card-preview").toBe(true);
    expect(body, "store-card-preview").toContain("aria-label");
    expect(body.length, "store-card-preview").toBeGreaterThan(10_000);
    expect(body, "store-card-preview").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse", () => {
    const href = GeneratedAssetRegistry["storehouse"];
    expect(href, "storehouse").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse").toBe(true);
    expect(body, "storehouse").toContain("aria-label");
    expect(body.length, "storehouse").toBeGreaterThan(10_000);
    expect(body, "storehouse").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_25k", () => {
    const href = GeneratedAssetRegistry["storehouse_25k"];
    expect(href, "storehouse_25k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_25k").toBe(true);
    expect(body, "storehouse_25k").toContain("aria-label");
    expect(body.length, "storehouse_25k").toBeGreaterThan(10_000);
    expect(body, "storehouse_25k").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_5k", () => {
    const href = GeneratedAssetRegistry["storehouse_5k"];
    expect(href, "storehouse_5k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_5k").toBe(true);
    expect(body, "storehouse_5k").toContain("aria-label");
    expect(body.length, "storehouse_5k").toBeGreaterThan(10_000);
    expect(body, "storehouse_5k").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_cart_stop", () => {
    const href = GeneratedAssetRegistry["storehouse_cart_stop"];
    expect(href, "storehouse_cart_stop").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_cart_stop").toBe(true);
    expect(body, "storehouse_cart_stop").toContain("aria-label");
    expect(body.length, "storehouse_cart_stop").toBeGreaterThan(10_000);
    expect(body, "storehouse_cart_stop").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_crate_line", () => {
    const href = GeneratedAssetRegistry["storehouse_crate_line"];
    expect(href, "storehouse_crate_line").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_crate_line").toBe(true);
    expect(body, "storehouse_crate_line").toContain("aria-label");
    expect(body.length, "storehouse_crate_line").toBeGreaterThan(10_000);
    expect(body, "storehouse_crate_line").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_first", () => {
    const href = GeneratedAssetRegistry["storehouse_first"];
    expect(href, "storehouse_first").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_first").toBe(true);
    expect(body, "storehouse_first").toContain("aria-label");
    expect(body.length, "storehouse_first").toBeGreaterThan(10_000);
    expect(body, "storehouse_first").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_fragrance", () => {
    const href = GeneratedAssetRegistry["storehouse_fragrance"];
    expect(href, "storehouse_fragrance").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_fragrance").toBe(true);
    expect(body, "storehouse_fragrance").toContain("aria-label");
    expect(body.length, "storehouse_fragrance").toBeGreaterThan(10_000);
    expect(body, "storehouse_fragrance").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_open", () => {
    const href = GeneratedAssetRegistry["storehouse_open"];
    expect(href, "storehouse_open").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_open").toBe(true);
    expect(body, "storehouse_open").toContain("aria-label");
    expect(body.length, "storehouse_open").toBeGreaterThan(10_000);
    expect(body, "storehouse_open").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_rhythm", () => {
    const href = GeneratedAssetRegistry["storehouse_rhythm"];
    expect(href, "storehouse_rhythm").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_rhythm").toBe(true);
    expect(body, "storehouse_rhythm").toContain("aria-label");
    expect(body.length, "storehouse_rhythm").toBeGreaterThan(10_000);
    expect(body, "storehouse_rhythm").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_sign", () => {
    const href = GeneratedAssetRegistry["storehouse_sign"];
    expect(href, "storehouse_sign").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_sign").toBe(true);
    expect(body, "storehouse_sign").toContain("aria-label");
    expect(body.length, "storehouse_sign").toBeGreaterThan(10_000);
    expect(body, "storehouse_sign").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_sorting_table", () => {
    const href = GeneratedAssetRegistry["storehouse_sorting_table"];
    expect(href, "storehouse_sorting_table").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_sorting_table").toBe(true);
    expect(body, "storehouse_sorting_table").toContain("aria-label");
    expect(body.length, "storehouse_sorting_table").toBeGreaterThan(10_000);
    expect(body, "storehouse_sorting_table").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_total_levels", () => {
    const href = GeneratedAssetRegistry["storehouse_total_levels"];
    expect(href, "storehouse_total_levels").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_total_levels").toBe(true);
    expect(body, "storehouse_total_levels").toContain("aria-label");
    expect(body.length, "storehouse_total_levels").toBeGreaterThan(10_000);
    expect(body, "storehouse_total_levels").toContain("</svg>");
  });

  it("validates generated SVG asset stream", () => {
    const href = GeneratedAssetRegistry["stream"];
    expect(href, "stream").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "stream").toBe(true);
    expect(body, "stream").toContain("aria-label");
    expect(body.length, "stream").toBeGreaterThan(10_000);
    expect(body, "stream").toContain("</svg>");
  });

  it("validates generated SVG asset sun", () => {
    const href = GeneratedAssetRegistry["sun"];
    expect(href, "sun").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "sun").toBe(true);
    expect(body, "sun").toContain("aria-label");
    expect(body.length, "sun").toBeGreaterThan(10_000);
    expect(body, "sun").toContain("</svg>");
  });

  it("validates generated SVG asset sunny_yard", () => {
    const href = GeneratedAssetRegistry["sunny_yard"];
    expect(href, "sunny_yard").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "sunny_yard").toBe(true);
    expect(body, "sunny_yard").toContain("aria-label");
    expect(body.length, "sunny_yard").toBeGreaterThan(10_000);
    expect(body, "sunny_yard").toContain("</svg>");
  });

  it("validates generated SVG asset table", () => {
    const href = GeneratedAssetRegistry["table"];
    expect(href, "table").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "table").toBe(true);
    expect(body, "table").toContain("aria-label");
    expect(body.length, "table").toBeGreaterThan(10_000);
    expect(body, "table").toContain("</svg>");
  });

  it("validates generated SVG asset tap", () => {
    const href = GeneratedAssetRegistry["tap"];
    expect(href, "tap").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tap").toBe(true);
    expect(body, "tap").toContain("aria-label");
    expect(body.length, "tap").toBeGreaterThan(10_000);
    expect(body, "tap").toContain("</svg>");
  });

  it("validates generated SVG asset tap_100", () => {
    const href = GeneratedAssetRegistry["tap_100"];
    expect(href, "tap_100").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tap_100").toBe(true);
    expect(body, "tap_100").toContain("aria-label");
    expect(body.length, "tap_100").toBeGreaterThan(10_000);
    expect(body, "tap_100").toContain("</svg>");
  });

  it("validates generated SVG asset tap_1000", () => {
    const href = GeneratedAssetRegistry["tap_1000"];
    expect(href, "tap_1000").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tap_1000").toBe(true);
    expect(body, "tap_1000").toContain("aria-label");
    expect(body.length, "tap_1000").toBeGreaterThan(10_000);
    expect(body, "tap_1000").toContain("</svg>");
  });

  it("validates generated SVG asset tap_suite", () => {
    const href = GeneratedAssetRegistry["tap_suite"];
    expect(href, "tap_suite").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tap_suite").toBe(true);
    expect(body, "tap_suite").toContain("aria-label");
    expect(body.length, "tap_suite").toBeGreaterThan(10_000);
    expect(body, "tap_suite").toContain("</svg>");
  });

  it("validates generated SVG asset tap_suite_100", () => {
    const href = GeneratedAssetRegistry["tap_suite_100"];
    expect(href, "tap_suite_100").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tap_suite_100").toBe(true);
    expect(body, "tap_suite_100").toContain("aria-label");
    expect(body.length, "tap_suite_100").toBeGreaterThan(10_000);
    expect(body, "tap_suite_100").toContain("</svg>");
  });

  it("validates generated SVG asset tap_suite_20", () => {
    const href = GeneratedAssetRegistry["tap_suite_20"];
    expect(href, "tap_suite_20").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tap_suite_20").toBe(true);
    expect(body, "tap_suite_20").toContain("aria-label");
    expect(body.length, "tap_suite_20").toBeGreaterThan(10_000);
    expect(body, "tap_suite_20").toContain("</svg>");
  });

  it("validates generated SVG asset ten_taps", () => {
    const href = GeneratedAssetRegistry["ten_taps"];
    expect(href, "ten_taps").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "ten_taps").toBe(true);
    expect(body, "ten_taps").toContain("aria-label");
    expect(body.length, "ten_taps").toBeGreaterThan(10_000);
    expect(body, "ten_taps").toContain("</svg>");
  });

  it("validates generated SVG asset third_prestige", () => {
    const href = GeneratedAssetRegistry["third_prestige"];
    expect(href, "third_prestige").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "third_prestige").toBe(true);
    expect(body, "third_prestige").toContain("aria-label");
    expect(body.length, "third_prestige").toBeGreaterThan(10_000);
    expect(body, "third_prestige").toContain("</svg>");
  });

  it("validates generated SVG asset thousand_taps", () => {
    const href = GeneratedAssetRegistry["thousand_taps"];
    expect(href, "thousand_taps").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "thousand_taps").toBe(true);
    expect(body, "thousand_taps").toContain("aria-label");
    expect(body.length, "thousand_taps").toBeGreaterThan(10_000);
    expect(body, "thousand_taps").toContain("</svg>");
  });

  it("validates generated SVG asset tier-bamboo_garden", () => {
    const href = GeneratedAssetRegistry["tier-bamboo_garden"];
    expect(href, "tier-bamboo_garden").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tier-bamboo_garden").toBe(true);
    expect(body, "tier-bamboo_garden").toContain("aria-label");
    expect(body.length, "tier-bamboo_garden").toBeGreaterThan(10_000);
    expect(body, "tier-bamboo_garden").toContain("</svg>");
  });

  it("validates generated SVG asset tier-golden_forest", () => {
    const href = GeneratedAssetRegistry["tier-golden_forest"];
    expect(href, "tier-golden_forest").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tier-golden_forest").toBe(true);
    expect(body, "tier-golden_forest").toContain("aria-label");
    expect(body.length, "tier-golden_forest").toBeGreaterThan(10_000);
    expect(body, "tier-golden_forest").toContain("</svg>");
  });

  it("validates generated SVG asset tier-onsen", () => {
    const href = GeneratedAssetRegistry["tier-onsen"];
    expect(href, "tier-onsen").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tier-onsen").toBe(true);
    expect(body, "tier-onsen").toContain("aria-label");
    expect(body.length, "tier-onsen").toBeGreaterThan(10_000);
    expect(body, "tier-onsen").toContain("</svg>");
  });

  it("validates generated SVG asset tier-storehouse", () => {
    const href = GeneratedAssetRegistry["tier-storehouse"];
    expect(href, "tier-storehouse").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tier-storehouse").toBe(true);
    expect(body, "tier-storehouse").toContain("aria-label");
    expect(body.length, "tier-storehouse").toBeGreaterThan(10_000);
    expect(body, "tier-storehouse").toContain("</svg>");
  });

  it("validates generated SVG asset tier-yard", () => {
    const href = GeneratedAssetRegistry["tier-yard"];
    expect(href, "tier-yard").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tier-yard").toBe(true);
    expect(body, "tier-yard").toContain("aria-label");
    expect(body.length, "tier-yard").toBeGreaterThan(10_000);
    expect(body, "tier-yard").toContain("</svg>");
  });

  it("validates generated SVG asset tiny_watering_path", () => {
    const href = GeneratedAssetRegistry["tiny_watering_path"];
    expect(href, "tiny_watering_path").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tiny_watering_path").toBe(true);
    expect(body, "tiny_watering_path").toContain("aria-label");
    expect(body.length, "tiny_watering_path").toBeGreaterThan(10_000);
    expect(body, "tiny_watering_path").toContain("</svg>");
  });

  it("validates generated SVG asset toolbox", () => {
    const href = GeneratedAssetRegistry["toolbox"];
    expect(href, "toolbox").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "toolbox").toBe(true);
    expect(body, "toolbox").toContain("aria-label");
    expect(body.length, "toolbox").toBeGreaterThan(10_000);
    expect(body, "toolbox").toContain("</svg>");
  });

  it("validates generated SVG asset toolbox_first", () => {
    const href = GeneratedAssetRegistry["toolbox_first"];
    expect(href, "toolbox_first").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "toolbox_first").toBe(true);
    expect(body, "toolbox_first").toContain("aria-label");
    expect(body.length, "toolbox_first").toBeGreaterThan(10_000);
    expect(body, "toolbox_first").toContain("</svg>");
  });

  it("validates generated SVG asset towel", () => {
    const href = GeneratedAssetRegistry["towel"];
    expect(href, "towel").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "towel").toBe(true);
    expect(body, "towel").toContain("aria-label");
    expect(body.length, "towel").toBeGreaterThan(10_000);
    expect(body, "towel").toContain("</svg>");
  });

  it("validates generated SVG asset towel_rack_corner", () => {
    const href = GeneratedAssetRegistry["towel_rack_corner"];
    expect(href, "towel_rack_corner").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "towel_rack_corner").toBe(true);
    expect(body, "towel_rack_corner").toContain("aria-label");
    expect(body.length, "towel_rack_corner").toBeGreaterThan(10_000);
    expect(body, "towel_rack_corner").toContain("</svg>");
  });

  it("validates generated SVG asset upgrades", () => {
    const href = GeneratedAssetRegistry["upgrades"];
    expect(href, "upgrades").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "upgrades").toBe(true);
    expect(body, "upgrades").toContain("aria-label");
    expect(body.length, "upgrades").toBeGreaterThan(10_000);
    expect(body, "upgrades").toContain("</svg>");
  });

  it("validates generated SVG asset warm_pond", () => {
    const href = GeneratedAssetRegistry["warm_pond"];
    expect(href, "warm_pond").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "warm_pond").toBe(true);
    expect(body, "warm_pond").toContain("aria-label");
    expect(body.length, "warm_pond").toBeGreaterThan(10_000);
    expect(body, "warm_pond").toContain("</svg>");
  });

  it("validates generated SVG asset warm_pond_stones", () => {
    const href = GeneratedAssetRegistry["warm_pond_stones"];
    expect(href, "warm_pond_stones").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "warm_pond_stones").toBe(true);
    expect(body, "warm_pond_stones").toContain("aria-label");
    expect(body.length, "warm_pond_stones").toBeGreaterThan(10_000);
    expect(body, "warm_pond_stones").toContain("</svg>");
  });

  it("validates generated SVG asset warm_towel", () => {
    const href = GeneratedAssetRegistry["warm_towel"];
    expect(href, "warm_towel").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "warm_towel").toBe(true);
    expect(body, "warm_towel").toContain("aria-label");
    expect(body.length, "warm_towel").toBeGreaterThan(10_000);
    expect(body, "warm_towel").toContain("</svg>");
  });

  it("validates generated SVG asset water_path", () => {
    const href = GeneratedAssetRegistry["water_path"];
    expect(href, "water_path").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "water_path").toBe(true);
    expect(body, "water_path").toContain("aria-label");
    expect(body.length, "water_path").toBeGreaterThan(10_000);
    expect(body, "water_path").toContain("</svg>");
  });

  it("validates generated SVG asset watering_rill", () => {
    const href = GeneratedAssetRegistry["watering_rill"];
    expect(href, "watering_rill").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "watering_rill").toBe(true);
    expect(body, "watering_rill").toContain("aria-label");
    expect(body.length, "watering_rill").toBeGreaterThan(10_000);
    expect(body, "watering_rill").toContain("</svg>");
  });

  it("validates generated SVG asset welcome_first_basket", () => {
    const href = GeneratedAssetRegistry["welcome_first_basket"];
    expect(href, "welcome_first_basket").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "welcome_first_basket").toBe(true);
    expect(body, "welcome_first_basket").toContain("aria-label");
    expect(body.length, "welcome_first_basket").toBeGreaterThan(10_000);
    expect(body, "welcome_first_basket").toContain("</svg>");
  });

  it("validates generated SVG asset welcome_first_orange", () => {
    const href = GeneratedAssetRegistry["welcome_first_orange"];
    expect(href, "welcome_first_orange").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "welcome_first_orange").toBe(true);
    expect(body, "welcome_first_orange").toContain("aria-label");
    expect(body.length, "welcome_first_orange").toBeGreaterThan(10_000);
    expect(body, "welcome_first_orange").toContain("</svg>");
  });

  it("validates generated SVG asset welcome_soft_paw", () => {
    const href = GeneratedAssetRegistry["welcome_soft_paw"];
    expect(href, "welcome_soft_paw").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "welcome_soft_paw").toBe(true);
    expect(body, "welcome_soft_paw").toContain("aria-label");
    expect(body.length, "welcome_soft_paw").toBeGreaterThan(10_000);
    expect(body, "welcome_soft_paw").toContain("</svg>");
  });

  it("validates generated SVG asset welcome_steady_ten", () => {
    const href = GeneratedAssetRegistry["welcome_steady_ten"];
    expect(href, "welcome_steady_ten").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "welcome_steady_ten").toBe(true);
    expect(body, "welcome_steady_ten").toContain("aria-label");
    expect(body.length, "welcome_steady_ten").toBeGreaterThan(10_000);
    expect(body, "welcome_steady_ten").toContain("</svg>");
  });

  it("validates generated SVG asset wind_chime_bridge", () => {
    const href = GeneratedAssetRegistry["wind_chime_bridge"];
    expect(href, "wind_chime_bridge").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "wind_chime_bridge").toBe(true);
    expect(body, "wind_chime_bridge").toContain("aria-label");
    expect(body.length, "wind_chime_bridge").toBeGreaterThan(10_000);
    expect(body, "wind_chime_bridge").toContain("</svg>");
  });

  it("validates generated SVG asset wooden_crate_line", () => {
    const href = GeneratedAssetRegistry["wooden_crate_line"];
    expect(href, "wooden_crate_line").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "wooden_crate_line").toBe(true);
    expect(body, "wooden_crate_line").toContain("aria-label");
    expect(body.length, "wooden_crate_line").toBeGreaterThan(10_000);
    expect(body, "wooden_crate_line").toContain("</svg>");
  });

  it("validates generated SVG asset yard", () => {
    const href = GeneratedAssetRegistry["yard"];
    expect(href, "yard").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard").toBe(true);
    expect(body, "yard").toContain("aria-label");
    expect(body.length, "yard").toBeGreaterThan(10_000);
    expect(body, "yard").toContain("</svg>");
  });

  it("validates generated SVG asset yard_first_100", () => {
    const href = GeneratedAssetRegistry["yard_first_100"];
    expect(href, "yard_first_100").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_first_100").toBe(true);
    expect(body, "yard_first_100").toContain("aria-label");
    expect(body.length, "yard_first_100").toBeGreaterThan(10_000);
    expect(body, "yard_first_100").toContain("</svg>");
  });

  it("validates generated SVG asset yard_nap_mat", () => {
    const href = GeneratedAssetRegistry["yard_nap_mat"];
    expect(href, "yard_nap_mat").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_nap_mat").toBe(true);
    expect(body, "yard_nap_mat").toContain("aria-label");
    expect(body.length, "yard_nap_mat").toBeGreaterThan(10_000);
    expect(body, "yard_nap_mat").toContain("</svg>");
  });

  it("validates generated SVG asset yard_one_thousand", () => {
    const href = GeneratedAssetRegistry["yard_one_thousand"];
    expect(href, "yard_one_thousand").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_one_thousand").toBe(true);
    expect(body, "yard_one_thousand").toContain("aria-label");
    expect(body.length, "yard_one_thousand").toBeGreaterThan(10_000);
    expect(body, "yard_one_thousand").toContain("</svg>");
  });

  it("validates generated SVG asset yard_parasol", () => {
    const href = GeneratedAssetRegistry["yard_parasol"];
    expect(href, "yard_parasol").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_parasol").toBe(true);
    expect(body, "yard_parasol").toContain("aria-label");
    expect(body.length, "yard_parasol").toBeGreaterThan(10_000);
    expect(body, "yard_parasol").toContain("</svg>");
  });

  it("validates generated SVG asset yard_set", () => {
    const href = GeneratedAssetRegistry["yard_set"];
    expect(href, "yard_set").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_set").toBe(true);
    expect(body, "yard_set").toContain("aria-label");
    expect(body.length, "yard_set").toBeGreaterThan(10_000);
    expect(body, "yard_set").toContain("</svg>");
  });

  it("validates generated SVG asset yard_spoon", () => {
    const href = GeneratedAssetRegistry["yard_spoon"];
    expect(href, "yard_spoon").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_spoon").toBe(true);
    expect(body, "yard_spoon").toContain("aria-label");
    expect(body.length, "yard_spoon").toBeGreaterThan(10_000);
    expect(body, "yard_spoon").toContain("</svg>");
  });

  it("validates generated SVG asset yard_tap_100", () => {
    const href = GeneratedAssetRegistry["yard_tap_100"];
    expect(href, "yard_tap_100").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_tap_100").toBe(true);
    expect(body, "yard_tap_100").toContain("aria-label");
    expect(body.length, "yard_tap_100").toBeGreaterThan(10_000);
    expect(body, "yard_tap_100").toContain("</svg>");
  });

  it("validates generated SVG asset yard_water_path", () => {
    const href = GeneratedAssetRegistry["yard_water_path"];
    expect(href, "yard_water_path").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_water_path").toBe(true);
    expect(body, "yard_water_path").toContain("aria-label");
    expect(body.length, "yard_water_path").toBeGreaterThan(10_000);
    expect(body, "yard_water_path").toContain("</svg>");
  });

});
