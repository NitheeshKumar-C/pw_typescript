import { test as base } from "@playwright/test";
import { LoginPage } from "../src/sauce_demo/pages/login/login.page";

type Fixtures = {
	loggedIn: LoginPage;
};

export const test = base.extend<Fixtures>({
	loggedIn: async ({ page }, use) => {
		const loginPage = new LoginPage(page);

		await page.goto("/");
		await loginPage.login("standard_user", "secret_sauce");
    await use(loginPage);
	},
});

export { expect } from "@playwright/test";
