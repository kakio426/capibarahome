import { useState } from "react";
import { GameState } from "../../game/GameTypes";
import { setGameState, useGameStore } from "../../state/useGameStore";
import { updateSetting, setNumberFormat } from "../../systems/SettingsManager";
import { restartTutorial } from "../../systems/TutorialManager";
import { SoundManager } from "../../systems/SoundManager";
import { GameActions } from "../../game/GameActions";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Panel } from "../components/Panel";
import { Toggle } from "../components/Toggle";
import { SaveImportExportModal } from "./SaveImportExportModal";

function updateState(mutator: (state: GameState) => GameState) {
  setGameState((state) => mutator(state));
}

export function SettingsModal() {
  const [saveOpen, setSaveOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const state = useGameStore((snapshot) => snapshot);

  return (
    <main className="screen stack-screen">
      <header className="screen-header">
        <h2>설정</h2>
        <p>연출, 소리, 저장 데이터를 즉시 조정합니다.</p>
      </header>

      <Panel className="settings-panel">
        <div className="ledger-section-title">
          <span>집사 장부</span>
          <strong>연출 관리</strong>
        </div>
        <Toggle label="이펙트 켜기" checked={state.settings.effectsEnabled} onChange={(value) => updateState((current) => updateSetting(current, "effectsEnabled", value))} />
        <Toggle
          label="효과음 음소거"
          checked={state.settings.soundMuted}
          onChange={(value) => updateState((current) => {
            SoundManager.setSoundMuted(value);
            return updateSetting(current, "soundMuted", value);
          })}
        />
        <Toggle
          label="배경음 음소거"
          checked={state.settings.musicMuted}
          onChange={(value) => updateState((current) => {
            SoundManager.setMusicMuted(value);
            return updateSetting(current, "musicMuted", value);
          })}
        />
        <Toggle label="진동 켜기" checked={state.settings.vibrationEnabled} onChange={(value) => updateState((current) => updateSetting(current, "vibrationEnabled", value))} />
        <div className="ledger-section-title is-small">
          <span>숫자 표기</span>
          <strong>표시 방식</strong>
        </div>
        <div className="segmented">
          <button className={state.settings.numberFormat === "short" ? "is-active" : ""} type="button" onClick={() => updateState((current) => setNumberFormat(current, "short"))}>짧게</button>
          <button className={state.settings.numberFormat === "scientific" ? "is-active" : ""} type="button" onClick={() => updateState((current) => setNumberFormat(current, "scientific"))}>과학적</button>
        </div>
      </Panel>

      <Panel className="settings-actions">
        <div className="ledger-section-title">
          <span>정원 관리 서랍</span>
          <strong>보관 작업</strong>
        </div>
        <div className="settings-action-grid">
          <Button className="ledger-action-button" variant="secondary" onClick={() => updateState((current) => restartTutorial(current))}>튜토리얼 다시 보기</Button>
          <Button className="ledger-action-button" variant="secondary" onClick={() => setSaveOpen(true)}>세이브 Export/Import</Button>
          <Button className="ledger-action-button" variant="secondary" onClick={() => GameActions.save()}>강제 저장</Button>
          <Button className="ledger-action-button is-danger" variant="danger" onClick={() => setResetOpen(true)}>저장 데이터 초기화</Button>
        </div>
      </Panel>

      <SaveImportExportModal open={saveOpen} onClose={() => setSaveOpen(false)} />
      <Modal
        open={resetOpen}
        title="저장 초기화"
        className="danger-confirm-modal"
        onClose={() => setResetOpen(false)}
        actions={(
          <>
            <Button variant="ghost" onClick={() => setResetOpen(false)}>취소</Button>
            <Button variant="danger" onClick={() => {
              GameActions.resetSave();
              setResetOpen(false);
            }}>초기화</Button>
          </>
        )}
      >
        <p>현재 기기의 저장 데이터가 삭제됩니다. 이 작업은 되돌릴 수 없습니다.</p>
      </Modal>
    </main>
  );
}
