import { selectTapGain } from "./GameSelectors";
import { getGameState, setGameState } from "../state/useGameStore";
import { createInitialState } from "../state/initialState";
import { purchaseUpgrade } from "../systems/UpgradeManager";
import { performPrestige } from "../systems/PrestigeManager";
import { claimOfflineReward } from "../systems/OfflineRewardManager";
import { SaveManager } from "../systems/SaveManager";
import { AnalyticsManager } from "../systems/AnalyticsManager";
import { SoundManager } from "../systems/SoundManager";
import { applyIAPPurchaseResult, applyRewardedAdResult } from "../systems/MonetizationEventManager";
import { AdsManager, RewardedAdProvider } from "../systems/AdsManager";
import { IAPManager, IAPProvider } from "../systems/IAPManager";
import { applyAchievementUnlocks, claimAchievementReward } from "../systems/AchievementManager";
import { applyProgressionUnlocks } from "../systems/ProgressionRewardManager";
import { claimQuestReward } from "../systems/QuestManager";
import { equipDecoration as equipDecorationItem } from "../systems/CollectionManager";

function applyUnlocks(state: ReturnType<typeof getGameState>, nowMs = Date.now()) {
  return applyProgressionUnlocks(applyAchievementUnlocks(state, nowMs), nowMs);
}

function setToast(message: string, kind: "error" | "save" = "save", nowMs = Date.now()) {
  setGameState((state) => ({
    ...state,
    updatedAt: nowMs,
    lastToast: message,
    lastAction: { kind, message, createdAt: nowMs },
  }));
}

