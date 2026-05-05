import { MonetizationConfig } from "../config/MonetizationConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { GameState } from "../game/GameTypes";
import { AnalyticsManager } from "./AnalyticsManager";
import { calculateNextAdBoostUntil, RewardedAdResult } from "./AdsManager";
import { IAPPurchaseResult } from "./IAPManager";

export function applyRewardedAdResult(state: GameState, result: RewardedAdResult, nowMs = Date.now()): GameState {
  if (result.status !== "completed") {
    return {
      ...state,
      updatedAt: nowMs,
      lastToast: "광고 보상을 받을 수 없었어요.",
      lastAction: { kind: "error", message: result.error, createdAt: nowMs },
    };
  }
  const adBoostUntil = calculateNextAdBoostUntil(state.monetization.adBoostUntil, nowMs);
  AnalyticsManager.track("rewarded_ad_completed", { adBoostUntil }, nowMs);
  return {
    ...state,
    updatedAt: nowMs,
    monetization: {
      ...state.monetization,
      adBoostUntil,
    },
    lastToast: "귤 수확 축제가 시작됐어요. 30분 동안 수익 2배!",
    lastAction: { kind: "ad", message: "광고 버프 적용", createdAt: nowMs },
  };
}

export function applyIAPPurchaseResult(state: GameState, result: IAPPurchaseResult, nowMs = Date.now()): GameState {
  if (result.status !== "success") {
    return {
      ...state,
      updatedAt: nowMs,
      lastToast: "샌드박스 구매가 실패했습니다.",
      lastAction: { kind: "error", message: result.error, createdAt: nowMs },
    };
  }
  const product = MonetizationConfig.products.find((item) => item.id === result.productId);
  if (!product) {
    return {
      ...state,
      updatedAt: nowMs,
      lastToast: "알 수 없는 상품입니다.",
      lastAction: { kind: "error", message: result.productId, createdAt: nowMs },
    };
  }
  const orangeReward = "orangeReward" in product ? product.orangeReward : "0";
  const goldenLeafReward = "goldenLeafReward" in product ? product.goldenLeafReward : "0";
  AnalyticsManager.track("iap_mock_purchase_completed", { productId: result.productId }, nowMs);
  return {
    ...state,
    updatedAt: nowMs,
    currencies: {
      orange: state.currencies.orange.add(orangeReward),
      goldenLeaf: state.currencies.goldenLeaf.add(goldenLeafReward),
    },
    monetization: {
      ...state.monetization,
      purchasedProductIds: [...new Set([...state.monetization.purchasedProductIds, product.id])],
    },
    lifetime: {
      ...state.lifetime,
      totalOrangesEarned: state.lifetime.totalOrangesEarned.add(BigNumberLite.from(orangeReward)),
    },
    lastToast: `${product.name} 샌드박스 보상이 적용되었습니다.`,
    lastAction: { kind: "iap", message: product.name, createdAt: nowMs },
  };
}
