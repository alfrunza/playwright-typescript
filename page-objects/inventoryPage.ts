import { Locator, Page } from "@playwright/test";
import { SortOption } from "../utils/enums";

class InventoryPage {
  private readonly page: Page;
  private readonly inventoryContainer: Locator;
  private readonly inventoryItem: Locator;
  private readonly inventoryItemName: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly menuButton: Locator;
  private readonly menuContainer: Locator;
  private readonly inventoryMenuButton: Locator;
  private readonly aboutMenuButton: Locator;
  private readonly logoutLink: Locator;
  private readonly resetAppStateMenuButton: Locator;
  private readonly closeMenuButton: Locator;
  private readonly sortSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.getByTestId("inventory-container");
    this.inventoryItem = page.getByTestId("inventory-item");
    this.inventoryItemName = page.getByTestId("inventory-item-name");
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
    this.menuButton = page.locator("//*[@id='react-burger-menu-btn']");
    this.menuContainer = page.locator("//div[@class='bm-menu-wrap']");
    this.inventoryMenuButton = page.getByTestId("inventory-sidebar-link");
    this.aboutMenuButton = page.getByTestId("about-sidebar-link");
    this.logoutLink = page.getByTestId("logout-sidebar-link");
    this.resetAppStateMenuButton = page.getByTestId("reset-sidebar-link");
    this.closeMenuButton = page.locator("//*[@id='react-burger-cross-btn']");
    this.sortSelect = page.getByTestId("product-sort-container");
  }

  async getInventoryItemList(): Promise<Locator[]> {
    return await this.inventoryItem.all();
  }

  async getInventoryItemNames(): Promise<string[]> {
    return await this.inventoryItemName.allTextContents();
  }

  async isInventoryContainerVisible() {
    return this.inventoryContainer.isVisible();
  }

  async clickShoppingCart() {
    await this.shoppingCartLink.click();
  }

  async openMenu() {
    await this.menuButton.click();
    await this.menuContainer.waitFor({ state: "visible" });
  }

  async closeMenu() {
    await this.closeMenuButton.click();
    await this.menuContainer.waitFor({ state: "hidden" });
  }

  async goToInventory() {
    await this.menuButton.click();
    await this.inventoryMenuButton.click();
  }

  async goToAbout() {
    await this.menuButton.click();
    await this.aboutMenuButton.click();
  }

  async resetAppState() {
    await this.menuButton.click();
    await this.resetAppStateMenuButton.click();
  }

  async isMenuOpen() {
    return await this.menuContainer.isVisible();
  }

  async selectSortOption(option: SortOption) {
    await this.sortSelect.selectOption(option);
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

export default InventoryPage;
