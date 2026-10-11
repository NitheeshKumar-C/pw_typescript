import { Page, Locator } from "@playwright/test";

export class LoginPage {
	readonly page: Page;
	readonly username: Locator;
	readonly password: Locator;
	readonly loginBtn: Locator;
	readonly error: Locator;

	constructor(page: Page) {
		this.page = page;

		this.username = page.locator('[data-test="username"]');
		this.password = page.locator('[data-test="password"]');
		this.loginBtn = page.locator('[data-test="login-button"]');
		this.error = page.locator('[data-test="error"]');
	}

	async login(username: string, password: string) {
		await this.username.fill(username);
		await this.password.fill(password);
		await this.loginBtn.click();
	}
}
