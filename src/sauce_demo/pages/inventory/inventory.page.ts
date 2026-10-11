import { Page, Locator } from "@playwright/test";
import { AppHeader } from "../components/app-header";

export class InventoryPage{
	readonly page: Page;
	readonly header: AppHeader;

	constructor(page: Page) {
		this.page=page;
		this.header = new AppHeader(page);
	}

	private product(productName: string): Locator {
		return this.page.locator('[data-test="inventory-item"]').filter({
			has: this.page
				.locator('[data-test="inventory-item-name"]')
				.filter({ hasText: productName }),
		});
	}

	async openProduct(productName: string) {
		await this.product(productName)
			.locator('[data-test="inventory-item-name"]')
			.click();
	}

	async addProduct(productName: string) {
		await this.product(productName)
			.getByRole("button", { name: "Add to cart" })
			.click();
	}

	async removeProduct(productName: string) {
		await this.product(productName)
			.getByRole("button", { name: "Remove" })
			.click();
	}
}
