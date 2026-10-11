import {Page, Locator} from '@playwright/test';
import { AppHeader } from '../components/app-header';

export class InventoryItemPage{
    readonly page: Page;
    readonly addToCartBtn: Locator;
    readonly removeProductBtn: Locator;
    readonly backToProductBtn: Locator;
    readonly header: AppHeader;


    constructor(page:Page){
        this.page = page;
        this.addToCartBtn =  page.locator('[data-test="add-to-cart"]');
        this.removeProductBtn = page.locator('[data-test="remove"]');
        this.backToProductBtn = page.locator('[data-test="back-to-products"]');
        this.header = new AppHeader(page);
    }

    async addToCart():Promise<void>{
        await this.addToCartBtn.click();
    }

    async removeProduct(): Promise<void>{
        await this.removeProductBtn.click();
    }

    async backToProduct(): Promise<void>{
        await this.backToProductBtn.click();
    }




}