import { PointerEvent } from "react";
import { GameConfig } from "../../config/GameConfig";
import { StoryConfig } from "../../config/StoryConfig";
import { BigNumberLite } from "../../core/BigNumberLite";
import { selectCollectionBadges, selectCollectionDashboard, selectCurrentProgressionTier, selectEps, selectNextProgressionTier, selectNextUpgradeGoal, selectPrestigeGain, selectPrestigeProgress, selectQuestBoard, selectTapGain } from "../../game/GameSelectors";
import { GameState } from "../../game/GameTypes";
import { useGameStore } from "../../state/useGameStore";
import { CurrencyDisplay } from "../components/CurrencyDisplay";
import { ProgressBar } from "../components/ProgressBar";
import { VisualAssetIcon, getVisualAssetUrl } from "../components/VisualAssetIcon";

type MainGameScreenProps = {
  onTap: (event: PointerEvent<HTMLButtonElement>) => void;
};

function formatIncomeValue(value: BigNumberLite, format: "short" | "scientific") {
  if (format === "short") {
    const safe = value.toNumberSafe();
    if (safe > 0 && safe < 1000 && !Number.isInteger(safe)) {
      return safe.toFixed(2).replace(/\.?0+$/, "");
    }
  }
  return value.format(format);
}

function getMascotMood(state: GameState) {
  const lastActionAge = state.lastAction ? Date.now() - state.lastAction.createdAt : Number.POSITIVE_INFINITY;
  if (state.lastAction?.kind === "prestige" || state.lastAction?.kind === "achievement") return "celebrate";
  if (state.lastAction?.kind === "tap" && lastActionAge < 1200) return "eating";
  if (state.lifetime.totalTaps === 0 && state.currencies.orange.isZero()) return "sleepy";
  if (state.lifetime.totalTaps > 0 || state.lifetime.totalOrangesEarned.gte(100)) return "happy";
  return "default";
}