export const GameActions = {
  tapOrange(nowMs = Date.now()) {
    const state = getGameState();
    const gain = selectTapGain(state, nowMs);
    setGameState(applyUnlocks({
      ...state,
      updatedAt: nowMs,
      currencies: {
        ...state.currencies,
        orange: state.currencies.orange.add(gain),
      },
      lifetime: {
        ...state.lifetime,
        totalOrangesEarned: state.lifetime.totalOrangesEarned.add(gain),
        totalTaps: state.lifetime.totalTaps + 1,
      },
      lastAction: {
        kind: "tap",
        message: `+${gain.format()} 귤`,
        createdAt: nowMs,
      },
    }, nowMs));
    AnalyticsManager.track("tap_orange", { gain: gain.toString() }, nowMs);
    SoundManager.play("tap");
    return gain;
  },

  buyUpgrade(id: string, nowMs = Date.now()) {
    const result = purchaseUpgrade(getGameState(), id, nowMs);
    if (!result.ok) {
      setToast(result.reason === "insufficient_oranges" ? "귤이 부족해요." : "구매할 수 없어요.", "error", nowMs);
      SoundManager.play("error");
      return result;
    }
    setGameState(applyUnlocks(result.state, nowMs));
    AnalyticsManager.track("purchase_upgrade", { id, level: result.item.level + 1 }, nowMs);
    SoundManager.play("purchase");
    return result;
  },

  prestige(nowMs = Date.now()) {
    const result = performPrestige(getGameState(), nowMs);
    if (!result.ok) {
      setToast("아직 환생할 만큼 귤을 모으지 못했어요.", "error", nowMs);
      SoundManager.play("error");
      return result;
    }
    const nextState = applyUnlocks(result.state, nowMs);
    setGameState(nextState);
    SaveManager.saveToStorage(nextState, globalThis.localStorage, nowMs);
    AnalyticsManager.track("prestige_complete", { gain: result.gain.toString() }, nowMs);
    SoundManager.play("prestige");
    return result;
  },

  claimOffline(nowMs = Date.now()) {
    const next = applyUnlocks(claimOfflineReward(getGameState(), nowMs), nowMs);
    setGameState(next);
    SaveManager.saveToStorage(next, globalThis.localStorage, nowMs);
    AnalyticsManager.track("offline_reward_claimed", { reward: next.lastAction?.message }, nowMs);
    SoundManager.play("offline");
  },

  save(nowMs = Date.now(), options: { silent?: boolean } = {}) {
    const state = getGameState();
    const code = SaveManager.saveToStorage(state, globalThis.localStorage, nowMs);
    if (!options.silent) {
      setToast("저장 완료", "save", nowMs);
    }
    return code;
  },

  exportSave(nowMs = Date.now()) {
    const code = SaveManager.exportState(getGameState(), nowMs);
    AnalyticsManager.track("save_exported", undefined, nowMs);
    return code;
  },

  importSave(code: string, nowMs = Date.now()) {
    const result = SaveManager.importState(code, nowMs);
    if (!result.ok) {
      setToast(`불러오기 실패: ${result.error}`, "error", nowMs);
      SoundManager.play("error");
      return result;
    }
    const nextState = applyUnlocks(result.state, nowMs);
    setGameState(nextState);
    SaveManager.saveToStorage(nextState, globalThis.localStorage, nowMs);
    AnalyticsManager.track("save_imported", undefined, nowMs);
    setToast("저장 데이터를 불러왔어요.", "save", nowMs);
    return result;
  },

  resetSave(nowMs = Date.now()) {
    SaveManager.clearStorage(globalThis.localStorage);
    setGameState(createInitialState(nowMs));
    return nowMs;
  },

  async watchRewardedAd(provider?: RewardedAdProvider, nowMs = Date.now()) {
    AnalyticsManager.track("rewarded_ad_started", undefined, nowMs);
    const result = await AdsManager.runRewardedAd(provider);
    const actionTime = Date.now();
    const next = applyUnlocks(applyRewardedAdResult(getGameState(), result, actionTime), actionTime);
    setGameState(next);
    SoundManager.play(result.status === "completed" ? "ad" : "error");
    return result;
  },

  async purchaseMockProduct(productId: string, provider?: IAPProvider, nowMs = Date.now()) {
    AnalyticsManager.track("iap_mock_purchase_started", { productId }, nowMs);
    const result = await IAPManager.purchase(productId, provider);
    const actionTime = Date.now();
    setGameState(applyUnlocks(applyIAPPurchaseResult(getGameState(), result, actionTime), actionTime));
    SoundManager.play(result.status === "success" ? "purchase" : "error");
    return result;
  },

  claimQuest(questId: string, nowMs = Date.now()) {
    const result = claimQuestReward(getGameState(), questId, nowMs);
    if (!result.ok) {
      setToast(result.reason === "incomplete" ? "아직 퀘스트 조건이 부족해요." : "퀘스트 보상을 받을 수 없어요.", "error", nowMs);
      SoundManager.play("error");
      return result;
    }
    const nextState = applyUnlocks(result.state, nowMs);
    setGameState(nextState);
    AnalyticsManager.track("quest_claimed", { id: questId }, nowMs);
    SoundManager.play("purchase");
    return result;
  },

  claimAchievement(achievementId: string, nowMs = Date.now()) {
    const result = claimAchievementReward(getGameState(), achievementId, nowMs);
    if (!result.ok) {
      setToast(result.reason === "locked" ? "아직 달성하지 못한 업적이에요." : "업적 보상을 받을 수 없어요.", "error", nowMs);
      SoundManager.play("error");
      return result;
    }
    const nextState = applyProgressionUnlocks(result.state, nowMs);
    setGameState(nextState);
    AnalyticsManager.track("achievement_reward_claimed", { id: achievementId }, nowMs);
    SoundManager.play("achievement");
    return result;
  },

  equipDecoration(decorationId: string, nowMs = Date.now()) {
    const result = equipDecorationItem(getGameState(), decorationId, nowMs);
    if (!result.ok) {
      setToast(result.reason === "locked" ? "아직 해금되지 않은 장식이에요." : "장식을 배치할 수 없어요.", "error", nowMs);
      SoundManager.play("error");
      return result;
    }
    setGameState(result.state);
    AnalyticsManager.track("decoration_equipped", { id: decorationId }, nowMs);
    SoundManager.play("purchase");
    return result;
  },
};
