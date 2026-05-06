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

type PrestigeResultView = {
  gain: BigNumberLite;
  totalLeaves: BigNumberLite;
  multiplier: BigNumberLite;
};

export function PrestigePanel() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [prestigeResult, setPrestigeResult] = useState<PrestigeResultView | null>(null);
  const state = useGameStore((snapshot) => snapshot);
  const status = getPrestigeStatus(state);
  const format = state.settings.numberFormat;

  function confirmPrestige() {
    const result = GameActions.prestige();
    if (result.ok) {
      setPrestigeResult({
        gain: result.gain,
        totalLeaves: result.state.currencies.goldenLeaf,
        multiplier: status.nextMultiplier,
      });
    }
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

      <Modal
        open={Boolean(prestigeResult)}
        title="새 계절 시작"
        className="prestige-result-modal ui-modal--reward"
        onClose={() => setPrestigeResult(null)}
        actions={<Button onClick={() => setPrestigeResult(null)}>정원으로 돌아가기</Button>}
      >
        <div className="prestige-result-stamp" aria-hidden="true">황금잎</div>
        <p>이전 정원의 기록이 황금 나뭇잎으로 남았습니다.</p>
        <div className="prestige-result-grid">
          <div>
            <span className="metric-label">획득</span>
            <strong>+{prestigeResult?.gain.format(format)}개</strong>
          </div>
          <div>
            <span className="metric-label">보유</span>
            <strong>{prestigeResult?.totalLeaves.format(format)}개</strong>
          </div>
          <div>
            <span className="metric-label">새 배율</span>
            <strong>x{prestigeResult ? formatMultiplier(prestigeResult.multiplier) : "1"}</strong>
          </div>
        </div>
        <p className="prestige-next-copy">다음 목표는 누적 {BigNumberLite.from(GameConfig.prestige.requirement).format(format)} 귤입니다.</p>
      </Modal>
    </main>
  );
}
