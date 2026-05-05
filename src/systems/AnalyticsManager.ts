export type AnalyticsEventName =
  | "game_start"
  | "tap_orange"
  | "purchase_upgrade"
  | "prestige_available"
  | "prestige_complete"
  | "offline_reward_claimed"
  | "save_exported"
  | "save_imported"
  | "rewarded_ad_started"
  | "rewarded_ad_completed"
  | "iap_mock_purchase_started"
  | "iap_mock_purchase_completed"
  | "quest_claimed"
  | "achievement_reward_claimed"
  | "decoration_equipped";

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  payload?: Record<string, unknown>;
  createdAt: number;
};

const events: AnalyticsEvent[] = [];

export const AnalyticsManager = {
  track(name: AnalyticsEventName, payload?: Record<string, unknown>, nowMs = Date.now()) {
    const event = { name, payload, createdAt: nowMs };
    events.push(event);
    if (typeof console !== "undefined") {
      console.info("[analytics:mock]", name, payload ?? {});
    }
    return event;
  },

  getEvents() {
    return [...events];
  },

  clear() {
    events.length = 0;
  },
};
