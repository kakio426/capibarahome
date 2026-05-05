import { useState } from "react";
import { MonetizationConfig } from "../../config/MonetizationConfig";
import { GameActions } from "../../game/GameActions";
import { selectEps } from "../../game/GameSelectors";
import { useGameStore } from "../../state/useGameStore";
import { Button } from "../components/Button";
import { Panel } from "../components/Panel";

function formatBoostLeft(adBoostUntil: number | null) {
  if (!adBoostUntil) return "비활성";
  const seconds = Math.max(0, Math.ceil((adBoostUntil - Date.now()) / 1000));
  if (seconds <= 0) return "비활성";
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}분 ${rest}초`;
}

export function MonetizationPanel() {
  const [busyId, setBusyId] = useState<string | null>(null);
  const state = useGameStore((snapshot) => snapshot);
  const isDev = import.meta.env.DEV;
  const eps = selectEps(state);
  const boostActive = Boolean(state.monetization.adBoostUntil && state.monetization.adBoostUntil > Date.now());

  async function runAd() {
    setBusyId("ad");
    await GameActions.watchRewardedAd();
    setBusyId(null);
  }

  async function buy(productId: string) {
    setBusyId(productId);
    await GameActions.purchaseMockProduct(productId);
    setBusyId(null);
  }

  return (
    <main className="screen stack-screen">
      <header className="screen-header">
        <h2>상점</h2>
        <p>수확 축제와 특별 상자로 카피바라 정원의 성장을 빠르게 돕습니다.</p>
      </header>

      <Panel className="shop-feature-card">
        <div className="shop-feature-top">
          <div>
            <span className="shop-kicker">귤 수확 축제</span>
            <h3>30분간 귤 수익 2배</h3>
          </div>
          <span className={boostActive ? "boost-status is-active" : "boost-status"}>
            {boostActive ? "진행 중" : "준비됨"}
          </span>
        </div>
        <div className="reward-chip-row">
          <span className="reward-chip">현재 {eps.format(state.settings.numberFormat)} 🍊/초</span>
          <span className="reward-chip">최대 2시간 연장</span>
          <span className="reward-chip">오프라인 보상에도 반영</span>
        </div>
        <p>남은 시간: {formatBoostLeft(state.monetization.adBoostUntil)}</p>
        <Button disabled={busyId === "ad"} onClick={runAd}>
          {busyId === "ad" ? "광고 준비 중" : "광고 보상 받기"}
        </Button>
      </Panel>

      <section className="product-list">
        {MonetizationConfig.products.map((product) => (
          <Panel key={product.id} className="product-card">
            <div className="product-copy">
              <div className="product-title-row">
                <span className="product-icon" aria-hidden="true">{product.id === "golden_leaf_pack" ? "🍂" : product.id === "no_ads_pack" ? "🌤️" : "🧺"}</span>
                <h3>{product.name}</h3>
              </div>
              <p>{product.description}</p>
              <div className="reward-chip-row">
                {"orangeReward" in product && product.orangeReward !== "0" ? <span className="reward-chip">+{product.orangeReward} 🍊</span> : null}
                {"goldenLeafReward" in product ? <span className="reward-chip">+{product.goldenLeafReward} 🍂</span> : null}
                {product.id === "no_ads_pack" ? <span className="reward-chip">광고 SDK 연결 예정</span> : null}
                {state.monetization.purchasedProductIds.includes(product.id) ? <span className="owned-chip">수령 완료</span> : null}
              </div>
            </div>
            <Button
              variant="secondary"
              disabled={!isDev || busyId === product.id}
              onClick={() => buy(product.id)}
            >
              {!isDev ? "출시 준비 중" : busyId === product.id ? "처리 중" : "샌드박스 수령"}
            </Button>
          </Panel>
        ))}
      </section>
    </main>
  );
}
