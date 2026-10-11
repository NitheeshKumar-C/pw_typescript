import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
	page: Page;
	checkout: Locator;
	continueShopping: Locator;
	backToProduct: Locator;
	cartItems: Locator;
	cartItemNames: Locator;
	cartItemPrices: Locator;

	constructor(page: Page) {
		this.page = page;

		this.checkout = page.locator('[data-test="checkout"]');
		this.continueShopping = page.locator('[data-test="continue-shopping"]');
		this.backToProduct = page.locator('[data-test="back-to-products"]');

		this.cartItems = page.locator('[data-test="inventory-item"]');
		this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
		this.cartItemPrices = page.locator('[data-test="inventory-item-price"]');
	}

	// Navigation
	async clickContinueShopping() {
		await this.continueShopping.click();
	}

	async clickBackToProduct() {
		await this.backToProduct.click();
	}

	async clickCheckOut() {
		await this.checkout.click();
	}

	// Cart item functions
	async getCartItemCount(): Promise<number> {
		return await this.cartItems.count();
	}

	async getCartItemNames(): Promise<string[]> {
		return await this.cartItemNames.allTextContents();
	}

	async getCartItemPrices(): Promise<string[]> {
		return await this.cartItemPrices.allTextContents();
	}

	async getCartItemPrice(itemName: string): Promise<string> {
		const item = this.cartItems.filter({
			hasText: itemName,
		});

		return (
			(await item
				.locator('[data-test="inventory-item-price"]')
				.textContent()) ?? ""
		);
	}

	async getItemQuantity(itemName: string): Promise<number> {
		const item = this.cartItems.filter({
			hasText: itemName,
		});

		const quantity = await item
			.locator('[data-test="item-quantity"]')
			.textContent();

		return Number(quantity);
	}

	async isItemInCart(itemName: string): Promise<boolean> {
		const item = this.cartItems.filter({
			hasText: itemName,
		});

		return (await item.count()) > 0;
	}

	async removeItem(itemName: string) {
		const item = this.cartItems.filter({
			hasText: itemName,
		});

		await item.locator("button", { hasText: "Remove" }).click();
	}
}
