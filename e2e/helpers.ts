import { expect, Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { GameConfig } from "../src/config/GameConfig";
import { BigNumberLite } from "../src/core/BigNumberLite";
import { GameState } from "../src/game/GameTypes";
import { createInitialState } from "../src/state/initialState";
import { SaveManager } from "../src/systems/SaveManager";

export async function openFresh(page: Page, path = "/") {
  await page.goto(path);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.getByRole("heading", { name: "카피바라 집사기" })).toBeVisible();
  await expect(page.locator(".debug-panel")).toHaveCount(path.includes("debug=1") ? 1 : 0);
}

export async function skipTutorial(page: Page) {
  const skip = page.getByRole("button", { name: "건너뛰기" });
  if (await skip.isVisible()) {
    await skip.click();
  }
}

export async function tapCapybara(page: Page, count: number) {
  const tapButton = page.getByRole("button", { name: /귤 주기/ });
  for (let i = 0; i < count; i += 1) {
    await tapButton.click();
  }
}

export async function seedSave(page: Page, setup: (state: GameState, nowMs: number) => void, path = "/") {
  const nowMs = Date.now();
  const state = createInitialState(nowMs);
  state.tutorial.completed = true;
  state.tutorial.visible = false;
  setup(state, nowMs);
  const code = SaveManager.exportState(state, state.lastSavedAt);
  await page.goto("/seed.html");
  await page.evaluate(
    ([key, value]) => {
      localStorage.clear();
      localStorage.setItem(key, value);
    },
    [GameConfig.save.key, code],
  );
  await page.goto(path);
  await expect(page.getByRole("heading", { name: "카피바라 집사기" })).toBeVisible();
}

export function setOrange(state: GameState, value: string) {
  state.currencies.orange = BigNumberLite.from(value);
  state.lifetime.totalOrangesEarned = state.lifetime.totalOrangesEarned.max(value);
}

export function ensureScreenshotDir() {
  mkdirSync("qa-screenshots", { recursive: true });
}

export async function expectNoHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    bodyScrollWidth: document.body.scrollWidth,
    documentScrollWidth: document.documentElement.scrollWidth,
  }));
  expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
  expect(metrics.documentScrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
}
