import { MonetizationConfig } from "../config/MonetizationConfig";

export type IAPProduct = (typeof MonetizationConfig.products)[number];
export type IAPPurchaseResult =
  | { status: "success"; productId: string }
  | { status: "failed"; productId: string; error: string };

export interface IAPProvider {
  getProducts(): Promise<readonly IAPProduct[]>;
  purchase(productId: string): Promise<IAPPurchaseResult>;
  restorePurchases(): Promise<IAPPurchaseResult[]>;
}

export class MockIAPProvider implements IAPProvider {
  constructor(private readonly allowSuccess = true) {}

  async getProducts() {
    return MonetizationConfig.products;
  }

  async purchase(productId: string): Promise<IAPPurchaseResult> {
    console.info("[iap:mock] purchase", productId);
    if (!this.allowSuccess) {
      return { status: "failed", productId, error: "mock purchase disabled" };
    }
    return { status: "success", productId };
  }

  async restorePurchases() {
    console.info("[iap:mock] restore");
    return [];
  }
}

export const IAPManager = {
  getProducts(provider: IAPProvider = new MockIAPProvider()) {
    return provider.getProducts();
  },

  purchase(productId: string, provider: IAPProvider = new MockIAPProvider()) {
    return provider.purchase(productId);
  },
};
