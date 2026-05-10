import { PropsWithChildren, ReactNode } from "react";

type RewardSheetProps = PropsWithChildren<{
  kicker: string;
  title: string;
  reward: ReactNode;
  next?: ReactNode;
  className?: string;
}>;

export function RewardSheet({ kicker, title, reward, next, children, className = "" }: RewardSheetProps) {
  return (
    <div className={`reward-sheet ${className}`.trim()}>
      <div className="reward-sheet__copy">
        <span className="app-kicker">{kicker}</span>
        <h3>{title}</h3>
        {children}
      </div>
      <div className="reward-sheet__prize" data-ui-critical="reward-sheet-prize">
        <span>받은 보상</span>
        <strong>{reward}</strong>
      </div>
      {next ? <div className="reward-sheet__next">{next}</div> : null}
    </div>
  );
}
