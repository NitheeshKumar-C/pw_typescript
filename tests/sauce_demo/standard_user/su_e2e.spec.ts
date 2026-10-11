import { test, expect } from "../../../fixtures/saucedemo.fixture";
import { InventoryPage } from "../../../src/sauce_demo/pages/inventory/inventory.page";
import { CartPage } from "../../../src/sauce_demo/pages/cart/cart.page";
import { InventoryItemPage } from "../../../src/sauce_demo/pages/inventory/inventory-item.page";

test("Add product from inventory page", async ({ page, loggedIn }) => {
	const inventoryPage = new InventoryPage(page);
	const cartPage = new CartPage(page);
	await inventoryPage.addProduct("Sauce Labs Backpack");
	await inventoryPage.addProduct("Sauce Labs Bolt T-Shirt");
	await inventoryPage.header.goToCart();
	let products: string[] = await cartPage.getCartItemNames();
	expect(products).toEqual(["Sauce Labs Backpack", "Sauce Labs Bolt T-Shirt"]);
    await inventoryPage.header.logout();
    
});

test("Add product from inventory item page", async ({ page, loggedIn }) => {
	const inventoryPage = new InventoryPage(page);
    const inventoryItemPage = new InventoryItemPage(page);
	const cartPage = new CartPage(page);
	await inventoryPage.openProduct("Sauce Labs Backpack");
    await inventoryItemPage.addToCart();
    await inventoryItemPage.backToProduct();
	await inventoryPage.openProduct("Sauce Labs Bolt T-Shirt");
    await inventoryItemPage.addToCart();
    await inventoryItemPage.backToProduct();
    
	await inventoryPage.header.goToCart();
	let products: string[] = await cartPage.getCartItemNames();
	expect(products).toEqual(["Sauce Labs Backpack", "Sauce Labs Bolt T-Shirt"]);
    await inventoryPage.header.logout();
    
});
