import { PointerEvent, useState } from "react";
import { GameConfig } from "../../config/GameConfig";
import { StoryConfig } from "../../config/StoryConfig";
import { BigNumberLite } from "../../core/BigNumberLite";
import { selectCollectionBadges, selectCollectionDashboard, selectCurrentProgressionTier, selectEps, selectNextProgressionTier, selectNextUpgradeGoal, selectPrestigeGain, selectPrestigeProgress, selectQuestBoard, selectTapGain } from "../../game/GameSelectors";
import { GameState } from "../../game/GameTypes";
import { GameActions } from "../../game/GameActions";
import { useGameStore } from "../../state/useGameStore";
import { formatRetentionDuration, getDailyRewardStatus, getMilestoneViewModels, getPostPrestigeGoalView } from "../../systems/RetentionManager";
import { Button } from "../components/Button";
import { CurrencyDisplay } from "../components/CurrencyDisplay";
import { Modal } from "../components/Modal";
import { ProgressBar } from "../components/ProgressBar";
import { RasterAssetImage } from "../components/RasterAssetImage";
import { VisualAssetIcon } from "../components/VisualAssetIcon";

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
  const [dailyClaimMoment, setDailyClaimMoment] = useState<ReturnType<typeof getDailyRewardStatus> | null>(null);
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
  const dailyReward = getDailyRewardStatus(state, nowMs);
  const milestones = getMilestoneViewModels(state, nowMs);
  const nextMilestone = milestones.find((milestone) => milestone.canClaim) ?? milestones.find((milestone) => !milestone.claimed) ?? milestones[milestones.length - 1];
  const postPrestigeGoal = getPostPrestigeGoalView(state, nowMs);
  const featuredCapybara = StoryConfig.capybaras[(currentTier.order - 1) % StoryConfig.capybaras.length];
  const mascotMood = getMascotMood(state);
  const equippedDecorationClasses = collection.equippedDecorations.map((decoration) => decoration.visualClass).join(" ");
  const highlightedQuest = questBoard.ready[0] ?? questBoard.next;
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

  function claimDailyReward() {
    const result = GameActions.claimDailyReward();
    if (result.ok) {
      setDailyClaimMoment(result.status);
    }
  }

  return (
    <main className="screen home-screen">
      <div className={`hero-card ${dailyReward.eligible ? "has-daily-badge" : ""} ${currentTier.backgroundClass} ${equippedDecorationClasses}`}>
        <div className="currency-grid">
          <CurrencyDisplay label={GameConfig.currency.orange.name} value={state.currencies.orange} assetKey="orange" format={format} />
          <CurrencyDisplay label={GameConfig.currency.goldenLeaf.name} value={state.currencies.goldenLeaf} assetKey="leaf" format={format} />
        </div>

        <button className={`capybara-touch mood-${mascotMood}`} type="button" onPointerDown={onTap} data-tutorial-target="capybara">
          <RasterAssetImage assetKey="main-hero-background" className="hero-raster-background" />
          <span className={highlightedQuest?.readyToClaim ? "scene-reward-badge is-ready" : "scene-reward-badge"}>
            {highlightedQuest?.readyToClaim ? "보상 수령 가능" : currentTier.name}
          </span>
          <span className="tap-copy">귤 주기</span>
        </button>

        <button
          className={dailyReward.eligible ? "home-daily-badge is-ready" : "home-daily-badge"}
          type="button"
          disabled={!dailyReward.eligible}
          onClick={claimDailyReward}
          aria-label={dailyReward.eligible ? `Day ${dailyReward.day} 오늘 보상` : `복귀 보상 ${formatRetentionDuration(dailyReward.cooldownRemainingMs)} 남음`}
        >
          <span>Day {dailyReward.day}</span>
          <strong>{dailyReward.eligible ? "오늘 보상" : formatRetentionDuration(dailyReward.cooldownRemainingMs)}</strong>
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

      <section className="stats-panel home-ledger-panel" aria-label="정원 장부 요약">
        <div data-ui-critical="home-stat">
          <span className="metric-label">누적 귤</span>
          <strong>{state.lifetime.totalOrangesEarned.format(format)}</strong>
        </div>
        <div data-ui-critical="home-stat">
          <span className="metric-label">터치</span>
          <strong>{state.lifetime.totalTaps.toLocaleString("ko-KR")}</strong>
        </div>
        <div data-ui-critical="home-stat">
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

      <section className={`retention-panel ${dailyReward.eligible ? "is-ready" : ""}`} aria-label="복귀 보상과 장기 루프">
        <div className="retention-daily-card">
          <div>
            <span className="app-kicker">복귀 보상</span>
            <h2>Day {dailyReward.day} · {dailyReward.title}</h2>
            <p>{dailyReward.flavor}</p>
          </div>
          <span className={dailyReward.eligible ? "goal-chip is-ready" : "goal-chip"}>
            {dailyReward.eligible ? "수령 가능" : `${formatRetentionDuration(dailyReward.cooldownRemainingMs)} 남음`}
          </span>
          <div className="retention-reward-row">
            <VisualAssetIcon assetKey={dailyReward.reward.goldenLeaf.gte(1) ? "leaf" : "orange"} className="retention-reward-icon" />
            <strong>{dailyReward.reward.label}</strong>
            <span>연속 {dailyReward.currentStreak}일 기록</span>
          </div>
          <Button
            fullWidth
            disabled={!dailyReward.eligible}
            onClick={claimDailyReward}
          >
            복귀 보상 받기
          </Button>
        </div>

        <div className="retention-goal-card">
          <div className="retention-goal-header">
            <div>
              <span className="app-kicker">환생 이후 목표</span>
              <h3>{postPrestigeGoal.title}</h3>
            </div>
            <span className={postPrestigeGoal.canClaim ? "goal-chip is-ready" : "goal-chip"}>
              {postPrestigeGoal.completed ? "완료" : `${postPrestigeGoal.step + 1}/${postPrestigeGoal.totalSteps}`}
            </span>
          </div>
          <p>{postPrestigeGoal.description}</p>
          <ProgressBar value={postPrestigeGoal.progress} label={postPrestigeGoal.canClaim ? `보상 ${postPrestigeGoal.reward.label}` : "장기 목표 진행률"} />
          <Button
            variant={postPrestigeGoal.canClaim ? "primary" : "secondary"}
            disabled={!postPrestigeGoal.canClaim}
            onClick={() => GameActions.claimPostPrestigeGoal()}
          >
            {postPrestigeGoal.canClaim ? "목표 보상 받기" : "진행 중"}
          </Button>
        </div>

        {nextMilestone ? (
          <div className="retention-milestone-strip">
            <span className="retention-stamp">{nextMilestone.claimed ? "완료" : `D${nextMilestone.day}`}</span>
            <div>
              <strong>{nextMilestone.title}</strong>
              <span>{nextMilestone.claimed ? "복귀 배지 장부에 기록됨" : nextMilestone.canClaim ? `보상 ${nextMilestone.reward.label}` : `${Math.round(nextMilestone.progress * 100)}% 진행`}</span>
            </div>
          </div>
        ) : null}

        {state.lastAction?.kind === "daily" || state.lastAction?.kind === "milestone" || state.lastAction?.kind === "retention_goal" ? (
          <div className="retention-reveal-banner" role="status">
            <span>장부 도장</span>
            <strong>{state.lastAction.message}</strong>
          </div>
        ) : null}
      </section>

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

      <Modal
        open={Boolean(dailyClaimMoment)}
        title="복귀 보상 도장"
        className="daily-reward-modal ui-modal--reward"
        onClose={() => setDailyClaimMoment(null)}
        actions={<Button onClick={() => setDailyClaimMoment(null)}>정원으로 돌아가기</Button>}
      >
        <div className="daily-reward-sheet">
          <div className="daily-reward-crest" aria-hidden="true">
            <VisualAssetIcon assetKey={dailyClaimMoment?.reward.goldenLeaf.gte(1) ? "leaf" : "orange"} />
            <span>Day {dailyClaimMoment?.day}</span>
          </div>
          <div className="daily-reward-copy">
            <span className="app-kicker">연속 {dailyClaimMoment?.streakAfterClaim ?? 0}일 기록</span>
            <h3>{dailyClaimMoment?.title}</h3>
            <p>{dailyClaimMoment?.flavor}</p>
          </div>
          <div className="daily-reward-prize">
            <span>오늘 받은 보상</span>
            <strong>{dailyClaimMoment?.reward.label}</strong>
          </div>
          <div className="daily-next-preview">
            <span>다음 보상</span>
            <strong>Day {dailyReward.day} · {dailyReward.title}</strong>
            <small>{dailyReward.reward.label}</small>
          </div>
        </div>
      </Modal>
    </main>
  );
}
