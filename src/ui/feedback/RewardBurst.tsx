import type { LastActionState } from "../../game/GameTypes";

type RewardBurstProps = {
  action: LastActionState;
};

function rewardLabel(action: NonNullable<LastActionState>) {
  if (action.kind === "tap") return "수확";
  if (action.kind === "purchase") return "성장";
  if (action.kind === "quest" || action.kind === "achievement") return "보상";
  if (action.kind === "daily" || action.kind === "milestone" || action.kind === "retention_goal") return "획득";
  if (action.kind === "prestige") return "환생";
  return "기록";
}

export function RewardBurst({ action }: RewardBurstProps) {
  if (!action) return null;
  const ageMs = Date.now() - action.createdAt;
  if (ageMs > 1800) return null;

  return (
    <div className={`reward-burst reward-burst--${action.kind}`} role="status" aria-live="polite">
      <span>{rewardLabel(action)}</span>
      <strong>{action.message}</strong>
    </div>
  );
}
