import { ProgressionConfig } from "../../config/ProgressionConfig";
import { GameActions } from "../../game/GameActions";
import { selectCollectionBadges, selectCollectionDashboard, selectQuestBoard } from "../../game/GameSelectors";
import { useGameStore } from "../../state/useGameStore";
import { Button } from "../components/Button";
import { Panel } from "../components/Panel";
import { ProgressBar } from "../components/ProgressBar";
import { RasterAssetImage } from "../components/RasterAssetImage";
import { VisualAssetIcon } from "../components/VisualAssetIcon";

function questChapterLabel(chapter: string) {
  const labels: Record<string, string> = {
    welcome: "입문",
    yard: "마당",
    storehouse: "창고",
    onsen: "온천",
    bamboo: "대나무",
    golden: "황금 숲",
    release: "출시 점검",
  };
  return labels[chapter] ?? chapter;
}

export function CollectionScreen() {
  const state = useGameStore((snapshot) => snapshot);
  const nowMs = Date.now();
  const questBoard = selectQuestBoard(state, nowMs);
  const collection = selectCollectionDashboard(state);
  const badges = selectCollectionBadges(state, nowMs);
  const unlockedBadges = badges.filter((badge) => badge.unlocked);
  const tierNameById = new Map(ProgressionConfig.tiers.map((tier) => [tier.id, tier.name]));
  const highlightedQuest = questBoard.ready[0] ?? questBoard.next;
  const albumReveal = state.lastAction?.kind === "achievement" || state.lastAction?.kind === "quest"
    ? state.lastAction.message
    : null;
  const visibleQuests = [
    ...questBoard.ready,
    ...questBoard.quests.filter((quest) => !quest.readyToClaim && !quest.claimed).slice(0, 12),
    ...questBoard.quests.filter((quest) => quest.claimed).slice(-6),
  ].filter((quest, index, list) => list.findIndex((item) => item.id === quest.id) === index);

  return (
    <main className="screen collection-screen">
      <header className="screen-header">
        <h2>앨범과 할 일</h2>
        <p>퀘스트 보상, 카피바라 친구, 정원 장식을 한 화면에서 확인합니다.</p>
      </header>

      <section className="album-hero" aria-label="앨범 요약">
        <div>
          <span className="app-kicker">오늘 할 일</span>
          <h3>{highlightedQuest?.title ?? "모든 퀘스트 완료"}</h3>
          <p>{highlightedQuest?.helperLine ?? "정원이 안정적으로 운영되고 있습니다."}</p>
        </div>
        <div className="album-room-scene" aria-hidden="true">
          <RasterAssetImage assetKey="main-hero-background" className="album-room-bg" />
          <div className="album-sticker-strip">
            {collection.companions.slice(0, 4).map((capybara) => (
              <RasterAssetImage key={capybara.id} assetKey={`companion-${capybara.id}`} className="album-sticker" />
            ))}
          </div>
        </div>
        <div className="album-score-grid ui-sticker-ledger">
          <div>
            <span className="metric-label">퀘스트</span>
            <strong>{questBoard.claimed.length}/{questBoard.quests.length}</strong>
          </div>
          <div>
            <span className="metric-label">배지</span>
            <strong>{unlockedBadges.length}/{badges.length}</strong>
          </div>
          <div>
            <span className="metric-label">친구</span>
            <strong>{collection.unlockedCompanions}/{collection.totalCompanions}</strong>
          </div>
          <div>
            <span className="metric-label">장식</span>
            <strong>{collection.unlockedDecorations}/{collection.totalDecorations}</strong>
          </div>
        </div>
        <ProgressBar value={questBoard.completionRatio} label="퀘스트 보상 수령률" />
      </section>

      {albumReveal ? (
        <section className="album-reveal-banner" role="status" aria-label="앨범 보상 연출">
          <span className="album-reveal-stamp">도장 완료</span>
          <div>
            <span className="app-kicker">새 기록</span>
            <strong>{albumReveal}</strong>
          </div>
        </section>
      ) : null}

      <section className="quest-board" aria-label="퀘스트 보드">
        <div className="section-title-row">
          <div>
            <span className="app-kicker">퀘스트</span>
            <h3>다음 행동 안내</h3>
          </div>
          <span className="goal-chip is-ready">{questBoard.ready.length}개 수령 가능</span>
        </div>
        <div className="quest-list">
          {visibleQuests.map((quest) => (
            <Panel key={quest.id} className={`quest-card ${quest.readyToClaim ? "is-ready" : quest.claimed ? "is-claimed" : ""}`}>
              <div className="quest-copy">
                <div className="quest-title-row">
                  <VisualAssetIcon assetKey={quest.id} />
                  <span className="upgrade-type">{questChapterLabel(quest.chapter)}</span>
                  <span className="upgrade-tier-chip">{tierNameById.get(quest.tier) ?? quest.tier}</span>
                  <h3>{quest.title}</h3>
                </div>
                <p>{quest.instruction}</p>
                <p className="quest-helper">{quest.helperLine}</p>
                <ProgressBar value={quest.progress} label={quest.currentText} />
              </div>
              <Button
                variant={quest.readyToClaim ? "primary" : "secondary"}
                disabled={!quest.readyToClaim}
                onClick={() => GameActions.claimQuest(quest.id)}
              >
                {quest.claimed ? "완료" : quest.readyToClaim ? `보상 +${quest.reward.oranges} 귤` : "진행 중"}
              </Button>
            </Panel>
          ))}
        </div>
      </section>

      <section className="companion-board" aria-label="카피바라 친구">
        <div className="section-title-row">
          <div>
            <span className="app-kicker">카피바라 친구</span>
            <h3>정원 주민</h3>
          </div>
        </div>
        <div className="companion-grid">
          {collection.companions.map((capybara) => (
            <article key={capybara.id} className={`companion-card mood-${capybara.mood} ${capybara.unlocked ? "is-unlocked" : ""}`}>
              <div className="companion-portrait" aria-hidden="true">
                <RasterAssetImage assetKey={`companion-${capybara.id}`} className="companion-asset" />
              </div>
              <div className="companion-copy">
                <span className="upgrade-type">{capybara.role}</span>
                <h4>{capybara.unlocked ? capybara.name : "아직 만나지 못함"}</h4>
                <p>{capybara.unlocked ? capybara.line : capybara.unlockLabel}</p>
                <div className="companion-ability">
                  <strong>{capybara.abilityLabel}</strong>
                  <span>{capybara.abilityDescription}</span>
                  <em>
                    현재 {capybara.abilityCurrentBonus}
                    {capybara.nextFriendshipTarget ? ` · 다음 Lv까지 친밀도 ${capybara.nextFriendshipTarget - capybara.friendship}` : " · 최고 친밀도"}
                  </em>
                </div>
                <ProgressBar
                  value={capybara.progress}
                  label={`친밀도 Lv.${capybara.friendshipLevel} · ${capybara.friendship} · 다음 ${capybara.abilityNextBonus}`}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="decoration-board" aria-label="정원 장식">
        <div className="section-title-row">
          <div>
            <span className="app-kicker">정원 장식</span>
            <h3>해금된 장면 조각</h3>
          </div>
          <span className="collection-count">{collection.equippedDecorations.length}개 배치</span>
        </div>
        <div className="decoration-grid">
          {collection.decorations.map((decoration) => (
            <article key={decoration.id} className={`decoration-card ${decoration.unlocked ? "is-unlocked" : ""} ${decoration.equipped ? "is-equipped" : ""}`}>
              <VisualAssetIcon assetKey={decoration.id} />
              <div>
                <span className="upgrade-type">{decoration.slot}</span>
                <h4>{decoration.name}</h4>
                <p>{decoration.unlocked ? decoration.flavorLine : decoration.unlockLabel}</p>
                {!decoration.unlocked ? <ProgressBar value={decoration.progress} label={decoration.unlockLabel} /> : null}
              </div>
              <Button
                variant={decoration.equipped ? "secondary" : "primary"}
                disabled={!decoration.unlocked || decoration.equipped}
                onClick={() => GameActions.equipDecoration(decoration.id)}
              >
                {decoration.equipped ? "배치됨" : decoration.unlocked ? "배치" : "잠김"}
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="badge-board" aria-label="업적 배지">
        <div className="section-title-row">
          <div>
            <span className="app-kicker">업적 배지</span>
            <h3>정원 기록</h3>
          </div>
          <span className="collection-count">{Math.round((unlockedBadges.length / badges.length) * 100)}%</span>
        </div>
        <div className="collection-shelf is-detailed">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`collection-badge ${badge.unlocked ? "is-unlocked" : ""} ${badge.canClaimReward ? "can-claim" : ""}`}
            >
              <VisualAssetIcon assetKey={badge.id} className="badge-icon" />
              <strong>{badge.title}</strong>
              <span>{badge.unlocked ? badge.description : `${Math.round(badge.progress * 100)}%`}</span>
              <small className="badge-reward">보상: {badge.rewardSummary}</small>
              <Button
                variant={badge.canClaimReward ? "primary" : "secondary"}
                disabled={!badge.canClaimReward}
                onClick={() => GameActions.claimAchievement(badge.id)}
              >
                {badge.rewardClaimed ? "보상 받음" : badge.canClaimReward ? "보상 받기" : "잠김"}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
