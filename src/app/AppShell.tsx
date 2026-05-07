import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { GameConfig } from "../config/GameConfig";
import { StoryConfig } from "../config/StoryConfig";
import { TutorialConfig } from "../config/TutorialConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { GameLoop } from "../game/GameLoop";
import { GameActions } from "../game/GameActions";
import { setGameState, useGameStore } from "../state/useGameStore";
import { createInitialState } from "../state/initialState";
import { SaveManager } from "../systems/SaveManager";
import { DebugManager } from "../systems/DebugManager";
import { claimOfflineReward } from "../systems/OfflineRewardManager";
import { AnalyticsManager } from "../systems/AnalyticsManager";
import { SoundManager } from "../systems/SoundManager";
import { FloatingText } from "../game/GameTypes";
import { routes, AppTab } from "./routes";
import { FloatingTextLayer } from "../ui/effects/FloatingTextLayer";
import { Particle, ParticleLayer } from "../ui/effects/ParticleLayer";
import { MainGameScreen } from "../ui/screens/MainGameScreen";
import { UpgradePanel } from "../ui/screens/UpgradePanel";
import { PrestigePanel } from "../ui/screens/PrestigePanel";
import { MonetizationPanel } from "../ui/screens/MonetizationPanel";
import { CollectionScreen } from "../ui/screens/CollectionScreen";
import { SettingsModal } from "../ui/screens/SettingsModal";
import { TutorialOverlay } from "../ui/screens/TutorialOverlay";
import { Modal } from "../ui/components/Modal";
import { Button } from "../ui/components/Button";
import { RasterAssetImage } from "../ui/components/RasterAssetImage";
import { VisualAssetIcon } from "../ui/components/VisualAssetIcon";

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}시간 ${minutes}분`;
  return `${minutes}분`;
}

function offlineReturnLine(seconds: number) {
  const index = Math.min(StoryConfig.offlineReturnLines.length - 1, Math.floor(Math.max(0, seconds) / 3600));
  return StoryConfig.offlineReturnLines[index];
}

function formatTapBurst(value: BigNumberLite, format: "short" | "scientific") {
  if (format === "short") {
    const safe = value.toNumberSafe();
    if (safe > 0 && safe < 1000 && !Number.isInteger(safe)) {
      return safe.toFixed(2).replace(/\.?0+$/, "");
    }
  }
  return value.format(format);
}

function renderTab(activeTab: AppTab, onTap: (event: PointerEvent<HTMLButtonElement>) => void) {
  if (activeTab === "home") return <MainGameScreen onTap={onTap} />;
  if (activeTab === "upgrades") return <UpgradePanel />;
  if (activeTab === "prestige") return <PrestigePanel />;
  if (activeTab === "collection") return <CollectionScreen />;
  if (activeTab === "shop") return <MonetizationPanel />;
  return <SettingsModal />;
}

export function AppShell() {
  const [activeTab, setActiveTab] = useState<AppTab>("home");
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const state = useGameStore((snapshot) => snapshot);
  const loopRef = useRef<GameLoop | null>(null);
  const bootedRef = useRef(false);
  const debugEnabled = import.meta.env.DEV
    && typeof window !== "undefined"
    && new URLSearchParams(window.location.search).get("debug") === "1";
  const tutorialTarget = !state.tutorial.completed && state.tutorial.visible
    ? TutorialConfig.steps[state.tutorial.step]?.target
    : undefined;

  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    const loaded = SaveManager.loadFromStorage(globalThis.localStorage);
    if (loaded.ok) {
      if (loaded.state.offlineReward) {
        const reward = loaded.state.offlineReward;
        const claimedState = claimOfflineReward(loaded.state);
        const stateWithModal = {
          ...claimedState,
          offlineReward: {
            ...reward,
            claimed: true,
          },
        };
        setGameState(stateWithModal);
        SaveManager.saveToStorage(claimedState, globalThis.localStorage);
      } else {
        setGameState(loaded.state);
      }
    } else {
      setGameState({
        ...createInitialState(),
        lastToast: `저장 복구 실패: ${loaded.error}`,
        lastAction: { kind: "error", message: loaded.error, createdAt: Date.now() },
      });
    }
    AnalyticsManager.track("game_start");
  }, []);

  useEffect(() => {
    const loop = new GameLoop();
    loopRef.current = loop;
    loop.start();
    const intervalId = window.setInterval(() => {
      try {
        GameActions.save(Date.now(), { silent: true });
      } catch (error) {
        console.warn("[save:auto] failed", error);
      }
    }, GameConfig.save.autoSaveIntervalMs);

    function saveBeforeUnload() {
      try {
        GameActions.save(Date.now(), { silent: true });
      } catch (error) {
        console.warn("[save:beforeunload] failed", error);
      }
    }

    window.addEventListener("beforeunload", saveBeforeUnload);
    return () => {
      loop.stop();
      window.clearInterval(intervalId);
      window.removeEventListener("beforeunload", saveBeforeUnload);
    };
  }, []);

  useEffect(() => {
    SoundManager.setSoundMuted(state.settings.soundMuted);
    SoundManager.setMusicMuted(state.settings.musicMuted);
  }, [state.settings.soundMuted, state.settings.musicMuted]);

  useEffect(() => {
    if (!state.lastToast || !state.lastAction) return;
    const toastMessage = state.lastToast;
    const toastCreatedAt = state.lastAction.createdAt;
    const timeoutId = window.setTimeout(() => {
      setGameState((current) => {
        if (current.lastToast !== toastMessage || current.lastAction?.createdAt !== toastCreatedAt) {
          return current;
        }
        return { ...current, lastToast: null };
      });
    }, 2400);
    return () => window.clearTimeout(timeoutId);
  }, [state.lastToast, state.lastAction?.createdAt]);

  const visibleFloatingTexts = useMemo(() => floatingTexts.slice(-18), [floatingTexts]);
  const visibleParticles = useMemo(() => particles.slice(-36), [particles]);

  function handleTap(event: PointerEvent<HTMLButtonElement>) {
    const gain = GameActions.tapOrange();
    if (state.settings.vibrationEnabled && "vibrate" in navigator) {
      navigator.vibrate(12);
    }
    if (!state.settings.effectsEnabled) return;

    const idBase = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const x = event.clientX + (Math.random() - 0.5) * 28;
    const y = event.clientY + (Math.random() - 0.5) * 22;
    const burstRoll = Math.random();
    const nextFloating: FloatingText = {
      id: `${idBase}-text`,
      text: `+${formatTapBurst(gain, state.settings.numberFormat)} 귤`,
      x,
      y,
      variant: gain.gte(1000) ? "gold" : burstRoll > 0.66 ? "pop" : "soft",
    };
    const nextParticles = Array.from({ length: 8 }, (_, index) => ({
      id: `${idBase}-p-${index}`,
      x,
      y,
      dx: Math.cos((Math.PI * 2 * index) / 8) * (22 + Math.random() * 18),
      dy: Math.sin((Math.PI * 2 * index) / 8) * (22 + Math.random() * 18),
    }));
    setFloatingTexts((items) => [...items.slice(-17), nextFloating]);
    setParticles((items) => [...items.slice(-28), ...nextParticles]);
    window.setTimeout(() => {
      setFloatingTexts((items) => items.filter((item) => item.id !== nextFloating.id));
      setParticles((items) => items.filter((item) => !nextParticles.some((particle) => particle.id === item.id)));
    }, 850);
  }

  function debugApply(mutator: ReturnType<typeof createDebugAction>) {
    setGameState((current) => mutator(current));
  }

  function createDebugAction(action: (typeof DebugManager)[keyof typeof DebugManager]) {
    return action as (current: typeof state) => typeof state;
  }

  return (
    <div className="app-frame ui-game-frame">
      <div
        className="game-shell ui-game-shell"
        data-tutorial-active-target={tutorialTarget}
        data-sound-muted={state.settings.soundMuted ? "true" : "false"}
        data-effects-enabled={state.settings.effectsEnabled ? "true" : "false"}
        data-last-action-kind={state.lastAction?.kind ?? "none"}
        data-toast-visible={state.lastToast ? "true" : "false"}
      >
        <header className="top-bar ui-carved-header">
          <div>
            <span className="app-kicker">귤 정원 돌봄</span>
            <h1>카피바라 집사기</h1>
          </div>
          <div className="save-dot ui-plaque ui-plaque--save" title="자동 저장 활성">저장</div>
        </header>

        <div className="content-shell">
          {renderTab(activeTab, handleTap)}
        </div>

        <nav className="bottom-tabs ui-tab-dock" aria-label="주요 화면">
          {routes.map((route) => (
            <button
              key={route.id}
              type="button"
              aria-label={route.ariaLabel ?? route.label}
              className={`ui-tab-dock__item ${activeTab === route.id ? "is-active" : ""}`.trim()}
              onClick={() => {
                if (activeTab !== route.id) SoundManager.play("navigation");
                setActiveTab(route.id);
              }}
            >
              <VisualAssetIcon assetKey={route.icon} className="tab-icon" />
              <strong>{route.label}</strong>
            </button>
          ))}
        </nav>

        {state.lastToast ? <div className="toast ui-toast-banner" role="status">{state.lastToast}</div> : null}
        <FloatingTextLayer items={visibleFloatingTexts} />
        <ParticleLayer items={visibleParticles} />
        <TutorialOverlay />
        {debugEnabled ? (
          <details className="debug-panel">
            <summary>Debug</summary>
            <div className="debug-grid">
              <Button variant="secondary" onClick={() => debugApply((current) => DebugManager.grantOranges(current, "1000"))}>귤 1,000</Button>
              <Button variant="secondary" onClick={() => debugApply((current) => DebugManager.grantOranges(current, "1000000"))}>귤 1,000,000</Button>
              <Button variant="secondary" onClick={() => debugApply((current) => DebugManager.grantGoldenLeaf(current))}>황금 나뭇잎</Button>
              <Button variant="secondary" onClick={() => GameActions.save()}>강제 저장</Button>
              <Button variant="secondary" onClick={() => debugApply((current) => DebugManager.simulateOffline(current, 7200))}>오프라인 2시간</Button>
              <Button variant="secondary" onClick={() => debugApply((current) => DebugManager.resetTutorial(current))}>튜토리얼 초기화</Button>
              <Button variant="secondary" onClick={() => debugApply((current) => DebugManager.forceAdBoost(current))}>광고 버프</Button>
              <Button variant="secondary" onClick={() => debugApply((current) => DebugManager.makePrestigeReady(current))}>환생 가능</Button>
              <Button variant="secondary" onClick={() => debugApply((current) => DebugManager.makeDailyRewardReady(current))}>일일 보상 가능</Button>
              <Button variant="secondary" onClick={() => debugApply((current) => DebugManager.simulateRetentionStreak3(current))}>리텐션 3일</Button>
              <Button variant="secondary" onClick={() => debugApply((current) => DebugManager.simulateRetentionStreak7(current))}>리텐션 7일</Button>
              <Button variant="secondary" onClick={() => debugApply((current) => DebugManager.resetRetentionMilestones(current))}>마일스톤 초기화</Button>
              <Button variant="secondary" onClick={() => debugApply((current) => DebugManager.advancePostPrestigeGoal(current))}>환생 목표 +1</Button>
              <Button variant="danger" onClick={() => GameActions.resetSave()}>저장 초기화</Button>
            </div>
          </details>
        ) : null}

        <Modal
          open={Boolean(state.offlineReward?.pending)}
          title="오프라인 보상"
          className="reward-modal ui-modal--reward"
          actions={<Button onClick={() => GameActions.claimOffline()}>보상 받기</Button>}
        >
          <div className="reward-reveal-stack">
            <span className="reward-step-chip">정원 복귀</span>
            <p>{offlineReturnLine(state.offlineReward?.seconds ?? 0)}</p>
            <p>{formatDuration(state.offlineReward?.seconds ?? 0)} 동안 카피바라가 귤을 모았습니다.</p>
          </div>
          <div className="offline-visual reward-reveal-visual" aria-hidden="true">
            <RasterAssetImage assetKey="offline-reward-raster" className="offline-key-asset" />
            <span className="reward-basket-lid" />
          </div>
          <strong className="offline-reward reward-count">+{state.offlineReward?.oranges.format(state.settings.numberFormat)} 귤</strong>
        </Modal>
      </div>
    </div>
  );
}
