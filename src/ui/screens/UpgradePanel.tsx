import { useState } from "react";
import { getUpgradePurchasePreview, getUpgradeViewModels, type UpgradePurchaseMode } from "../../systems/UpgradeManager";
import { ProgressionConfig } from "../../config/ProgressionConfig";
import { GameActions } from "../../game/GameActions";
import { selectEps, selectTapGain } from "../../game/GameSelectors";
import { useGameStore } from "../../state/useGameStore";
import { Button } from "../components/Button";
import { Panel } from "../components/Panel";
import { ProgressBar } from "../components/ProgressBar";
import { VisualAssetIcon } from "../components/VisualAssetIcon";

export function UpgradePanel() {
  const [purchaseMode, setPurchaseMode] = useState<UpgradePurchaseMode>("one");
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

          return (
            <Panel key={item.id} className={`upgrade-card upgrade-shelf-card ui-shelf-card ${!item.unlocked ? "is-content-locked" : preview.canBuy ? "is-buyable" : "is-locked"}`}>
              <div className="upgrade-tool-slot ui-tool-slot">
                <VisualAssetIcon assetKey={item.id} className="upgrade-icon" />
                <span>{categoryLabel}</span>
              </div>
              <div className="upgrade-copy">
                <div className="upgrade-title-row">
                  <span className="upgrade-tier-chip">{tierNameById.get(item.tier) ?? item.tier}</span>
                  {item.canBuy ? <span className="upgrade-ready-chip">구매 가능</span> : null}
                  <h3>{item.name}</h3>
                </div>
                {!item.unlocked ? <ProgressBar value={item.unlockProgress} label={item.unlockLabel} /> : null}
                <div className="upgrade-meta">
                  <span>
                    <small>현재</small>
                    Lv.{item.level}
                  </span>
                  <span>
                    <small>효과</small>
                    {item.effectText}
                  </span>
                  {preview.canBuy ? <span className="upgrade-result-chip">구매 후 Lv.{preview.nextLevel}</span> : null}
                </div>
                <p className="upgrade-ui-copy">{item.uiCopy}</p>
                <p className="upgrade-description">{item.description}</p>
                <span className="upgrade-family-chip">{familyLabel}</span>
              </div>
              <div className="upgrade-buy-slot ui-shelf-card__buy">
                <span className="cost-plaque ui-plaque ui-cost-plaque">{purchaseLabel}</span>
                <Button
                  className="upgrade-buy-button"
                  variant={preview.canBuy ? "primary" : "secondary"}
                  disabled={!preview.canBuy}
                  onClick={() => GameActions.buyUpgrade(item.id, purchaseMode)}
                >
                  {buyLabel}
                </Button>
              </div>
            </Panel>
          );
        })}
      </section>
    </main>
  );
}
