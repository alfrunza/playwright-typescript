import { test, expect } from "@playwright/test";
import InventoryPage from "../page-objects/inventoryPage";

test.describe("Inventory Page", () => {
  test.beforeEach(async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await page.goto("/inventory.html");
    await expect(
      inventoryPage.isInventoryContainerVisible()
    ).resolves.toBeTruthy();
  });

  test("Verify inventory items are displayed", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const items = await inventoryPage.getInventoryItemList();
    expect(items.length).toBe(6);
  });

  test("Navigate to shopping cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.clickShoppingCart();
    await expect(page).toHaveURL(/.*cart.html/);
  });

  test("Open and close menu", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.openMenu();
    await expect(inventoryPage.isMenuOpen()).resolves.toBeTruthy();
    await inventoryPage.closeMenu();
    await expect(inventoryPage.isMenuOpen()).resolves.toBeFalsy();
  });

  test("Navigate to About page via menu", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goToAbout();
    await expect(page).toHaveURL(/.*saucelabs.com/);
  });

  //   test("Sort products", async ({ page }) => {
  //     const inventoryPage = new InventoryPage(page);
  //     await inventoryPage.sortSelect.selectOption("za");
  //     // Verify sorting by checking the first item's name
  //     const items = await inventoryPage.getInventoryItemList();
  //     const firstItemName = await items[0].getByTestId("item-name").innerText();
  //   });

  //   test("Reset app state via menu", async ({ page }) => {
  //     const inventoryPage = new InventoryPage(page);
  //     // Add an item to the cart first
  //     const items = await inventoryPage.getInventoryItemList();
  //     if (items.length > 0) {
  //       await items[0].getByRole("button", { name: "Add to cart" }).click();
  //       await expect(inventoryPage.shoppingCartLink).toHaveText("1");
  //       // Now reset app state
  //       await inventoryPage.resetAppState();
  //       await expect(inventoryPage.shoppingCartLink).toHaveText("");
  //     }
  //   });

  test("Logout via menu", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.logout();
    await expect(page).toHaveURL("/");
  });
});
