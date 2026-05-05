import { describe, expect, it } from "vitest";
import { AchievementConfig } from "../../config/AchievementConfig";
import { BalanceConfig } from "../../config/BalanceConfig";
import { DecorationConfig } from "../../config/DecorationConfig";
import { ProgressionConfig } from "../../config/ProgressionConfig";
import { QuestConfig } from "../../config/QuestConfig";
import { StoryConfig } from "../../config/StoryConfig";
import { BigNumberLite } from "../../core/BigNumberLite";
import { GeneratedAssetRegistry } from "../../assets/generated/GeneratedAssetRegistry";

const expectedUpgradeIds = [
  "soft_paw",
  "butler_gloves",
  "orange_spoon",
  "sorting_rhythm",
  "warm_towel",
  "citrus_recipe",
  "bamboo_touch",
  "festival_clap",
  "golden_leaf_polish",
  "memory_butler",
  "orange_basket",
  "nap_mat",
  "shade_parasol",
  "tiny_watering_path",
  "wooden_crate_line",
  "fragrance_storehouse",
  "sorting_table",
  "cart_stop",
  "warm_pond",
  "steam_towel_rack",
  "snack_counter",
  "mineral_stream",
  "bamboo_cart",
  "wind_chime_bridge",
  "orange_lantern_road",
  "butler_toolbox",
  "golden_forest_path",
  "leaf_compost_house",
  "moon_orange_observatory",
  "season_memory_gate",
] as const;
const expectedAchievementIds = [
  "first_orange",
  "ten_taps",
  "hundred_taps",
  "thousand_taps",
  "first_100_oranges",
  "first_1k_oranges",
  "storehouse_5k",
  "fragrant_25k",
  "onsen_75k",
  "onsen_300k",
  "bamboo_1m",
  "bamboo_5m",
  "golden_25m",
  "soft_paw_1",
  "soft_paw_10",
  "basket_1",
  "basket_25",
  "storehouse_first",
  "onsen_first",
  "bamboo_cart_first",
  "toolbox_first",
  "gold_path_first",
  "tap_suite_20",
  "tap_suite_100",
  "generator_suite_20",
  "generator_suite_120",
  "eps_10",
  "eps_1k",
  "eps_100k",
  "eps_1m",
  "first_leaf",
  "five_leaf",
  "first_prestige",
  "third_prestige",
  "ad_festival",
  "sandbox_gift",
  "sandbox_shelf",
  "all_yard_core",
  "late_game_marker",
  "memory_touch_first",
] as const;
const expectedQuestIds = [
  "welcome_first_orange",
  "welcome_soft_paw",
  "welcome_first_basket",
  "welcome_steady_ten",
  "yard_first_100",
  "yard_nap_mat",
  "yard_parasol",
  "yard_spoon",
  "yard_water_path",
  "yard_one_thousand",
  "yard_tap_100",
  "storehouse_open",
  "storehouse_crate_line",
  "storehouse_rhythm",
  "storehouse_fragrance",
  "storehouse_25k",
  "storehouse_sorting_table",
  "storehouse_cart_stop",
  "storehouse_total_levels",
  "onsen_open",
  "onsen_warm_pond",
  "onsen_towel_touch",
  "onsen_towel_rack",
  "onsen_snack_recipe",
  "onsen_snack_counter",
  "onsen_eps_1k",
  "onsen_300k",
  "bamboo_open",
  "bamboo_touch",
  "bamboo_cart",
  "bamboo_wind_bridge",
  "bamboo_festival_clap",
  "bamboo_lantern",
  "bamboo_toolbox",
  "bamboo_eps_100k",
  "bamboo_total_levels",
  "golden_open",
  "golden_first_prestige",
  "golden_leaf_path",
  "golden_leaf_polish",
  "golden_five_leaves",
  "golden_compost",
  "golden_memory_touch",
  "golden_observatory",
  "golden_memory_gate",
  "release_ad_festival",
  "release_shop_gift",
  "release_album_first",
  "release_album_basket",
  "release_export_ready",
] as const;
const expectedDecorationIds = [
  "sunny_yard",
  "orange_basket_corner",
  "soft_paw_stamp",
  "nap_mat_set",
  "watering_rill",
  "storehouse_sign",
  "crate_lane",
  "fragrance_shelf",
  "cart_stop_flag",
  "onsen_mist",
  "warm_pond_stones",
  "towel_rack_corner",
  "snack_counter_table",
  "bamboo_gate",
  "bamboo_cart_track",
  "wind_chime_bridge",
  "orange_lanterns",
  "festival_ribbon",
  "golden_forest_arch",
  "first_leaf_plaque",
  "golden_leaf_path",
  "compost_greenhouse",
  "moon_observatory",
  "memory_gate_halo",
  "release_stamp_board",
] as const;
const expectedCapybaraIds = [
  "momo",
  "narin",
  "dami",
  "biro",
  "soda",
  "ruru",
  "hanul",
  "podo",
] as const;
const expectedTierIds = [
  "yard",
  "storehouse",
  "onsen",
  "bamboo_garden",
  "golden_forest",
] as const;

function allUpgrades() {
  return [...BalanceConfig.tapUpgrades, ...BalanceConfig.generators];
}

