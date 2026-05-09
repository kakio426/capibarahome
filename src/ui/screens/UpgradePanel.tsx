import { useEffect, useState } from "react";
import { BalanceConfig } from "../../config/BalanceConfig";
import { BigNumberLite } from "../../core/BigNumberLite";
import { getUpgradePurchasePreview, getUpgradeViewModels, type UpgradePurchaseMode } from "../../systems/UpgradeManager";
import { ProgressionConfig } from "../../config/ProgressionConfig";
import { GameActions } from "../../game/GameActions";
import { selectEps, selectTapGain } from "../../game/GameSelectors";
import { useGameStore } from "../../state/useGameStore";
import { Button } from "../components/Button";
import { Panel } from "../components/Panel";
import { ProgressBar } from "../components/ProgressBar";
import { VisualAssetIcon } from "../components/VisualAssetIcon";

type PurchaseFeedback = {
  id: string;
  message: string;
  detail: string;
};

function effectAtLevel(itemId: string, category: "tap" | "generator", level: number, format: "short" | "scientific") {
  if (category === "tap") {
    const config = BalanceConfig.tapUpgrades.find((upgrade) => upgrade.id === itemId);
    const gain = (config?.tapMultiplierPerLevel ?? 0) * level;
    return `터치 +${BigNumberLite.from(gain).format(format)}`;
  }
  const config = BalanceConfig.generators.find((generator) => generator.id === itemId);
  if (!config) return `Lv.${level}`;
  const eps = BigNumberLite.from(config.baseEps).multiply(level);
  const multiplier = config.generatorMultiplier > 1
    ? ` · 전체 +${Math.round((config.generatorMultiplier - 1) * level * 100)}%`
    : "";
  return `초당 +${eps.format(format)}${multiplier}`;
}

