import { getUpgradeViewModels } from "../../systems/UpgradeManager";
import { ProgressionConfig } from "../../config/ProgressionConfig";
import { GameActions } from "../../game/GameActions";
import { selectEps, selectTapGain } from "../../game/GameSelectors";
import { useGameStore } from "../../state/useGameStore";
import { Button } from "../components/Button";
import { Panel } from "../components/Panel";
import { ProgressBar } from "../components/ProgressBar";
import { VisualAssetIcon } from "../components/VisualAssetIcon";

export function UpgradePanel() {
  const state = useGameStore((snapshot) => snapshot);
  const upgrades = getUpgradeViewModels(state);
  const format = state.settings.numberFormat;
  const buyableCount = upgrades.filter((item) => item.canBuy).length;
  const tapCount = upgrades.filter((item) => item.category === "tap").length;
  const generatorCount = upgrades.length - tapCount;
  const tapGain = selectTapGain(state);
  const eps = selectEps(state);
  const tierNameById = new Map<string, string>(ProgressionConfig.tiers.map((tier) => [tier.id, tier.name]));

  return (
    <main className="screen stack-screen">
      <header className="screen-header">
        <h2>업그레이드</h2>
        <p>귤 생산량을 키우는 시설과 집사 능력입니다.</p>
      </header>
      <section className="upgrade-summary" aria-label="업그레이드 요약">
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
      <section className="upgrade-list" data-tutorial-target="upgrade">
        {upgrades.map((item) => (
          <Panel key={item.id} className={`upgrade-card ${!item.unlocked ? "is-content-locked" : item.canBuy ? "is-buyable" : "is-locked"}`}>
            <div className="upgrade-copy">
              <div className="upgrade-title-row">
                <VisualAssetIcon assetKey={item.id} className="upgrade-icon" />
                <span className="upgrade-type">{item.category === "tap" ? "터치" : "자동 생산"}</span>
                <span className="upgrade-tier-chip">{tierNameById.get(item.tier) ?? item.tier}</span>
                {item.canBuy ? <span className="upgrade-ready-chip">구매 가능</span> : null}
                <h3>{item.name}</h3>
              </div>
              <p>{item.description}</p>
              <p className="upgrade-ui-copy">{item.uiCopy}</p>
              {!item.unlocked ? <ProgressBar value={item.unlockProgress} label={item.unlockLabel} /> : null}
              <div className="upgrade-meta">
                <span>Lv.{item.level}</span>
                <span>{item.effectText}</span>
                <span>{item.category === "tap" ? `${tapCount}종 터치 성장` : `${generatorCount}종 생산 시설`}</span>
              </div>
            </div>
            <Button
              variant={item.canBuy ? "primary" : "secondary"}
              disabled={!item.canBuy}
              onClick={() => GameActions.buyUpgrade(item.id)}
            >
              {!item.unlocked ? `잠김 ${item.unlockLabel}` : item.canBuy ? `${item.cost.format(format)} 귤` : `귤 부족 ${item.cost.format(format)}`}
            </Button>
          </Panel>
        ))}
      </section>
    </main>
  );
}
