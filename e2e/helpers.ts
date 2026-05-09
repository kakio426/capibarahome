import { expect, Locator, Page } from "@playwright/test";
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
  const defaultLastSavedAt = state.lastSavedAt;
  setup(state, nowMs);
  const exportTime = state.lastSavedAt === defaultLastSavedAt ? nowMs + 60_000 : state.lastSavedAt;
  const code = SaveManager.exportState(state, exportTime);
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

export async function expectNoCriticalTextClipping(page: Page, selectors: string[]) {
  const failures = await page.evaluate((targetSelectors) => {
    function isVisible(element: Element) {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      return rect.width > 0
        && rect.height > 0
        && style.visibility !== "hidden"
        && style.display !== "none";
    }

    return targetSelectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)).map((element, index) => {
      if (!(element instanceof HTMLElement) || !isVisible(element)) return null;
      const horizontalClip = element.scrollWidth - element.clientWidth > 2;
      const verticalClip = element.scrollHeight - element.clientHeight > 6;
      if (!horizontalClip && !verticalClip) return null;
      const text = (element.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 90);
      return {
        selector,
        index,
        text,
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
        clientHeight: element.clientHeight,
        scrollHeight: element.scrollHeight,
      };
    }).filter(Boolean));
  }, selectors);

  expect(failures).toEqual([]);
}

export async function expectNoDataCriticalTextClipping(page: Page) {
  await expectNoCriticalTextClipping(page, ["[data-ui-critical]"]);
}

export async function expectToastDoesNotBlockActions(page: Page) {
  const pointerEvents = await page.locator(".toast").evaluateAll((nodes) => nodes.map((node) => window.getComputedStyle(node).pointerEvents));
  for (const value of pointerEvents) {
    expect(value).toBe("none");
  }
}

export async function expectVisibleWithinViewport(locator: Locator, minVisibleRatio = 0.92) {
  await expect(locator).toBeVisible();
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;

  const viewport = locator.page().viewportSize();
  expect(viewport).not.toBeNull();
  if (!viewport) return;

  const left = Math.max(0, box.x);
  const top = Math.max(0, box.y);
  const right = Math.min(viewport.width, box.x + box.width);
  const bottom = Math.min(viewport.height, box.y + box.height);
  const visibleArea = Math.max(0, right - left) * Math.max(0, bottom - top);
  const totalArea = box.width * box.height;
  expect(totalArea).toBeGreaterThan(0);
  expect(visibleArea / totalArea).toBeGreaterThanOrEqual(minVisibleRatio);
}

export async function expectClearOfBottomDock(page: Page, locator: Locator, marginPx = 4) {
  await expect(locator).toBeVisible();
  const targetBox = await locator.boundingBox();
  const dockBox = await page.locator(".bottom-tabs").boundingBox();
  expect(targetBox).not.toBeNull();
  expect(dockBox).not.toBeNull();
  if (!targetBox || !dockBox) return;

  expect(targetBox.y + targetBox.height).toBeLessThanOrEqual(dockBox.y - marginPx);
}

export async function expectModalActionUsable(page: Page, dialogName: string, actionName: string | RegExp) {
  const dialog = page.getByRole("dialog", { name: dialogName });
  await expect(dialog).toBeVisible();
  await expectVisibleWithinViewport(dialog, 0.96);
  const action = dialog.getByRole("button", { name: actionName });
  await expectVisibleWithinViewport(action);
  await expect(action).toBeEnabled();
}
