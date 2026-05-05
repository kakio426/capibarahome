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
  "app-icon-rc2",
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
  "splash-rc2",
  "spoon",
  "steam",
  "steam_towel",
  "steam_towel_rack",
  "store-card-preview",
  "store-screenshot-frame-rc2",
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
    expect(body.length, "ad_festival").toBeGreaterThan(900);
    expect(body, "ad_festival").not.toContain("<image");
    expect(body, "ad_festival").not.toMatch(/href=["']https?:/);
    expect(body, "ad_festival").not.toMatch(/url\(["']?https?:/);
    expect(body, "ad_festival").not.toContain("\uFFFD");
    expect(body, "ad_festival").toContain("</svg>");
  });

  it("validates generated SVG asset afternoon", () => {
    const href = GeneratedAssetRegistry["afternoon"];
    expect(href, "afternoon").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "afternoon").toBe(true);
    expect(body, "afternoon").toContain("aria-label");
    expect(body.length, "afternoon").toBeGreaterThan(900);
    expect(body, "afternoon").not.toContain("<image");
    expect(body, "afternoon").not.toMatch(/href=["']https?:/);
    expect(body, "afternoon").not.toMatch(/url\(["']?https?:/);
    expect(body, "afternoon").not.toContain("\uFFFD");
    expect(body, "afternoon").toContain("</svg>");
  });

  it("validates generated SVG asset album", () => {
    const href = GeneratedAssetRegistry["album"];
    expect(href, "album").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "album").toBe(true);
    expect(body, "album").toContain("aria-label");
    expect(body.length, "album").toBeGreaterThan(900);
    expect(body, "album").not.toContain("<image");
    expect(body, "album").not.toMatch(/href=["']https?:/);
    expect(body, "album").not.toMatch(/url\(["']?https?:/);
    expect(body, "album").not.toContain("\uFFFD");
    expect(body, "album").toContain("</svg>");
  });

  it("validates generated SVG asset all_yard_core", () => {
    const href = GeneratedAssetRegistry["all_yard_core"];
    expect(href, "all_yard_core").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "all_yard_core").toBe(true);
    expect(body, "all_yard_core").toContain("aria-label");
    expect(body.length, "all_yard_core").toBeGreaterThan(900);
    expect(body, "all_yard_core").not.toContain("<image");
    expect(body, "all_yard_core").not.toMatch(/href=["']https?:/);
    expect(body, "all_yard_core").not.toMatch(/url\(["']?https?:/);
    expect(body, "all_yard_core").not.toContain("\uFFFD");
    expect(body, "all_yard_core").toContain("</svg>");
  });

  it("validates generated SVG asset app-icon-draft", () => {
    const href = GeneratedAssetRegistry["app-icon-draft"];
    expect(href, "app-icon-draft").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "app-icon-draft").toBe(true);
    expect(body, "app-icon-draft").toContain("aria-label");
    expect(body.length, "app-icon-draft").toBeGreaterThan(900);
    expect(body, "app-icon-draft").not.toContain("<image");
    expect(body, "app-icon-draft").not.toMatch(/href=["']https?:/);
    expect(body, "app-icon-draft").not.toMatch(/url\(["']?https?:/);
    expect(body, "app-icon-draft").not.toContain("\uFFFD");
    expect(body, "app-icon-draft").toContain("</svg>");
  });

  it("validates generated SVG asset app-icon-rc2", () => {
    const href = GeneratedAssetRegistry["app-icon-rc2"];
    expect(href, "app-icon-rc2").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "app-icon-rc2").toBe(true);
    expect(body, "app-icon-rc2").toContain("aria-label");
    expect(body.length, "app-icon-rc2").toBeGreaterThan(900);
    expect(body, "app-icon-rc2").not.toContain("<image");
    expect(body, "app-icon-rc2").not.toMatch(/href=["']https?:/);
    expect(body, "app-icon-rc2").not.toMatch(/url\(["']?https?:/);
    expect(body, "app-icon-rc2").not.toContain("\uFFFD");
    expect(body, "app-icon-rc2").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo", () => {
    const href = GeneratedAssetRegistry["bamboo"];
    expect(href, "bamboo").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo").toBe(true);
    expect(body, "bamboo").toContain("aria-label");
    expect(body.length, "bamboo").toBeGreaterThan(900);
    expect(body, "bamboo").not.toContain("<image");
    expect(body, "bamboo").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo").not.toContain("\uFFFD");
    expect(body, "bamboo").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_1m", () => {
    const href = GeneratedAssetRegistry["bamboo_1m"];
    expect(href, "bamboo_1m").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_1m").toBe(true);
    expect(body, "bamboo_1m").toContain("aria-label");
    expect(body.length, "bamboo_1m").toBeGreaterThan(900);
    expect(body, "bamboo_1m").not.toContain("<image");
    expect(body, "bamboo_1m").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_1m").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_1m").not.toContain("\uFFFD");
    expect(body, "bamboo_1m").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_5m", () => {
    const href = GeneratedAssetRegistry["bamboo_5m"];
    expect(href, "bamboo_5m").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_5m").toBe(true);
    expect(body, "bamboo_5m").toContain("aria-label");
    expect(body.length, "bamboo_5m").toBeGreaterThan(900);
    expect(body, "bamboo_5m").not.toContain("<image");
    expect(body, "bamboo_5m").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_5m").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_5m").not.toContain("\uFFFD");
    expect(body, "bamboo_5m").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_cart", () => {
    const href = GeneratedAssetRegistry["bamboo_cart"];
    expect(href, "bamboo_cart").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_cart").toBe(true);
    expect(body, "bamboo_cart").toContain("aria-label");
    expect(body.length, "bamboo_cart").toBeGreaterThan(900);
    expect(body, "bamboo_cart").not.toContain("<image");
    expect(body, "bamboo_cart").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_cart").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_cart").not.toContain("\uFFFD");
    expect(body, "bamboo_cart").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_cart_first", () => {
    const href = GeneratedAssetRegistry["bamboo_cart_first"];
    expect(href, "bamboo_cart_first").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_cart_first").toBe(true);
    expect(body, "bamboo_cart_first").toContain("aria-label");
    expect(body.length, "bamboo_cart_first").toBeGreaterThan(900);
    expect(body, "bamboo_cart_first").not.toContain("<image");
    expect(body, "bamboo_cart_first").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_cart_first").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_cart_first").not.toContain("\uFFFD");
    expect(body, "bamboo_cart_first").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_cart_track", () => {
    const href = GeneratedAssetRegistry["bamboo_cart_track"];
    expect(href, "bamboo_cart_track").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_cart_track").toBe(true);
    expect(body, "bamboo_cart_track").toContain("aria-label");
    expect(body.length, "bamboo_cart_track").toBeGreaterThan(900);
    expect(body, "bamboo_cart_track").not.toContain("<image");
    expect(body, "bamboo_cart_track").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_cart_track").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_cart_track").not.toContain("\uFFFD");
    expect(body, "bamboo_cart_track").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_eps_100k", () => {
    const href = GeneratedAssetRegistry["bamboo_eps_100k"];
    expect(href, "bamboo_eps_100k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_eps_100k").toBe(true);
    expect(body, "bamboo_eps_100k").toContain("aria-label");
    expect(body.length, "bamboo_eps_100k").toBeGreaterThan(900);
    expect(body, "bamboo_eps_100k").not.toContain("<image");
    expect(body, "bamboo_eps_100k").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_eps_100k").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_eps_100k").not.toContain("\uFFFD");
    expect(body, "bamboo_eps_100k").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_festival_clap", () => {
    const href = GeneratedAssetRegistry["bamboo_festival_clap"];
    expect(href, "bamboo_festival_clap").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_festival_clap").toBe(true);
    expect(body, "bamboo_festival_clap").toContain("aria-label");
    expect(body.length, "bamboo_festival_clap").toBeGreaterThan(900);
    expect(body, "bamboo_festival_clap").not.toContain("<image");
    expect(body, "bamboo_festival_clap").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_festival_clap").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_festival_clap").not.toContain("\uFFFD");
    expect(body, "bamboo_festival_clap").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_garden", () => {
    const href = GeneratedAssetRegistry["bamboo_garden"];
    expect(href, "bamboo_garden").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_garden").toBe(true);
    expect(body, "bamboo_garden").toContain("aria-label");
    expect(body.length, "bamboo_garden").toBeGreaterThan(900);
    expect(body, "bamboo_garden").not.toContain("<image");
    expect(body, "bamboo_garden").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_garden").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_garden").not.toContain("\uFFFD");
    expect(body, "bamboo_garden").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_gate", () => {
    const href = GeneratedAssetRegistry["bamboo_gate"];
    expect(href, "bamboo_gate").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_gate").toBe(true);
    expect(body, "bamboo_gate").toContain("aria-label");
    expect(body.length, "bamboo_gate").toBeGreaterThan(900);
    expect(body, "bamboo_gate").not.toContain("<image");
    expect(body, "bamboo_gate").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_gate").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_gate").not.toContain("\uFFFD");
    expect(body, "bamboo_gate").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_lantern", () => {
    const href = GeneratedAssetRegistry["bamboo_lantern"];
    expect(href, "bamboo_lantern").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_lantern").toBe(true);
    expect(body, "bamboo_lantern").toContain("aria-label");
    expect(body.length, "bamboo_lantern").toBeGreaterThan(900);
    expect(body, "bamboo_lantern").not.toContain("<image");
    expect(body, "bamboo_lantern").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_lantern").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_lantern").not.toContain("\uFFFD");
    expect(body, "bamboo_lantern").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_open", () => {
    const href = GeneratedAssetRegistry["bamboo_open"];
    expect(href, "bamboo_open").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_open").toBe(true);
    expect(body, "bamboo_open").toContain("aria-label");
    expect(body.length, "bamboo_open").toBeGreaterThan(900);
    expect(body, "bamboo_open").not.toContain("<image");
    expect(body, "bamboo_open").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_open").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_open").not.toContain("\uFFFD");
    expect(body, "bamboo_open").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_toolbox", () => {
    const href = GeneratedAssetRegistry["bamboo_toolbox"];
    expect(href, "bamboo_toolbox").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_toolbox").toBe(true);
    expect(body, "bamboo_toolbox").toContain("aria-label");
    expect(body.length, "bamboo_toolbox").toBeGreaterThan(900);
    expect(body, "bamboo_toolbox").not.toContain("<image");
    expect(body, "bamboo_toolbox").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_toolbox").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_toolbox").not.toContain("\uFFFD");
    expect(body, "bamboo_toolbox").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_total_levels", () => {
    const href = GeneratedAssetRegistry["bamboo_total_levels"];
    expect(href, "bamboo_total_levels").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_total_levels").toBe(true);
    expect(body, "bamboo_total_levels").toContain("aria-label");
    expect(body.length, "bamboo_total_levels").toBeGreaterThan(900);
    expect(body, "bamboo_total_levels").not.toContain("<image");
    expect(body, "bamboo_total_levels").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_total_levels").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_total_levels").not.toContain("\uFFFD");
    expect(body, "bamboo_total_levels").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_touch", () => {
    const href = GeneratedAssetRegistry["bamboo_touch"];
    expect(href, "bamboo_touch").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_touch").toBe(true);
    expect(body, "bamboo_touch").toContain("aria-label");
    expect(body.length, "bamboo_touch").toBeGreaterThan(900);
    expect(body, "bamboo_touch").not.toContain("<image");
    expect(body, "bamboo_touch").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_touch").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_touch").not.toContain("\uFFFD");
    expect(body, "bamboo_touch").toContain("</svg>");
  });

  it("validates generated SVG asset bamboo_wind_bridge", () => {
    const href = GeneratedAssetRegistry["bamboo_wind_bridge"];
    expect(href, "bamboo_wind_bridge").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "bamboo_wind_bridge").toBe(true);
    expect(body, "bamboo_wind_bridge").toContain("aria-label");
    expect(body.length, "bamboo_wind_bridge").toBeGreaterThan(900);
    expect(body, "bamboo_wind_bridge").not.toContain("<image");
    expect(body, "bamboo_wind_bridge").not.toMatch(/href=["']https?:/);
    expect(body, "bamboo_wind_bridge").not.toMatch(/url\(["']?https?:/);
    expect(body, "bamboo_wind_bridge").not.toContain("\uFFFD");
    expect(body, "bamboo_wind_bridge").toContain("</svg>");
  });

  it("validates generated SVG asset basket", () => {
    const href = GeneratedAssetRegistry["basket"];
    expect(href, "basket").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "basket").toBe(true);
    expect(body, "basket").toContain("aria-label");
    expect(body.length, "basket").toBeGreaterThan(900);
    expect(body, "basket").not.toContain("<image");
    expect(body, "basket").not.toMatch(/href=["']https?:/);
    expect(body, "basket").not.toMatch(/url\(["']?https?:/);
    expect(body, "basket").not.toContain("\uFFFD");
    expect(body, "basket").toContain("</svg>");
  });

  it("validates generated SVG asset basket_1", () => {
    const href = GeneratedAssetRegistry["basket_1"];
    expect(href, "basket_1").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "basket_1").toBe(true);
    expect(body, "basket_1").toContain("aria-label");
    expect(body.length, "basket_1").toBeGreaterThan(900);
    expect(body, "basket_1").not.toContain("<image");
    expect(body, "basket_1").not.toMatch(/href=["']https?:/);
    expect(body, "basket_1").not.toMatch(/url\(["']?https?:/);
    expect(body, "basket_1").not.toContain("\uFFFD");
    expect(body, "basket_1").toContain("</svg>");
  });

  it("validates generated SVG asset basket_25", () => {
    const href = GeneratedAssetRegistry["basket_25"];
    expect(href, "basket_25").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "basket_25").toBe(true);
    expect(body, "basket_25").toContain("aria-label");
    expect(body.length, "basket_25").toBeGreaterThan(900);
    expect(body, "basket_25").not.toContain("<image");
    expect(body, "basket_25").not.toMatch(/href=["']https?:/);
    expect(body, "basket_25").not.toMatch(/url\(["']?https?:/);
    expect(body, "basket_25").not.toContain("\uFFFD");
    expect(body, "basket_25").toContain("</svg>");
  });

  it("validates generated SVG asset biro", () => {
    const href = GeneratedAssetRegistry["biro"];
    expect(href, "biro").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "biro").toBe(true);
    expect(body, "biro").toContain("aria-label");
    expect(body.length, "biro").toBeGreaterThan(900);
    expect(body, "biro").not.toContain("<image");
    expect(body, "biro").not.toMatch(/href=["']https?:/);
    expect(body, "biro").not.toMatch(/url\(["']?https?:/);
    expect(body, "biro").not.toContain("\uFFFD");
    expect(body, "biro").toContain("</svg>");
  });

  it("validates generated SVG asset butler_gloves", () => {
    const href = GeneratedAssetRegistry["butler_gloves"];
    expect(href, "butler_gloves").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "butler_gloves").toBe(true);
    expect(body, "butler_gloves").toContain("aria-label");
    expect(body.length, "butler_gloves").toBeGreaterThan(900);
    expect(body, "butler_gloves").not.toContain("<image");
    expect(body, "butler_gloves").not.toMatch(/href=["']https?:/);
    expect(body, "butler_gloves").not.toMatch(/url\(["']?https?:/);
    expect(body, "butler_gloves").not.toContain("\uFFFD");
    expect(body, "butler_gloves").toContain("</svg>");
  });

  it("validates generated SVG asset butler_hand", () => {
    const href = GeneratedAssetRegistry["butler_hand"];
    expect(href, "butler_hand").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "butler_hand").toBe(true);
    expect(body, "butler_hand").toContain("aria-label");
    expect(body.length, "butler_hand").toBeGreaterThan(900);
    expect(body, "butler_hand").not.toContain("<image");
    expect(body, "butler_hand").not.toMatch(/href=["']https?:/);
    expect(body, "butler_hand").not.toMatch(/url\(["']?https?:/);
    expect(body, "butler_hand").not.toContain("\uFFFD");
    expect(body, "butler_hand").toContain("</svg>");
  });

  it("validates generated SVG asset butler_toolbox", () => {
    const href = GeneratedAssetRegistry["butler_toolbox"];
    expect(href, "butler_toolbox").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "butler_toolbox").toBe(true);
    expect(body, "butler_toolbox").toContain("aria-label");
    expect(body.length, "butler_toolbox").toBeGreaterThan(900);
    expect(body, "butler_toolbox").not.toContain("<image");
    expect(body, "butler_toolbox").not.toMatch(/href=["']https?:/);
    expect(body, "butler_toolbox").not.toMatch(/url\(["']?https?:/);
    expect(body, "butler_toolbox").not.toContain("\uFFFD");
    expect(body, "butler_toolbox").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-biro", () => {
    const href = GeneratedAssetRegistry["capybara-biro"];
    expect(href, "capybara-biro").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-biro").toBe(true);
    expect(body, "capybara-biro").toContain("aria-label");
    expect(body.length, "capybara-biro").toBeGreaterThan(900);
    expect(body, "capybara-biro").not.toContain("<image");
    expect(body, "capybara-biro").not.toMatch(/href=["']https?:/);
    expect(body, "capybara-biro").not.toMatch(/url\(["']?https?:/);
    expect(body, "capybara-biro").not.toContain("\uFFFD");
    expect(body, "capybara-biro").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-dami", () => {
    const href = GeneratedAssetRegistry["capybara-dami"];
    expect(href, "capybara-dami").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-dami").toBe(true);
    expect(body, "capybara-dami").toContain("aria-label");
    expect(body.length, "capybara-dami").toBeGreaterThan(900);
    expect(body, "capybara-dami").not.toContain("<image");
    expect(body, "capybara-dami").not.toMatch(/href=["']https?:/);
    expect(body, "capybara-dami").not.toMatch(/url\(["']?https?:/);
    expect(body, "capybara-dami").not.toContain("\uFFFD");
    expect(body, "capybara-dami").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-hanul", () => {
    const href = GeneratedAssetRegistry["capybara-hanul"];
    expect(href, "capybara-hanul").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-hanul").toBe(true);
    expect(body, "capybara-hanul").toContain("aria-label");
    expect(body.length, "capybara-hanul").toBeGreaterThan(900);
    expect(body, "capybara-hanul").not.toContain("<image");
    expect(body, "capybara-hanul").not.toMatch(/href=["']https?:/);
    expect(body, "capybara-hanul").not.toMatch(/url\(["']?https?:/);
    expect(body, "capybara-hanul").not.toContain("\uFFFD");
    expect(body, "capybara-hanul").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-momo", () => {
    const href = GeneratedAssetRegistry["capybara-momo"];
    expect(href, "capybara-momo").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-momo").toBe(true);
    expect(body, "capybara-momo").toContain("aria-label");
    expect(body.length, "capybara-momo").toBeGreaterThan(900);
    expect(body, "capybara-momo").not.toContain("<image");
    expect(body, "capybara-momo").not.toMatch(/href=["']https?:/);
    expect(body, "capybara-momo").not.toMatch(/url\(["']?https?:/);
    expect(body, "capybara-momo").not.toContain("\uFFFD");
    expect(body, "capybara-momo").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-narin", () => {
    const href = GeneratedAssetRegistry["capybara-narin"];
    expect(href, "capybara-narin").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-narin").toBe(true);
    expect(body, "capybara-narin").toContain("aria-label");
    expect(body.length, "capybara-narin").toBeGreaterThan(900);
    expect(body, "capybara-narin").not.toContain("<image");
    expect(body, "capybara-narin").not.toMatch(/href=["']https?:/);
    expect(body, "capybara-narin").not.toMatch(/url\(["']?https?:/);
    expect(body, "capybara-narin").not.toContain("\uFFFD");
    expect(body, "capybara-narin").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-podo", () => {
    const href = GeneratedAssetRegistry["capybara-podo"];
    expect(href, "capybara-podo").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-podo").toBe(true);
    expect(body, "capybara-podo").toContain("aria-label");
    expect(body.length, "capybara-podo").toBeGreaterThan(900);
    expect(body, "capybara-podo").not.toContain("<image");
    expect(body, "capybara-podo").not.toMatch(/href=["']https?:/);
    expect(body, "capybara-podo").not.toMatch(/url\(["']?https?:/);
    expect(body, "capybara-podo").not.toContain("\uFFFD");
    expect(body, "capybara-podo").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-ruru", () => {
    const href = GeneratedAssetRegistry["capybara-ruru"];
    expect(href, "capybara-ruru").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-ruru").toBe(true);
    expect(body, "capybara-ruru").toContain("aria-label");
    expect(body.length, "capybara-ruru").toBeGreaterThan(900);
    expect(body, "capybara-ruru").not.toContain("<image");
    expect(body, "capybara-ruru").not.toMatch(/href=["']https?:/);
    expect(body, "capybara-ruru").not.toMatch(/url\(["']?https?:/);
    expect(body, "capybara-ruru").not.toContain("\uFFFD");
    expect(body, "capybara-ruru").toContain("</svg>");
  });

  it("validates generated SVG asset capybara-soda", () => {
    const href = GeneratedAssetRegistry["capybara-soda"];
    expect(href, "capybara-soda").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "capybara-soda").toBe(true);
    expect(body, "capybara-soda").toContain("aria-label");
    expect(body.length, "capybara-soda").toBeGreaterThan(900);
    expect(body, "capybara-soda").not.toContain("<image");
    expect(body, "capybara-soda").not.toMatch(/href=["']https?:/);
    expect(body, "capybara-soda").not.toMatch(/url\(["']?https?:/);
    expect(body, "capybara-soda").not.toContain("\uFFFD");
    expect(body, "capybara-soda").toContain("</svg>");
  });

  it("validates generated SVG asset cart_stop", () => {
    const href = GeneratedAssetRegistry["cart_stop"];
    expect(href, "cart_stop").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "cart_stop").toBe(true);
    expect(body, "cart_stop").toContain("aria-label");
    expect(body.length, "cart_stop").toBeGreaterThan(900);
    expect(body, "cart_stop").not.toContain("<image");
    expect(body, "cart_stop").not.toMatch(/href=["']https?:/);
    expect(body, "cart_stop").not.toMatch(/url\(["']?https?:/);
    expect(body, "cart_stop").not.toContain("\uFFFD");
    expect(body, "cart_stop").toContain("</svg>");
  });

  it("validates generated SVG asset cart_stop_flag", () => {
    const href = GeneratedAssetRegistry["cart_stop_flag"];
    expect(href, "cart_stop_flag").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "cart_stop_flag").toBe(true);
    expect(body, "cart_stop_flag").toContain("aria-label");
    expect(body.length, "cart_stop_flag").toBeGreaterThan(900);
    expect(body, "cart_stop_flag").not.toContain("<image");
    expect(body, "cart_stop_flag").not.toMatch(/href=["']https?:/);
    expect(body, "cart_stop_flag").not.toMatch(/url\(["']?https?:/);
    expect(body, "cart_stop_flag").not.toContain("\uFFFD");
    expect(body, "cart_stop_flag").toContain("</svg>");
  });

  it("validates generated SVG asset chime", () => {
    const href = GeneratedAssetRegistry["chime"];
    expect(href, "chime").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "chime").toBe(true);
    expect(body, "chime").toContain("aria-label");
    expect(body.length, "chime").toBeGreaterThan(900);
    expect(body, "chime").not.toContain("<image");
    expect(body, "chime").not.toMatch(/href=["']https?:/);
    expect(body, "chime").not.toMatch(/url\(["']?https?:/);
    expect(body, "chime").not.toContain("\uFFFD");
    expect(body, "chime").toContain("</svg>");
  });

  it("validates generated SVG asset citrus_recipe", () => {
    const href = GeneratedAssetRegistry["citrus_recipe"];
    expect(href, "citrus_recipe").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "citrus_recipe").toBe(true);
    expect(body, "citrus_recipe").toContain("aria-label");
    expect(body.length, "citrus_recipe").toBeGreaterThan(900);
    expect(body, "citrus_recipe").not.toContain("<image");
    expect(body, "citrus_recipe").not.toMatch(/href=["']https?:/);
    expect(body, "citrus_recipe").not.toMatch(/url\(["']?https?:/);
    expect(body, "citrus_recipe").not.toContain("\uFFFD");
    expect(body, "citrus_recipe").toContain("</svg>");
  });

  it("validates generated SVG asset clap", () => {
    const href = GeneratedAssetRegistry["clap"];
    expect(href, "clap").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "clap").toBe(true);
    expect(body, "clap").toContain("aria-label");
    expect(body.length, "clap").toBeGreaterThan(900);
    expect(body, "clap").not.toContain("<image");
    expect(body, "clap").not.toMatch(/href=["']https?:/);
    expect(body, "clap").not.toMatch(/url\(["']?https?:/);
    expect(body, "clap").not.toContain("\uFFFD");
    expect(body, "clap").toContain("</svg>");
  });

  it("validates generated SVG asset collection", () => {
    const href = GeneratedAssetRegistry["collection"];
    expect(href, "collection").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "collection").toBe(true);
    expect(body, "collection").toContain("aria-label");
    expect(body.length, "collection").toBeGreaterThan(900);
    expect(body, "collection").not.toContain("<image");
    expect(body, "collection").not.toMatch(/href=["']https?:/);
    expect(body, "collection").not.toMatch(/url\(["']?https?:/);
    expect(body, "collection").not.toContain("\uFFFD");
    expect(body, "collection").toContain("</svg>");
  });

  it("validates generated SVG asset compost", () => {
    const href = GeneratedAssetRegistry["compost"];
    expect(href, "compost").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "compost").toBe(true);
    expect(body, "compost").toContain("aria-label");
    expect(body.length, "compost").toBeGreaterThan(900);
    expect(body, "compost").not.toContain("<image");
    expect(body, "compost").not.toMatch(/href=["']https?:/);
    expect(body, "compost").not.toMatch(/url\(["']?https?:/);
    expect(body, "compost").not.toContain("\uFFFD");
    expect(body, "compost").toContain("</svg>");
  });

  it("validates generated SVG asset compost_greenhouse", () => {
    const href = GeneratedAssetRegistry["compost_greenhouse"];
    expect(href, "compost_greenhouse").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "compost_greenhouse").toBe(true);
    expect(body, "compost_greenhouse").toContain("aria-label");
    expect(body.length, "compost_greenhouse").toBeGreaterThan(900);
    expect(body, "compost_greenhouse").not.toContain("<image");
    expect(body, "compost_greenhouse").not.toMatch(/href=["']https?:/);
    expect(body, "compost_greenhouse").not.toMatch(/url\(["']?https?:/);
    expect(body, "compost_greenhouse").not.toContain("\uFFFD");
    expect(body, "compost_greenhouse").toContain("</svg>");
  });

  it("validates generated SVG asset crate", () => {
    const href = GeneratedAssetRegistry["crate"];
    expect(href, "crate").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "crate").toBe(true);
    expect(body, "crate").toContain("aria-label");
    expect(body.length, "crate").toBeGreaterThan(900);
    expect(body, "crate").not.toContain("<image");
    expect(body, "crate").not.toMatch(/href=["']https?:/);
    expect(body, "crate").not.toMatch(/url\(["']?https?:/);
    expect(body, "crate").not.toContain("\uFFFD");
    expect(body, "crate").toContain("</svg>");
  });

  it("validates generated SVG asset crate_lane", () => {
    const href = GeneratedAssetRegistry["crate_lane"];
    expect(href, "crate_lane").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "crate_lane").toBe(true);
    expect(body, "crate_lane").toContain("aria-label");
    expect(body.length, "crate_lane").toBeGreaterThan(900);
    expect(body, "crate_lane").not.toContain("<image");
    expect(body, "crate_lane").not.toMatch(/href=["']https?:/);
    expect(body, "crate_lane").not.toMatch(/url\(["']?https?:/);
    expect(body, "crate_lane").not.toContain("\uFFFD");
    expect(body, "crate_lane").toContain("</svg>");
  });

  it("validates generated SVG asset dami", () => {
    const href = GeneratedAssetRegistry["dami"];
    expect(href, "dami").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "dami").toBe(true);
    expect(body, "dami").toContain("aria-label");
    expect(body.length, "dami").toBeGreaterThan(900);
    expect(body, "dami").not.toContain("<image");
    expect(body, "dami").not.toMatch(/href=["']https?:/);
    expect(body, "dami").not.toMatch(/url\(["']?https?:/);
    expect(body, "dami").not.toContain("\uFFFD");
    expect(body, "dami").toContain("</svg>");
  });

  it("validates generated SVG asset eps_10", () => {
    const href = GeneratedAssetRegistry["eps_10"];
    expect(href, "eps_10").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "eps_10").toBe(true);
    expect(body, "eps_10").toContain("aria-label");
    expect(body.length, "eps_10").toBeGreaterThan(900);
    expect(body, "eps_10").not.toContain("<image");
    expect(body, "eps_10").not.toMatch(/href=["']https?:/);
    expect(body, "eps_10").not.toMatch(/url\(["']?https?:/);
    expect(body, "eps_10").not.toContain("\uFFFD");
    expect(body, "eps_10").toContain("</svg>");
  });

  it("validates generated SVG asset eps_100k", () => {
    const href = GeneratedAssetRegistry["eps_100k"];
    expect(href, "eps_100k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "eps_100k").toBe(true);
    expect(body, "eps_100k").toContain("aria-label");
    expect(body.length, "eps_100k").toBeGreaterThan(900);
    expect(body, "eps_100k").not.toContain("<image");
    expect(body, "eps_100k").not.toMatch(/href=["']https?:/);
    expect(body, "eps_100k").not.toMatch(/url\(["']?https?:/);
    expect(body, "eps_100k").not.toContain("\uFFFD");
    expect(body, "eps_100k").toContain("</svg>");
  });

  it("validates generated SVG asset eps_1k", () => {
    const href = GeneratedAssetRegistry["eps_1k"];
    expect(href, "eps_1k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "eps_1k").toBe(true);
    expect(body, "eps_1k").toContain("aria-label");
    expect(body.length, "eps_1k").toBeGreaterThan(900);
    expect(body, "eps_1k").not.toContain("<image");
    expect(body, "eps_1k").not.toMatch(/href=["']https?:/);
    expect(body, "eps_1k").not.toMatch(/url\(["']?https?:/);
    expect(body, "eps_1k").not.toContain("\uFFFD");
    expect(body, "eps_1k").toContain("</svg>");
  });

  it("validates generated SVG asset eps_1m", () => {
    const href = GeneratedAssetRegistry["eps_1m"];
    expect(href, "eps_1m").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "eps_1m").toBe(true);
    expect(body, "eps_1m").toContain("aria-label");
    expect(body.length, "eps_1m").toBeGreaterThan(900);
    expect(body, "eps_1m").not.toContain("<image");
    expect(body, "eps_1m").not.toMatch(/href=["']https?:/);
    expect(body, "eps_1m").not.toMatch(/url\(["']?https?:/);
    expect(body, "eps_1m").not.toContain("\uFFFD");
    expect(body, "eps_1m").toContain("</svg>");
  });

  it("validates generated SVG asset facility_suite", () => {
    const href = GeneratedAssetRegistry["facility_suite"];
    expect(href, "facility_suite").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "facility_suite").toBe(true);
    expect(body, "facility_suite").toContain("aria-label");
    expect(body.length, "facility_suite").toBeGreaterThan(900);
    expect(body, "facility_suite").not.toContain("<image");
    expect(body, "facility_suite").not.toMatch(/href=["']https?:/);
    expect(body, "facility_suite").not.toMatch(/url\(["']?https?:/);
    expect(body, "facility_suite").not.toContain("\uFFFD");
    expect(body, "facility_suite").toContain("</svg>");
  });

  it("validates generated SVG asset festival", () => {
    const href = GeneratedAssetRegistry["festival"];
    expect(href, "festival").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "festival").toBe(true);
    expect(body, "festival").toContain("aria-label");
    expect(body.length, "festival").toBeGreaterThan(900);
    expect(body, "festival").not.toContain("<image");
    expect(body, "festival").not.toMatch(/href=["']https?:/);
    expect(body, "festival").not.toMatch(/url\(["']?https?:/);
    expect(body, "festival").not.toContain("\uFFFD");
    expect(body, "festival").toContain("</svg>");
  });

  it("validates generated SVG asset festival_clap", () => {
    const href = GeneratedAssetRegistry["festival_clap"];
    expect(href, "festival_clap").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "festival_clap").toBe(true);
    expect(body, "festival_clap").toContain("aria-label");
    expect(body.length, "festival_clap").toBeGreaterThan(900);
    expect(body, "festival_clap").not.toContain("<image");
    expect(body, "festival_clap").not.toMatch(/href=["']https?:/);
    expect(body, "festival_clap").not.toMatch(/url\(["']?https?:/);
    expect(body, "festival_clap").not.toContain("\uFFFD");
    expect(body, "festival_clap").toContain("</svg>");
  });

  it("validates generated SVG asset festival_ribbon", () => {
    const href = GeneratedAssetRegistry["festival_ribbon"];
    expect(href, "festival_ribbon").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "festival_ribbon").toBe(true);
    expect(body, "festival_ribbon").toContain("aria-label");
    expect(body.length, "festival_ribbon").toBeGreaterThan(900);
    expect(body, "festival_ribbon").not.toContain("<image");
    expect(body, "festival_ribbon").not.toMatch(/href=["']https?:/);
    expect(body, "festival_ribbon").not.toMatch(/url\(["']?https?:/);
    expect(body, "festival_ribbon").not.toContain("\uFFFD");
    expect(body, "festival_ribbon").toContain("</svg>");
  });

  it("validates generated SVG asset first_100_oranges", () => {
    const href = GeneratedAssetRegistry["first_100_oranges"];
    expect(href, "first_100_oranges").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "first_100_oranges").toBe(true);
    expect(body, "first_100_oranges").toContain("aria-label");
    expect(body.length, "first_100_oranges").toBeGreaterThan(900);
    expect(body, "first_100_oranges").not.toContain("<image");
    expect(body, "first_100_oranges").not.toMatch(/href=["']https?:/);
    expect(body, "first_100_oranges").not.toMatch(/url\(["']?https?:/);
    expect(body, "first_100_oranges").not.toContain("\uFFFD");
    expect(body, "first_100_oranges").toContain("</svg>");
  });

  it("validates generated SVG asset first_1k_oranges", () => {
    const href = GeneratedAssetRegistry["first_1k_oranges"];
    expect(href, "first_1k_oranges").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "first_1k_oranges").toBe(true);
    expect(body, "first_1k_oranges").toContain("aria-label");
    expect(body.length, "first_1k_oranges").toBeGreaterThan(900);
    expect(body, "first_1k_oranges").not.toContain("<image");
    expect(body, "first_1k_oranges").not.toMatch(/href=["']https?:/);
    expect(body, "first_1k_oranges").not.toMatch(/url\(["']?https?:/);
    expect(body, "first_1k_oranges").not.toContain("\uFFFD");
    expect(body, "first_1k_oranges").toContain("</svg>");
  });

  it("validates generated SVG asset first_leaf", () => {
    const href = GeneratedAssetRegistry["first_leaf"];
    expect(href, "first_leaf").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "first_leaf").toBe(true);
    expect(body, "first_leaf").toContain("aria-label");
    expect(body.length, "first_leaf").toBeGreaterThan(900);
    expect(body, "first_leaf").not.toContain("<image");
    expect(body, "first_leaf").not.toMatch(/href=["']https?:/);
    expect(body, "first_leaf").not.toMatch(/url\(["']?https?:/);
    expect(body, "first_leaf").not.toContain("\uFFFD");
    expect(body, "first_leaf").toContain("</svg>");
  });

  it("validates generated SVG asset first_leaf_plaque", () => {
    const href = GeneratedAssetRegistry["first_leaf_plaque"];
    expect(href, "first_leaf_plaque").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "first_leaf_plaque").toBe(true);
    expect(body, "first_leaf_plaque").toContain("aria-label");
    expect(body.length, "first_leaf_plaque").toBeGreaterThan(900);
    expect(body, "first_leaf_plaque").not.toContain("<image");
    expect(body, "first_leaf_plaque").not.toMatch(/href=["']https?:/);
    expect(body, "first_leaf_plaque").not.toMatch(/url\(["']?https?:/);
    expect(body, "first_leaf_plaque").not.toContain("\uFFFD");
    expect(body, "first_leaf_plaque").toContain("</svg>");
  });

  it("validates generated SVG asset first_orange", () => {
    const href = GeneratedAssetRegistry["first_orange"];
    expect(href, "first_orange").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "first_orange").toBe(true);
    expect(body, "first_orange").toContain("aria-label");
    expect(body.length, "first_orange").toBeGreaterThan(900);
    expect(body, "first_orange").not.toContain("<image");
    expect(body, "first_orange").not.toMatch(/href=["']https?:/);
    expect(body, "first_orange").not.toMatch(/url\(["']?https?:/);
    expect(body, "first_orange").not.toContain("\uFFFD");
    expect(body, "first_orange").toContain("</svg>");
  });

  it("validates generated SVG asset first_prestige", () => {
    const href = GeneratedAssetRegistry["first_prestige"];
    expect(href, "first_prestige").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "first_prestige").toBe(true);
    expect(body, "first_prestige").toContain("aria-label");
    expect(body.length, "first_prestige").toBeGreaterThan(900);
    expect(body, "first_prestige").not.toContain("<image");
    expect(body, "first_prestige").not.toMatch(/href=["']https?:/);
    expect(body, "first_prestige").not.toMatch(/url\(["']?https?:/);
    expect(body, "first_prestige").not.toContain("\uFFFD");
    expect(body, "first_prestige").toContain("</svg>");
  });

  it("validates generated SVG asset five_leaf", () => {
    const href = GeneratedAssetRegistry["five_leaf"];
    expect(href, "five_leaf").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "five_leaf").toBe(true);
    expect(body, "five_leaf").toContain("aria-label");
    expect(body.length, "five_leaf").toBeGreaterThan(900);
    expect(body, "five_leaf").not.toContain("<image");
    expect(body, "five_leaf").not.toMatch(/href=["']https?:/);
    expect(body, "five_leaf").not.toMatch(/url\(["']?https?:/);
    expect(body, "five_leaf").not.toContain("\uFFFD");
    expect(body, "five_leaf").toContain("</svg>");
  });

  it("validates generated SVG asset fragrance_shelf", () => {
    const href = GeneratedAssetRegistry["fragrance_shelf"];
    expect(href, "fragrance_shelf").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "fragrance_shelf").toBe(true);
    expect(body, "fragrance_shelf").toContain("aria-label");
    expect(body.length, "fragrance_shelf").toBeGreaterThan(900);
    expect(body, "fragrance_shelf").not.toContain("<image");
    expect(body, "fragrance_shelf").not.toMatch(/href=["']https?:/);
    expect(body, "fragrance_shelf").not.toMatch(/url\(["']?https?:/);
    expect(body, "fragrance_shelf").not.toContain("\uFFFD");
    expect(body, "fragrance_shelf").toContain("</svg>");
  });

  it("validates generated SVG asset fragrance_storehouse", () => {
    const href = GeneratedAssetRegistry["fragrance_storehouse"];
    expect(href, "fragrance_storehouse").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "fragrance_storehouse").toBe(true);
    expect(body, "fragrance_storehouse").toContain("aria-label");
    expect(body.length, "fragrance_storehouse").toBeGreaterThan(900);
    expect(body, "fragrance_storehouse").not.toContain("<image");
    expect(body, "fragrance_storehouse").not.toMatch(/href=["']https?:/);
    expect(body, "fragrance_storehouse").not.toMatch(/url\(["']?https?:/);
    expect(body, "fragrance_storehouse").not.toContain("\uFFFD");
    expect(body, "fragrance_storehouse").toContain("</svg>");
  });

  it("validates generated SVG asset fragrant_25k", () => {
    const href = GeneratedAssetRegistry["fragrant_25k"];
    expect(href, "fragrant_25k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "fragrant_25k").toBe(true);
    expect(body, "fragrant_25k").toContain("aria-label");
    expect(body.length, "fragrant_25k").toBeGreaterThan(900);
    expect(body, "fragrant_25k").not.toContain("<image");
    expect(body, "fragrant_25k").not.toMatch(/href=["']https?:/);
    expect(body, "fragrant_25k").not.toMatch(/url\(["']?https?:/);
    expect(body, "fragrant_25k").not.toContain("\uFFFD");
    expect(body, "fragrant_25k").toContain("</svg>");
  });

  it("validates generated SVG asset generator_suite_120", () => {
    const href = GeneratedAssetRegistry["generator_suite_120"];
    expect(href, "generator_suite_120").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "generator_suite_120").toBe(true);
    expect(body, "generator_suite_120").toContain("aria-label");
    expect(body.length, "generator_suite_120").toBeGreaterThan(900);
    expect(body, "generator_suite_120").not.toContain("<image");
    expect(body, "generator_suite_120").not.toMatch(/href=["']https?:/);
    expect(body, "generator_suite_120").not.toMatch(/url\(["']?https?:/);
    expect(body, "generator_suite_120").not.toContain("\uFFFD");
    expect(body, "generator_suite_120").toContain("</svg>");
  });

  it("validates generated SVG asset generator_suite_20", () => {
    const href = GeneratedAssetRegistry["generator_suite_20"];
    expect(href, "generator_suite_20").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "generator_suite_20").toBe(true);
    expect(body, "generator_suite_20").toContain("aria-label");
    expect(body.length, "generator_suite_20").toBeGreaterThan(900);
    expect(body, "generator_suite_20").not.toContain("<image");
    expect(body, "generator_suite_20").not.toMatch(/href=["']https?:/);
    expect(body, "generator_suite_20").not.toMatch(/url\(["']?https?:/);
    expect(body, "generator_suite_20").not.toContain("\uFFFD");
    expect(body, "generator_suite_20").toContain("</svg>");
  });

  it("validates generated SVG asset gift", () => {
    const href = GeneratedAssetRegistry["gift"];
    expect(href, "gift").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "gift").toBe(true);
    expect(body, "gift").toContain("aria-label");
    expect(body.length, "gift").toBeGreaterThan(900);
    expect(body, "gift").not.toContain("<image");
    expect(body, "gift").not.toMatch(/href=["']https?:/);
    expect(body, "gift").not.toMatch(/url\(["']?https?:/);
    expect(body, "gift").not.toContain("\uFFFD");
    expect(body, "gift").toContain("</svg>");
  });

  it("validates generated SVG asset glove", () => {
    const href = GeneratedAssetRegistry["glove"];
    expect(href, "glove").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "glove").toBe(true);
    expect(body, "glove").toContain("aria-label");
    expect(body.length, "glove").toBeGreaterThan(900);
    expect(body, "glove").not.toContain("<image");
    expect(body, "glove").not.toMatch(/href=["']https?:/);
    expect(body, "glove").not.toMatch(/url\(["']?https?:/);
    expect(body, "glove").not.toContain("\uFFFD");
    expect(body, "glove").toContain("</svg>");
  });

  it("validates generated SVG asset gold_path", () => {
    const href = GeneratedAssetRegistry["gold_path"];
    expect(href, "gold_path").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "gold_path").toBe(true);
    expect(body, "gold_path").toContain("aria-label");
    expect(body.length, "gold_path").toBeGreaterThan(900);
    expect(body, "gold_path").not.toContain("<image");
    expect(body, "gold_path").not.toMatch(/href=["']https?:/);
    expect(body, "gold_path").not.toMatch(/url\(["']?https?:/);
    expect(body, "gold_path").not.toContain("\uFFFD");
    expect(body, "gold_path").toContain("</svg>");
  });

  it("validates generated SVG asset gold_path_first", () => {
    const href = GeneratedAssetRegistry["gold_path_first"];
    expect(href, "gold_path_first").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "gold_path_first").toBe(true);
    expect(body, "gold_path_first").toContain("aria-label");
    expect(body.length, "gold_path_first").toBeGreaterThan(900);
    expect(body, "gold_path_first").not.toContain("<image");
    expect(body, "gold_path_first").not.toMatch(/href=["']https?:/);
    expect(body, "gold_path_first").not.toMatch(/url\(["']?https?:/);
    expect(body, "gold_path_first").not.toContain("\uFFFD");
    expect(body, "gold_path_first").toContain("</svg>");
  });

  it("validates generated SVG asset golden_25m", () => {
    const href = GeneratedAssetRegistry["golden_25m"];
    expect(href, "golden_25m").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_25m").toBe(true);
    expect(body, "golden_25m").toContain("aria-label");
    expect(body.length, "golden_25m").toBeGreaterThan(900);
    expect(body, "golden_25m").not.toContain("<image");
    expect(body, "golden_25m").not.toMatch(/href=["']https?:/);
    expect(body, "golden_25m").not.toMatch(/url\(["']?https?:/);
    expect(body, "golden_25m").not.toContain("\uFFFD");
    expect(body, "golden_25m").toContain("</svg>");
  });

  it("validates generated SVG asset golden_compost", () => {
    const href = GeneratedAssetRegistry["golden_compost"];
    expect(href, "golden_compost").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_compost").toBe(true);
    expect(body, "golden_compost").toContain("aria-label");
    expect(body.length, "golden_compost").toBeGreaterThan(900);
    expect(body, "golden_compost").not.toContain("<image");
    expect(body, "golden_compost").not.toMatch(/href=["']https?:/);
    expect(body, "golden_compost").not.toMatch(/url\(["']?https?:/);
    expect(body, "golden_compost").not.toContain("\uFFFD");
    expect(body, "golden_compost").toContain("</svg>");
  });

  it("validates generated SVG asset golden_first_prestige", () => {
    const href = GeneratedAssetRegistry["golden_first_prestige"];
    expect(href, "golden_first_prestige").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_first_prestige").toBe(true);
    expect(body, "golden_first_prestige").toContain("aria-label");
    expect(body.length, "golden_first_prestige").toBeGreaterThan(900);
    expect(body, "golden_first_prestige").not.toContain("<image");
    expect(body, "golden_first_prestige").not.toMatch(/href=["']https?:/);
    expect(body, "golden_first_prestige").not.toMatch(/url\(["']?https?:/);
    expect(body, "golden_first_prestige").not.toContain("\uFFFD");
    expect(body, "golden_first_prestige").toContain("</svg>");
  });

  it("validates generated SVG asset golden_five_leaves", () => {
    const href = GeneratedAssetRegistry["golden_five_leaves"];
    expect(href, "golden_five_leaves").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_five_leaves").toBe(true);
    expect(body, "golden_five_leaves").toContain("aria-label");
    expect(body.length, "golden_five_leaves").toBeGreaterThan(900);
    expect(body, "golden_five_leaves").not.toContain("<image");
    expect(body, "golden_five_leaves").not.toMatch(/href=["']https?:/);
    expect(body, "golden_five_leaves").not.toMatch(/url\(["']?https?:/);
    expect(body, "golden_five_leaves").not.toContain("\uFFFD");
    expect(body, "golden_five_leaves").toContain("</svg>");
  });

  it("validates generated SVG asset golden_forest", () => {
    const href = GeneratedAssetRegistry["golden_forest"];
    expect(href, "golden_forest").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_forest").toBe(true);
    expect(body, "golden_forest").toContain("aria-label");
    expect(body.length, "golden_forest").toBeGreaterThan(900);
    expect(body, "golden_forest").not.toContain("<image");
    expect(body, "golden_forest").not.toMatch(/href=["']https?:/);
    expect(body, "golden_forest").not.toMatch(/url\(["']?https?:/);
    expect(body, "golden_forest").not.toContain("\uFFFD");
    expect(body, "golden_forest").toContain("</svg>");
  });

  it("validates generated SVG asset golden_forest_arch", () => {
    const href = GeneratedAssetRegistry["golden_forest_arch"];
    expect(href, "golden_forest_arch").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_forest_arch").toBe(true);
    expect(body, "golden_forest_arch").toContain("aria-label");
    expect(body.length, "golden_forest_arch").toBeGreaterThan(900);
    expect(body, "golden_forest_arch").not.toContain("<image");
    expect(body, "golden_forest_arch").not.toMatch(/href=["']https?:/);
    expect(body, "golden_forest_arch").not.toMatch(/url\(["']?https?:/);
    expect(body, "golden_forest_arch").not.toContain("\uFFFD");
    expect(body, "golden_forest_arch").toContain("</svg>");
  });

  it("validates generated SVG asset golden_forest_path", () => {
    const href = GeneratedAssetRegistry["golden_forest_path"];
    expect(href, "golden_forest_path").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_forest_path").toBe(true);
    expect(body, "golden_forest_path").toContain("aria-label");
    expect(body.length, "golden_forest_path").toBeGreaterThan(900);
    expect(body, "golden_forest_path").not.toContain("<image");
    expect(body, "golden_forest_path").not.toMatch(/href=["']https?:/);
    expect(body, "golden_forest_path").not.toMatch(/url\(["']?https?:/);
    expect(body, "golden_forest_path").not.toContain("\uFFFD");
    expect(body, "golden_forest_path").toContain("</svg>");
  });

  it("validates generated SVG asset golden_leaf_path", () => {
    const href = GeneratedAssetRegistry["golden_leaf_path"];
    expect(href, "golden_leaf_path").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_leaf_path").toBe(true);
    expect(body, "golden_leaf_path").toContain("aria-label");
    expect(body.length, "golden_leaf_path").toBeGreaterThan(900);
    expect(body, "golden_leaf_path").not.toContain("<image");
    expect(body, "golden_leaf_path").not.toMatch(/href=["']https?:/);
    expect(body, "golden_leaf_path").not.toMatch(/url\(["']?https?:/);
    expect(body, "golden_leaf_path").not.toContain("\uFFFD");
    expect(body, "golden_leaf_path").toContain("</svg>");
  });

  it("validates generated SVG asset golden_leaf_polish", () => {
    const href = GeneratedAssetRegistry["golden_leaf_polish"];
    expect(href, "golden_leaf_polish").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_leaf_polish").toBe(true);
    expect(body, "golden_leaf_polish").toContain("aria-label");
    expect(body.length, "golden_leaf_polish").toBeGreaterThan(900);
    expect(body, "golden_leaf_polish").not.toContain("<image");
    expect(body, "golden_leaf_polish").not.toMatch(/href=["']https?:/);
    expect(body, "golden_leaf_polish").not.toMatch(/url\(["']?https?:/);
    expect(body, "golden_leaf_polish").not.toContain("\uFFFD");
    expect(body, "golden_leaf_polish").toContain("</svg>");
  });

  it("validates generated SVG asset golden_memory_gate", () => {
    const href = GeneratedAssetRegistry["golden_memory_gate"];
    expect(href, "golden_memory_gate").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_memory_gate").toBe(true);
    expect(body, "golden_memory_gate").toContain("aria-label");
    expect(body.length, "golden_memory_gate").toBeGreaterThan(900);
    expect(body, "golden_memory_gate").not.toContain("<image");
    expect(body, "golden_memory_gate").not.toMatch(/href=["']https?:/);
    expect(body, "golden_memory_gate").not.toMatch(/url\(["']?https?:/);
    expect(body, "golden_memory_gate").not.toContain("\uFFFD");
    expect(body, "golden_memory_gate").toContain("</svg>");
  });

  it("validates generated SVG asset golden_memory_touch", () => {
    const href = GeneratedAssetRegistry["golden_memory_touch"];
    expect(href, "golden_memory_touch").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_memory_touch").toBe(true);
    expect(body, "golden_memory_touch").toContain("aria-label");
    expect(body.length, "golden_memory_touch").toBeGreaterThan(900);
    expect(body, "golden_memory_touch").not.toContain("<image");
    expect(body, "golden_memory_touch").not.toMatch(/href=["']https?:/);
    expect(body, "golden_memory_touch").not.toMatch(/url\(["']?https?:/);
    expect(body, "golden_memory_touch").not.toContain("\uFFFD");
    expect(body, "golden_memory_touch").toContain("</svg>");
  });

  it("validates generated SVG asset golden_observatory", () => {
    const href = GeneratedAssetRegistry["golden_observatory"];
    expect(href, "golden_observatory").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_observatory").toBe(true);
    expect(body, "golden_observatory").toContain("aria-label");
    expect(body.length, "golden_observatory").toBeGreaterThan(900);
    expect(body, "golden_observatory").not.toContain("<image");
    expect(body, "golden_observatory").not.toMatch(/href=["']https?:/);
    expect(body, "golden_observatory").not.toMatch(/url\(["']?https?:/);
    expect(body, "golden_observatory").not.toContain("\uFFFD");
    expect(body, "golden_observatory").toContain("</svg>");
  });

  it("validates generated SVG asset golden_open", () => {
    const href = GeneratedAssetRegistry["golden_open"];
    expect(href, "golden_open").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "golden_open").toBe(true);
    expect(body, "golden_open").toContain("aria-label");
    expect(body.length, "golden_open").toBeGreaterThan(900);
    expect(body, "golden_open").not.toContain("<image");
    expect(body, "golden_open").not.toMatch(/href=["']https?:/);
    expect(body, "golden_open").not.toMatch(/url\(["']?https?:/);
    expect(body, "golden_open").not.toContain("\uFFFD");
    expect(body, "golden_open").toContain("</svg>");
  });

  it("validates generated SVG asset hanul", () => {
    const href = GeneratedAssetRegistry["hanul"];
    expect(href, "hanul").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "hanul").toBe(true);
    expect(body, "hanul").toContain("aria-label");
    expect(body.length, "hanul").toBeGreaterThan(900);
    expect(body, "hanul").not.toContain("<image");
    expect(body, "hanul").not.toMatch(/href=["']https?:/);
    expect(body, "hanul").not.toMatch(/url\(["']?https?:/);
    expect(body, "hanul").not.toContain("\uFFFD");
    expect(body, "hanul").toContain("</svg>");
  });

  it("validates generated SVG asset home", () => {
    const href = GeneratedAssetRegistry["home"];
    expect(href, "home").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "home").toBe(true);
    expect(body, "home").toContain("aria-label");
    expect(body.length, "home").toBeGreaterThan(900);
    expect(body, "home").not.toContain("<image");
    expect(body, "home").not.toMatch(/href=["']https?:/);
    expect(body, "home").not.toMatch(/url\(["']?https?:/);
    expect(body, "home").not.toContain("\uFFFD");
    expect(body, "home").toContain("</svg>");
  });

  it("validates generated SVG asset hundred_taps", () => {
    const href = GeneratedAssetRegistry["hundred_taps"];
    expect(href, "hundred_taps").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "hundred_taps").toBe(true);
    expect(body, "hundred_taps").toContain("aria-label");
    expect(body.length, "hundred_taps").toBeGreaterThan(900);
    expect(body, "hundred_taps").not.toContain("<image");
    expect(body, "hundred_taps").not.toMatch(/href=["']https?:/);
    expect(body, "hundred_taps").not.toMatch(/url\(["']?https?:/);
    expect(body, "hundred_taps").not.toContain("\uFFFD");
    expect(body, "hundred_taps").toContain("</svg>");
  });

  it("validates generated SVG asset key", () => {
    const href = GeneratedAssetRegistry["key"];
    expect(href, "key").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "key").toBe(true);
    expect(body, "key").toContain("aria-label");
    expect(body.length, "key").toBeGreaterThan(900);
    expect(body, "key").not.toContain("<image");
    expect(body, "key").not.toMatch(/href=["']https?:/);
    expect(body, "key").not.toMatch(/url\(["']?https?:/);
    expect(body, "key").not.toContain("\uFFFD");
    expect(body, "key").toContain("</svg>");
  });

  it("validates generated SVG asset lantern", () => {
    const href = GeneratedAssetRegistry["lantern"];
    expect(href, "lantern").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "lantern").toBe(true);
    expect(body, "lantern").toContain("aria-label");
    expect(body.length, "lantern").toBeGreaterThan(900);
    expect(body, "lantern").not.toContain("<image");
    expect(body, "lantern").not.toMatch(/href=["']https?:/);
    expect(body, "lantern").not.toMatch(/url\(["']?https?:/);
    expect(body, "lantern").not.toContain("\uFFFD");
    expect(body, "lantern").toContain("</svg>");
  });

  it("validates generated SVG asset late_game_marker", () => {
    const href = GeneratedAssetRegistry["late_game_marker"];
    expect(href, "late_game_marker").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "late_game_marker").toBe(true);
    expect(body, "late_game_marker").toContain("aria-label");
    expect(body.length, "late_game_marker").toBeGreaterThan(900);
    expect(body, "late_game_marker").not.toContain("<image");
    expect(body, "late_game_marker").not.toMatch(/href=["']https?:/);
    expect(body, "late_game_marker").not.toMatch(/url\(["']?https?:/);
    expect(body, "late_game_marker").not.toContain("\uFFFD");
    expect(body, "late_game_marker").toContain("</svg>");
  });

  it("validates generated SVG asset leaf", () => {
    const href = GeneratedAssetRegistry["leaf"];
    expect(href, "leaf").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "leaf").toBe(true);
    expect(body, "leaf").toContain("aria-label");
    expect(body.length, "leaf").toBeGreaterThan(900);
    expect(body, "leaf").not.toContain("<image");
    expect(body, "leaf").not.toMatch(/href=["']https?:/);
    expect(body, "leaf").not.toMatch(/url\(["']?https?:/);
    expect(body, "leaf").not.toContain("\uFFFD");
    expect(body, "leaf").toContain("</svg>");
  });

  it("validates generated SVG asset leaf_5", () => {
    const href = GeneratedAssetRegistry["leaf_5"];
    expect(href, "leaf_5").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "leaf_5").toBe(true);
    expect(body, "leaf_5").toContain("aria-label");
    expect(body.length, "leaf_5").toBeGreaterThan(900);
    expect(body, "leaf_5").not.toContain("<image");
    expect(body, "leaf_5").not.toMatch(/href=["']https?:/);
    expect(body, "leaf_5").not.toMatch(/url\(["']?https?:/);
    expect(body, "leaf_5").not.toContain("\uFFFD");
    expect(body, "leaf_5").toContain("</svg>");
  });

  it("validates generated SVG asset leaf_compost_house", () => {
    const href = GeneratedAssetRegistry["leaf_compost_house"];
    expect(href, "leaf_compost_house").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "leaf_compost_house").toBe(true);
    expect(body, "leaf_compost_house").toContain("aria-label");
    expect(body.length, "leaf_compost_house").toBeGreaterThan(900);
    expect(body, "leaf_compost_house").not.toContain("<image");
    expect(body, "leaf_compost_house").not.toMatch(/href=["']https?:/);
    expect(body, "leaf_compost_house").not.toMatch(/url\(["']?https?:/);
    expect(body, "leaf_compost_house").not.toContain("\uFFFD");
    expect(body, "leaf_compost_house").toContain("</svg>");
  });

  it("validates generated SVG asset leaf_polish", () => {
    const href = GeneratedAssetRegistry["leaf_polish"];
    expect(href, "leaf_polish").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "leaf_polish").toBe(true);
    expect(body, "leaf_polish").toContain("aria-label");
    expect(body.length, "leaf_polish").toBeGreaterThan(900);
    expect(body, "leaf_polish").not.toContain("<image");
    expect(body, "leaf_polish").not.toMatch(/href=["']https?:/);
    expect(body, "leaf_polish").not.toMatch(/url\(["']?https?:/);
    expect(body, "leaf_polish").not.toContain("\uFFFD");
    expect(body, "leaf_polish").toContain("</svg>");
  });

  it("validates generated SVG asset mascot-celebrate", () => {
    const href = GeneratedAssetRegistry["mascot-celebrate"];
    expect(href, "mascot-celebrate").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "mascot-celebrate").toBe(true);
    expect(body, "mascot-celebrate").toContain("aria-label");
    expect(body.length, "mascot-celebrate").toBeGreaterThan(900);
    expect(body, "mascot-celebrate").not.toContain("<image");
    expect(body, "mascot-celebrate").not.toMatch(/href=["']https?:/);
    expect(body, "mascot-celebrate").not.toMatch(/url\(["']?https?:/);
    expect(body, "mascot-celebrate").not.toContain("\uFFFD");
    expect(body, "mascot-celebrate").toContain("</svg>");
  });

  it("validates generated SVG asset mascot-default", () => {
    const href = GeneratedAssetRegistry["mascot-default"];
    expect(href, "mascot-default").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "mascot-default").toBe(true);
    expect(body, "mascot-default").toContain("aria-label");
    expect(body.length, "mascot-default").toBeGreaterThan(900);
    expect(body, "mascot-default").not.toContain("<image");
    expect(body, "mascot-default").not.toMatch(/href=["']https?:/);
    expect(body, "mascot-default").not.toMatch(/url\(["']?https?:/);
    expect(body, "mascot-default").not.toContain("\uFFFD");
    expect(body, "mascot-default").toContain("</svg>");
  });

  it("validates generated SVG asset mascot-eating", () => {
    const href = GeneratedAssetRegistry["mascot-eating"];
    expect(href, "mascot-eating").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "mascot-eating").toBe(true);
    expect(body, "mascot-eating").toContain("aria-label");
    expect(body.length, "mascot-eating").toBeGreaterThan(900);
    expect(body, "mascot-eating").not.toContain("<image");
    expect(body, "mascot-eating").not.toMatch(/href=["']https?:/);
    expect(body, "mascot-eating").not.toMatch(/url\(["']?https?:/);
    expect(body, "mascot-eating").not.toContain("\uFFFD");
    expect(body, "mascot-eating").toContain("</svg>");
  });

  it("validates generated SVG asset mascot-happy", () => {
    const href = GeneratedAssetRegistry["mascot-happy"];
    expect(href, "mascot-happy").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "mascot-happy").toBe(true);
    expect(body, "mascot-happy").toContain("aria-label");
    expect(body.length, "mascot-happy").toBeGreaterThan(900);
    expect(body, "mascot-happy").not.toContain("<image");
    expect(body, "mascot-happy").not.toMatch(/href=["']https?:/);
    expect(body, "mascot-happy").not.toMatch(/url\(["']?https?:/);
    expect(body, "mascot-happy").not.toContain("\uFFFD");
    expect(body, "mascot-happy").toContain("</svg>");
  });

  it("validates generated SVG asset mascot-sleepy", () => {
    const href = GeneratedAssetRegistry["mascot-sleepy"];
    expect(href, "mascot-sleepy").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "mascot-sleepy").toBe(true);
    expect(body, "mascot-sleepy").toContain("aria-label");
    expect(body.length, "mascot-sleepy").toBeGreaterThan(900);
    expect(body, "mascot-sleepy").not.toContain("<image");
    expect(body, "mascot-sleepy").not.toMatch(/href=["']https?:/);
    expect(body, "mascot-sleepy").not.toMatch(/url\(["']?https?:/);
    expect(body, "mascot-sleepy").not.toContain("\uFFFD");
    expect(body, "mascot-sleepy").toContain("</svg>");
  });

  it("validates generated SVG asset mat", () => {
    const href = GeneratedAssetRegistry["mat"];
    expect(href, "mat").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "mat").toBe(true);
    expect(body, "mat").toContain("aria-label");
    expect(body.length, "mat").toBeGreaterThan(900);
    expect(body, "mat").not.toContain("<image");
    expect(body, "mat").not.toMatch(/href=["']https?:/);
    expect(body, "mat").not.toMatch(/url\(["']?https?:/);
    expect(body, "mat").not.toContain("\uFFFD");
    expect(body, "mat").toContain("</svg>");
  });

  it("validates generated SVG asset memory", () => {
    const href = GeneratedAssetRegistry["memory"];
    expect(href, "memory").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "memory").toBe(true);
    expect(body, "memory").toContain("aria-label");
    expect(body.length, "memory").toBeGreaterThan(900);
    expect(body, "memory").not.toContain("<image");
    expect(body, "memory").not.toMatch(/href=["']https?:/);
    expect(body, "memory").not.toMatch(/url\(["']?https?:/);
    expect(body, "memory").not.toContain("\uFFFD");
    expect(body, "memory").toContain("</svg>");
  });

  it("validates generated SVG asset memory_butler", () => {
    const href = GeneratedAssetRegistry["memory_butler"];
    expect(href, "memory_butler").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "memory_butler").toBe(true);
    expect(body, "memory_butler").toContain("aria-label");
    expect(body.length, "memory_butler").toBeGreaterThan(900);
    expect(body, "memory_butler").not.toContain("<image");
    expect(body, "memory_butler").not.toMatch(/href=["']https?:/);
    expect(body, "memory_butler").not.toMatch(/url\(["']?https?:/);
    expect(body, "memory_butler").not.toContain("\uFFFD");
    expect(body, "memory_butler").toContain("</svg>");
  });

  it("validates generated SVG asset memory_gate", () => {
    const href = GeneratedAssetRegistry["memory_gate"];
    expect(href, "memory_gate").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "memory_gate").toBe(true);
    expect(body, "memory_gate").toContain("aria-label");
    expect(body.length, "memory_gate").toBeGreaterThan(900);
    expect(body, "memory_gate").not.toContain("<image");
    expect(body, "memory_gate").not.toMatch(/href=["']https?:/);
    expect(body, "memory_gate").not.toMatch(/url\(["']?https?:/);
    expect(body, "memory_gate").not.toContain("\uFFFD");
    expect(body, "memory_gate").toContain("</svg>");
  });

  it("validates generated SVG asset memory_gate_halo", () => {
    const href = GeneratedAssetRegistry["memory_gate_halo"];
    expect(href, "memory_gate_halo").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "memory_gate_halo").toBe(true);
    expect(body, "memory_gate_halo").toContain("aria-label");
    expect(body.length, "memory_gate_halo").toBeGreaterThan(900);
    expect(body, "memory_gate_halo").not.toContain("<image");
    expect(body, "memory_gate_halo").not.toMatch(/href=["']https?:/);
    expect(body, "memory_gate_halo").not.toMatch(/url\(["']?https?:/);
    expect(body, "memory_gate_halo").not.toContain("\uFFFD");
    expect(body, "memory_gate_halo").toContain("</svg>");
  });

  it("validates generated SVG asset memory_touch_first", () => {
    const href = GeneratedAssetRegistry["memory_touch_first"];
    expect(href, "memory_touch_first").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "memory_touch_first").toBe(true);
    expect(body, "memory_touch_first").toContain("aria-label");
    expect(body.length, "memory_touch_first").toBeGreaterThan(900);
    expect(body, "memory_touch_first").not.toContain("<image");
    expect(body, "memory_touch_first").not.toMatch(/href=["']https?:/);
    expect(body, "memory_touch_first").not.toMatch(/url\(["']?https?:/);
    expect(body, "memory_touch_first").not.toContain("\uFFFD");
    expect(body, "memory_touch_first").toContain("</svg>");
  });

  it("validates generated SVG asset metronome", () => {
    const href = GeneratedAssetRegistry["metronome"];
    expect(href, "metronome").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "metronome").toBe(true);
    expect(body, "metronome").toContain("aria-label");
    expect(body.length, "metronome").toBeGreaterThan(900);
    expect(body, "metronome").not.toContain("<image");
    expect(body, "metronome").not.toMatch(/href=["']https?:/);
    expect(body, "metronome").not.toMatch(/url\(["']?https?:/);
    expect(body, "metronome").not.toContain("\uFFFD");
    expect(body, "metronome").toContain("</svg>");
  });

  it("validates generated SVG asset mineral_stream", () => {
    const href = GeneratedAssetRegistry["mineral_stream"];
    expect(href, "mineral_stream").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "mineral_stream").toBe(true);
    expect(body, "mineral_stream").toContain("aria-label");
    expect(body.length, "mineral_stream").toBeGreaterThan(900);
    expect(body, "mineral_stream").not.toContain("<image");
    expect(body, "mineral_stream").not.toMatch(/href=["']https?:/);
    expect(body, "mineral_stream").not.toMatch(/url\(["']?https?:/);
    expect(body, "mineral_stream").not.toContain("\uFFFD");
    expect(body, "mineral_stream").toContain("</svg>");
  });

  it("validates generated SVG asset momo", () => {
    const href = GeneratedAssetRegistry["momo"];
    expect(href, "momo").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "momo").toBe(true);
    expect(body, "momo").toContain("aria-label");
    expect(body.length, "momo").toBeGreaterThan(900);
    expect(body, "momo").not.toContain("<image");
    expect(body, "momo").not.toMatch(/href=["']https?:/);
    expect(body, "momo").not.toMatch(/url\(["']?https?:/);
    expect(body, "momo").not.toContain("\uFFFD");
    expect(body, "momo").toContain("</svg>");
  });

  it("validates generated SVG asset moon_observatory", () => {
    const href = GeneratedAssetRegistry["moon_observatory"];
    expect(href, "moon_observatory").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "moon_observatory").toBe(true);
    expect(body, "moon_observatory").toContain("aria-label");
    expect(body.length, "moon_observatory").toBeGreaterThan(900);
    expect(body, "moon_observatory").not.toContain("<image");
    expect(body, "moon_observatory").not.toMatch(/href=["']https?:/);
    expect(body, "moon_observatory").not.toMatch(/url\(["']?https?:/);
    expect(body, "moon_observatory").not.toContain("\uFFFD");
    expect(body, "moon_observatory").toContain("</svg>");
  });

  it("validates generated SVG asset moon_orange_observatory", () => {
    const href = GeneratedAssetRegistry["moon_orange_observatory"];
    expect(href, "moon_orange_observatory").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "moon_orange_observatory").toBe(true);
    expect(body, "moon_orange_observatory").toContain("aria-label");
    expect(body.length, "moon_orange_observatory").toBeGreaterThan(900);
    expect(body, "moon_orange_observatory").not.toContain("<image");
    expect(body, "moon_orange_observatory").not.toMatch(/href=["']https?:/);
    expect(body, "moon_orange_observatory").not.toMatch(/url\(["']?https?:/);
    expect(body, "moon_orange_observatory").not.toContain("\uFFFD");
    expect(body, "moon_orange_observatory").toContain("</svg>");
  });

  it("validates generated SVG asset nap_mat", () => {
    const href = GeneratedAssetRegistry["nap_mat"];
    expect(href, "nap_mat").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "nap_mat").toBe(true);
    expect(body, "nap_mat").toContain("aria-label");
    expect(body.length, "nap_mat").toBeGreaterThan(900);
    expect(body, "nap_mat").not.toContain("<image");
    expect(body, "nap_mat").not.toMatch(/href=["']https?:/);
    expect(body, "nap_mat").not.toMatch(/url\(["']?https?:/);
    expect(body, "nap_mat").not.toContain("\uFFFD");
    expect(body, "nap_mat").toContain("</svg>");
  });

  it("validates generated SVG asset nap_mat_set", () => {
    const href = GeneratedAssetRegistry["nap_mat_set"];
    expect(href, "nap_mat_set").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "nap_mat_set").toBe(true);
    expect(body, "nap_mat_set").toContain("aria-label");
    expect(body.length, "nap_mat_set").toBeGreaterThan(900);
    expect(body, "nap_mat_set").not.toContain("<image");
    expect(body, "nap_mat_set").not.toMatch(/href=["']https?:/);
    expect(body, "nap_mat_set").not.toMatch(/url\(["']?https?:/);
    expect(body, "nap_mat_set").not.toContain("\uFFFD");
    expect(body, "nap_mat_set").toContain("</svg>");
  });

  it("validates generated SVG asset narin", () => {
    const href = GeneratedAssetRegistry["narin"];
    expect(href, "narin").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "narin").toBe(true);
    expect(body, "narin").toContain("aria-label");
    expect(body.length, "narin").toBeGreaterThan(900);
    expect(body, "narin").not.toContain("<image");
    expect(body, "narin").not.toMatch(/href=["']https?:/);
    expect(body, "narin").not.toMatch(/url\(["']?https?:/);
    expect(body, "narin").not.toContain("\uFFFD");
    expect(body, "narin").toContain("</svg>");
  });

  it("validates generated SVG asset observatory", () => {
    const href = GeneratedAssetRegistry["observatory"];
    expect(href, "observatory").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "observatory").toBe(true);
    expect(body, "observatory").toContain("aria-label");
    expect(body.length, "observatory").toBeGreaterThan(900);
    expect(body, "observatory").not.toContain("<image");
    expect(body, "observatory").not.toMatch(/href=["']https?:/);
    expect(body, "observatory").not.toMatch(/url\(["']?https?:/);
    expect(body, "observatory").not.toContain("\uFFFD");
    expect(body, "observatory").toContain("</svg>");
  });

  it("validates generated SVG asset onsen", () => {
    const href = GeneratedAssetRegistry["onsen"];
    expect(href, "onsen").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen").toBe(true);
    expect(body, "onsen").toContain("aria-label");
    expect(body.length, "onsen").toBeGreaterThan(900);
    expect(body, "onsen").not.toContain("<image");
    expect(body, "onsen").not.toMatch(/href=["']https?:/);
    expect(body, "onsen").not.toMatch(/url\(["']?https?:/);
    expect(body, "onsen").not.toContain("\uFFFD");
    expect(body, "onsen").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_300k", () => {
    const href = GeneratedAssetRegistry["onsen_300k"];
    expect(href, "onsen_300k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_300k").toBe(true);
    expect(body, "onsen_300k").toContain("aria-label");
    expect(body.length, "onsen_300k").toBeGreaterThan(900);
    expect(body, "onsen_300k").not.toContain("<image");
    expect(body, "onsen_300k").not.toMatch(/href=["']https?:/);
    expect(body, "onsen_300k").not.toMatch(/url\(["']?https?:/);
    expect(body, "onsen_300k").not.toContain("\uFFFD");
    expect(body, "onsen_300k").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_75k", () => {
    const href = GeneratedAssetRegistry["onsen_75k"];
    expect(href, "onsen_75k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_75k").toBe(true);
    expect(body, "onsen_75k").toContain("aria-label");
    expect(body.length, "onsen_75k").toBeGreaterThan(900);
    expect(body, "onsen_75k").not.toContain("<image");
    expect(body, "onsen_75k").not.toMatch(/href=["']https?:/);
    expect(body, "onsen_75k").not.toMatch(/url\(["']?https?:/);
    expect(body, "onsen_75k").not.toContain("\uFFFD");
    expect(body, "onsen_75k").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_eps_1k", () => {
    const href = GeneratedAssetRegistry["onsen_eps_1k"];
    expect(href, "onsen_eps_1k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_eps_1k").toBe(true);
    expect(body, "onsen_eps_1k").toContain("aria-label");
    expect(body.length, "onsen_eps_1k").toBeGreaterThan(900);
    expect(body, "onsen_eps_1k").not.toContain("<image");
    expect(body, "onsen_eps_1k").not.toMatch(/href=["']https?:/);
    expect(body, "onsen_eps_1k").not.toMatch(/url\(["']?https?:/);
    expect(body, "onsen_eps_1k").not.toContain("\uFFFD");
    expect(body, "onsen_eps_1k").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_first", () => {
    const href = GeneratedAssetRegistry["onsen_first"];
    expect(href, "onsen_first").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_first").toBe(true);
    expect(body, "onsen_first").toContain("aria-label");
    expect(body.length, "onsen_first").toBeGreaterThan(900);
    expect(body, "onsen_first").not.toContain("<image");
    expect(body, "onsen_first").not.toMatch(/href=["']https?:/);
    expect(body, "onsen_first").not.toMatch(/url\(["']?https?:/);
    expect(body, "onsen_first").not.toContain("\uFFFD");
    expect(body, "onsen_first").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_mist", () => {
    const href = GeneratedAssetRegistry["onsen_mist"];
    expect(href, "onsen_mist").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_mist").toBe(true);
    expect(body, "onsen_mist").toContain("aria-label");
    expect(body.length, "onsen_mist").toBeGreaterThan(900);
    expect(body, "onsen_mist").not.toContain("<image");
    expect(body, "onsen_mist").not.toMatch(/href=["']https?:/);
    expect(body, "onsen_mist").not.toMatch(/url\(["']?https?:/);
    expect(body, "onsen_mist").not.toContain("\uFFFD");
    expect(body, "onsen_mist").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_open", () => {
    const href = GeneratedAssetRegistry["onsen_open"];
    expect(href, "onsen_open").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_open").toBe(true);
    expect(body, "onsen_open").toContain("aria-label");
    expect(body.length, "onsen_open").toBeGreaterThan(900);
    expect(body, "onsen_open").not.toContain("<image");
    expect(body, "onsen_open").not.toMatch(/href=["']https?:/);
    expect(body, "onsen_open").not.toMatch(/url\(["']?https?:/);
    expect(body, "onsen_open").not.toContain("\uFFFD");
    expect(body, "onsen_open").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_snack_counter", () => {
    const href = GeneratedAssetRegistry["onsen_snack_counter"];
    expect(href, "onsen_snack_counter").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_snack_counter").toBe(true);
    expect(body, "onsen_snack_counter").toContain("aria-label");
    expect(body.length, "onsen_snack_counter").toBeGreaterThan(900);
    expect(body, "onsen_snack_counter").not.toContain("<image");
    expect(body, "onsen_snack_counter").not.toMatch(/href=["']https?:/);
    expect(body, "onsen_snack_counter").not.toMatch(/url\(["']?https?:/);
    expect(body, "onsen_snack_counter").not.toContain("\uFFFD");
    expect(body, "onsen_snack_counter").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_snack_recipe", () => {
    const href = GeneratedAssetRegistry["onsen_snack_recipe"];
    expect(href, "onsen_snack_recipe").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_snack_recipe").toBe(true);
    expect(body, "onsen_snack_recipe").toContain("aria-label");
    expect(body.length, "onsen_snack_recipe").toBeGreaterThan(900);
    expect(body, "onsen_snack_recipe").not.toContain("<image");
    expect(body, "onsen_snack_recipe").not.toMatch(/href=["']https?:/);
    expect(body, "onsen_snack_recipe").not.toMatch(/url\(["']?https?:/);
    expect(body, "onsen_snack_recipe").not.toContain("\uFFFD");
    expect(body, "onsen_snack_recipe").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_towel_rack", () => {
    const href = GeneratedAssetRegistry["onsen_towel_rack"];
    expect(href, "onsen_towel_rack").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_towel_rack").toBe(true);
    expect(body, "onsen_towel_rack").toContain("aria-label");
    expect(body.length, "onsen_towel_rack").toBeGreaterThan(900);
    expect(body, "onsen_towel_rack").not.toContain("<image");
    expect(body, "onsen_towel_rack").not.toMatch(/href=["']https?:/);
    expect(body, "onsen_towel_rack").not.toMatch(/url\(["']?https?:/);
    expect(body, "onsen_towel_rack").not.toContain("\uFFFD");
    expect(body, "onsen_towel_rack").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_towel_touch", () => {
    const href = GeneratedAssetRegistry["onsen_towel_touch"];
    expect(href, "onsen_towel_touch").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_towel_touch").toBe(true);
    expect(body, "onsen_towel_touch").toContain("aria-label");
    expect(body.length, "onsen_towel_touch").toBeGreaterThan(900);
    expect(body, "onsen_towel_touch").not.toContain("<image");
    expect(body, "onsen_towel_touch").not.toMatch(/href=["']https?:/);
    expect(body, "onsen_towel_touch").not.toMatch(/url\(["']?https?:/);
    expect(body, "onsen_towel_touch").not.toContain("\uFFFD");
    expect(body, "onsen_towel_touch").toContain("</svg>");
  });

  it("validates generated SVG asset onsen_warm_pond", () => {
    const href = GeneratedAssetRegistry["onsen_warm_pond"];
    expect(href, "onsen_warm_pond").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "onsen_warm_pond").toBe(true);
    expect(body, "onsen_warm_pond").toContain("aria-label");
    expect(body.length, "onsen_warm_pond").toBeGreaterThan(900);
    expect(body, "onsen_warm_pond").not.toContain("<image");
    expect(body, "onsen_warm_pond").not.toMatch(/href=["']https?:/);
    expect(body, "onsen_warm_pond").not.toMatch(/url\(["']?https?:/);
    expect(body, "onsen_warm_pond").not.toContain("\uFFFD");
    expect(body, "onsen_warm_pond").toContain("</svg>");
  });

  it("validates generated SVG asset orange", () => {
    const href = GeneratedAssetRegistry["orange"];
    expect(href, "orange").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "orange").toBe(true);
    expect(body, "orange").toContain("aria-label");
    expect(body.length, "orange").toBeGreaterThan(900);
    expect(body, "orange").not.toContain("<image");
    expect(body, "orange").not.toMatch(/href=["']https?:/);
    expect(body, "orange").not.toMatch(/url\(["']?https?:/);
    expect(body, "orange").not.toContain("\uFFFD");
    expect(body, "orange").toContain("</svg>");
  });

  it("validates generated SVG asset orange_1k", () => {
    const href = GeneratedAssetRegistry["orange_1k"];
    expect(href, "orange_1k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "orange_1k").toBe(true);
    expect(body, "orange_1k").toContain("aria-label");
    expect(body.length, "orange_1k").toBeGreaterThan(900);
    expect(body, "orange_1k").not.toContain("<image");
    expect(body, "orange_1k").not.toMatch(/href=["']https?:/);
    expect(body, "orange_1k").not.toMatch(/url\(["']?https?:/);
    expect(body, "orange_1k").not.toContain("\uFFFD");
    expect(body, "orange_1k").toContain("</svg>");
  });

  it("validates generated SVG asset orange_basket", () => {
    const href = GeneratedAssetRegistry["orange_basket"];
    expect(href, "orange_basket").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "orange_basket").toBe(true);
    expect(body, "orange_basket").toContain("aria-label");
    expect(body.length, "orange_basket").toBeGreaterThan(900);
    expect(body, "orange_basket").not.toContain("<image");
    expect(body, "orange_basket").not.toMatch(/href=["']https?:/);
    expect(body, "orange_basket").not.toMatch(/url\(["']?https?:/);
    expect(body, "orange_basket").not.toContain("\uFFFD");
    expect(body, "orange_basket").toContain("</svg>");
  });

  it("validates generated SVG asset orange_basket_corner", () => {
    const href = GeneratedAssetRegistry["orange_basket_corner"];
    expect(href, "orange_basket_corner").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "orange_basket_corner").toBe(true);
    expect(body, "orange_basket_corner").toContain("aria-label");
    expect(body.length, "orange_basket_corner").toBeGreaterThan(900);
    expect(body, "orange_basket_corner").not.toContain("<image");
    expect(body, "orange_basket_corner").not.toMatch(/href=["']https?:/);
    expect(body, "orange_basket_corner").not.toMatch(/url\(["']?https?:/);
    expect(body, "orange_basket_corner").not.toContain("\uFFFD");
    expect(body, "orange_basket_corner").toContain("</svg>");
  });

  it("validates generated SVG asset orange_lantern_road", () => {
    const href = GeneratedAssetRegistry["orange_lantern_road"];
    expect(href, "orange_lantern_road").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "orange_lantern_road").toBe(true);
    expect(body, "orange_lantern_road").toContain("aria-label");
    expect(body.length, "orange_lantern_road").toBeGreaterThan(900);
    expect(body, "orange_lantern_road").not.toContain("<image");
    expect(body, "orange_lantern_road").not.toMatch(/href=["']https?:/);
    expect(body, "orange_lantern_road").not.toMatch(/url\(["']?https?:/);
    expect(body, "orange_lantern_road").not.toContain("\uFFFD");
    expect(body, "orange_lantern_road").toContain("</svg>");
  });

  it("validates generated SVG asset orange_lanterns", () => {
    const href = GeneratedAssetRegistry["orange_lanterns"];
    expect(href, "orange_lanterns").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "orange_lanterns").toBe(true);
    expect(body, "orange_lanterns").toContain("aria-label");
    expect(body.length, "orange_lanterns").toBeGreaterThan(900);
    expect(body, "orange_lanterns").not.toContain("<image");
    expect(body, "orange_lanterns").not.toMatch(/href=["']https?:/);
    expect(body, "orange_lanterns").not.toMatch(/url\(["']?https?:/);
    expect(body, "orange_lanterns").not.toContain("\uFFFD");
    expect(body, "orange_lanterns").toContain("</svg>");
  });

  it("validates generated SVG asset orange_spoon", () => {
    const href = GeneratedAssetRegistry["orange_spoon"];
    expect(href, "orange_spoon").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "orange_spoon").toBe(true);
    expect(body, "orange_spoon").toContain("aria-label");
    expect(body.length, "orange_spoon").toBeGreaterThan(900);
    expect(body, "orange_spoon").not.toContain("<image");
    expect(body, "orange_spoon").not.toMatch(/href=["']https?:/);
    expect(body, "orange_spoon").not.toMatch(/url\(["']?https?:/);
    expect(body, "orange_spoon").not.toContain("\uFFFD");
    expect(body, "orange_spoon").toContain("</svg>");
  });

  it("validates generated SVG asset parasol", () => {
    const href = GeneratedAssetRegistry["parasol"];
    expect(href, "parasol").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "parasol").toBe(true);
    expect(body, "parasol").toContain("aria-label");
    expect(body.length, "parasol").toBeGreaterThan(900);
    expect(body, "parasol").not.toContain("<image");
    expect(body, "parasol").not.toMatch(/href=["']https?:/);
    expect(body, "parasol").not.toMatch(/url\(["']?https?:/);
    expect(body, "parasol").not.toContain("\uFFFD");
    expect(body, "parasol").toContain("</svg>");
  });

  it("validates generated SVG asset paw", () => {
    const href = GeneratedAssetRegistry["paw"];
    expect(href, "paw").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "paw").toBe(true);
    expect(body, "paw").toContain("aria-label");
    expect(body.length, "paw").toBeGreaterThan(900);
    expect(body, "paw").not.toContain("<image");
    expect(body, "paw").not.toMatch(/href=["']https?:/);
    expect(body, "paw").not.toMatch(/url\(["']?https?:/);
    expect(body, "paw").not.toContain("\uFFFD");
    expect(body, "paw").toContain("</svg>");
  });

  it("validates generated SVG asset paw_10", () => {
    const href = GeneratedAssetRegistry["paw_10"];
    expect(href, "paw_10").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "paw_10").toBe(true);
    expect(body, "paw_10").toContain("aria-label");
    expect(body.length, "paw_10").toBeGreaterThan(900);
    expect(body, "paw_10").not.toContain("<image");
    expect(body, "paw_10").not.toMatch(/href=["']https?:/);
    expect(body, "paw_10").not.toMatch(/url\(["']?https?:/);
    expect(body, "paw_10").not.toContain("\uFFFD");
    expect(body, "paw_10").toContain("</svg>");
  });

  it("validates generated SVG asset podo", () => {
    const href = GeneratedAssetRegistry["podo"];
    expect(href, "podo").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "podo").toBe(true);
    expect(body, "podo").toContain("aria-label");
    expect(body.length, "podo").toBeGreaterThan(900);
    expect(body, "podo").not.toContain("<image");
    expect(body, "podo").not.toMatch(/href=["']https?:/);
    expect(body, "podo").not.toMatch(/url\(["']?https?:/);
    expect(body, "podo").not.toContain("\uFFFD");
    expect(body, "podo").toContain("</svg>");
  });

  it("validates generated SVG asset pond", () => {
    const href = GeneratedAssetRegistry["pond"];
    expect(href, "pond").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "pond").toBe(true);
    expect(body, "pond").toContain("aria-label");
    expect(body.length, "pond").toBeGreaterThan(900);
    expect(body, "pond").not.toContain("<image");
    expect(body, "pond").not.toMatch(/href=["']https?:/);
    expect(body, "pond").not.toMatch(/url\(["']?https?:/);
    expect(body, "pond").not.toContain("\uFFFD");
    expect(body, "pond").toContain("</svg>");
  });

  it("validates generated SVG asset prestige", () => {
    const href = GeneratedAssetRegistry["prestige"];
    expect(href, "prestige").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "prestige").toBe(true);
    expect(body, "prestige").toContain("aria-label");
    expect(body.length, "prestige").toBeGreaterThan(900);
    expect(body, "prestige").not.toContain("<image");
    expect(body, "prestige").not.toMatch(/href=["']https?:/);
    expect(body, "prestige").not.toMatch(/url\(["']?https?:/);
    expect(body, "prestige").not.toContain("\uFFFD");
    expect(body, "prestige").toContain("</svg>");
  });

  it("validates generated SVG asset prestige_3", () => {
    const href = GeneratedAssetRegistry["prestige_3"];
    expect(href, "prestige_3").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "prestige_3").toBe(true);
    expect(body, "prestige_3").toContain("aria-label");
    expect(body.length, "prestige_3").toBeGreaterThan(900);
    expect(body, "prestige_3").not.toContain("<image");
    expect(body, "prestige_3").not.toMatch(/href=["']https?:/);
    expect(body, "prestige_3").not.toMatch(/url\(["']?https?:/);
    expect(body, "prestige_3").not.toContain("\uFFFD");
    expect(body, "prestige_3").toContain("</svg>");
  });

  it("validates generated SVG asset privacy-card-preview", () => {
    const href = GeneratedAssetRegistry["privacy-card-preview"];
    expect(href, "privacy-card-preview").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "privacy-card-preview").toBe(true);
    expect(body, "privacy-card-preview").toContain("aria-label");
    expect(body.length, "privacy-card-preview").toBeGreaterThan(900);
    expect(body, "privacy-card-preview").not.toContain("<image");
    expect(body, "privacy-card-preview").not.toMatch(/href=["']https?:/);
    expect(body, "privacy-card-preview").not.toMatch(/url\(["']?https?:/);
    expect(body, "privacy-card-preview").not.toContain("\uFFFD");
    expect(body, "privacy-card-preview").toContain("</svg>");
  });

  it("validates generated SVG asset qa-screenshot-frame", () => {
    const href = GeneratedAssetRegistry["qa-screenshot-frame"];
    expect(href, "qa-screenshot-frame").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "qa-screenshot-frame").toBe(true);
    expect(body, "qa-screenshot-frame").toContain("aria-label");
    expect(body.length, "qa-screenshot-frame").toBeGreaterThan(900);
    expect(body, "qa-screenshot-frame").not.toContain("<image");
    expect(body, "qa-screenshot-frame").not.toMatch(/href=["']https?:/);
    expect(body, "qa-screenshot-frame").not.toMatch(/url\(["']?https?:/);
    expect(body, "qa-screenshot-frame").not.toContain("\uFFFD");
    expect(body, "qa-screenshot-frame").toContain("</svg>");
  });

  it("validates generated SVG asset recipe", () => {
    const href = GeneratedAssetRegistry["recipe"];
    expect(href, "recipe").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "recipe").toBe(true);
    expect(body, "recipe").toContain("aria-label");
    expect(body.length, "recipe").toBeGreaterThan(900);
    expect(body, "recipe").not.toContain("<image");
    expect(body, "recipe").not.toMatch(/href=["']https?:/);
    expect(body, "recipe").not.toMatch(/url\(["']?https?:/);
    expect(body, "recipe").not.toContain("\uFFFD");
    expect(body, "recipe").toContain("</svg>");
  });

  it("validates generated SVG asset release", () => {
    const href = GeneratedAssetRegistry["release"];
    expect(href, "release").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "release").toBe(true);
    expect(body, "release").toContain("aria-label");
    expect(body.length, "release").toBeGreaterThan(900);
    expect(body, "release").not.toContain("<image");
    expect(body, "release").not.toMatch(/href=["']https?:/);
    expect(body, "release").not.toMatch(/url\(["']?https?:/);
    expect(body, "release").not.toContain("\uFFFD");
    expect(body, "release").toContain("</svg>");
  });

  it("validates generated SVG asset release_ad_festival", () => {
    const href = GeneratedAssetRegistry["release_ad_festival"];
    expect(href, "release_ad_festival").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "release_ad_festival").toBe(true);
    expect(body, "release_ad_festival").toContain("aria-label");
    expect(body.length, "release_ad_festival").toBeGreaterThan(900);
    expect(body, "release_ad_festival").not.toContain("<image");
    expect(body, "release_ad_festival").not.toMatch(/href=["']https?:/);
    expect(body, "release_ad_festival").not.toMatch(/url\(["']?https?:/);
    expect(body, "release_ad_festival").not.toContain("\uFFFD");
    expect(body, "release_ad_festival").toContain("</svg>");
  });

  it("validates generated SVG asset release_album_basket", () => {
    const href = GeneratedAssetRegistry["release_album_basket"];
    expect(href, "release_album_basket").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "release_album_basket").toBe(true);
    expect(body, "release_album_basket").toContain("aria-label");
    expect(body.length, "release_album_basket").toBeGreaterThan(900);
    expect(body, "release_album_basket").not.toContain("<image");
    expect(body, "release_album_basket").not.toMatch(/href=["']https?:/);
    expect(body, "release_album_basket").not.toMatch(/url\(["']?https?:/);
    expect(body, "release_album_basket").not.toContain("\uFFFD");
    expect(body, "release_album_basket").toContain("</svg>");
  });

  it("validates generated SVG asset release_album_first", () => {
    const href = GeneratedAssetRegistry["release_album_first"];
    expect(href, "release_album_first").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "release_album_first").toBe(true);
    expect(body, "release_album_first").toContain("aria-label");
    expect(body.length, "release_album_first").toBeGreaterThan(900);
    expect(body, "release_album_first").not.toContain("<image");
    expect(body, "release_album_first").not.toMatch(/href=["']https?:/);
    expect(body, "release_album_first").not.toMatch(/url\(["']?https?:/);
    expect(body, "release_album_first").not.toContain("\uFFFD");
    expect(body, "release_album_first").toContain("</svg>");
  });

  it("validates generated SVG asset release_export_ready", () => {
    const href = GeneratedAssetRegistry["release_export_ready"];
    expect(href, "release_export_ready").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "release_export_ready").toBe(true);
    expect(body, "release_export_ready").toContain("aria-label");
    expect(body.length, "release_export_ready").toBeGreaterThan(900);
    expect(body, "release_export_ready").not.toContain("<image");
    expect(body, "release_export_ready").not.toMatch(/href=["']https?:/);
    expect(body, "release_export_ready").not.toMatch(/url\(["']?https?:/);
    expect(body, "release_export_ready").not.toContain("\uFFFD");
    expect(body, "release_export_ready").toContain("</svg>");
  });

  it("validates generated SVG asset release_shop_gift", () => {
    const href = GeneratedAssetRegistry["release_shop_gift"];
    expect(href, "release_shop_gift").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "release_shop_gift").toBe(true);
    expect(body, "release_shop_gift").toContain("aria-label");
    expect(body.length, "release_shop_gift").toBeGreaterThan(900);
    expect(body, "release_shop_gift").not.toContain("<image");
    expect(body, "release_shop_gift").not.toMatch(/href=["']https?:/);
    expect(body, "release_shop_gift").not.toMatch(/url\(["']?https?:/);
    expect(body, "release_shop_gift").not.toContain("\uFFFD");
    expect(body, "release_shop_gift").toContain("</svg>");
  });

  it("validates generated SVG asset release_stamp_board", () => {
    const href = GeneratedAssetRegistry["release_stamp_board"];
    expect(href, "release_stamp_board").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "release_stamp_board").toBe(true);
    expect(body, "release_stamp_board").toContain("aria-label");
    expect(body.length, "release_stamp_board").toBeGreaterThan(900);
    expect(body, "release_stamp_board").not.toContain("<image");
    expect(body, "release_stamp_board").not.toMatch(/href=["']https?:/);
    expect(body, "release_stamp_board").not.toMatch(/url\(["']?https?:/);
    expect(body, "release_stamp_board").not.toContain("\uFFFD");
    expect(body, "release_stamp_board").toContain("</svg>");
  });

  it("validates generated SVG asset ruru", () => {
    const href = GeneratedAssetRegistry["ruru"];
    expect(href, "ruru").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "ruru").toBe(true);
    expect(body, "ruru").toContain("aria-label");
    expect(body.length, "ruru").toBeGreaterThan(900);
    expect(body, "ruru").not.toContain("<image");
    expect(body, "ruru").not.toMatch(/href=["']https?:/);
    expect(body, "ruru").not.toMatch(/url\(["']?https?:/);
    expect(body, "ruru").not.toContain("\uFFFD");
    expect(body, "ruru").toContain("</svg>");
  });

  it("validates generated SVG asset sandbox_gift", () => {
    const href = GeneratedAssetRegistry["sandbox_gift"];
    expect(href, "sandbox_gift").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "sandbox_gift").toBe(true);
    expect(body, "sandbox_gift").toContain("aria-label");
    expect(body.length, "sandbox_gift").toBeGreaterThan(900);
    expect(body, "sandbox_gift").not.toContain("<image");
    expect(body, "sandbox_gift").not.toMatch(/href=["']https?:/);
    expect(body, "sandbox_gift").not.toMatch(/url\(["']?https?:/);
    expect(body, "sandbox_gift").not.toContain("\uFFFD");
    expect(body, "sandbox_gift").toContain("</svg>");
  });

  it("validates generated SVG asset sandbox_shelf", () => {
    const href = GeneratedAssetRegistry["sandbox_shelf"];
    expect(href, "sandbox_shelf").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "sandbox_shelf").toBe(true);
    expect(body, "sandbox_shelf").toContain("aria-label");
    expect(body.length, "sandbox_shelf").toBeGreaterThan(900);
    expect(body, "sandbox_shelf").not.toContain("<image");
    expect(body, "sandbox_shelf").not.toMatch(/href=["']https?:/);
    expect(body, "sandbox_shelf").not.toMatch(/url\(["']?https?:/);
    expect(body, "sandbox_shelf").not.toContain("\uFFFD");
    expect(body, "sandbox_shelf").toContain("</svg>");
  });

  it("validates generated SVG asset schedule", () => {
    const href = GeneratedAssetRegistry["schedule"];
    expect(href, "schedule").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "schedule").toBe(true);
    expect(body, "schedule").toContain("aria-label");
    expect(body.length, "schedule").toBeGreaterThan(900);
    expect(body, "schedule").not.toContain("<image");
    expect(body, "schedule").not.toMatch(/href=["']https?:/);
    expect(body, "schedule").not.toMatch(/url\(["']?https?:/);
    expect(body, "schedule").not.toContain("\uFFFD");
    expect(body, "schedule").toContain("</svg>");
  });

  it("validates generated SVG asset season_memory_gate", () => {
    const href = GeneratedAssetRegistry["season_memory_gate"];
    expect(href, "season_memory_gate").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "season_memory_gate").toBe(true);
    expect(body, "season_memory_gate").toContain("aria-label");
    expect(body.length, "season_memory_gate").toBeGreaterThan(900);
    expect(body, "season_memory_gate").not.toContain("<image");
    expect(body, "season_memory_gate").not.toMatch(/href=["']https?:/);
    expect(body, "season_memory_gate").not.toMatch(/url\(["']?https?:/);
    expect(body, "season_memory_gate").not.toContain("\uFFFD");
    expect(body, "season_memory_gate").toContain("</svg>");
  });

  it("validates generated SVG asset settings", () => {
    const href = GeneratedAssetRegistry["settings"];
    expect(href, "settings").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "settings").toBe(true);
    expect(body, "settings").toContain("aria-label");
    expect(body.length, "settings").toBeGreaterThan(900);
    expect(body, "settings").not.toContain("<image");
    expect(body, "settings").not.toMatch(/href=["']https?:/);
    expect(body, "settings").not.toMatch(/url\(["']?https?:/);
    expect(body, "settings").not.toContain("\uFFFD");
    expect(body, "settings").toContain("</svg>");
  });

  it("validates generated SVG asset shade_parasol", () => {
    const href = GeneratedAssetRegistry["shade_parasol"];
    expect(href, "shade_parasol").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "shade_parasol").toBe(true);
    expect(body, "shade_parasol").toContain("aria-label");
    expect(body.length, "shade_parasol").toBeGreaterThan(900);
    expect(body, "shade_parasol").not.toContain("<image");
    expect(body, "shade_parasol").not.toMatch(/href=["']https?:/);
    expect(body, "shade_parasol").not.toMatch(/url\(["']?https?:/);
    expect(body, "shade_parasol").not.toContain("\uFFFD");
    expect(body, "shade_parasol").toContain("</svg>");
  });

  it("validates generated SVG asset shelf", () => {
    const href = GeneratedAssetRegistry["shelf"];
    expect(href, "shelf").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "shelf").toBe(true);
    expect(body, "shelf").toContain("aria-label");
    expect(body.length, "shelf").toBeGreaterThan(900);
    expect(body, "shelf").not.toContain("<image");
    expect(body, "shelf").not.toMatch(/href=["']https?:/);
    expect(body, "shelf").not.toMatch(/url\(["']?https?:/);
    expect(body, "shelf").not.toContain("\uFFFD");
    expect(body, "shelf").toContain("</svg>");
  });

  it("validates generated SVG asset shop", () => {
    const href = GeneratedAssetRegistry["shop"];
    expect(href, "shop").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "shop").toBe(true);
    expect(body, "shop").toContain("aria-label");
    expect(body.length, "shop").toBeGreaterThan(900);
    expect(body, "shop").not.toContain("<image");
    expect(body, "shop").not.toMatch(/href=["']https?:/);
    expect(body, "shop").not.toMatch(/url\(["']?https?:/);
    expect(body, "shop").not.toContain("\uFFFD");
    expect(body, "shop").toContain("</svg>");
  });

  it("validates generated SVG asset snack", () => {
    const href = GeneratedAssetRegistry["snack"];
    expect(href, "snack").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "snack").toBe(true);
    expect(body, "snack").toContain("aria-label");
    expect(body.length, "snack").toBeGreaterThan(900);
    expect(body, "snack").not.toContain("<image");
    expect(body, "snack").not.toMatch(/href=["']https?:/);
    expect(body, "snack").not.toMatch(/url\(["']?https?:/);
    expect(body, "snack").not.toContain("\uFFFD");
    expect(body, "snack").toContain("</svg>");
  });

  it("validates generated SVG asset snack_counter", () => {
    const href = GeneratedAssetRegistry["snack_counter"];
    expect(href, "snack_counter").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "snack_counter").toBe(true);
    expect(body, "snack_counter").toContain("aria-label");
    expect(body.length, "snack_counter").toBeGreaterThan(900);
    expect(body, "snack_counter").not.toContain("<image");
    expect(body, "snack_counter").not.toMatch(/href=["']https?:/);
    expect(body, "snack_counter").not.toMatch(/url\(["']?https?:/);
    expect(body, "snack_counter").not.toContain("\uFFFD");
    expect(body, "snack_counter").toContain("</svg>");
  });

  it("validates generated SVG asset snack_counter_table", () => {
    const href = GeneratedAssetRegistry["snack_counter_table"];
    expect(href, "snack_counter_table").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "snack_counter_table").toBe(true);
    expect(body, "snack_counter_table").toContain("aria-label");
    expect(body.length, "snack_counter_table").toBeGreaterThan(900);
    expect(body, "snack_counter_table").not.toContain("<image");
    expect(body, "snack_counter_table").not.toMatch(/href=["']https?:/);
    expect(body, "snack_counter_table").not.toMatch(/url\(["']?https?:/);
    expect(body, "snack_counter_table").not.toContain("\uFFFD");
    expect(body, "snack_counter_table").toContain("</svg>");
  });

  it("validates generated SVG asset soda", () => {
    const href = GeneratedAssetRegistry["soda"];
    expect(href, "soda").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "soda").toBe(true);
    expect(body, "soda").toContain("aria-label");
    expect(body.length, "soda").toBeGreaterThan(900);
    expect(body, "soda").not.toContain("<image");
    expect(body, "soda").not.toMatch(/href=["']https?:/);
    expect(body, "soda").not.toMatch(/url\(["']?https?:/);
    expect(body, "soda").not.toContain("\uFFFD");
    expect(body, "soda").toContain("</svg>");
  });

  it("validates generated SVG asset soft_paw", () => {
    const href = GeneratedAssetRegistry["soft_paw"];
    expect(href, "soft_paw").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "soft_paw").toBe(true);
    expect(body, "soft_paw").toContain("aria-label");
    expect(body.length, "soft_paw").toBeGreaterThan(900);
    expect(body, "soft_paw").not.toContain("<image");
    expect(body, "soft_paw").not.toMatch(/href=["']https?:/);
    expect(body, "soft_paw").not.toMatch(/url\(["']?https?:/);
    expect(body, "soft_paw").not.toContain("\uFFFD");
    expect(body, "soft_paw").toContain("</svg>");
  });

  it("validates generated SVG asset soft_paw_1", () => {
    const href = GeneratedAssetRegistry["soft_paw_1"];
    expect(href, "soft_paw_1").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "soft_paw_1").toBe(true);
    expect(body, "soft_paw_1").toContain("aria-label");
    expect(body.length, "soft_paw_1").toBeGreaterThan(900);
    expect(body, "soft_paw_1").not.toContain("<image");
    expect(body, "soft_paw_1").not.toMatch(/href=["']https?:/);
    expect(body, "soft_paw_1").not.toMatch(/url\(["']?https?:/);
    expect(body, "soft_paw_1").not.toContain("\uFFFD");
    expect(body, "soft_paw_1").toContain("</svg>");
  });

  it("validates generated SVG asset soft_paw_10", () => {
    const href = GeneratedAssetRegistry["soft_paw_10"];
    expect(href, "soft_paw_10").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "soft_paw_10").toBe(true);
    expect(body, "soft_paw_10").toContain("aria-label");
    expect(body.length, "soft_paw_10").toBeGreaterThan(900);
    expect(body, "soft_paw_10").not.toContain("<image");
    expect(body, "soft_paw_10").not.toMatch(/href=["']https?:/);
    expect(body, "soft_paw_10").not.toMatch(/url\(["']?https?:/);
    expect(body, "soft_paw_10").not.toContain("\uFFFD");
    expect(body, "soft_paw_10").toContain("</svg>");
  });

  it("validates generated SVG asset soft_paw_stamp", () => {
    const href = GeneratedAssetRegistry["soft_paw_stamp"];
    expect(href, "soft_paw_stamp").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "soft_paw_stamp").toBe(true);
    expect(body, "soft_paw_stamp").toContain("aria-label");
    expect(body.length, "soft_paw_stamp").toBeGreaterThan(900);
    expect(body, "soft_paw_stamp").not.toContain("<image");
    expect(body, "soft_paw_stamp").not.toMatch(/href=["']https?:/);
    expect(body, "soft_paw_stamp").not.toMatch(/url\(["']?https?:/);
    expect(body, "soft_paw_stamp").not.toContain("\uFFFD");
    expect(body, "soft_paw_stamp").toContain("</svg>");
  });

  it("validates generated SVG asset sorting_rhythm", () => {
    const href = GeneratedAssetRegistry["sorting_rhythm"];
    expect(href, "sorting_rhythm").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "sorting_rhythm").toBe(true);
    expect(body, "sorting_rhythm").toContain("aria-label");
    expect(body.length, "sorting_rhythm").toBeGreaterThan(900);
    expect(body, "sorting_rhythm").not.toContain("<image");
    expect(body, "sorting_rhythm").not.toMatch(/href=["']https?:/);
    expect(body, "sorting_rhythm").not.toMatch(/url\(["']?https?:/);
    expect(body, "sorting_rhythm").not.toContain("\uFFFD");
    expect(body, "sorting_rhythm").toContain("</svg>");
  });

  it("validates generated SVG asset sorting_table", () => {
    const href = GeneratedAssetRegistry["sorting_table"];
    expect(href, "sorting_table").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "sorting_table").toBe(true);
    expect(body, "sorting_table").toContain("aria-label");
    expect(body.length, "sorting_table").toBeGreaterThan(900);
    expect(body, "sorting_table").not.toContain("<image");
    expect(body, "sorting_table").not.toMatch(/href=["']https?:/);
    expect(body, "sorting_table").not.toMatch(/url\(["']?https?:/);
    expect(body, "sorting_table").not.toContain("\uFFFD");
    expect(body, "sorting_table").toContain("</svg>");
  });

  it("validates generated SVG asset splash-draft", () => {
    const href = GeneratedAssetRegistry["splash-draft"];
    expect(href, "splash-draft").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "splash-draft").toBe(true);
    expect(body, "splash-draft").toContain("aria-label");
    expect(body.length, "splash-draft").toBeGreaterThan(900);
    expect(body, "splash-draft").not.toContain("<image");
    expect(body, "splash-draft").not.toMatch(/href=["']https?:/);
    expect(body, "splash-draft").not.toMatch(/url\(["']?https?:/);
    expect(body, "splash-draft").not.toContain("\uFFFD");
    expect(body, "splash-draft").toContain("</svg>");
  });

  it("validates generated SVG asset splash-rc2", () => {
    const href = GeneratedAssetRegistry["splash-rc2"];
    expect(href, "splash-rc2").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "splash-rc2").toBe(true);
    expect(body, "splash-rc2").toContain("aria-label");
    expect(body.length, "splash-rc2").toBeGreaterThan(900);
    expect(body, "splash-rc2").not.toContain("<image");
    expect(body, "splash-rc2").not.toMatch(/href=["']https?:/);
    expect(body, "splash-rc2").not.toMatch(/url\(["']?https?:/);
    expect(body, "splash-rc2").not.toContain("\uFFFD");
    expect(body, "splash-rc2").toContain("</svg>");
  });

  it("validates generated SVG asset spoon", () => {
    const href = GeneratedAssetRegistry["spoon"];
    expect(href, "spoon").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "spoon").toBe(true);
    expect(body, "spoon").toContain("aria-label");
    expect(body.length, "spoon").toBeGreaterThan(900);
    expect(body, "spoon").not.toContain("<image");
    expect(body, "spoon").not.toMatch(/href=["']https?:/);
    expect(body, "spoon").not.toMatch(/url\(["']?https?:/);
    expect(body, "spoon").not.toContain("\uFFFD");
    expect(body, "spoon").toContain("</svg>");
  });

  it("validates generated SVG asset steam", () => {
    const href = GeneratedAssetRegistry["steam"];
    expect(href, "steam").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "steam").toBe(true);
    expect(body, "steam").toContain("aria-label");
    expect(body.length, "steam").toBeGreaterThan(900);
    expect(body, "steam").not.toContain("<image");
    expect(body, "steam").not.toMatch(/href=["']https?:/);
    expect(body, "steam").not.toMatch(/url\(["']?https?:/);
    expect(body, "steam").not.toContain("\uFFFD");
    expect(body, "steam").toContain("</svg>");
  });

  it("validates generated SVG asset steam_towel", () => {
    const href = GeneratedAssetRegistry["steam_towel"];
    expect(href, "steam_towel").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "steam_towel").toBe(true);
    expect(body, "steam_towel").toContain("aria-label");
    expect(body.length, "steam_towel").toBeGreaterThan(900);
    expect(body, "steam_towel").not.toContain("<image");
    expect(body, "steam_towel").not.toMatch(/href=["']https?:/);
    expect(body, "steam_towel").not.toMatch(/url\(["']?https?:/);
    expect(body, "steam_towel").not.toContain("\uFFFD");
    expect(body, "steam_towel").toContain("</svg>");
  });

  it("validates generated SVG asset steam_towel_rack", () => {
    const href = GeneratedAssetRegistry["steam_towel_rack"];
    expect(href, "steam_towel_rack").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "steam_towel_rack").toBe(true);
    expect(body, "steam_towel_rack").toContain("aria-label");
    expect(body.length, "steam_towel_rack").toBeGreaterThan(900);
    expect(body, "steam_towel_rack").not.toContain("<image");
    expect(body, "steam_towel_rack").not.toMatch(/href=["']https?:/);
    expect(body, "steam_towel_rack").not.toMatch(/url\(["']?https?:/);
    expect(body, "steam_towel_rack").not.toContain("\uFFFD");
    expect(body, "steam_towel_rack").toContain("</svg>");
  });

  it("validates generated SVG asset store-card-preview", () => {
    const href = GeneratedAssetRegistry["store-card-preview"];
    expect(href, "store-card-preview").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "store-card-preview").toBe(true);
    expect(body, "store-card-preview").toContain("aria-label");
    expect(body.length, "store-card-preview").toBeGreaterThan(900);
    expect(body, "store-card-preview").not.toContain("<image");
    expect(body, "store-card-preview").not.toMatch(/href=["']https?:/);
    expect(body, "store-card-preview").not.toMatch(/url\(["']?https?:/);
    expect(body, "store-card-preview").not.toContain("\uFFFD");
    expect(body, "store-card-preview").toContain("</svg>");
  });

  it("validates generated SVG asset store-screenshot-frame-rc2", () => {
    const href = GeneratedAssetRegistry["store-screenshot-frame-rc2"];
    expect(href, "store-screenshot-frame-rc2").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "store-screenshot-frame-rc2").toBe(true);
    expect(body, "store-screenshot-frame-rc2").toContain("aria-label");
    expect(body.length, "store-screenshot-frame-rc2").toBeGreaterThan(900);
    expect(body, "store-screenshot-frame-rc2").not.toContain("<image");
    expect(body, "store-screenshot-frame-rc2").not.toMatch(/href=["']https?:/);
    expect(body, "store-screenshot-frame-rc2").not.toMatch(/url\(["']?https?:/);
    expect(body, "store-screenshot-frame-rc2").not.toContain("\uFFFD");
    expect(body, "store-screenshot-frame-rc2").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse", () => {
    const href = GeneratedAssetRegistry["storehouse"];
    expect(href, "storehouse").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse").toBe(true);
    expect(body, "storehouse").toContain("aria-label");
    expect(body.length, "storehouse").toBeGreaterThan(900);
    expect(body, "storehouse").not.toContain("<image");
    expect(body, "storehouse").not.toMatch(/href=["']https?:/);
    expect(body, "storehouse").not.toMatch(/url\(["']?https?:/);
    expect(body, "storehouse").not.toContain("\uFFFD");
    expect(body, "storehouse").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_25k", () => {
    const href = GeneratedAssetRegistry["storehouse_25k"];
    expect(href, "storehouse_25k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_25k").toBe(true);
    expect(body, "storehouse_25k").toContain("aria-label");
    expect(body.length, "storehouse_25k").toBeGreaterThan(900);
    expect(body, "storehouse_25k").not.toContain("<image");
    expect(body, "storehouse_25k").not.toMatch(/href=["']https?:/);
    expect(body, "storehouse_25k").not.toMatch(/url\(["']?https?:/);
    expect(body, "storehouse_25k").not.toContain("\uFFFD");
    expect(body, "storehouse_25k").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_5k", () => {
    const href = GeneratedAssetRegistry["storehouse_5k"];
    expect(href, "storehouse_5k").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_5k").toBe(true);
    expect(body, "storehouse_5k").toContain("aria-label");
    expect(body.length, "storehouse_5k").toBeGreaterThan(900);
    expect(body, "storehouse_5k").not.toContain("<image");
    expect(body, "storehouse_5k").not.toMatch(/href=["']https?:/);
    expect(body, "storehouse_5k").not.toMatch(/url\(["']?https?:/);
    expect(body, "storehouse_5k").not.toContain("\uFFFD");
    expect(body, "storehouse_5k").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_cart_stop", () => {
    const href = GeneratedAssetRegistry["storehouse_cart_stop"];
    expect(href, "storehouse_cart_stop").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_cart_stop").toBe(true);
    expect(body, "storehouse_cart_stop").toContain("aria-label");
    expect(body.length, "storehouse_cart_stop").toBeGreaterThan(900);
    expect(body, "storehouse_cart_stop").not.toContain("<image");
    expect(body, "storehouse_cart_stop").not.toMatch(/href=["']https?:/);
    expect(body, "storehouse_cart_stop").not.toMatch(/url\(["']?https?:/);
    expect(body, "storehouse_cart_stop").not.toContain("\uFFFD");
    expect(body, "storehouse_cart_stop").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_crate_line", () => {
    const href = GeneratedAssetRegistry["storehouse_crate_line"];
    expect(href, "storehouse_crate_line").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_crate_line").toBe(true);
    expect(body, "storehouse_crate_line").toContain("aria-label");
    expect(body.length, "storehouse_crate_line").toBeGreaterThan(900);
    expect(body, "storehouse_crate_line").not.toContain("<image");
    expect(body, "storehouse_crate_line").not.toMatch(/href=["']https?:/);
    expect(body, "storehouse_crate_line").not.toMatch(/url\(["']?https?:/);
    expect(body, "storehouse_crate_line").not.toContain("\uFFFD");
    expect(body, "storehouse_crate_line").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_first", () => {
    const href = GeneratedAssetRegistry["storehouse_first"];
    expect(href, "storehouse_first").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_first").toBe(true);
    expect(body, "storehouse_first").toContain("aria-label");
    expect(body.length, "storehouse_first").toBeGreaterThan(900);
    expect(body, "storehouse_first").not.toContain("<image");
    expect(body, "storehouse_first").not.toMatch(/href=["']https?:/);
    expect(body, "storehouse_first").not.toMatch(/url\(["']?https?:/);
    expect(body, "storehouse_first").not.toContain("\uFFFD");
    expect(body, "storehouse_first").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_fragrance", () => {
    const href = GeneratedAssetRegistry["storehouse_fragrance"];
    expect(href, "storehouse_fragrance").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_fragrance").toBe(true);
    expect(body, "storehouse_fragrance").toContain("aria-label");
    expect(body.length, "storehouse_fragrance").toBeGreaterThan(900);
    expect(body, "storehouse_fragrance").not.toContain("<image");
    expect(body, "storehouse_fragrance").not.toMatch(/href=["']https?:/);
    expect(body, "storehouse_fragrance").not.toMatch(/url\(["']?https?:/);
    expect(body, "storehouse_fragrance").not.toContain("\uFFFD");
    expect(body, "storehouse_fragrance").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_open", () => {
    const href = GeneratedAssetRegistry["storehouse_open"];
    expect(href, "storehouse_open").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_open").toBe(true);
    expect(body, "storehouse_open").toContain("aria-label");
    expect(body.length, "storehouse_open").toBeGreaterThan(900);
    expect(body, "storehouse_open").not.toContain("<image");
    expect(body, "storehouse_open").not.toMatch(/href=["']https?:/);
    expect(body, "storehouse_open").not.toMatch(/url\(["']?https?:/);
    expect(body, "storehouse_open").not.toContain("\uFFFD");
    expect(body, "storehouse_open").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_rhythm", () => {
    const href = GeneratedAssetRegistry["storehouse_rhythm"];
    expect(href, "storehouse_rhythm").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_rhythm").toBe(true);
    expect(body, "storehouse_rhythm").toContain("aria-label");
    expect(body.length, "storehouse_rhythm").toBeGreaterThan(900);
    expect(body, "storehouse_rhythm").not.toContain("<image");
    expect(body, "storehouse_rhythm").not.toMatch(/href=["']https?:/);
    expect(body, "storehouse_rhythm").not.toMatch(/url\(["']?https?:/);
    expect(body, "storehouse_rhythm").not.toContain("\uFFFD");
    expect(body, "storehouse_rhythm").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_sign", () => {
    const href = GeneratedAssetRegistry["storehouse_sign"];
    expect(href, "storehouse_sign").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_sign").toBe(true);
    expect(body, "storehouse_sign").toContain("aria-label");
    expect(body.length, "storehouse_sign").toBeGreaterThan(900);
    expect(body, "storehouse_sign").not.toContain("<image");
    expect(body, "storehouse_sign").not.toMatch(/href=["']https?:/);
    expect(body, "storehouse_sign").not.toMatch(/url\(["']?https?:/);
    expect(body, "storehouse_sign").not.toContain("\uFFFD");
    expect(body, "storehouse_sign").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_sorting_table", () => {
    const href = GeneratedAssetRegistry["storehouse_sorting_table"];
    expect(href, "storehouse_sorting_table").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_sorting_table").toBe(true);
    expect(body, "storehouse_sorting_table").toContain("aria-label");
    expect(body.length, "storehouse_sorting_table").toBeGreaterThan(900);
    expect(body, "storehouse_sorting_table").not.toContain("<image");
    expect(body, "storehouse_sorting_table").not.toMatch(/href=["']https?:/);
    expect(body, "storehouse_sorting_table").not.toMatch(/url\(["']?https?:/);
    expect(body, "storehouse_sorting_table").not.toContain("\uFFFD");
    expect(body, "storehouse_sorting_table").toContain("</svg>");
  });

  it("validates generated SVG asset storehouse_total_levels", () => {
    const href = GeneratedAssetRegistry["storehouse_total_levels"];
    expect(href, "storehouse_total_levels").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "storehouse_total_levels").toBe(true);
    expect(body, "storehouse_total_levels").toContain("aria-label");
    expect(body.length, "storehouse_total_levels").toBeGreaterThan(900);
    expect(body, "storehouse_total_levels").not.toContain("<image");
    expect(body, "storehouse_total_levels").not.toMatch(/href=["']https?:/);
    expect(body, "storehouse_total_levels").not.toMatch(/url\(["']?https?:/);
    expect(body, "storehouse_total_levels").not.toContain("\uFFFD");
    expect(body, "storehouse_total_levels").toContain("</svg>");
  });

  it("validates generated SVG asset stream", () => {
    const href = GeneratedAssetRegistry["stream"];
    expect(href, "stream").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "stream").toBe(true);
    expect(body, "stream").toContain("aria-label");
    expect(body.length, "stream").toBeGreaterThan(900);
    expect(body, "stream").not.toContain("<image");
    expect(body, "stream").not.toMatch(/href=["']https?:/);
    expect(body, "stream").not.toMatch(/url\(["']?https?:/);
    expect(body, "stream").not.toContain("\uFFFD");
    expect(body, "stream").toContain("</svg>");
  });

  it("validates generated SVG asset sun", () => {
    const href = GeneratedAssetRegistry["sun"];
    expect(href, "sun").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "sun").toBe(true);
    expect(body, "sun").toContain("aria-label");
    expect(body.length, "sun").toBeGreaterThan(900);
    expect(body, "sun").not.toContain("<image");
    expect(body, "sun").not.toMatch(/href=["']https?:/);
    expect(body, "sun").not.toMatch(/url\(["']?https?:/);
    expect(body, "sun").not.toContain("\uFFFD");
    expect(body, "sun").toContain("</svg>");
  });

  it("validates generated SVG asset sunny_yard", () => {
    const href = GeneratedAssetRegistry["sunny_yard"];
    expect(href, "sunny_yard").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "sunny_yard").toBe(true);
    expect(body, "sunny_yard").toContain("aria-label");
    expect(body.length, "sunny_yard").toBeGreaterThan(900);
    expect(body, "sunny_yard").not.toContain("<image");
    expect(body, "sunny_yard").not.toMatch(/href=["']https?:/);
    expect(body, "sunny_yard").not.toMatch(/url\(["']?https?:/);
    expect(body, "sunny_yard").not.toContain("\uFFFD");
    expect(body, "sunny_yard").toContain("</svg>");
  });

  it("validates generated SVG asset table", () => {
    const href = GeneratedAssetRegistry["table"];
    expect(href, "table").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "table").toBe(true);
    expect(body, "table").toContain("aria-label");
    expect(body.length, "table").toBeGreaterThan(900);
    expect(body, "table").not.toContain("<image");
    expect(body, "table").not.toMatch(/href=["']https?:/);
    expect(body, "table").not.toMatch(/url\(["']?https?:/);
    expect(body, "table").not.toContain("\uFFFD");
    expect(body, "table").toContain("</svg>");
  });

  it("validates generated SVG asset tap", () => {
    const href = GeneratedAssetRegistry["tap"];
    expect(href, "tap").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tap").toBe(true);
    expect(body, "tap").toContain("aria-label");
    expect(body.length, "tap").toBeGreaterThan(900);
    expect(body, "tap").not.toContain("<image");
    expect(body, "tap").not.toMatch(/href=["']https?:/);
    expect(body, "tap").not.toMatch(/url\(["']?https?:/);
    expect(body, "tap").not.toContain("\uFFFD");
    expect(body, "tap").toContain("</svg>");
  });

  it("validates generated SVG asset tap_100", () => {
    const href = GeneratedAssetRegistry["tap_100"];
    expect(href, "tap_100").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tap_100").toBe(true);
    expect(body, "tap_100").toContain("aria-label");
    expect(body.length, "tap_100").toBeGreaterThan(900);
    expect(body, "tap_100").not.toContain("<image");
    expect(body, "tap_100").not.toMatch(/href=["']https?:/);
    expect(body, "tap_100").not.toMatch(/url\(["']?https?:/);
    expect(body, "tap_100").not.toContain("\uFFFD");
    expect(body, "tap_100").toContain("</svg>");
  });

  it("validates generated SVG asset tap_1000", () => {
    const href = GeneratedAssetRegistry["tap_1000"];
    expect(href, "tap_1000").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tap_1000").toBe(true);
    expect(body, "tap_1000").toContain("aria-label");
    expect(body.length, "tap_1000").toBeGreaterThan(900);
    expect(body, "tap_1000").not.toContain("<image");
    expect(body, "tap_1000").not.toMatch(/href=["']https?:/);
    expect(body, "tap_1000").not.toMatch(/url\(["']?https?:/);
    expect(body, "tap_1000").not.toContain("\uFFFD");
    expect(body, "tap_1000").toContain("</svg>");
  });

  it("validates generated SVG asset tap_suite", () => {
    const href = GeneratedAssetRegistry["tap_suite"];
    expect(href, "tap_suite").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tap_suite").toBe(true);
    expect(body, "tap_suite").toContain("aria-label");
    expect(body.length, "tap_suite").toBeGreaterThan(900);
    expect(body, "tap_suite").not.toContain("<image");
    expect(body, "tap_suite").not.toMatch(/href=["']https?:/);
    expect(body, "tap_suite").not.toMatch(/url\(["']?https?:/);
    expect(body, "tap_suite").not.toContain("\uFFFD");
    expect(body, "tap_suite").toContain("</svg>");
  });

  it("validates generated SVG asset tap_suite_100", () => {
    const href = GeneratedAssetRegistry["tap_suite_100"];
    expect(href, "tap_suite_100").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tap_suite_100").toBe(true);
    expect(body, "tap_suite_100").toContain("aria-label");
    expect(body.length, "tap_suite_100").toBeGreaterThan(900);
    expect(body, "tap_suite_100").not.toContain("<image");
    expect(body, "tap_suite_100").not.toMatch(/href=["']https?:/);
    expect(body, "tap_suite_100").not.toMatch(/url\(["']?https?:/);
    expect(body, "tap_suite_100").not.toContain("\uFFFD");
    expect(body, "tap_suite_100").toContain("</svg>");
  });

  it("validates generated SVG asset tap_suite_20", () => {
    const href = GeneratedAssetRegistry["tap_suite_20"];
    expect(href, "tap_suite_20").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tap_suite_20").toBe(true);
    expect(body, "tap_suite_20").toContain("aria-label");
    expect(body.length, "tap_suite_20").toBeGreaterThan(900);
    expect(body, "tap_suite_20").not.toContain("<image");
    expect(body, "tap_suite_20").not.toMatch(/href=["']https?:/);
    expect(body, "tap_suite_20").not.toMatch(/url\(["']?https?:/);
    expect(body, "tap_suite_20").not.toContain("\uFFFD");
    expect(body, "tap_suite_20").toContain("</svg>");
  });

  it("validates generated SVG asset ten_taps", () => {
    const href = GeneratedAssetRegistry["ten_taps"];
    expect(href, "ten_taps").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "ten_taps").toBe(true);
    expect(body, "ten_taps").toContain("aria-label");
    expect(body.length, "ten_taps").toBeGreaterThan(900);
    expect(body, "ten_taps").not.toContain("<image");
    expect(body, "ten_taps").not.toMatch(/href=["']https?:/);
    expect(body, "ten_taps").not.toMatch(/url\(["']?https?:/);
    expect(body, "ten_taps").not.toContain("\uFFFD");
    expect(body, "ten_taps").toContain("</svg>");
  });

  it("validates generated SVG asset third_prestige", () => {
    const href = GeneratedAssetRegistry["third_prestige"];
    expect(href, "third_prestige").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "third_prestige").toBe(true);
    expect(body, "third_prestige").toContain("aria-label");
    expect(body.length, "third_prestige").toBeGreaterThan(900);
    expect(body, "third_prestige").not.toContain("<image");
    expect(body, "third_prestige").not.toMatch(/href=["']https?:/);
    expect(body, "third_prestige").not.toMatch(/url\(["']?https?:/);
    expect(body, "third_prestige").not.toContain("\uFFFD");
    expect(body, "third_prestige").toContain("</svg>");
  });

  it("validates generated SVG asset thousand_taps", () => {
    const href = GeneratedAssetRegistry["thousand_taps"];
    expect(href, "thousand_taps").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "thousand_taps").toBe(true);
    expect(body, "thousand_taps").toContain("aria-label");
    expect(body.length, "thousand_taps").toBeGreaterThan(900);
    expect(body, "thousand_taps").not.toContain("<image");
    expect(body, "thousand_taps").not.toMatch(/href=["']https?:/);
    expect(body, "thousand_taps").not.toMatch(/url\(["']?https?:/);
    expect(body, "thousand_taps").not.toContain("\uFFFD");
    expect(body, "thousand_taps").toContain("</svg>");
  });

  it("validates generated SVG asset tier-bamboo_garden", () => {
    const href = GeneratedAssetRegistry["tier-bamboo_garden"];
    expect(href, "tier-bamboo_garden").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tier-bamboo_garden").toBe(true);
    expect(body, "tier-bamboo_garden").toContain("aria-label");
    expect(body.length, "tier-bamboo_garden").toBeGreaterThan(900);
    expect(body, "tier-bamboo_garden").not.toContain("<image");
    expect(body, "tier-bamboo_garden").not.toMatch(/href=["']https?:/);
    expect(body, "tier-bamboo_garden").not.toMatch(/url\(["']?https?:/);
    expect(body, "tier-bamboo_garden").not.toContain("\uFFFD");
    expect(body, "tier-bamboo_garden").toContain("</svg>");
  });

  it("validates generated SVG asset tier-golden_forest", () => {
    const href = GeneratedAssetRegistry["tier-golden_forest"];
    expect(href, "tier-golden_forest").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tier-golden_forest").toBe(true);
    expect(body, "tier-golden_forest").toContain("aria-label");
    expect(body.length, "tier-golden_forest").toBeGreaterThan(900);
    expect(body, "tier-golden_forest").not.toContain("<image");
    expect(body, "tier-golden_forest").not.toMatch(/href=["']https?:/);
    expect(body, "tier-golden_forest").not.toMatch(/url\(["']?https?:/);
    expect(body, "tier-golden_forest").not.toContain("\uFFFD");
    expect(body, "tier-golden_forest").toContain("</svg>");
  });

  it("validates generated SVG asset tier-onsen", () => {
    const href = GeneratedAssetRegistry["tier-onsen"];
    expect(href, "tier-onsen").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tier-onsen").toBe(true);
    expect(body, "tier-onsen").toContain("aria-label");
    expect(body.length, "tier-onsen").toBeGreaterThan(900);
    expect(body, "tier-onsen").not.toContain("<image");
    expect(body, "tier-onsen").not.toMatch(/href=["']https?:/);
    expect(body, "tier-onsen").not.toMatch(/url\(["']?https?:/);
    expect(body, "tier-onsen").not.toContain("\uFFFD");
    expect(body, "tier-onsen").toContain("</svg>");
  });

  it("validates generated SVG asset tier-storehouse", () => {
    const href = GeneratedAssetRegistry["tier-storehouse"];
    expect(href, "tier-storehouse").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tier-storehouse").toBe(true);
    expect(body, "tier-storehouse").toContain("aria-label");
    expect(body.length, "tier-storehouse").toBeGreaterThan(900);
    expect(body, "tier-storehouse").not.toContain("<image");
    expect(body, "tier-storehouse").not.toMatch(/href=["']https?:/);
    expect(body, "tier-storehouse").not.toMatch(/url\(["']?https?:/);
    expect(body, "tier-storehouse").not.toContain("\uFFFD");
    expect(body, "tier-storehouse").toContain("</svg>");
  });

  it("validates generated SVG asset tier-yard", () => {
    const href = GeneratedAssetRegistry["tier-yard"];
    expect(href, "tier-yard").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tier-yard").toBe(true);
    expect(body, "tier-yard").toContain("aria-label");
    expect(body.length, "tier-yard").toBeGreaterThan(900);
    expect(body, "tier-yard").not.toContain("<image");
    expect(body, "tier-yard").not.toMatch(/href=["']https?:/);
    expect(body, "tier-yard").not.toMatch(/url\(["']?https?:/);
    expect(body, "tier-yard").not.toContain("\uFFFD");
    expect(body, "tier-yard").toContain("</svg>");
  });

  it("validates generated SVG asset tiny_watering_path", () => {
    const href = GeneratedAssetRegistry["tiny_watering_path"];
    expect(href, "tiny_watering_path").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "tiny_watering_path").toBe(true);
    expect(body, "tiny_watering_path").toContain("aria-label");
    expect(body.length, "tiny_watering_path").toBeGreaterThan(900);
    expect(body, "tiny_watering_path").not.toContain("<image");
    expect(body, "tiny_watering_path").not.toMatch(/href=["']https?:/);
    expect(body, "tiny_watering_path").not.toMatch(/url\(["']?https?:/);
    expect(body, "tiny_watering_path").not.toContain("\uFFFD");
    expect(body, "tiny_watering_path").toContain("</svg>");
  });

  it("validates generated SVG asset toolbox", () => {
    const href = GeneratedAssetRegistry["toolbox"];
    expect(href, "toolbox").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "toolbox").toBe(true);
    expect(body, "toolbox").toContain("aria-label");
    expect(body.length, "toolbox").toBeGreaterThan(900);
    expect(body, "toolbox").not.toContain("<image");
    expect(body, "toolbox").not.toMatch(/href=["']https?:/);
    expect(body, "toolbox").not.toMatch(/url\(["']?https?:/);
    expect(body, "toolbox").not.toContain("\uFFFD");
    expect(body, "toolbox").toContain("</svg>");
  });

  it("validates generated SVG asset toolbox_first", () => {
    const href = GeneratedAssetRegistry["toolbox_first"];
    expect(href, "toolbox_first").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "toolbox_first").toBe(true);
    expect(body, "toolbox_first").toContain("aria-label");
    expect(body.length, "toolbox_first").toBeGreaterThan(900);
    expect(body, "toolbox_first").not.toContain("<image");
    expect(body, "toolbox_first").not.toMatch(/href=["']https?:/);
    expect(body, "toolbox_first").not.toMatch(/url\(["']?https?:/);
    expect(body, "toolbox_first").not.toContain("\uFFFD");
    expect(body, "toolbox_first").toContain("</svg>");
  });

  it("validates generated SVG asset towel", () => {
    const href = GeneratedAssetRegistry["towel"];
    expect(href, "towel").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "towel").toBe(true);
    expect(body, "towel").toContain("aria-label");
    expect(body.length, "towel").toBeGreaterThan(900);
    expect(body, "towel").not.toContain("<image");
    expect(body, "towel").not.toMatch(/href=["']https?:/);
    expect(body, "towel").not.toMatch(/url\(["']?https?:/);
    expect(body, "towel").not.toContain("\uFFFD");
    expect(body, "towel").toContain("</svg>");
  });

  it("validates generated SVG asset towel_rack_corner", () => {
    const href = GeneratedAssetRegistry["towel_rack_corner"];
    expect(href, "towel_rack_corner").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "towel_rack_corner").toBe(true);
    expect(body, "towel_rack_corner").toContain("aria-label");
    expect(body.length, "towel_rack_corner").toBeGreaterThan(900);
    expect(body, "towel_rack_corner").not.toContain("<image");
    expect(body, "towel_rack_corner").not.toMatch(/href=["']https?:/);
    expect(body, "towel_rack_corner").not.toMatch(/url\(["']?https?:/);
    expect(body, "towel_rack_corner").not.toContain("\uFFFD");
    expect(body, "towel_rack_corner").toContain("</svg>");
  });

  it("validates generated SVG asset upgrades", () => {
    const href = GeneratedAssetRegistry["upgrades"];
    expect(href, "upgrades").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "upgrades").toBe(true);
    expect(body, "upgrades").toContain("aria-label");
    expect(body.length, "upgrades").toBeGreaterThan(900);
    expect(body, "upgrades").not.toContain("<image");
    expect(body, "upgrades").not.toMatch(/href=["']https?:/);
    expect(body, "upgrades").not.toMatch(/url\(["']?https?:/);
    expect(body, "upgrades").not.toContain("\uFFFD");
    expect(body, "upgrades").toContain("</svg>");
  });

  it("validates generated SVG asset warm_pond", () => {
    const href = GeneratedAssetRegistry["warm_pond"];
    expect(href, "warm_pond").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "warm_pond").toBe(true);
    expect(body, "warm_pond").toContain("aria-label");
    expect(body.length, "warm_pond").toBeGreaterThan(900);
    expect(body, "warm_pond").not.toContain("<image");
    expect(body, "warm_pond").not.toMatch(/href=["']https?:/);
    expect(body, "warm_pond").not.toMatch(/url\(["']?https?:/);
    expect(body, "warm_pond").not.toContain("\uFFFD");
    expect(body, "warm_pond").toContain("</svg>");
  });

  it("validates generated SVG asset warm_pond_stones", () => {
    const href = GeneratedAssetRegistry["warm_pond_stones"];
    expect(href, "warm_pond_stones").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "warm_pond_stones").toBe(true);
    expect(body, "warm_pond_stones").toContain("aria-label");
    expect(body.length, "warm_pond_stones").toBeGreaterThan(900);
    expect(body, "warm_pond_stones").not.toContain("<image");
    expect(body, "warm_pond_stones").not.toMatch(/href=["']https?:/);
    expect(body, "warm_pond_stones").not.toMatch(/url\(["']?https?:/);
    expect(body, "warm_pond_stones").not.toContain("\uFFFD");
    expect(body, "warm_pond_stones").toContain("</svg>");
  });

  it("validates generated SVG asset warm_towel", () => {
    const href = GeneratedAssetRegistry["warm_towel"];
    expect(href, "warm_towel").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "warm_towel").toBe(true);
    expect(body, "warm_towel").toContain("aria-label");
    expect(body.length, "warm_towel").toBeGreaterThan(900);
    expect(body, "warm_towel").not.toContain("<image");
    expect(body, "warm_towel").not.toMatch(/href=["']https?:/);
    expect(body, "warm_towel").not.toMatch(/url\(["']?https?:/);
    expect(body, "warm_towel").not.toContain("\uFFFD");
    expect(body, "warm_towel").toContain("</svg>");
  });

  it("validates generated SVG asset water_path", () => {
    const href = GeneratedAssetRegistry["water_path"];
    expect(href, "water_path").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "water_path").toBe(true);
    expect(body, "water_path").toContain("aria-label");
    expect(body.length, "water_path").toBeGreaterThan(900);
    expect(body, "water_path").not.toContain("<image");
    expect(body, "water_path").not.toMatch(/href=["']https?:/);
    expect(body, "water_path").not.toMatch(/url\(["']?https?:/);
    expect(body, "water_path").not.toContain("\uFFFD");
    expect(body, "water_path").toContain("</svg>");
  });

  it("validates generated SVG asset watering_rill", () => {
    const href = GeneratedAssetRegistry["watering_rill"];
    expect(href, "watering_rill").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "watering_rill").toBe(true);
    expect(body, "watering_rill").toContain("aria-label");
    expect(body.length, "watering_rill").toBeGreaterThan(900);
    expect(body, "watering_rill").not.toContain("<image");
    expect(body, "watering_rill").not.toMatch(/href=["']https?:/);
    expect(body, "watering_rill").not.toMatch(/url\(["']?https?:/);
    expect(body, "watering_rill").not.toContain("\uFFFD");
    expect(body, "watering_rill").toContain("</svg>");
  });

  it("validates generated SVG asset welcome_first_basket", () => {
    const href = GeneratedAssetRegistry["welcome_first_basket"];
    expect(href, "welcome_first_basket").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "welcome_first_basket").toBe(true);
    expect(body, "welcome_first_basket").toContain("aria-label");
    expect(body.length, "welcome_first_basket").toBeGreaterThan(900);
    expect(body, "welcome_first_basket").not.toContain("<image");
    expect(body, "welcome_first_basket").not.toMatch(/href=["']https?:/);
    expect(body, "welcome_first_basket").not.toMatch(/url\(["']?https?:/);
    expect(body, "welcome_first_basket").not.toContain("\uFFFD");
    expect(body, "welcome_first_basket").toContain("</svg>");
  });

  it("validates generated SVG asset welcome_first_orange", () => {
    const href = GeneratedAssetRegistry["welcome_first_orange"];
    expect(href, "welcome_first_orange").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "welcome_first_orange").toBe(true);
    expect(body, "welcome_first_orange").toContain("aria-label");
    expect(body.length, "welcome_first_orange").toBeGreaterThan(900);
    expect(body, "welcome_first_orange").not.toContain("<image");
    expect(body, "welcome_first_orange").not.toMatch(/href=["']https?:/);
    expect(body, "welcome_first_orange").not.toMatch(/url\(["']?https?:/);
    expect(body, "welcome_first_orange").not.toContain("\uFFFD");
    expect(body, "welcome_first_orange").toContain("</svg>");
  });

  it("validates generated SVG asset welcome_soft_paw", () => {
    const href = GeneratedAssetRegistry["welcome_soft_paw"];
    expect(href, "welcome_soft_paw").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "welcome_soft_paw").toBe(true);
    expect(body, "welcome_soft_paw").toContain("aria-label");
    expect(body.length, "welcome_soft_paw").toBeGreaterThan(900);
    expect(body, "welcome_soft_paw").not.toContain("<image");
    expect(body, "welcome_soft_paw").not.toMatch(/href=["']https?:/);
    expect(body, "welcome_soft_paw").not.toMatch(/url\(["']?https?:/);
    expect(body, "welcome_soft_paw").not.toContain("\uFFFD");
    expect(body, "welcome_soft_paw").toContain("</svg>");
  });

  it("validates generated SVG asset welcome_steady_ten", () => {
    const href = GeneratedAssetRegistry["welcome_steady_ten"];
    expect(href, "welcome_steady_ten").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "welcome_steady_ten").toBe(true);
    expect(body, "welcome_steady_ten").toContain("aria-label");
    expect(body.length, "welcome_steady_ten").toBeGreaterThan(900);
    expect(body, "welcome_steady_ten").not.toContain("<image");
    expect(body, "welcome_steady_ten").not.toMatch(/href=["']https?:/);
    expect(body, "welcome_steady_ten").not.toMatch(/url\(["']?https?:/);
    expect(body, "welcome_steady_ten").not.toContain("\uFFFD");
    expect(body, "welcome_steady_ten").toContain("</svg>");
  });

  it("validates generated SVG asset wind_chime_bridge", () => {
    const href = GeneratedAssetRegistry["wind_chime_bridge"];
    expect(href, "wind_chime_bridge").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "wind_chime_bridge").toBe(true);
    expect(body, "wind_chime_bridge").toContain("aria-label");
    expect(body.length, "wind_chime_bridge").toBeGreaterThan(900);
    expect(body, "wind_chime_bridge").not.toContain("<image");
    expect(body, "wind_chime_bridge").not.toMatch(/href=["']https?:/);
    expect(body, "wind_chime_bridge").not.toMatch(/url\(["']?https?:/);
    expect(body, "wind_chime_bridge").not.toContain("\uFFFD");
    expect(body, "wind_chime_bridge").toContain("</svg>");
  });

  it("validates generated SVG asset wooden_crate_line", () => {
    const href = GeneratedAssetRegistry["wooden_crate_line"];
    expect(href, "wooden_crate_line").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "wooden_crate_line").toBe(true);
    expect(body, "wooden_crate_line").toContain("aria-label");
    expect(body.length, "wooden_crate_line").toBeGreaterThan(900);
    expect(body, "wooden_crate_line").not.toContain("<image");
    expect(body, "wooden_crate_line").not.toMatch(/href=["']https?:/);
    expect(body, "wooden_crate_line").not.toMatch(/url\(["']?https?:/);
    expect(body, "wooden_crate_line").not.toContain("\uFFFD");
    expect(body, "wooden_crate_line").toContain("</svg>");
  });

  it("validates generated SVG asset yard", () => {
    const href = GeneratedAssetRegistry["yard"];
    expect(href, "yard").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard").toBe(true);
    expect(body, "yard").toContain("aria-label");
    expect(body.length, "yard").toBeGreaterThan(900);
    expect(body, "yard").not.toContain("<image");
    expect(body, "yard").not.toMatch(/href=["']https?:/);
    expect(body, "yard").not.toMatch(/url\(["']?https?:/);
    expect(body, "yard").not.toContain("\uFFFD");
    expect(body, "yard").toContain("</svg>");
  });

  it("validates generated SVG asset yard_first_100", () => {
    const href = GeneratedAssetRegistry["yard_first_100"];
    expect(href, "yard_first_100").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_first_100").toBe(true);
    expect(body, "yard_first_100").toContain("aria-label");
    expect(body.length, "yard_first_100").toBeGreaterThan(900);
    expect(body, "yard_first_100").not.toContain("<image");
    expect(body, "yard_first_100").not.toMatch(/href=["']https?:/);
    expect(body, "yard_first_100").not.toMatch(/url\(["']?https?:/);
    expect(body, "yard_first_100").not.toContain("\uFFFD");
    expect(body, "yard_first_100").toContain("</svg>");
  });

  it("validates generated SVG asset yard_nap_mat", () => {
    const href = GeneratedAssetRegistry["yard_nap_mat"];
    expect(href, "yard_nap_mat").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_nap_mat").toBe(true);
    expect(body, "yard_nap_mat").toContain("aria-label");
    expect(body.length, "yard_nap_mat").toBeGreaterThan(900);
    expect(body, "yard_nap_mat").not.toContain("<image");
    expect(body, "yard_nap_mat").not.toMatch(/href=["']https?:/);
    expect(body, "yard_nap_mat").not.toMatch(/url\(["']?https?:/);
    expect(body, "yard_nap_mat").not.toContain("\uFFFD");
    expect(body, "yard_nap_mat").toContain("</svg>");
  });

  it("validates generated SVG asset yard_one_thousand", () => {
    const href = GeneratedAssetRegistry["yard_one_thousand"];
    expect(href, "yard_one_thousand").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_one_thousand").toBe(true);
    expect(body, "yard_one_thousand").toContain("aria-label");
    expect(body.length, "yard_one_thousand").toBeGreaterThan(900);
    expect(body, "yard_one_thousand").not.toContain("<image");
    expect(body, "yard_one_thousand").not.toMatch(/href=["']https?:/);
    expect(body, "yard_one_thousand").not.toMatch(/url\(["']?https?:/);
    expect(body, "yard_one_thousand").not.toContain("\uFFFD");
    expect(body, "yard_one_thousand").toContain("</svg>");
  });

  it("validates generated SVG asset yard_parasol", () => {
    const href = GeneratedAssetRegistry["yard_parasol"];
    expect(href, "yard_parasol").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_parasol").toBe(true);
    expect(body, "yard_parasol").toContain("aria-label");
    expect(body.length, "yard_parasol").toBeGreaterThan(900);
    expect(body, "yard_parasol").not.toContain("<image");
    expect(body, "yard_parasol").not.toMatch(/href=["']https?:/);
    expect(body, "yard_parasol").not.toMatch(/url\(["']?https?:/);
    expect(body, "yard_parasol").not.toContain("\uFFFD");
    expect(body, "yard_parasol").toContain("</svg>");
  });

  it("validates generated SVG asset yard_set", () => {
    const href = GeneratedAssetRegistry["yard_set"];
    expect(href, "yard_set").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_set").toBe(true);
    expect(body, "yard_set").toContain("aria-label");
    expect(body.length, "yard_set").toBeGreaterThan(900);
    expect(body, "yard_set").not.toContain("<image");
    expect(body, "yard_set").not.toMatch(/href=["']https?:/);
    expect(body, "yard_set").not.toMatch(/url\(["']?https?:/);
    expect(body, "yard_set").not.toContain("\uFFFD");
    expect(body, "yard_set").toContain("</svg>");
  });

  it("validates generated SVG asset yard_spoon", () => {
    const href = GeneratedAssetRegistry["yard_spoon"];
    expect(href, "yard_spoon").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_spoon").toBe(true);
    expect(body, "yard_spoon").toContain("aria-label");
    expect(body.length, "yard_spoon").toBeGreaterThan(900);
    expect(body, "yard_spoon").not.toContain("<image");
    expect(body, "yard_spoon").not.toMatch(/href=["']https?:/);
    expect(body, "yard_spoon").not.toMatch(/url\(["']?https?:/);
    expect(body, "yard_spoon").not.toContain("\uFFFD");
    expect(body, "yard_spoon").toContain("</svg>");
  });

  it("validates generated SVG asset yard_tap_100", () => {
    const href = GeneratedAssetRegistry["yard_tap_100"];
    expect(href, "yard_tap_100").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_tap_100").toBe(true);
    expect(body, "yard_tap_100").toContain("aria-label");
    expect(body.length, "yard_tap_100").toBeGreaterThan(900);
    expect(body, "yard_tap_100").not.toContain("<image");
    expect(body, "yard_tap_100").not.toMatch(/href=["']https?:/);
    expect(body, "yard_tap_100").not.toMatch(/url\(["']?https?:/);
    expect(body, "yard_tap_100").not.toContain("\uFFFD");
    expect(body, "yard_tap_100").toContain("</svg>");
  });

  it("validates generated SVG asset yard_water_path", () => {
    const href = GeneratedAssetRegistry["yard_water_path"];
    expect(href, "yard_water_path").toBeTruthy();
    const filePath = fileURLToPath(href);
    const body = readFileSync(filePath, "utf8");
    expect(body.startsWith("<svg"), "yard_water_path").toBe(true);
    expect(body, "yard_water_path").toContain("aria-label");
    expect(body.length, "yard_water_path").toBeGreaterThan(900);
    expect(body, "yard_water_path").not.toContain("<image");
    expect(body, "yard_water_path").not.toMatch(/href=["']https?:/);
    expect(body, "yard_water_path").not.toMatch(/url\(["']?https?:/);
    expect(body, "yard_water_path").not.toContain("\uFFFD");
    expect(body, "yard_water_path").toContain("</svg>");
  });

});
