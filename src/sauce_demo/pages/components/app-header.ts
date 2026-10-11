import {Page, Locator} from '@playwright/test';

export class AppHeader{

    readonly page: Page;
    readonly menuButton: Locator;
    readonly inventoryLink: Locator;
    readonly aboutLink: Locator;
    readonly resetLink: Locator;
    readonly logoutLink: Locator;

    readonly closeMenuButton: Locator;

    readonly cartLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.inventoryLink = page.locator('[data-test="inventory-sidebar-link"]');
        this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
        this.resetLink = page.locator('[data-test="reset-sidebar-link"]');
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');

        this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
    }

    async openMenu(): Promise<void> {
        await this.menuButton.click();
    }

    async goToInventory(): Promise<void> {
        await this.openMenu();
        await this.inventoryLink.click();
    }

    async goToAbout(): Promise<void> {
        await this.openMenu();
        await this.aboutLink.click();
    }

    async resetAppState(): Promise<void> {
        await this.openMenu();
        await this.resetLink.click();
    }

    async logout(): Promise<void> {
        await this.openMenu();
        await this.logoutLink.click();
    }

    async closeMenu(): Promise<void> {
        await this.closeMenuButton.click();
    }

    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }


}