export function UpgradePanel() {
  const [purchaseMode, setPurchaseMode] = useState<UpgradePurchaseMode>("one");
  const [purchaseFeedback, setPurchaseFeedback] = useState<PurchaseFeedback | null>(null);
  const state = useGameStore((snapshot) => snapshot);
  const upgrades = getUpgradeViewModels(state);
  const format = state.settings.numberFormat;
  const buyableCount = upgrades.filter((item) => getUpgradePurchasePreview(state, item.id, purchaseMode).canBuy).length;
  const tapCount = upgrades.filter((item) => item.category === "tap").length;
  const generatorCount = upgrades.length - tapCount;
  const tapGain = selectTapGain(state);
  const eps = selectEps(state);
  const tierNameById = new Map<string, string>(ProgressionConfig.tiers.map((tier) => [tier.id, tier.name]));
  const purchaseModes: Array<{ id: UpgradePurchaseMode; label: string; note: string; short: string }> = [
    { id: "one", label: "1개", note: "한 단계씩 정밀 조정", short: "정밀" },
    { id: "ten", label: "10개", note: "초반 선반 빠르게 채우기", short: "묶음" },
    { id: "max", label: "최대", note: "현재 귤로 가능한 만큼", short: "전력" },
  ];
  const currentMode = purchaseModes.find((mode) => mode.id === purchaseMode) ?? purchaseModes[0];

  useEffect(() => {
    if (!purchaseFeedback) return;
    const timeoutId = window.setTimeout(() => setPurchaseFeedback(null), 2200);
    return () => window.clearTimeout(timeoutId);
  }, [purchaseFeedback]);

  return (
    <main className="screen stack-screen">
      <header className="screen-header">
        <h2>업그레이드</h2>
        <p>귤 생산량을 키우는 시설과 집사 능력입니다.</p>
      </header>
      <section className="upgrade-summary ui-plaque-row" aria-label="업그레이드 요약">
        <div>
          <span className="metric-label">구매 가능</span>
          <strong>{buyableCount}개</strong>
        </div>
        <div>
          <span className="metric-label">터치 성장</span>
          <strong>{tapGain.format(format)} 귤</strong>
        </div>
        <div>
          <span className="metric-label">자동 생산</span>
          <strong>{eps.format(format)} 귤/초</strong>
        </div>
      </section>
      <section className="quick-buy-panel ui-panel ui-panel--parchment" aria-label="구매 수량 모드">
        <div className="quick-buy-head">
          <span className="app-kicker">작업대 레버</span>
          <strong>{currentMode.note}</strong>
        </div>
        <div className="quick-buy-mode ui-segmented">
          {purchaseModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className={purchaseMode === mode.id ? "is-active" : ""}
              aria-label={mode.label}
              aria-pressed={purchaseMode === mode.id}
              onClick={() => setPurchaseMode(mode.id)}
            >
              <span>{mode.label}</span>
              <small>{mode.short}</small>
            </button>
          ))}
        </div>
      </section>
      <section className="upgrade-list" data-tutorial-target="upgrade">
        {upgrades.map((item) => {
          const categoryLabel = item.category === "tap" ? "터치" : "자동 생산";
          const familyLabel = item.category === "tap" ? `${tapCount}종 터치 성장` : `${generatorCount}종 생산 시설`;
          const preview = getUpgradePurchasePreview(state, item.id, purchaseMode);
          const purchaseLabel = !item.unlocked
            ? `잠김 ${item.unlockLabel}`
            : preview.reason === "max_level"
              ? "최대 레벨"
              : preview.canBuy
                ? `${preview.quantity > 1 ? `${preview.quantity}회 · ` : ""}${preview.totalCost.format(format)} 귤`
                : `귤 부족 ${preview.totalCost.format(format)}`;
          const buyLabel = preview.canBuy
            ? purchaseMode === "one"
              ? "구매"
              : purchaseMode === "ten"
                ? `${preview.quantity}회 구매`
                : `최대 ${preview.quantity}회`
            : item.unlocked
              ? "대기"
              : "잠김";
          const currentEffect = effectAtLevel(item.id, item.category, item.level, format);
          const nextEffect = effectAtLevel(item.id, item.category, preview.nextLevel, format);
          const levelDelta = preview.canBuy
            ? `레벨 ${item.level} → ${preview.nextLevel}`
            : item.unlocked
              ? `다음 레벨 ${item.level + 1}`
              : item.unlockLabel;
          const gainDelta = preview.canBuy ? `${currentEffect} → ${nextEffect}` : item.effectText;
          const isLastPurchase = purchaseFeedback?.id === item.id;

          function handleBuy() {
            const result = GameActions.buyUpgrade(item.id, purchaseMode);
            if (!result.ok) return;
            const afterEffect = effectAtLevel(item.id, item.category, result.nextLevel, format);
            setPurchaseFeedback({
              id: item.id,
              message: `${item.name} ${result.quantity}회 성장`,
              detail: `레벨 ${item.level} → ${result.nextLevel} · ${afterEffect}`,
            });
          }

          return (
            <Panel
              key={item.id}
              className={`upgrade-card upgrade-shelf-card ui-shelf-card ${!item.unlocked ? "is-content-locked" : preview.canBuy ? "is-buyable" : "is-locked"} ${isLastPurchase ? "has-purchase-feedback" : ""}`}
              data-qa="upgrade-card"
            >
              <div className="upgrade-card-body" data-qa="upgrade-card-body">
                <div className="upgrade-tool-slot ui-tool-slot" data-qa="upgrade-tool-slot">
                  <VisualAssetIcon assetKey={item.id} className="upgrade-icon" />
                  <span>{categoryLabel}</span>
                </div>
                <div className="upgrade-copy">
                  <div className="upgrade-status-row" data-ui-critical="upgrade-status">
                    <span className="upgrade-tier-chip">{tierNameById.get(item.tier) ?? item.tier}</span>
                    {item.canBuy ? <span className="upgrade-ready-chip">구매 가능</span> : null}
                  </div>
                  <div className="upgrade-title-row">
                    <h3 data-ui-critical="upgrade-title">{item.name}</h3>
                  </div>
                  {!item.unlocked ? <ProgressBar value={item.unlockProgress} label={item.unlockLabel} /> : null}
                  <div className="upgrade-meta" data-qa="upgrade-stat-row" data-ui-critical="upgrade-stat-row">
                    <span>
                      <small>현재</small>
                      Lv.{item.level}
                    </span>
                    <span>
                      <small>효과</small>
                      {currentEffect}
                    </span>
                    {preview.canBuy ? <span className="upgrade-result-chip">구매 후 Lv.{preview.nextLevel}</span> : null}
                  </div>
                  <p className="upgrade-ui-copy">{item.uiCopy}</p>
                  <p className="upgrade-description">{item.description}</p>
                  <span className="upgrade-family-chip">{familyLabel}</span>
                </div>
              </div>
              <div className="upgrade-buy-slot ui-shelf-card__buy" data-qa="upgrade-purchase-tray">
                <span className={preview.canBuy ? "upgrade-buy-delta is-ready" : "upgrade-buy-delta"} data-ui-critical="upgrade-buy-delta">
                  <strong>{levelDelta}</strong>
                  <em>{gainDelta}</em>
                </span>
                <span className="cost-plaque ui-plaque ui-cost-plaque" data-qa="upgrade-cost" data-ui-critical="upgrade-cost">{purchaseLabel}</span>
                <Button
                  className="upgrade-buy-button"
                  variant={preview.canBuy ? "primary" : "secondary"}
                  disabled={!preview.canBuy}
                  onClick={handleBuy}
                  data-qa="upgrade-buy-button"
                >
                  {buyLabel}
                </Button>
                {isLastPurchase ? (
                  <span className="upgrade-purchase-feedback" role="status">
                    <strong>{purchaseFeedback.message}</strong>
                    <em>{purchaseFeedback.detail}</em>
                  </span>
                ) : null}
              </div>
            </Panel>
          );
        })}
      </section>
    </main>
  );
}
