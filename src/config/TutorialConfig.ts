import { StoryConfig } from "./StoryConfig";

export const TutorialConfig = {
  steps: [
    { title: "귤 모으기", body: StoryConfig.tutorial[0], target: "capybara" },
    { title: "업그레이드", body: StoryConfig.tutorial[1], target: "upgrade" },
    { title: "환생", body: StoryConfig.tutorial[2], target: "prestige" },
  ],
} as const;