describe("release content snapshot matrix", () => {
  it("keeps expected content counts stable", () => {
    expect(allUpgrades().map((item) => item.id)).toEqual(expectedUpgradeIds);
    expect(AchievementConfig.achievements.map((item) => item.id)).toEqual(expectedAchievementIds);
    expect(QuestConfig.quests.map((item) => item.id)).toEqual(expectedQuestIds);
    expect(DecorationConfig.decorations.map((item) => item.id)).toEqual(expectedDecorationIds);
    expect(StoryConfig.capybaras.map((item) => item.id)).toEqual(expectedCapybaraIds);
    expect(ProgressionConfig.tiers.map((item) => item.id)).toEqual(expectedTierIds);
  });

  it("upgrade soft_paw has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "soft_paw");
    expect(item).toBeTruthy();
    expect(item?.name.length, "soft_paw").toBeGreaterThan(2);
    expect(item?.description.length, "soft_paw").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "soft_paw").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "soft_paw").toBe(true);
    expect(item?.growthRate, "soft_paw").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["soft_paw"], "soft_paw").toBeTruthy();
  });

  it("upgrade butler_gloves has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "butler_gloves");
    expect(item).toBeTruthy();
    expect(item?.name.length, "butler_gloves").toBeGreaterThan(2);
    expect(item?.description.length, "butler_gloves").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "butler_gloves").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "butler_gloves").toBe(true);
    expect(item?.growthRate, "butler_gloves").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["butler_gloves"], "butler_gloves").toBeTruthy();
  });

  it("upgrade orange_spoon has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "orange_spoon");
    expect(item).toBeTruthy();
    expect(item?.name.length, "orange_spoon").toBeGreaterThan(2);
    expect(item?.description.length, "orange_spoon").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "orange_spoon").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "orange_spoon").toBe(true);
    expect(item?.growthRate, "orange_spoon").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["orange_spoon"], "orange_spoon").toBeTruthy();
  });

  it("upgrade sorting_rhythm has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "sorting_rhythm");
    expect(item).toBeTruthy();
    expect(item?.name.length, "sorting_rhythm").toBeGreaterThan(2);
    expect(item?.description.length, "sorting_rhythm").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "sorting_rhythm").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "sorting_rhythm").toBe(true);
    expect(item?.growthRate, "sorting_rhythm").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["sorting_rhythm"], "sorting_rhythm").toBeTruthy();
  });

  it("upgrade warm_towel has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "warm_towel");
    expect(item).toBeTruthy();
    expect(item?.name.length, "warm_towel").toBeGreaterThan(2);
    expect(item?.description.length, "warm_towel").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "warm_towel").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "warm_towel").toBe(true);
    expect(item?.growthRate, "warm_towel").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["warm_towel"], "warm_towel").toBeTruthy();
  });

  it("upgrade citrus_recipe has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "citrus_recipe");
    expect(item).toBeTruthy();
    expect(item?.name.length, "citrus_recipe").toBeGreaterThan(2);
    expect(item?.description.length, "citrus_recipe").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "citrus_recipe").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "citrus_recipe").toBe(true);
    expect(item?.growthRate, "citrus_recipe").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["citrus_recipe"], "citrus_recipe").toBeTruthy();
  });

  it("upgrade bamboo_touch has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "bamboo_touch");
    expect(item).toBeTruthy();
    expect(item?.name.length, "bamboo_touch").toBeGreaterThan(2);
    expect(item?.description.length, "bamboo_touch").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "bamboo_touch").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "bamboo_touch").toBe(true);
    expect(item?.growthRate, "bamboo_touch").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["bamboo_touch"], "bamboo_touch").toBeTruthy();
  });

  it("upgrade festival_clap has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "festival_clap");
    expect(item).toBeTruthy();
    expect(item?.name.length, "festival_clap").toBeGreaterThan(2);
    expect(item?.description.length, "festival_clap").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "festival_clap").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "festival_clap").toBe(true);
    expect(item?.growthRate, "festival_clap").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["festival_clap"], "festival_clap").toBeTruthy();
  });

  it("upgrade golden_leaf_polish has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "golden_leaf_polish");
    expect(item).toBeTruthy();
    expect(item?.name.length, "golden_leaf_polish").toBeGreaterThan(2);
    expect(item?.description.length, "golden_leaf_polish").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "golden_leaf_polish").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "golden_leaf_polish").toBe(true);
    expect(item?.growthRate, "golden_leaf_polish").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["golden_leaf_polish"], "golden_leaf_polish").toBeTruthy();
  });

  it("upgrade memory_butler has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "memory_butler");
    expect(item).toBeTruthy();
    expect(item?.name.length, "memory_butler").toBeGreaterThan(2);
    expect(item?.description.length, "memory_butler").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "memory_butler").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "memory_butler").toBe(true);
    expect(item?.growthRate, "memory_butler").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["memory_butler"], "memory_butler").toBeTruthy();
  });

  it("upgrade orange_basket has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "orange_basket");
    expect(item).toBeTruthy();
    expect(item?.name.length, "orange_basket").toBeGreaterThan(2);
    expect(item?.description.length, "orange_basket").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "orange_basket").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "orange_basket").toBe(true);
    expect(item?.growthRate, "orange_basket").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["orange_basket"], "orange_basket").toBeTruthy();
  });

  it("upgrade nap_mat has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "nap_mat");
    expect(item).toBeTruthy();
    expect(item?.name.length, "nap_mat").toBeGreaterThan(2);
    expect(item?.description.length, "nap_mat").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "nap_mat").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "nap_mat").toBe(true);
    expect(item?.growthRate, "nap_mat").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["nap_mat"], "nap_mat").toBeTruthy();
  });

  it("upgrade shade_parasol has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "shade_parasol");
    expect(item).toBeTruthy();
    expect(item?.name.length, "shade_parasol").toBeGreaterThan(2);
    expect(item?.description.length, "shade_parasol").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "shade_parasol").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "shade_parasol").toBe(true);
    expect(item?.growthRate, "shade_parasol").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["shade_parasol"], "shade_parasol").toBeTruthy();
  });

  it("upgrade tiny_watering_path has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "tiny_watering_path");
    expect(item).toBeTruthy();
    expect(item?.name.length, "tiny_watering_path").toBeGreaterThan(2);
    expect(item?.description.length, "tiny_watering_path").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "tiny_watering_path").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "tiny_watering_path").toBe(true);
    expect(item?.growthRate, "tiny_watering_path").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["tiny_watering_path"], "tiny_watering_path").toBeTruthy();
  });

  it("upgrade wooden_crate_line has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "wooden_crate_line");
    expect(item).toBeTruthy();
    expect(item?.name.length, "wooden_crate_line").toBeGreaterThan(2);
    expect(item?.description.length, "wooden_crate_line").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "wooden_crate_line").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "wooden_crate_line").toBe(true);
    expect(item?.growthRate, "wooden_crate_line").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["wooden_crate_line"], "wooden_crate_line").toBeTruthy();
  });

  it("upgrade fragrance_storehouse has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "fragrance_storehouse");
    expect(item).toBeTruthy();
    expect(item?.name.length, "fragrance_storehouse").toBeGreaterThan(2);
    expect(item?.description.length, "fragrance_storehouse").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "fragrance_storehouse").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "fragrance_storehouse").toBe(true);
    expect(item?.growthRate, "fragrance_storehouse").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["fragrance_storehouse"], "fragrance_storehouse").toBeTruthy();
  });

  it("upgrade sorting_table has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "sorting_table");
    expect(item).toBeTruthy();
    expect(item?.name.length, "sorting_table").toBeGreaterThan(2);
    expect(item?.description.length, "sorting_table").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "sorting_table").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "sorting_table").toBe(true);
    expect(item?.growthRate, "sorting_table").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["sorting_table"], "sorting_table").toBeTruthy();
  });

  it("upgrade cart_stop has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "cart_stop");
    expect(item).toBeTruthy();
    expect(item?.name.length, "cart_stop").toBeGreaterThan(2);
    expect(item?.description.length, "cart_stop").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "cart_stop").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "cart_stop").toBe(true);
    expect(item?.growthRate, "cart_stop").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["cart_stop"], "cart_stop").toBeTruthy();
  });

  it("upgrade warm_pond has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "warm_pond");
    expect(item).toBeTruthy();
    expect(item?.name.length, "warm_pond").toBeGreaterThan(2);
    expect(item?.description.length, "warm_pond").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "warm_pond").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "warm_pond").toBe(true);
    expect(item?.growthRate, "warm_pond").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["warm_pond"], "warm_pond").toBeTruthy();
  });

  it("upgrade steam_towel_rack has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "steam_towel_rack");
    expect(item).toBeTruthy();
    expect(item?.name.length, "steam_towel_rack").toBeGreaterThan(2);
    expect(item?.description.length, "steam_towel_rack").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "steam_towel_rack").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "steam_towel_rack").toBe(true);
    expect(item?.growthRate, "steam_towel_rack").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["steam_towel_rack"], "steam_towel_rack").toBeTruthy();
  });

  it("upgrade snack_counter has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "snack_counter");
    expect(item).toBeTruthy();
    expect(item?.name.length, "snack_counter").toBeGreaterThan(2);
    expect(item?.description.length, "snack_counter").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "snack_counter").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "snack_counter").toBe(true);
    expect(item?.growthRate, "snack_counter").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["snack_counter"], "snack_counter").toBeTruthy();
  });

  it("upgrade mineral_stream has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "mineral_stream");
    expect(item).toBeTruthy();
    expect(item?.name.length, "mineral_stream").toBeGreaterThan(2);
    expect(item?.description.length, "mineral_stream").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "mineral_stream").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "mineral_stream").toBe(true);
    expect(item?.growthRate, "mineral_stream").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["mineral_stream"], "mineral_stream").toBeTruthy();
  });

  it("upgrade bamboo_cart has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "bamboo_cart");
    expect(item).toBeTruthy();
    expect(item?.name.length, "bamboo_cart").toBeGreaterThan(2);
    expect(item?.description.length, "bamboo_cart").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "bamboo_cart").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "bamboo_cart").toBe(true);
    expect(item?.growthRate, "bamboo_cart").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["bamboo_cart"], "bamboo_cart").toBeTruthy();
  });

  it("upgrade wind_chime_bridge has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "wind_chime_bridge");
    expect(item).toBeTruthy();
    expect(item?.name.length, "wind_chime_bridge").toBeGreaterThan(2);
    expect(item?.description.length, "wind_chime_bridge").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "wind_chime_bridge").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "wind_chime_bridge").toBe(true);
    expect(item?.growthRate, "wind_chime_bridge").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["wind_chime_bridge"], "wind_chime_bridge").toBeTruthy();
  });

  it("upgrade orange_lantern_road has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "orange_lantern_road");
    expect(item).toBeTruthy();
    expect(item?.name.length, "orange_lantern_road").toBeGreaterThan(2);
    expect(item?.description.length, "orange_lantern_road").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "orange_lantern_road").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "orange_lantern_road").toBe(true);
    expect(item?.growthRate, "orange_lantern_road").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["orange_lantern_road"], "orange_lantern_road").toBeTruthy();
  });

  it("upgrade butler_toolbox has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "butler_toolbox");
    expect(item).toBeTruthy();
    expect(item?.name.length, "butler_toolbox").toBeGreaterThan(2);
    expect(item?.description.length, "butler_toolbox").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "butler_toolbox").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "butler_toolbox").toBe(true);
    expect(item?.growthRate, "butler_toolbox").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["butler_toolbox"], "butler_toolbox").toBeTruthy();
  });

  it("upgrade golden_forest_path has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "golden_forest_path");
    expect(item).toBeTruthy();
    expect(item?.name.length, "golden_forest_path").toBeGreaterThan(2);
    expect(item?.description.length, "golden_forest_path").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "golden_forest_path").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "golden_forest_path").toBe(true);
    expect(item?.growthRate, "golden_forest_path").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["golden_forest_path"], "golden_forest_path").toBeTruthy();
  });

  it("upgrade leaf_compost_house has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "leaf_compost_house");
    expect(item).toBeTruthy();
    expect(item?.name.length, "leaf_compost_house").toBeGreaterThan(2);
    expect(item?.description.length, "leaf_compost_house").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "leaf_compost_house").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "leaf_compost_house").toBe(true);
    expect(item?.growthRate, "leaf_compost_house").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["leaf_compost_house"], "leaf_compost_house").toBeTruthy();
  });

  it("upgrade moon_orange_observatory has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "moon_orange_observatory");
    expect(item).toBeTruthy();
    expect(item?.name.length, "moon_orange_observatory").toBeGreaterThan(2);
    expect(item?.description.length, "moon_orange_observatory").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "moon_orange_observatory").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "moon_orange_observatory").toBe(true);
    expect(item?.growthRate, "moon_orange_observatory").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["moon_orange_observatory"], "moon_orange_observatory").toBeTruthy();
  });

  it("upgrade season_memory_gate has release-ready content and asset", () => {
    const item = allUpgrades().find((upgrade) => upgrade.id === "season_memory_gate");
    expect(item).toBeTruthy();
    expect(item?.name.length, "season_memory_gate").toBeGreaterThan(2);
    expect(item?.description.length, "season_memory_gate").toBeGreaterThan(12);
    expect(item?.uiCopy.length, "season_memory_gate").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), "season_memory_gate").toBe(true);
    expect(item?.growthRate, "season_memory_gate").toBeGreaterThan(1);
    expect(GeneratedAssetRegistry["season_memory_gate"], "season_memory_gate").toBeTruthy();
  });

  it("achievement first_orange has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "first_orange");
    expect(item).toBeTruthy();
    expect(item?.name.length, "first_orange").toBeGreaterThan(2);
    expect(item?.description.length, "first_orange").toBeGreaterThan(8);
    expect(item?.rewardText.length, "first_orange").toBeGreaterThan(4);
    expect(item?.toast.length, "first_orange").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "first_orange").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["first_orange"], "first_orange").toBeTruthy();
  });

  it("achievement ten_taps has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "ten_taps");
    expect(item).toBeTruthy();
    expect(item?.name.length, "ten_taps").toBeGreaterThan(2);
    expect(item?.description.length, "ten_taps").toBeGreaterThan(8);
    expect(item?.rewardText.length, "ten_taps").toBeGreaterThan(4);
    expect(item?.toast.length, "ten_taps").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "ten_taps").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["ten_taps"], "ten_taps").toBeTruthy();
  });

  it("achievement hundred_taps has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "hundred_taps");
    expect(item).toBeTruthy();
    expect(item?.name.length, "hundred_taps").toBeGreaterThan(2);
    expect(item?.description.length, "hundred_taps").toBeGreaterThan(8);
    expect(item?.rewardText.length, "hundred_taps").toBeGreaterThan(4);
    expect(item?.toast.length, "hundred_taps").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "hundred_taps").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["hundred_taps"], "hundred_taps").toBeTruthy();
  });

  it("achievement thousand_taps has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "thousand_taps");
    expect(item).toBeTruthy();
    expect(item?.name.length, "thousand_taps").toBeGreaterThan(2);
    expect(item?.description.length, "thousand_taps").toBeGreaterThan(8);
    expect(item?.rewardText.length, "thousand_taps").toBeGreaterThan(4);
    expect(item?.toast.length, "thousand_taps").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "thousand_taps").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["thousand_taps"], "thousand_taps").toBeTruthy();
  });

  it("achievement first_100_oranges has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "first_100_oranges");
    expect(item).toBeTruthy();
    expect(item?.name.length, "first_100_oranges").toBeGreaterThan(2);
    expect(item?.description.length, "first_100_oranges").toBeGreaterThan(8);
    expect(item?.rewardText.length, "first_100_oranges").toBeGreaterThan(4);
    expect(item?.toast.length, "first_100_oranges").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "first_100_oranges").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["first_100_oranges"], "first_100_oranges").toBeTruthy();
  });

  it("achievement first_1k_oranges has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "first_1k_oranges");
    expect(item).toBeTruthy();
    expect(item?.name.length, "first_1k_oranges").toBeGreaterThan(2);
    expect(item?.description.length, "first_1k_oranges").toBeGreaterThan(8);
    expect(item?.rewardText.length, "first_1k_oranges").toBeGreaterThan(4);
    expect(item?.toast.length, "first_1k_oranges").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "first_1k_oranges").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["first_1k_oranges"], "first_1k_oranges").toBeTruthy();
  });

  it("achievement storehouse_5k has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "storehouse_5k");
    expect(item).toBeTruthy();
    expect(item?.name.length, "storehouse_5k").toBeGreaterThan(2);
    expect(item?.description.length, "storehouse_5k").toBeGreaterThan(8);
    expect(item?.rewardText.length, "storehouse_5k").toBeGreaterThan(4);
    expect(item?.toast.length, "storehouse_5k").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "storehouse_5k").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["storehouse_5k"], "storehouse_5k").toBeTruthy();
  });

  it("achievement fragrant_25k has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "fragrant_25k");
    expect(item).toBeTruthy();
    expect(item?.name.length, "fragrant_25k").toBeGreaterThan(2);
    expect(item?.description.length, "fragrant_25k").toBeGreaterThan(8);
    expect(item?.rewardText.length, "fragrant_25k").toBeGreaterThan(4);
    expect(item?.toast.length, "fragrant_25k").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "fragrant_25k").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["fragrant_25k"], "fragrant_25k").toBeTruthy();
  });

  it("achievement onsen_75k has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "onsen_75k");
    expect(item).toBeTruthy();
    expect(item?.name.length, "onsen_75k").toBeGreaterThan(2);
    expect(item?.description.length, "onsen_75k").toBeGreaterThan(8);
    expect(item?.rewardText.length, "onsen_75k").toBeGreaterThan(4);
    expect(item?.toast.length, "onsen_75k").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "onsen_75k").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["onsen_75k"], "onsen_75k").toBeTruthy();
  });

  it("achievement onsen_300k has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "onsen_300k");
    expect(item).toBeTruthy();
    expect(item?.name.length, "onsen_300k").toBeGreaterThan(2);
    expect(item?.description.length, "onsen_300k").toBeGreaterThan(8);
    expect(item?.rewardText.length, "onsen_300k").toBeGreaterThan(4);
    expect(item?.toast.length, "onsen_300k").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "onsen_300k").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["onsen_300k"], "onsen_300k").toBeTruthy();
  });

  it("achievement bamboo_1m has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "bamboo_1m");
    expect(item).toBeTruthy();
    expect(item?.name.length, "bamboo_1m").toBeGreaterThan(2);
    expect(item?.description.length, "bamboo_1m").toBeGreaterThan(8);
    expect(item?.rewardText.length, "bamboo_1m").toBeGreaterThan(4);
    expect(item?.toast.length, "bamboo_1m").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "bamboo_1m").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["bamboo_1m"], "bamboo_1m").toBeTruthy();
  });

  it("achievement bamboo_5m has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "bamboo_5m");
    expect(item).toBeTruthy();
    expect(item?.name.length, "bamboo_5m").toBeGreaterThan(2);
    expect(item?.description.length, "bamboo_5m").toBeGreaterThan(8);
    expect(item?.rewardText.length, "bamboo_5m").toBeGreaterThan(4);
    expect(item?.toast.length, "bamboo_5m").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "bamboo_5m").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["bamboo_5m"], "bamboo_5m").toBeTruthy();
  });

  it("achievement golden_25m has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "golden_25m");
    expect(item).toBeTruthy();
    expect(item?.name.length, "golden_25m").toBeGreaterThan(2);
    expect(item?.description.length, "golden_25m").toBeGreaterThan(8);
    expect(item?.rewardText.length, "golden_25m").toBeGreaterThan(4);
    expect(item?.toast.length, "golden_25m").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "golden_25m").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["golden_25m"], "golden_25m").toBeTruthy();
  });

  it("achievement soft_paw_1 has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "soft_paw_1");
    expect(item).toBeTruthy();
    expect(item?.name.length, "soft_paw_1").toBeGreaterThan(2);
    expect(item?.description.length, "soft_paw_1").toBeGreaterThan(8);
    expect(item?.rewardText.length, "soft_paw_1").toBeGreaterThan(4);
    expect(item?.toast.length, "soft_paw_1").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "soft_paw_1").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["soft_paw_1"], "soft_paw_1").toBeTruthy();
  });

  it("achievement soft_paw_10 has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "soft_paw_10");
    expect(item).toBeTruthy();
    expect(item?.name.length, "soft_paw_10").toBeGreaterThan(2);
    expect(item?.description.length, "soft_paw_10").toBeGreaterThan(8);
    expect(item?.rewardText.length, "soft_paw_10").toBeGreaterThan(4);
    expect(item?.toast.length, "soft_paw_10").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "soft_paw_10").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["soft_paw_10"], "soft_paw_10").toBeTruthy();
  });

  it("achievement basket_1 has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "basket_1");
    expect(item).toBeTruthy();
    expect(item?.name.length, "basket_1").toBeGreaterThan(2);
    expect(item?.description.length, "basket_1").toBeGreaterThan(8);
    expect(item?.rewardText.length, "basket_1").toBeGreaterThan(4);
    expect(item?.toast.length, "basket_1").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "basket_1").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["basket_1"], "basket_1").toBeTruthy();
  });

  it("achievement basket_25 has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "basket_25");
    expect(item).toBeTruthy();
    expect(item?.name.length, "basket_25").toBeGreaterThan(2);
    expect(item?.description.length, "basket_25").toBeGreaterThan(8);
    expect(item?.rewardText.length, "basket_25").toBeGreaterThan(4);
    expect(item?.toast.length, "basket_25").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "basket_25").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["basket_25"], "basket_25").toBeTruthy();
  });

  it("achievement storehouse_first has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "storehouse_first");
    expect(item).toBeTruthy();
    expect(item?.name.length, "storehouse_first").toBeGreaterThan(2);
    expect(item?.description.length, "storehouse_first").toBeGreaterThan(8);
    expect(item?.rewardText.length, "storehouse_first").toBeGreaterThan(4);
    expect(item?.toast.length, "storehouse_first").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "storehouse_first").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["storehouse_first"], "storehouse_first").toBeTruthy();
  });

  it("achievement onsen_first has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "onsen_first");
    expect(item).toBeTruthy();
    expect(item?.name.length, "onsen_first").toBeGreaterThan(2);
    expect(item?.description.length, "onsen_first").toBeGreaterThan(8);
    expect(item?.rewardText.length, "onsen_first").toBeGreaterThan(4);
    expect(item?.toast.length, "onsen_first").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "onsen_first").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["onsen_first"], "onsen_first").toBeTruthy();
  });

  it("achievement bamboo_cart_first has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "bamboo_cart_first");
    expect(item).toBeTruthy();
    expect(item?.name.length, "bamboo_cart_first").toBeGreaterThan(2);
    expect(item?.description.length, "bamboo_cart_first").toBeGreaterThan(8);
    expect(item?.rewardText.length, "bamboo_cart_first").toBeGreaterThan(4);
    expect(item?.toast.length, "bamboo_cart_first").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "bamboo_cart_first").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["bamboo_cart_first"], "bamboo_cart_first").toBeTruthy();
  });

  it("achievement toolbox_first has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "toolbox_first");
    expect(item).toBeTruthy();
    expect(item?.name.length, "toolbox_first").toBeGreaterThan(2);
    expect(item?.description.length, "toolbox_first").toBeGreaterThan(8);
    expect(item?.rewardText.length, "toolbox_first").toBeGreaterThan(4);
    expect(item?.toast.length, "toolbox_first").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "toolbox_first").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["toolbox_first"], "toolbox_first").toBeTruthy();
  });

  it("achievement gold_path_first has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "gold_path_first");
    expect(item).toBeTruthy();
    expect(item?.name.length, "gold_path_first").toBeGreaterThan(2);
    expect(item?.description.length, "gold_path_first").toBeGreaterThan(8);
    expect(item?.rewardText.length, "gold_path_first").toBeGreaterThan(4);
    expect(item?.toast.length, "gold_path_first").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "gold_path_first").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["gold_path_first"], "gold_path_first").toBeTruthy();
  });

  it("achievement tap_suite_20 has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "tap_suite_20");
    expect(item).toBeTruthy();
    expect(item?.name.length, "tap_suite_20").toBeGreaterThan(2);
    expect(item?.description.length, "tap_suite_20").toBeGreaterThan(8);
    expect(item?.rewardText.length, "tap_suite_20").toBeGreaterThan(4);
    expect(item?.toast.length, "tap_suite_20").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "tap_suite_20").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["tap_suite_20"], "tap_suite_20").toBeTruthy();
  });

  it("achievement tap_suite_100 has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "tap_suite_100");
    expect(item).toBeTruthy();
    expect(item?.name.length, "tap_suite_100").toBeGreaterThan(2);
    expect(item?.description.length, "tap_suite_100").toBeGreaterThan(8);
    expect(item?.rewardText.length, "tap_suite_100").toBeGreaterThan(4);
    expect(item?.toast.length, "tap_suite_100").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "tap_suite_100").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["tap_suite_100"], "tap_suite_100").toBeTruthy();
  });

  it("achievement generator_suite_20 has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "generator_suite_20");
    expect(item).toBeTruthy();
    expect(item?.name.length, "generator_suite_20").toBeGreaterThan(2);
    expect(item?.description.length, "generator_suite_20").toBeGreaterThan(8);
    expect(item?.rewardText.length, "generator_suite_20").toBeGreaterThan(4);
    expect(item?.toast.length, "generator_suite_20").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "generator_suite_20").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["generator_suite_20"], "generator_suite_20").toBeTruthy();
  });

  it("achievement generator_suite_120 has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "generator_suite_120");
    expect(item).toBeTruthy();
    expect(item?.name.length, "generator_suite_120").toBeGreaterThan(2);
    expect(item?.description.length, "generator_suite_120").toBeGreaterThan(8);
    expect(item?.rewardText.length, "generator_suite_120").toBeGreaterThan(4);
    expect(item?.toast.length, "generator_suite_120").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "generator_suite_120").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["generator_suite_120"], "generator_suite_120").toBeTruthy();
  });

  it("achievement eps_10 has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "eps_10");
    expect(item).toBeTruthy();
    expect(item?.name.length, "eps_10").toBeGreaterThan(2);
    expect(item?.description.length, "eps_10").toBeGreaterThan(8);
    expect(item?.rewardText.length, "eps_10").toBeGreaterThan(4);
    expect(item?.toast.length, "eps_10").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "eps_10").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["eps_10"], "eps_10").toBeTruthy();
  });

  it("achievement eps_1k has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "eps_1k");
    expect(item).toBeTruthy();
    expect(item?.name.length, "eps_1k").toBeGreaterThan(2);
    expect(item?.description.length, "eps_1k").toBeGreaterThan(8);
    expect(item?.rewardText.length, "eps_1k").toBeGreaterThan(4);
    expect(item?.toast.length, "eps_1k").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "eps_1k").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["eps_1k"], "eps_1k").toBeTruthy();
  });

  it("achievement eps_100k has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "eps_100k");
    expect(item).toBeTruthy();
    expect(item?.name.length, "eps_100k").toBeGreaterThan(2);
    expect(item?.description.length, "eps_100k").toBeGreaterThan(8);
    expect(item?.rewardText.length, "eps_100k").toBeGreaterThan(4);
    expect(item?.toast.length, "eps_100k").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "eps_100k").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["eps_100k"], "eps_100k").toBeTruthy();
  });

  it("achievement eps_1m has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "eps_1m");
    expect(item).toBeTruthy();
    expect(item?.name.length, "eps_1m").toBeGreaterThan(2);
    expect(item?.description.length, "eps_1m").toBeGreaterThan(8);
    expect(item?.rewardText.length, "eps_1m").toBeGreaterThan(4);
    expect(item?.toast.length, "eps_1m").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "eps_1m").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["eps_1m"], "eps_1m").toBeTruthy();
  });

  it("achievement first_leaf has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "first_leaf");
    expect(item).toBeTruthy();
    expect(item?.name.length, "first_leaf").toBeGreaterThan(2);
    expect(item?.description.length, "first_leaf").toBeGreaterThan(8);
    expect(item?.rewardText.length, "first_leaf").toBeGreaterThan(4);
    expect(item?.toast.length, "first_leaf").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "first_leaf").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["first_leaf"], "first_leaf").toBeTruthy();
  });

  it("achievement five_leaf has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "five_leaf");
    expect(item).toBeTruthy();
    expect(item?.name.length, "five_leaf").toBeGreaterThan(2);
    expect(item?.description.length, "five_leaf").toBeGreaterThan(8);
    expect(item?.rewardText.length, "five_leaf").toBeGreaterThan(4);
    expect(item?.toast.length, "five_leaf").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "five_leaf").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["five_leaf"], "five_leaf").toBeTruthy();
  });

  it("achievement first_prestige has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "first_prestige");
    expect(item).toBeTruthy();
    expect(item?.name.length, "first_prestige").toBeGreaterThan(2);
    expect(item?.description.length, "first_prestige").toBeGreaterThan(8);
    expect(item?.rewardText.length, "first_prestige").toBeGreaterThan(4);
    expect(item?.toast.length, "first_prestige").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "first_prestige").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["first_prestige"], "first_prestige").toBeTruthy();
  });

  it("achievement third_prestige has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "third_prestige");
    expect(item).toBeTruthy();
    expect(item?.name.length, "third_prestige").toBeGreaterThan(2);
    expect(item?.description.length, "third_prestige").toBeGreaterThan(8);
    expect(item?.rewardText.length, "third_prestige").toBeGreaterThan(4);
    expect(item?.toast.length, "third_prestige").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "third_prestige").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["third_prestige"], "third_prestige").toBeTruthy();
  });

  it("achievement ad_festival has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "ad_festival");
    expect(item).toBeTruthy();
    expect(item?.name.length, "ad_festival").toBeGreaterThan(2);
    expect(item?.description.length, "ad_festival").toBeGreaterThan(8);
    expect(item?.rewardText.length, "ad_festival").toBeGreaterThan(4);
    expect(item?.toast.length, "ad_festival").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "ad_festival").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["ad_festival"], "ad_festival").toBeTruthy();
  });

  it("achievement sandbox_gift has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "sandbox_gift");
    expect(item).toBeTruthy();
    expect(item?.name.length, "sandbox_gift").toBeGreaterThan(2);
    expect(item?.description.length, "sandbox_gift").toBeGreaterThan(8);
    expect(item?.rewardText.length, "sandbox_gift").toBeGreaterThan(4);
    expect(item?.toast.length, "sandbox_gift").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "sandbox_gift").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["sandbox_gift"], "sandbox_gift").toBeTruthy();
  });

  it("achievement sandbox_shelf has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "sandbox_shelf");
    expect(item).toBeTruthy();
    expect(item?.name.length, "sandbox_shelf").toBeGreaterThan(2);
    expect(item?.description.length, "sandbox_shelf").toBeGreaterThan(8);
    expect(item?.rewardText.length, "sandbox_shelf").toBeGreaterThan(4);
    expect(item?.toast.length, "sandbox_shelf").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "sandbox_shelf").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["sandbox_shelf"], "sandbox_shelf").toBeTruthy();
  });

  it("achievement all_yard_core has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "all_yard_core");
    expect(item).toBeTruthy();
    expect(item?.name.length, "all_yard_core").toBeGreaterThan(2);
    expect(item?.description.length, "all_yard_core").toBeGreaterThan(8);
    expect(item?.rewardText.length, "all_yard_core").toBeGreaterThan(4);
    expect(item?.toast.length, "all_yard_core").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "all_yard_core").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["all_yard_core"], "all_yard_core").toBeTruthy();
  });

  it("achievement late_game_marker has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "late_game_marker");
    expect(item).toBeTruthy();
    expect(item?.name.length, "late_game_marker").toBeGreaterThan(2);
    expect(item?.description.length, "late_game_marker").toBeGreaterThan(8);
    expect(item?.rewardText.length, "late_game_marker").toBeGreaterThan(4);
    expect(item?.toast.length, "late_game_marker").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "late_game_marker").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["late_game_marker"], "late_game_marker").toBeTruthy();
  });

  it("achievement memory_touch_first has album copy and asset", () => {
    const item = AchievementConfig.achievements.find((achievement) => achievement.id === "memory_touch_first");
    expect(item).toBeTruthy();
    expect(item?.name.length, "memory_touch_first").toBeGreaterThan(2);
    expect(item?.description.length, "memory_touch_first").toBeGreaterThan(8);
    expect(item?.rewardText.length, "memory_touch_first").toBeGreaterThan(4);
    expect(item?.toast.length, "memory_touch_first").toBeGreaterThan(6);
    expect(item?.collectionLine.length, "memory_touch_first").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["memory_touch_first"], "memory_touch_first").toBeTruthy();
  });

  it("quest welcome_first_orange has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "welcome_first_orange");
    expect(item).toBeTruthy();
    expect(item?.title.length, "welcome_first_orange").toBeGreaterThan(3);
    expect(item?.instruction.length, "welcome_first_orange").toBeGreaterThan(8);
    expect(item?.helperLine.length, "welcome_first_orange").toBeGreaterThan(12);
    expect(item?.completionLine.length, "welcome_first_orange").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "welcome_first_orange").toBe(true);
    expect(item?.reward.friendship, "welcome_first_orange").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["welcome_first_orange"], "welcome_first_orange").toBeTruthy();
  });

  it("quest welcome_soft_paw has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "welcome_soft_paw");
    expect(item).toBeTruthy();
    expect(item?.title.length, "welcome_soft_paw").toBeGreaterThan(3);
    expect(item?.instruction.length, "welcome_soft_paw").toBeGreaterThan(8);
    expect(item?.helperLine.length, "welcome_soft_paw").toBeGreaterThan(12);
    expect(item?.completionLine.length, "welcome_soft_paw").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "welcome_soft_paw").toBe(true);
    expect(item?.reward.friendship, "welcome_soft_paw").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["welcome_soft_paw"], "welcome_soft_paw").toBeTruthy();
  });

  it("quest welcome_first_basket has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "welcome_first_basket");
    expect(item).toBeTruthy();
    expect(item?.title.length, "welcome_first_basket").toBeGreaterThan(3);
    expect(item?.instruction.length, "welcome_first_basket").toBeGreaterThan(8);
    expect(item?.helperLine.length, "welcome_first_basket").toBeGreaterThan(12);
    expect(item?.completionLine.length, "welcome_first_basket").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "welcome_first_basket").toBe(true);
    expect(item?.reward.friendship, "welcome_first_basket").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["welcome_first_basket"], "welcome_first_basket").toBeTruthy();
  });

  it("quest welcome_steady_ten has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "welcome_steady_ten");
    expect(item).toBeTruthy();
    expect(item?.title.length, "welcome_steady_ten").toBeGreaterThan(3);
    expect(item?.instruction.length, "welcome_steady_ten").toBeGreaterThan(8);
    expect(item?.helperLine.length, "welcome_steady_ten").toBeGreaterThan(12);
    expect(item?.completionLine.length, "welcome_steady_ten").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "welcome_steady_ten").toBe(true);
    expect(item?.reward.friendship, "welcome_steady_ten").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["welcome_steady_ten"], "welcome_steady_ten").toBeTruthy();
  });

  it("quest yard_first_100 has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "yard_first_100");
    expect(item).toBeTruthy();
    expect(item?.title.length, "yard_first_100").toBeGreaterThan(3);
    expect(item?.instruction.length, "yard_first_100").toBeGreaterThan(8);
    expect(item?.helperLine.length, "yard_first_100").toBeGreaterThan(12);
    expect(item?.completionLine.length, "yard_first_100").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "yard_first_100").toBe(true);
    expect(item?.reward.friendship, "yard_first_100").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["yard_first_100"], "yard_first_100").toBeTruthy();
  });

  it("quest yard_nap_mat has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "yard_nap_mat");
    expect(item).toBeTruthy();
    expect(item?.title.length, "yard_nap_mat").toBeGreaterThan(3);
    expect(item?.instruction.length, "yard_nap_mat").toBeGreaterThan(8);
    expect(item?.helperLine.length, "yard_nap_mat").toBeGreaterThan(12);
    expect(item?.completionLine.length, "yard_nap_mat").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "yard_nap_mat").toBe(true);
    expect(item?.reward.friendship, "yard_nap_mat").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["yard_nap_mat"], "yard_nap_mat").toBeTruthy();
  });

  it("quest yard_parasol has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "yard_parasol");
    expect(item).toBeTruthy();
    expect(item?.title.length, "yard_parasol").toBeGreaterThan(3);
    expect(item?.instruction.length, "yard_parasol").toBeGreaterThan(8);
    expect(item?.helperLine.length, "yard_parasol").toBeGreaterThan(12);
    expect(item?.completionLine.length, "yard_parasol").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "yard_parasol").toBe(true);
    expect(item?.reward.friendship, "yard_parasol").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["yard_parasol"], "yard_parasol").toBeTruthy();
  });

  it("quest yard_spoon has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "yard_spoon");
    expect(item).toBeTruthy();
    expect(item?.title.length, "yard_spoon").toBeGreaterThan(3);
    expect(item?.instruction.length, "yard_spoon").toBeGreaterThan(8);
    expect(item?.helperLine.length, "yard_spoon").toBeGreaterThan(12);
    expect(item?.completionLine.length, "yard_spoon").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "yard_spoon").toBe(true);
    expect(item?.reward.friendship, "yard_spoon").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["yard_spoon"], "yard_spoon").toBeTruthy();
  });

  it("quest yard_water_path has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "yard_water_path");
    expect(item).toBeTruthy();
    expect(item?.title.length, "yard_water_path").toBeGreaterThan(3);
    expect(item?.instruction.length, "yard_water_path").toBeGreaterThan(8);
    expect(item?.helperLine.length, "yard_water_path").toBeGreaterThan(12);
    expect(item?.completionLine.length, "yard_water_path").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "yard_water_path").toBe(true);
    expect(item?.reward.friendship, "yard_water_path").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["yard_water_path"], "yard_water_path").toBeTruthy();
  });

  it("quest yard_one_thousand has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "yard_one_thousand");
    expect(item).toBeTruthy();
    expect(item?.title.length, "yard_one_thousand").toBeGreaterThan(3);
    expect(item?.instruction.length, "yard_one_thousand").toBeGreaterThan(8);
    expect(item?.helperLine.length, "yard_one_thousand").toBeGreaterThan(12);
    expect(item?.completionLine.length, "yard_one_thousand").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "yard_one_thousand").toBe(true);
    expect(item?.reward.friendship, "yard_one_thousand").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["yard_one_thousand"], "yard_one_thousand").toBeTruthy();
  });

  it("quest yard_tap_100 has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "yard_tap_100");
    expect(item).toBeTruthy();
    expect(item?.title.length, "yard_tap_100").toBeGreaterThan(3);
    expect(item?.instruction.length, "yard_tap_100").toBeGreaterThan(8);
    expect(item?.helperLine.length, "yard_tap_100").toBeGreaterThan(12);
    expect(item?.completionLine.length, "yard_tap_100").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "yard_tap_100").toBe(true);
    expect(item?.reward.friendship, "yard_tap_100").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["yard_tap_100"], "yard_tap_100").toBeTruthy();
  });

  it("quest storehouse_open has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "storehouse_open");
    expect(item).toBeTruthy();
    expect(item?.title.length, "storehouse_open").toBeGreaterThan(3);
    expect(item?.instruction.length, "storehouse_open").toBeGreaterThan(8);
    expect(item?.helperLine.length, "storehouse_open").toBeGreaterThan(12);
    expect(item?.completionLine.length, "storehouse_open").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "storehouse_open").toBe(true);
    expect(item?.reward.friendship, "storehouse_open").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["storehouse_open"], "storehouse_open").toBeTruthy();
  });

  it("quest storehouse_crate_line has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "storehouse_crate_line");
    expect(item).toBeTruthy();
    expect(item?.title.length, "storehouse_crate_line").toBeGreaterThan(3);
    expect(item?.instruction.length, "storehouse_crate_line").toBeGreaterThan(8);
    expect(item?.helperLine.length, "storehouse_crate_line").toBeGreaterThan(12);
    expect(item?.completionLine.length, "storehouse_crate_line").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "storehouse_crate_line").toBe(true);
    expect(item?.reward.friendship, "storehouse_crate_line").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["storehouse_crate_line"], "storehouse_crate_line").toBeTruthy();
  });

  it("quest storehouse_rhythm has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "storehouse_rhythm");
    expect(item).toBeTruthy();
    expect(item?.title.length, "storehouse_rhythm").toBeGreaterThan(3);
    expect(item?.instruction.length, "storehouse_rhythm").toBeGreaterThan(8);
    expect(item?.helperLine.length, "storehouse_rhythm").toBeGreaterThan(12);
    expect(item?.completionLine.length, "storehouse_rhythm").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "storehouse_rhythm").toBe(true);
    expect(item?.reward.friendship, "storehouse_rhythm").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["storehouse_rhythm"], "storehouse_rhythm").toBeTruthy();
  });

  it("quest storehouse_fragrance has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "storehouse_fragrance");
    expect(item).toBeTruthy();
    expect(item?.title.length, "storehouse_fragrance").toBeGreaterThan(3);
    expect(item?.instruction.length, "storehouse_fragrance").toBeGreaterThan(8);
    expect(item?.helperLine.length, "storehouse_fragrance").toBeGreaterThan(12);
    expect(item?.completionLine.length, "storehouse_fragrance").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "storehouse_fragrance").toBe(true);
    expect(item?.reward.friendship, "storehouse_fragrance").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["storehouse_fragrance"], "storehouse_fragrance").toBeTruthy();
  });

  it("quest storehouse_25k has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "storehouse_25k");
    expect(item).toBeTruthy();
    expect(item?.title.length, "storehouse_25k").toBeGreaterThan(3);
    expect(item?.instruction.length, "storehouse_25k").toBeGreaterThan(8);
    expect(item?.helperLine.length, "storehouse_25k").toBeGreaterThan(12);
    expect(item?.completionLine.length, "storehouse_25k").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "storehouse_25k").toBe(true);
    expect(item?.reward.friendship, "storehouse_25k").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["storehouse_25k"], "storehouse_25k").toBeTruthy();
  });

  it("quest storehouse_sorting_table has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "storehouse_sorting_table");
    expect(item).toBeTruthy();
    expect(item?.title.length, "storehouse_sorting_table").toBeGreaterThan(3);
    expect(item?.instruction.length, "storehouse_sorting_table").toBeGreaterThan(8);
    expect(item?.helperLine.length, "storehouse_sorting_table").toBeGreaterThan(12);
    expect(item?.completionLine.length, "storehouse_sorting_table").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "storehouse_sorting_table").toBe(true);
    expect(item?.reward.friendship, "storehouse_sorting_table").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["storehouse_sorting_table"], "storehouse_sorting_table").toBeTruthy();
  });

  it("quest storehouse_cart_stop has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "storehouse_cart_stop");
    expect(item).toBeTruthy();
    expect(item?.title.length, "storehouse_cart_stop").toBeGreaterThan(3);
    expect(item?.instruction.length, "storehouse_cart_stop").toBeGreaterThan(8);
    expect(item?.helperLine.length, "storehouse_cart_stop").toBeGreaterThan(12);
    expect(item?.completionLine.length, "storehouse_cart_stop").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "storehouse_cart_stop").toBe(true);
    expect(item?.reward.friendship, "storehouse_cart_stop").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["storehouse_cart_stop"], "storehouse_cart_stop").toBeTruthy();
  });

  it("quest storehouse_total_levels has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "storehouse_total_levels");
    expect(item).toBeTruthy();
    expect(item?.title.length, "storehouse_total_levels").toBeGreaterThan(3);
    expect(item?.instruction.length, "storehouse_total_levels").toBeGreaterThan(8);
    expect(item?.helperLine.length, "storehouse_total_levels").toBeGreaterThan(12);
    expect(item?.completionLine.length, "storehouse_total_levels").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "storehouse_total_levels").toBe(true);
    expect(item?.reward.friendship, "storehouse_total_levels").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["storehouse_total_levels"], "storehouse_total_levels").toBeTruthy();
  });

  it("quest onsen_open has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "onsen_open");
    expect(item).toBeTruthy();
    expect(item?.title.length, "onsen_open").toBeGreaterThan(3);
    expect(item?.instruction.length, "onsen_open").toBeGreaterThan(8);
    expect(item?.helperLine.length, "onsen_open").toBeGreaterThan(12);
    expect(item?.completionLine.length, "onsen_open").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "onsen_open").toBe(true);
    expect(item?.reward.friendship, "onsen_open").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["onsen_open"], "onsen_open").toBeTruthy();
  });

  it("quest onsen_warm_pond has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "onsen_warm_pond");
    expect(item).toBeTruthy();
    expect(item?.title.length, "onsen_warm_pond").toBeGreaterThan(3);
    expect(item?.instruction.length, "onsen_warm_pond").toBeGreaterThan(8);
    expect(item?.helperLine.length, "onsen_warm_pond").toBeGreaterThan(12);
    expect(item?.completionLine.length, "onsen_warm_pond").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "onsen_warm_pond").toBe(true);
    expect(item?.reward.friendship, "onsen_warm_pond").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["onsen_warm_pond"], "onsen_warm_pond").toBeTruthy();
  });

  it("quest onsen_towel_touch has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "onsen_towel_touch");
    expect(item).toBeTruthy();
    expect(item?.title.length, "onsen_towel_touch").toBeGreaterThan(3);
    expect(item?.instruction.length, "onsen_towel_touch").toBeGreaterThan(8);
    expect(item?.helperLine.length, "onsen_towel_touch").toBeGreaterThan(12);
    expect(item?.completionLine.length, "onsen_towel_touch").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "onsen_towel_touch").toBe(true);
    expect(item?.reward.friendship, "onsen_towel_touch").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["onsen_towel_touch"], "onsen_towel_touch").toBeTruthy();
  });

  it("quest onsen_towel_rack has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "onsen_towel_rack");
    expect(item).toBeTruthy();
    expect(item?.title.length, "onsen_towel_rack").toBeGreaterThan(3);
    expect(item?.instruction.length, "onsen_towel_rack").toBeGreaterThan(8);
    expect(item?.helperLine.length, "onsen_towel_rack").toBeGreaterThan(12);
    expect(item?.completionLine.length, "onsen_towel_rack").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "onsen_towel_rack").toBe(true);
    expect(item?.reward.friendship, "onsen_towel_rack").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["onsen_towel_rack"], "onsen_towel_rack").toBeTruthy();
  });

  it("quest onsen_snack_recipe has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "onsen_snack_recipe");
    expect(item).toBeTruthy();
    expect(item?.title.length, "onsen_snack_recipe").toBeGreaterThan(3);
    expect(item?.instruction.length, "onsen_snack_recipe").toBeGreaterThan(8);
    expect(item?.helperLine.length, "onsen_snack_recipe").toBeGreaterThan(12);
    expect(item?.completionLine.length, "onsen_snack_recipe").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "onsen_snack_recipe").toBe(true);
    expect(item?.reward.friendship, "onsen_snack_recipe").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["onsen_snack_recipe"], "onsen_snack_recipe").toBeTruthy();
  });

  it("quest onsen_snack_counter has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "onsen_snack_counter");
    expect(item).toBeTruthy();
    expect(item?.title.length, "onsen_snack_counter").toBeGreaterThan(3);
    expect(item?.instruction.length, "onsen_snack_counter").toBeGreaterThan(8);
    expect(item?.helperLine.length, "onsen_snack_counter").toBeGreaterThan(12);
    expect(item?.completionLine.length, "onsen_snack_counter").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "onsen_snack_counter").toBe(true);
    expect(item?.reward.friendship, "onsen_snack_counter").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["onsen_snack_counter"], "onsen_snack_counter").toBeTruthy();
  });

  it("quest onsen_eps_1k has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "onsen_eps_1k");
    expect(item).toBeTruthy();
    expect(item?.title.length, "onsen_eps_1k").toBeGreaterThan(3);
    expect(item?.instruction.length, "onsen_eps_1k").toBeGreaterThan(8);
    expect(item?.helperLine.length, "onsen_eps_1k").toBeGreaterThan(12);
    expect(item?.completionLine.length, "onsen_eps_1k").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "onsen_eps_1k").toBe(true);
    expect(item?.reward.friendship, "onsen_eps_1k").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["onsen_eps_1k"], "onsen_eps_1k").toBeTruthy();
  });

  it("quest onsen_300k has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "onsen_300k");
    expect(item).toBeTruthy();
    expect(item?.title.length, "onsen_300k").toBeGreaterThan(3);
    expect(item?.instruction.length, "onsen_300k").toBeGreaterThan(8);
    expect(item?.helperLine.length, "onsen_300k").toBeGreaterThan(12);
    expect(item?.completionLine.length, "onsen_300k").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "onsen_300k").toBe(true);
    expect(item?.reward.friendship, "onsen_300k").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["onsen_300k"], "onsen_300k").toBeTruthy();
  });

  it("quest bamboo_open has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "bamboo_open");
    expect(item).toBeTruthy();
    expect(item?.title.length, "bamboo_open").toBeGreaterThan(3);
    expect(item?.instruction.length, "bamboo_open").toBeGreaterThan(8);
    expect(item?.helperLine.length, "bamboo_open").toBeGreaterThan(12);
    expect(item?.completionLine.length, "bamboo_open").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "bamboo_open").toBe(true);
    expect(item?.reward.friendship, "bamboo_open").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["bamboo_open"], "bamboo_open").toBeTruthy();
  });

  it("quest bamboo_touch has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "bamboo_touch");
    expect(item).toBeTruthy();
    expect(item?.title.length, "bamboo_touch").toBeGreaterThan(3);
    expect(item?.instruction.length, "bamboo_touch").toBeGreaterThan(8);
    expect(item?.helperLine.length, "bamboo_touch").toBeGreaterThan(12);
    expect(item?.completionLine.length, "bamboo_touch").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "bamboo_touch").toBe(true);
    expect(item?.reward.friendship, "bamboo_touch").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["bamboo_touch"], "bamboo_touch").toBeTruthy();
  });

  it("quest bamboo_cart has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "bamboo_cart");
    expect(item).toBeTruthy();
    expect(item?.title.length, "bamboo_cart").toBeGreaterThan(3);
    expect(item?.instruction.length, "bamboo_cart").toBeGreaterThan(8);
    expect(item?.helperLine.length, "bamboo_cart").toBeGreaterThan(12);
    expect(item?.completionLine.length, "bamboo_cart").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "bamboo_cart").toBe(true);
    expect(item?.reward.friendship, "bamboo_cart").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["bamboo_cart"], "bamboo_cart").toBeTruthy();
  });

  it("quest bamboo_wind_bridge has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "bamboo_wind_bridge");
    expect(item).toBeTruthy();
    expect(item?.title.length, "bamboo_wind_bridge").toBeGreaterThan(3);
    expect(item?.instruction.length, "bamboo_wind_bridge").toBeGreaterThan(8);
    expect(item?.helperLine.length, "bamboo_wind_bridge").toBeGreaterThan(12);
    expect(item?.completionLine.length, "bamboo_wind_bridge").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "bamboo_wind_bridge").toBe(true);
    expect(item?.reward.friendship, "bamboo_wind_bridge").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["bamboo_wind_bridge"], "bamboo_wind_bridge").toBeTruthy();
  });

  it("quest bamboo_festival_clap has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "bamboo_festival_clap");
    expect(item).toBeTruthy();
    expect(item?.title.length, "bamboo_festival_clap").toBeGreaterThan(3);
    expect(item?.instruction.length, "bamboo_festival_clap").toBeGreaterThan(8);
    expect(item?.helperLine.length, "bamboo_festival_clap").toBeGreaterThan(12);
    expect(item?.completionLine.length, "bamboo_festival_clap").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "bamboo_festival_clap").toBe(true);
    expect(item?.reward.friendship, "bamboo_festival_clap").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["bamboo_festival_clap"], "bamboo_festival_clap").toBeTruthy();
  });

  it("quest bamboo_lantern has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "bamboo_lantern");
    expect(item).toBeTruthy();
    expect(item?.title.length, "bamboo_lantern").toBeGreaterThan(3);
    expect(item?.instruction.length, "bamboo_lantern").toBeGreaterThan(8);
    expect(item?.helperLine.length, "bamboo_lantern").toBeGreaterThan(12);
    expect(item?.completionLine.length, "bamboo_lantern").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "bamboo_lantern").toBe(true);
    expect(item?.reward.friendship, "bamboo_lantern").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["bamboo_lantern"], "bamboo_lantern").toBeTruthy();
  });

  it("quest bamboo_toolbox has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "bamboo_toolbox");
    expect(item).toBeTruthy();
    expect(item?.title.length, "bamboo_toolbox").toBeGreaterThan(3);
    expect(item?.instruction.length, "bamboo_toolbox").toBeGreaterThan(8);
    expect(item?.helperLine.length, "bamboo_toolbox").toBeGreaterThan(12);
    expect(item?.completionLine.length, "bamboo_toolbox").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "bamboo_toolbox").toBe(true);
    expect(item?.reward.friendship, "bamboo_toolbox").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["bamboo_toolbox"], "bamboo_toolbox").toBeTruthy();
  });

  it("quest bamboo_eps_100k has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "bamboo_eps_100k");
    expect(item).toBeTruthy();
    expect(item?.title.length, "bamboo_eps_100k").toBeGreaterThan(3);
    expect(item?.instruction.length, "bamboo_eps_100k").toBeGreaterThan(8);
    expect(item?.helperLine.length, "bamboo_eps_100k").toBeGreaterThan(12);
    expect(item?.completionLine.length, "bamboo_eps_100k").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "bamboo_eps_100k").toBe(true);
    expect(item?.reward.friendship, "bamboo_eps_100k").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["bamboo_eps_100k"], "bamboo_eps_100k").toBeTruthy();
  });

  it("quest bamboo_total_levels has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "bamboo_total_levels");
    expect(item).toBeTruthy();
    expect(item?.title.length, "bamboo_total_levels").toBeGreaterThan(3);
    expect(item?.instruction.length, "bamboo_total_levels").toBeGreaterThan(8);
    expect(item?.helperLine.length, "bamboo_total_levels").toBeGreaterThan(12);
    expect(item?.completionLine.length, "bamboo_total_levels").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "bamboo_total_levels").toBe(true);
    expect(item?.reward.friendship, "bamboo_total_levels").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["bamboo_total_levels"], "bamboo_total_levels").toBeTruthy();
  });

  it("quest golden_open has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "golden_open");
    expect(item).toBeTruthy();
    expect(item?.title.length, "golden_open").toBeGreaterThan(3);
    expect(item?.instruction.length, "golden_open").toBeGreaterThan(8);
    expect(item?.helperLine.length, "golden_open").toBeGreaterThan(12);
    expect(item?.completionLine.length, "golden_open").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "golden_open").toBe(true);
    expect(item?.reward.friendship, "golden_open").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["golden_open"], "golden_open").toBeTruthy();
  });

  it("quest golden_first_prestige has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "golden_first_prestige");
    expect(item).toBeTruthy();
    expect(item?.title.length, "golden_first_prestige").toBeGreaterThan(3);
    expect(item?.instruction.length, "golden_first_prestige").toBeGreaterThan(8);
    expect(item?.helperLine.length, "golden_first_prestige").toBeGreaterThan(12);
    expect(item?.completionLine.length, "golden_first_prestige").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "golden_first_prestige").toBe(true);
    expect(item?.reward.friendship, "golden_first_prestige").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["golden_first_prestige"], "golden_first_prestige").toBeTruthy();
  });

  it("quest golden_leaf_path has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "golden_leaf_path");
    expect(item).toBeTruthy();
    expect(item?.title.length, "golden_leaf_path").toBeGreaterThan(3);
    expect(item?.instruction.length, "golden_leaf_path").toBeGreaterThan(8);
    expect(item?.helperLine.length, "golden_leaf_path").toBeGreaterThan(12);
    expect(item?.completionLine.length, "golden_leaf_path").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "golden_leaf_path").toBe(true);
    expect(item?.reward.friendship, "golden_leaf_path").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["golden_leaf_path"], "golden_leaf_path").toBeTruthy();
  });

  it("quest golden_leaf_polish has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "golden_leaf_polish");
    expect(item).toBeTruthy();
    expect(item?.title.length, "golden_leaf_polish").toBeGreaterThan(3);
    expect(item?.instruction.length, "golden_leaf_polish").toBeGreaterThan(8);
    expect(item?.helperLine.length, "golden_leaf_polish").toBeGreaterThan(12);
    expect(item?.completionLine.length, "golden_leaf_polish").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "golden_leaf_polish").toBe(true);
    expect(item?.reward.friendship, "golden_leaf_polish").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["golden_leaf_polish"], "golden_leaf_polish").toBeTruthy();
  });

  it("quest golden_five_leaves has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "golden_five_leaves");
    expect(item).toBeTruthy();
    expect(item?.title.length, "golden_five_leaves").toBeGreaterThan(3);
    expect(item?.instruction.length, "golden_five_leaves").toBeGreaterThan(8);
    expect(item?.helperLine.length, "golden_five_leaves").toBeGreaterThan(12);
    expect(item?.completionLine.length, "golden_five_leaves").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "golden_five_leaves").toBe(true);
    expect(item?.reward.friendship, "golden_five_leaves").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["golden_five_leaves"], "golden_five_leaves").toBeTruthy();
  });

  it("quest golden_compost has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "golden_compost");
    expect(item).toBeTruthy();
    expect(item?.title.length, "golden_compost").toBeGreaterThan(3);
    expect(item?.instruction.length, "golden_compost").toBeGreaterThan(8);
    expect(item?.helperLine.length, "golden_compost").toBeGreaterThan(12);
    expect(item?.completionLine.length, "golden_compost").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "golden_compost").toBe(true);
    expect(item?.reward.friendship, "golden_compost").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["golden_compost"], "golden_compost").toBeTruthy();
  });

  it("quest golden_memory_touch has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "golden_memory_touch");
    expect(item).toBeTruthy();
    expect(item?.title.length, "golden_memory_touch").toBeGreaterThan(3);
    expect(item?.instruction.length, "golden_memory_touch").toBeGreaterThan(8);
    expect(item?.helperLine.length, "golden_memory_touch").toBeGreaterThan(12);
    expect(item?.completionLine.length, "golden_memory_touch").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "golden_memory_touch").toBe(true);
    expect(item?.reward.friendship, "golden_memory_touch").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["golden_memory_touch"], "golden_memory_touch").toBeTruthy();
  });

  it("quest golden_observatory has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "golden_observatory");
    expect(item).toBeTruthy();
    expect(item?.title.length, "golden_observatory").toBeGreaterThan(3);
    expect(item?.instruction.length, "golden_observatory").toBeGreaterThan(8);
    expect(item?.helperLine.length, "golden_observatory").toBeGreaterThan(12);
    expect(item?.completionLine.length, "golden_observatory").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "golden_observatory").toBe(true);
    expect(item?.reward.friendship, "golden_observatory").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["golden_observatory"], "golden_observatory").toBeTruthy();
  });

  it("quest golden_memory_gate has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "golden_memory_gate");
    expect(item).toBeTruthy();
    expect(item?.title.length, "golden_memory_gate").toBeGreaterThan(3);
    expect(item?.instruction.length, "golden_memory_gate").toBeGreaterThan(8);
    expect(item?.helperLine.length, "golden_memory_gate").toBeGreaterThan(12);
    expect(item?.completionLine.length, "golden_memory_gate").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "golden_memory_gate").toBe(true);
    expect(item?.reward.friendship, "golden_memory_gate").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["golden_memory_gate"], "golden_memory_gate").toBeTruthy();
  });

  it("quest release_ad_festival has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "release_ad_festival");
    expect(item).toBeTruthy();
    expect(item?.title.length, "release_ad_festival").toBeGreaterThan(3);
    expect(item?.instruction.length, "release_ad_festival").toBeGreaterThan(8);
    expect(item?.helperLine.length, "release_ad_festival").toBeGreaterThan(12);
    expect(item?.completionLine.length, "release_ad_festival").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "release_ad_festival").toBe(true);
    expect(item?.reward.friendship, "release_ad_festival").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["release_ad_festival"], "release_ad_festival").toBeTruthy();
  });

  it("quest release_shop_gift has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "release_shop_gift");
    expect(item).toBeTruthy();
    expect(item?.title.length, "release_shop_gift").toBeGreaterThan(3);
    expect(item?.instruction.length, "release_shop_gift").toBeGreaterThan(8);
    expect(item?.helperLine.length, "release_shop_gift").toBeGreaterThan(12);
    expect(item?.completionLine.length, "release_shop_gift").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "release_shop_gift").toBe(true);
    expect(item?.reward.friendship, "release_shop_gift").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["release_shop_gift"], "release_shop_gift").toBeTruthy();
  });

  it("quest release_album_first has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "release_album_first");
    expect(item).toBeTruthy();
    expect(item?.title.length, "release_album_first").toBeGreaterThan(3);
    expect(item?.instruction.length, "release_album_first").toBeGreaterThan(8);
    expect(item?.helperLine.length, "release_album_first").toBeGreaterThan(12);
    expect(item?.completionLine.length, "release_album_first").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "release_album_first").toBe(true);
    expect(item?.reward.friendship, "release_album_first").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["release_album_first"], "release_album_first").toBeTruthy();
  });

  it("quest release_album_basket has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "release_album_basket");
    expect(item).toBeTruthy();
    expect(item?.title.length, "release_album_basket").toBeGreaterThan(3);
    expect(item?.instruction.length, "release_album_basket").toBeGreaterThan(8);
    expect(item?.helperLine.length, "release_album_basket").toBeGreaterThan(12);
    expect(item?.completionLine.length, "release_album_basket").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "release_album_basket").toBe(true);
    expect(item?.reward.friendship, "release_album_basket").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["release_album_basket"], "release_album_basket").toBeTruthy();
  });

  it("quest release_export_ready has actionable user-facing copy and reward", () => {
    const item = QuestConfig.quests.find((quest) => quest.id === "release_export_ready");
    expect(item).toBeTruthy();
    expect(item?.title.length, "release_export_ready").toBeGreaterThan(3);
    expect(item?.instruction.length, "release_export_ready").toBeGreaterThan(8);
    expect(item?.helperLine.length, "release_export_ready").toBeGreaterThan(12);
    expect(item?.completionLine.length, "release_export_ready").toBeGreaterThan(8);
    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), "release_export_ready").toBe(true);
    expect(item?.reward.friendship, "release_export_ready").toBeGreaterThan(0);
    expect(GeneratedAssetRegistry["release_export_ready"], "release_export_ready").toBeTruthy();
  });

  it("decoration sunny_yard has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "sunny_yard");
    expect(item).toBeTruthy();
    expect(item?.name.length, "sunny_yard").toBeGreaterThan(2);
    expect(item?.description.length, "sunny_yard").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "sunny_yard").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "sunny_yard").toBe(true);
    expect(GeneratedAssetRegistry["sunny_yard"], "sunny_yard").toBeTruthy();
  });

  it("decoration orange_basket_corner has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "orange_basket_corner");
    expect(item).toBeTruthy();
    expect(item?.name.length, "orange_basket_corner").toBeGreaterThan(2);
    expect(item?.description.length, "orange_basket_corner").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "orange_basket_corner").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "orange_basket_corner").toBe(true);
    expect(GeneratedAssetRegistry["orange_basket_corner"], "orange_basket_corner").toBeTruthy();
  });

  it("decoration soft_paw_stamp has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "soft_paw_stamp");
    expect(item).toBeTruthy();
    expect(item?.name.length, "soft_paw_stamp").toBeGreaterThan(2);
    expect(item?.description.length, "soft_paw_stamp").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "soft_paw_stamp").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "soft_paw_stamp").toBe(true);
    expect(GeneratedAssetRegistry["soft_paw_stamp"], "soft_paw_stamp").toBeTruthy();
  });

  it("decoration nap_mat_set has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "nap_mat_set");
    expect(item).toBeTruthy();
    expect(item?.name.length, "nap_mat_set").toBeGreaterThan(2);
    expect(item?.description.length, "nap_mat_set").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "nap_mat_set").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "nap_mat_set").toBe(true);
    expect(GeneratedAssetRegistry["nap_mat_set"], "nap_mat_set").toBeTruthy();
  });

  it("decoration watering_rill has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "watering_rill");
    expect(item).toBeTruthy();
    expect(item?.name.length, "watering_rill").toBeGreaterThan(2);
    expect(item?.description.length, "watering_rill").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "watering_rill").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "watering_rill").toBe(true);
    expect(GeneratedAssetRegistry["watering_rill"], "watering_rill").toBeTruthy();
  });

  it("decoration storehouse_sign has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "storehouse_sign");
    expect(item).toBeTruthy();
    expect(item?.name.length, "storehouse_sign").toBeGreaterThan(2);
    expect(item?.description.length, "storehouse_sign").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "storehouse_sign").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "storehouse_sign").toBe(true);
    expect(GeneratedAssetRegistry["storehouse_sign"], "storehouse_sign").toBeTruthy();
  });

  it("decoration crate_lane has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "crate_lane");
    expect(item).toBeTruthy();
    expect(item?.name.length, "crate_lane").toBeGreaterThan(2);
    expect(item?.description.length, "crate_lane").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "crate_lane").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "crate_lane").toBe(true);
    expect(GeneratedAssetRegistry["crate_lane"], "crate_lane").toBeTruthy();
  });

  it("decoration fragrance_shelf has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "fragrance_shelf");
    expect(item).toBeTruthy();
    expect(item?.name.length, "fragrance_shelf").toBeGreaterThan(2);
    expect(item?.description.length, "fragrance_shelf").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "fragrance_shelf").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "fragrance_shelf").toBe(true);
    expect(GeneratedAssetRegistry["fragrance_shelf"], "fragrance_shelf").toBeTruthy();
  });

  it("decoration cart_stop_flag has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "cart_stop_flag");
    expect(item).toBeTruthy();
    expect(item?.name.length, "cart_stop_flag").toBeGreaterThan(2);
    expect(item?.description.length, "cart_stop_flag").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "cart_stop_flag").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "cart_stop_flag").toBe(true);
    expect(GeneratedAssetRegistry["cart_stop_flag"], "cart_stop_flag").toBeTruthy();
  });

  it("decoration onsen_mist has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "onsen_mist");
    expect(item).toBeTruthy();
    expect(item?.name.length, "onsen_mist").toBeGreaterThan(2);
    expect(item?.description.length, "onsen_mist").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "onsen_mist").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "onsen_mist").toBe(true);
    expect(GeneratedAssetRegistry["onsen_mist"], "onsen_mist").toBeTruthy();
  });

  it("decoration warm_pond_stones has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "warm_pond_stones");
    expect(item).toBeTruthy();
    expect(item?.name.length, "warm_pond_stones").toBeGreaterThan(2);
    expect(item?.description.length, "warm_pond_stones").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "warm_pond_stones").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "warm_pond_stones").toBe(true);
    expect(GeneratedAssetRegistry["warm_pond_stones"], "warm_pond_stones").toBeTruthy();
  });

  it("decoration towel_rack_corner has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "towel_rack_corner");
    expect(item).toBeTruthy();
    expect(item?.name.length, "towel_rack_corner").toBeGreaterThan(2);
    expect(item?.description.length, "towel_rack_corner").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "towel_rack_corner").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "towel_rack_corner").toBe(true);
    expect(GeneratedAssetRegistry["towel_rack_corner"], "towel_rack_corner").toBeTruthy();
  });

  it("decoration snack_counter_table has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "snack_counter_table");
    expect(item).toBeTruthy();
    expect(item?.name.length, "snack_counter_table").toBeGreaterThan(2);
    expect(item?.description.length, "snack_counter_table").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "snack_counter_table").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "snack_counter_table").toBe(true);
    expect(GeneratedAssetRegistry["snack_counter_table"], "snack_counter_table").toBeTruthy();
  });

  it("decoration bamboo_gate has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "bamboo_gate");
    expect(item).toBeTruthy();
    expect(item?.name.length, "bamboo_gate").toBeGreaterThan(2);
    expect(item?.description.length, "bamboo_gate").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "bamboo_gate").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "bamboo_gate").toBe(true);
    expect(GeneratedAssetRegistry["bamboo_gate"], "bamboo_gate").toBeTruthy();
  });

  it("decoration bamboo_cart_track has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "bamboo_cart_track");
    expect(item).toBeTruthy();
    expect(item?.name.length, "bamboo_cart_track").toBeGreaterThan(2);
    expect(item?.description.length, "bamboo_cart_track").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "bamboo_cart_track").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "bamboo_cart_track").toBe(true);
    expect(GeneratedAssetRegistry["bamboo_cart_track"], "bamboo_cart_track").toBeTruthy();
  });

  it("decoration wind_chime_bridge has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "wind_chime_bridge");
    expect(item).toBeTruthy();
    expect(item?.name.length, "wind_chime_bridge").toBeGreaterThan(2);
    expect(item?.description.length, "wind_chime_bridge").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "wind_chime_bridge").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "wind_chime_bridge").toBe(true);
    expect(GeneratedAssetRegistry["wind_chime_bridge"], "wind_chime_bridge").toBeTruthy();
  });

  it("decoration orange_lanterns has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "orange_lanterns");
    expect(item).toBeTruthy();
    expect(item?.name.length, "orange_lanterns").toBeGreaterThan(2);
    expect(item?.description.length, "orange_lanterns").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "orange_lanterns").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "orange_lanterns").toBe(true);
    expect(GeneratedAssetRegistry["orange_lanterns"], "orange_lanterns").toBeTruthy();
  });

  it("decoration festival_ribbon has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "festival_ribbon");
    expect(item).toBeTruthy();
    expect(item?.name.length, "festival_ribbon").toBeGreaterThan(2);
    expect(item?.description.length, "festival_ribbon").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "festival_ribbon").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "festival_ribbon").toBe(true);
    expect(GeneratedAssetRegistry["festival_ribbon"], "festival_ribbon").toBeTruthy();
  });

  it("decoration golden_forest_arch has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "golden_forest_arch");
    expect(item).toBeTruthy();
    expect(item?.name.length, "golden_forest_arch").toBeGreaterThan(2);
    expect(item?.description.length, "golden_forest_arch").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "golden_forest_arch").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "golden_forest_arch").toBe(true);
    expect(GeneratedAssetRegistry["golden_forest_arch"], "golden_forest_arch").toBeTruthy();
  });

  it("decoration first_leaf_plaque has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "first_leaf_plaque");
    expect(item).toBeTruthy();
    expect(item?.name.length, "first_leaf_plaque").toBeGreaterThan(2);
    expect(item?.description.length, "first_leaf_plaque").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "first_leaf_plaque").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "first_leaf_plaque").toBe(true);
    expect(GeneratedAssetRegistry["first_leaf_plaque"], "first_leaf_plaque").toBeTruthy();
  });

  it("decoration golden_leaf_path has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "golden_leaf_path");
    expect(item).toBeTruthy();
    expect(item?.name.length, "golden_leaf_path").toBeGreaterThan(2);
    expect(item?.description.length, "golden_leaf_path").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "golden_leaf_path").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "golden_leaf_path").toBe(true);
    expect(GeneratedAssetRegistry["golden_leaf_path"], "golden_leaf_path").toBeTruthy();
  });

  it("decoration compost_greenhouse has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "compost_greenhouse");
    expect(item).toBeTruthy();
    expect(item?.name.length, "compost_greenhouse").toBeGreaterThan(2);
    expect(item?.description.length, "compost_greenhouse").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "compost_greenhouse").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "compost_greenhouse").toBe(true);
    expect(GeneratedAssetRegistry["compost_greenhouse"], "compost_greenhouse").toBeTruthy();
  });

  it("decoration moon_observatory has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "moon_observatory");
    expect(item).toBeTruthy();
    expect(item?.name.length, "moon_observatory").toBeGreaterThan(2);
    expect(item?.description.length, "moon_observatory").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "moon_observatory").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "moon_observatory").toBe(true);
    expect(GeneratedAssetRegistry["moon_observatory"], "moon_observatory").toBeTruthy();
  });

  it("decoration memory_gate_halo has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "memory_gate_halo");
    expect(item).toBeTruthy();
    expect(item?.name.length, "memory_gate_halo").toBeGreaterThan(2);
    expect(item?.description.length, "memory_gate_halo").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "memory_gate_halo").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "memory_gate_halo").toBe(true);
    expect(GeneratedAssetRegistry["memory_gate_halo"], "memory_gate_halo").toBeTruthy();
  });

  it("decoration release_stamp_board has placement copy and asset", () => {
    const item = DecorationConfig.decorations.find((decoration) => decoration.id === "release_stamp_board");
    expect(item).toBeTruthy();
    expect(item?.name.length, "release_stamp_board").toBeGreaterThan(2);
    expect(item?.description.length, "release_stamp_board").toBeGreaterThan(10);
    expect(item?.flavorLine.length, "release_stamp_board").toBeGreaterThan(10);
    expect(item?.visualClass.startsWith("decor-"), "release_stamp_board").toBe(true);
    expect(GeneratedAssetRegistry["release_stamp_board"], "release_stamp_board").toBeTruthy();
  });

  it("capybara momo has story bible fields and portrait asset", () => {
    const item = StoryConfig.capybaras.find((capybara) => capybara.id === "momo");
    expect(item).toBeTruthy();
    expect(item?.name.length, "momo").toBeGreaterThan(1);
    expect(item?.role.length, "momo").toBeGreaterThan(3);
    expect(item?.personality.length, "momo").toBeGreaterThan(10);
    expect(item?.favoriteFacility.length, "momo").toBeGreaterThan(2);
    expect(item?.line.length, "momo").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["capybara-momo"], "momo").toBeTruthy();
  });

  it("capybara narin has story bible fields and portrait asset", () => {
    const item = StoryConfig.capybaras.find((capybara) => capybara.id === "narin");
    expect(item).toBeTruthy();
    expect(item?.name.length, "narin").toBeGreaterThan(1);
    expect(item?.role.length, "narin").toBeGreaterThan(3);
    expect(item?.personality.length, "narin").toBeGreaterThan(10);
    expect(item?.favoriteFacility.length, "narin").toBeGreaterThan(2);
    expect(item?.line.length, "narin").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["capybara-narin"], "narin").toBeTruthy();
  });

  it("capybara dami has story bible fields and portrait asset", () => {
    const item = StoryConfig.capybaras.find((capybara) => capybara.id === "dami");
    expect(item).toBeTruthy();
    expect(item?.name.length, "dami").toBeGreaterThan(1);
    expect(item?.role.length, "dami").toBeGreaterThan(3);
    expect(item?.personality.length, "dami").toBeGreaterThan(10);
    expect(item?.favoriteFacility.length, "dami").toBeGreaterThan(2);
    expect(item?.line.length, "dami").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["capybara-dami"], "dami").toBeTruthy();
  });

  it("capybara biro has story bible fields and portrait asset", () => {
    const item = StoryConfig.capybaras.find((capybara) => capybara.id === "biro");
    expect(item).toBeTruthy();
    expect(item?.name.length, "biro").toBeGreaterThan(1);
    expect(item?.role.length, "biro").toBeGreaterThan(3);
    expect(item?.personality.length, "biro").toBeGreaterThan(10);
    expect(item?.favoriteFacility.length, "biro").toBeGreaterThan(2);
    expect(item?.line.length, "biro").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["capybara-biro"], "biro").toBeTruthy();
  });

  it("capybara soda has story bible fields and portrait asset", () => {
    const item = StoryConfig.capybaras.find((capybara) => capybara.id === "soda");
    expect(item).toBeTruthy();
    expect(item?.name.length, "soda").toBeGreaterThan(1);
    expect(item?.role.length, "soda").toBeGreaterThan(3);
    expect(item?.personality.length, "soda").toBeGreaterThan(10);
    expect(item?.favoriteFacility.length, "soda").toBeGreaterThan(2);
    expect(item?.line.length, "soda").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["capybara-soda"], "soda").toBeTruthy();
  });

  it("capybara ruru has story bible fields and portrait asset", () => {
    const item = StoryConfig.capybaras.find((capybara) => capybara.id === "ruru");
    expect(item).toBeTruthy();
    expect(item?.name.length, "ruru").toBeGreaterThan(1);
    expect(item?.role.length, "ruru").toBeGreaterThan(3);
    expect(item?.personality.length, "ruru").toBeGreaterThan(10);
    expect(item?.favoriteFacility.length, "ruru").toBeGreaterThan(2);
    expect(item?.line.length, "ruru").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["capybara-ruru"], "ruru").toBeTruthy();
  });

  it("capybara hanul has story bible fields and portrait asset", () => {
    const item = StoryConfig.capybaras.find((capybara) => capybara.id === "hanul");
    expect(item).toBeTruthy();
    expect(item?.name.length, "hanul").toBeGreaterThan(1);
    expect(item?.role.length, "hanul").toBeGreaterThan(3);
    expect(item?.personality.length, "hanul").toBeGreaterThan(10);
    expect(item?.favoriteFacility.length, "hanul").toBeGreaterThan(2);
    expect(item?.line.length, "hanul").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["capybara-hanul"], "hanul").toBeTruthy();
  });

  it("capybara podo has story bible fields and portrait asset", () => {
    const item = StoryConfig.capybaras.find((capybara) => capybara.id === "podo");
    expect(item).toBeTruthy();
    expect(item?.name.length, "podo").toBeGreaterThan(1);
    expect(item?.role.length, "podo").toBeGreaterThan(3);
    expect(item?.personality.length, "podo").toBeGreaterThan(10);
    expect(item?.favoriteFacility.length, "podo").toBeGreaterThan(2);
    expect(item?.line.length, "podo").toBeGreaterThan(8);
    expect(GeneratedAssetRegistry["capybara-podo"], "podo").toBeTruthy();
  });

  it("progression tier yard has story, goal, and background asset", () => {
    const item = ProgressionConfig.tiers.find((tier) => tier.id === "yard");
    expect(item).toBeTruthy();
    expect(item?.name.length, "yard").toBeGreaterThan(1);
    expect(item?.story.length, "yard").toBeGreaterThan(12);
    expect(item?.representativeFacility.length, "yard").toBeGreaterThan(2);
    expect(item?.unlockMessage.length, "yard").toBeGreaterThan(8);
    expect(item?.goalText.length, "yard").toBeGreaterThan(10);
    expect(GeneratedAssetRegistry["tier-yard"], "yard").toBeTruthy();
  });

  it("progression tier storehouse has story, goal, and background asset", () => {
    const item = ProgressionConfig.tiers.find((tier) => tier.id === "storehouse");
    expect(item).toBeTruthy();
    expect(item?.name.length, "storehouse").toBeGreaterThan(1);
    expect(item?.story.length, "storehouse").toBeGreaterThan(12);
    expect(item?.representativeFacility.length, "storehouse").toBeGreaterThan(2);
    expect(item?.unlockMessage.length, "storehouse").toBeGreaterThan(8);
    expect(item?.goalText.length, "storehouse").toBeGreaterThan(10);
    expect(GeneratedAssetRegistry["tier-storehouse"], "storehouse").toBeTruthy();
  });

  it("progression tier onsen has story, goal, and background asset", () => {
    const item = ProgressionConfig.tiers.find((tier) => tier.id === "onsen");
    expect(item).toBeTruthy();
    expect(item?.name.length, "onsen").toBeGreaterThan(1);
    expect(item?.story.length, "onsen").toBeGreaterThan(12);
    expect(item?.representativeFacility.length, "onsen").toBeGreaterThan(2);
    expect(item?.unlockMessage.length, "onsen").toBeGreaterThan(8);
    expect(item?.goalText.length, "onsen").toBeGreaterThan(10);
    expect(GeneratedAssetRegistry["tier-onsen"], "onsen").toBeTruthy();
  });

  it("progression tier bamboo_garden has story, goal, and background asset", () => {
    const item = ProgressionConfig.tiers.find((tier) => tier.id === "bamboo_garden");
    expect(item).toBeTruthy();
    expect(item?.name.length, "bamboo_garden").toBeGreaterThan(1);
    expect(item?.story.length, "bamboo_garden").toBeGreaterThan(12);
    expect(item?.representativeFacility.length, "bamboo_garden").toBeGreaterThan(2);
    expect(item?.unlockMessage.length, "bamboo_garden").toBeGreaterThan(8);
    expect(item?.goalText.length, "bamboo_garden").toBeGreaterThan(10);
    expect(GeneratedAssetRegistry["tier-bamboo_garden"], "bamboo_garden").toBeTruthy();
  });

  it("progression tier golden_forest has story, goal, and background asset", () => {
    const item = ProgressionConfig.tiers.find((tier) => tier.id === "golden_forest");
    expect(item).toBeTruthy();
    expect(item?.name.length, "golden_forest").toBeGreaterThan(1);
    expect(item?.story.length, "golden_forest").toBeGreaterThan(12);
    expect(item?.representativeFacility.length, "golden_forest").toBeGreaterThan(2);
    expect(item?.unlockMessage.length, "golden_forest").toBeGreaterThan(8);
    expect(item?.goalText.length, "golden_forest").toBeGreaterThan(10);
    expect(GeneratedAssetRegistry["tier-golden_forest"], "golden_forest").toBeTruthy();
  });

});
