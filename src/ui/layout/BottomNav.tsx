import { AppTab, routes } from "../../app/routes";
import { SoundManager } from "../../systems/SoundManager";
import { VisualAssetIcon } from "../components/VisualAssetIcon";

type BottomNavProps = {
  activeTab: AppTab;
  onNavigate: (tab: AppTab) => void;
};

export function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-tabs ui-tab-dock rc20-bottom-nav" aria-label="주요 화면">
      {routes.map((route) => (
        <button
          key={route.id}
          type="button"
          aria-label={route.ariaLabel ?? route.label}
          className={`ui-tab-dock__item rc20-bottom-nav__item ${activeTab === route.id ? "is-active" : ""}`.trim()}
          onClick={() => {
            if (activeTab !== route.id) SoundManager.play("navigation");
            onNavigate(route.id);
          }}
        >
          <VisualAssetIcon assetKey={route.icon} className="tab-icon" />
          <strong>{route.label}</strong>
        </button>
      ))}
    </nav>
  );
}
