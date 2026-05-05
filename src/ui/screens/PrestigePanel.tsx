import { useState } from "react";
import { GameConfig } from "../../config/GameConfig";
import { BigNumberLite } from "../../core/BigNumberLite";
import { getPrestigeStatus } from "../../systems/PrestigeManager";
import { GameActions } from "../../game/GameActions";
import { useGameStore } from "../../state/useGameStore";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Panel } from "../components/Panel";
import { ProgressBar } from "../components/ProgressBar";
import { RasterAssetImage } from "../components/RasterAssetImage";

function formatMultiplier(value: BigNumberLite) {
  const safe = value.toNumberSafe();
  if (safe > 0 && safe < 1000) {
    return safe.toFixed(2).replace(/\.?0+$/, "");
  }
  return value.format();
}

export function PrestigePanel() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const state = useGameStore((snapshot) => snapshot);
  const status = getPrestigeStatus(state);
  const format = state.settings.numberFormat;

  function confirmPrestige() {
    GameActions.prestige();
    setConfirmOpen(false);
  }

  return (
    <main className="screen stack-screen" data-tutorial-target="prestige">
      <header className="screen-header">
        <h2>환생</h2>
        <p>성장 기록을 바탕으로 황금 나뭇잎을 얻고 영구 배율을 올립니다.</p>
      </header>

      <Panel className={`prestige-card ${status.canPrestige ? "is-ready" : ""}`}>
        <span className="prestige-badge">{status.canPrestige ? "환생 가능" : "성장 중"}</span>
        <div className="prestige-visual" aria-hidden="true">
          <RasterAssetImage assetKey="prestige-ritual-raster" className="prestige-key-asset" />
        </div>
        <h3>{GameConfig.currency.goldenLeaf.name} 예상 보상 {status.gain.format(format)}개</h3>
        <ProgressBar value={status.progress} label={`환생 진행률 ${Math.round(status.progress * 100)}%`} />
        <div className="prestige-grid">
          <div>
            <span className="metric-label">현재 배율</span>
            <strong>x{formatMultiplier(status.currentMultiplier)}</strong>
          </div>
          <div>
            <span className="metric-label">환생 후</span>
            <strong>x{formatMultiplier(status.nextMultiplier)}</strong>
          </div>
        </div>
        <Button fullWidth disabled={!status.canPrestige} onClick={() => setConfirmOpen(true)}>
          환생하기
        </Button>
      </Panel>

      <Panel>
        <span className="metric-label">환생 기준</span>
        <strong>{status.requirement.format(format)} 누적 귤</strong>
      </Panel>

      <Modal
        open={confirmOpen}
        title="환생 확인"
        onClose={() => setConfirmOpen(false)}
        actions={(
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>취소</Button>
            <Button onClick={confirmPrestige}>황금 나뭇잎 받기</Button>
          </>
        )}
      >
        <p>현재 귤과 일반 업그레이드는 초기화됩니다. 황금 나뭇잎과 설정, 튜토리얼 기록은 유지됩니다.</p>
      </Modal>
    </main>
  );
}