export function MainGameScreen({ onTap }: MainGameScreenProps) {
  const state = useGameStore((snapshot) => snapshot);
  const format = state.settings.numberFormat;
  const nowMs = Date.now();
  const eps = selectEps(state, nowMs);
  const tapGain = selectTapGain(state, nowMs);
  const nextGoal = selectNextUpgradeGoal(state);
  const collectionBadges = selectCollectionBadges(state, nowMs);
  const unlockedBadges = collectionBadges.filter((badge) => badge.unlocked).length;
  const prestigeGain = selectPrestigeGain(state);
  const prestigeProgress = selectPrestigeProgress(state);
  const currentTier = selectCurrentProgressionTier(state);
  const nextTier = selectNextProgressionTier(state);
  const questBoard = selectQuestBoard(state, nowMs);
  const collection = selectCollectionDashboard(state);
  const featuredCapybara = StoryConfig.capybaras[(currentTier.order - 1) % StoryConfig.capybaras.length];
  const mascotMood = getMascotMood(state);
  const equippedDecorationClasses = collection.equippedDecorations.map((decoration) => decoration.visualClass).join(" ");
  const highlightedQuest = questBoard.ready[0] ?? questBoard.next;
  const tierArt = getVisualAssetUrl(`tier-${currentTier.id}`);
  const heroFinalArt = getVisualAssetUrl("main-hero-final");
  const longTermTitle = state.lifetime.totalPrestiges > 0
    ? "환생 이후 정원 재건"
    : prestigeGain.gte(1)
      ? "첫 환생 보상 수령"
      : "첫 환생 준비";
  const longTermCopy = state.lifetime.totalPrestiges > 0
    ? "황금 나뭇잎 배율, 업적 보상, 장식 배치를 묶어 다음 회차를 더 빠르게 만듭니다."
    : prestigeGain.gte(1)
      ? "환생 탭에서 황금 나뭇잎을 받고 영구 배율을 정원에 남겨 주세요."
      : currentTier.nextInstruction;

  return (
    <main className="screen home-screen">
      <div className={`hero-card ${currentTier.backgroundClass} ${equippedDecorationClasses}`}>
        {tierArt ? <img className="tier-art" src={tierArt} alt="" aria-hidden="true" /> : null}
        <div className="currency-grid">
          <CurrencyDisplay label={GameConfig.currency.orange.name} value={state.currencies.orange} assetKey="orange" format={format} />
          <CurrencyDisplay label={GameConfig.currency.goldenLeaf.name} value={state.currencies.goldenLeaf} assetKey="leaf" format={format} />
        </div>

        <button className={`capybara-touch mood-${mascotMood}`} type="button" onPointerDown={onTap} data-tutorial-target="capybara">
          {heroFinalArt ? <img className="hero-final-art" src={heroFinalArt} alt="" aria-hidden="true" /> : null}
          <span className="scene-backdrop" aria-hidden="true">
            <span className="scene-tree scene-tree-left" />
            <span className="scene-tree scene-tree-right" />
            <span className="scene-facility" />
            <span className="scene-pond" />
            <span className="scene-orange scene-orange-one" />
            <span className="scene-orange scene-orange-two" />
            <span className="scene-orange scene-orange-three" />
          </span>
          <span className="sun-glow" />
          <span className="capybara-illustration" aria-hidden="true">
            <VisualAssetIcon assetKey={`mascot-${mascotMood}`} className="hero-mascot-asset" />
          </span>
          <span className="tap-copy">귤 주기</span>
        </button>

        <div className="income-grid">
          <div className="metric-tile">
            <span className="metric-label">터치당</span>
            <strong>{formatIncomeValue(tapGain, format)} 귤</strong>
          </div>
          <div className="metric-tile">
            <span className="metric-label">초당</span>
            <strong>{formatIncomeValue(eps, format)} 귤/초</strong>
          </div>
        </div>
      </div>

      <section className="stats-panel">
        <div>
          <span className="metric-label">누적 귤</span>
          <strong>{state.lifetime.totalOrangesEarned.format(format)}</strong>
        </div>
        <div>
          <span className="metric-label">터치</span>
          <strong>{state.lifetime.totalTaps.toLocaleString("ko-KR")}</strong>
        </div>
        <div>
          <span className="metric-label">환생</span>
          <strong>{state.lifetime.totalPrestiges.toLocaleString("ko-KR")}</strong>
        </div>
      </section>

      {highlightedQuest ? (
        <section className="today-quest-panel" aria-label="오늘 할 일">
          <div>
            <span className="app-kicker">오늘 할 일</span>
            <h2>{highlightedQuest.title}</h2>
            <p>{highlightedQuest.helperLine}</p>
          </div>
          <span className={highlightedQuest.readyToClaim ? "goal-chip is-ready" : "goal-chip"}>
            {highlightedQuest.readyToClaim ? "보상 수령 가능" : highlightedQuest.currentText}
          </span>
          <ProgressBar value={highlightedQuest.progress} label={highlightedQuest.instruction} />
        </section>
      ) : null}

      <section className={`tier-story-panel ${currentTier.backgroundClass}`} aria-label="정원 구간">
        <div>
          <span className="app-kicker">현재 구간</span>
          <h2>{currentTier.name}</h2>
        </div>
        <p>{currentTier.story}</p>
        <blockquote className="capybara-line">
          <strong>{featuredCapybara.name}</strong>
          <span>{featuredCapybara.line}</span>
        </blockquote>
        <div className="tier-meta-row">
          <span>{currentTier.representativeFacility}</span>
          <span>{currentTier.goalText}</span>
        </div>
        <div className="tier-reward-row">
          <strong>{currentTier.rewardTitle}</strong>
          <span>{currentTier.rewardDescription}</span>
          <em>{currentTier.visualChange}</em>
        </div>
        {nextTier ? <strong className="tier-next">다음 구간: {nextTier.name} · 누적 {Number(nextTier.requiredLifetimeOranges).toLocaleString("ko-KR")}귤</strong> : null}
      </section>

      <section className="long-term-panel" aria-label="장기 목표">
        <div>
          <span className="app-kicker">장기 목표</span>
          <h2>{longTermTitle}</h2>
          <p>{longTermCopy}</p>
        </div>
        <div className="long-term-track">
          <span className={state.lifetime.totalPrestiges > 0 ? "is-complete" : "is-active"}>첫 환생</span>
          <span className={state.achievements.claimedRewardIds.length >= 8 ? "is-complete" : ""}>업적 보상 8개</span>
          <span className={collection.equippedDecorations.length >= 3 ? "is-complete" : ""}>장식 3개 배치</span>
        </div>
      </section>

      <section className="goal-panel" aria-label="다음 목표">
        <div className="goal-panel-header">
          <div>
            <span className="app-kicker">다음 목표</span>
            <h2>{nextGoal ? nextGoal.name : "정원 안정화"}</h2>
          </div>
          <span className={nextGoal?.canBuy ? "goal-chip is-ready" : "goal-chip"}>
            {nextGoal ? nextGoal.actionLabel : "완료"}
          </span>
        </div>
        {nextGoal ? (
          <>
            <p>{nextGoal.description}</p>
            <ProgressBar value={nextGoal.progress} label={`${nextGoal.category === "tap" ? "터치 성장" : "자동 생산"} Lv.${nextGoal.level + 1} 준비도`} />
          </>
        ) : (
          <p>현재 준비된 업그레이드를 모두 성장시켰어요. 환생 보상과 컬렉션을 확인해 주세요.</p>
        )}
        <div className="prestige-mini">
          <div>
            <span className="metric-label">환생 준비</span>
            <strong>{Math.round(prestigeProgress * 100)}%</strong>
          </div>
          <ProgressBar value={prestigeProgress} label={`예상 황금 나뭇잎 +${prestigeGain.format(format)}개`} />
        </div>
      </section>

      <section className="collection-panel" aria-label="정원 컬렉션">
        <div className="collection-header">
          <div>
            <span className="app-kicker">정원 컬렉션</span>
            <h2>{unlockedBadges}/{collectionBadges.length}개 해금</h2>
          </div>
          <span className="collection-count">{Math.round((unlockedBadges / collectionBadges.length) * 100)}%</span>
        </div>
        <div className="collection-shelf">
          {collectionBadges.map((badge) => (
            <div key={badge.id} className={`collection-badge ${badge.unlocked ? "is-unlocked" : ""}`}>
              <VisualAssetIcon assetKey={badge.id} className="badge-icon" />
              <strong>{badge.title}</strong>
              <span>{badge.unlocked ? "해금" : `${Math.round(badge.progress * 100)}%`}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
