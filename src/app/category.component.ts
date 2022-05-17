import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ItemsService } from "./items.service";
import * as itemData from "./itemData.json";

@Component({
  selector: "category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent {
  /**
   * We are getting the category name from route params.
   * Based on that category name, the corresponding items will display
   */
  categoryName = "";
  categories = ["MEN", "WOMEN", "CHILDREN", "SPORTS"];
  /**
   * By using this variable, we are displaying the items in the UI
   */
  categoryItems = [];
  /**
   * This variable is used to maintain the original items
   */
  originalItems;
  /**
   * By using this "isFromHome" variable, we are displaying the home image icon.
   * If it not home page, we will display "No Items found" text.
   */
  isFromHome = false;
  // In the constructor we are getting the corresponding items using category name.
  constructor(
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.categoryName = params.type.toUpperCase();
      this.categoryItems = [];
      this.isFromHome = false;
      if (window.location.href.indexOf("home") > -1) {
        this.isFromHome = true;
      }
      this.originalItems = [];
      // We are getting the items json from itemData json file.
      for (let itemIndex = 0; itemIndex < itemData.items.length; itemIndex++) {
        const item = itemData.items[itemIndex];
        if (item.category === this.categoryName) {
          this.originalItems.push(item);
        }
      }
      this.categoryItems = Object.assign([], this.originalItems);
      if (this.categoryItems.length > 0 && this.itemsService.priceFilterValue) {
        this.getSortedItems(this.itemsService.priceFilterValue);
      }
    });
    // When selecting the price filter value, this subscribe will call to get corresponding items.
    this.itemsService.emitPriceFilter.subscribe((data: any) => {
      this.getSortedItems(data);
      if (window.location.href.indexOf("home") > -1) {
        this.isFromHome = true;
      }
    });
  }
  /**
   * This method will call when selecting each item in the list.
   * When clicking the each item, it will navigate to the item component to display the item.
   * @param selectedItem
   */
  selectItem(selectedItem) {
    this.router.navigate([
      "/categories/" +
        selectedItem.category.toLowerCase() +
        "/" +
        selectedItem.id
    ]);
  }

  /**
   * This Method is used to sort the items by using the price filter value.
   * @param priceFilter
   */
  getSortedItems(priceFilter) {
    if (priceFilter.code === "LTH") {
      this.categoryItems = this.originalItems.sort(
        (first, second) => 0 - (first.price > second.price ? -1 : 1)
      );
    } else if (priceFilter.code === "HTL") {
      this.categoryItems = this.originalItems.sort(
        (first, second) => 0 - (first.price > second.price ? 1 : -1)
      );
    } else if (priceFilter === "NA") {
      this.categoryItems = Object.assign([], this.originalItems);
    } else if (priceFilter.code === "LT") {
      const itemList = Object.assign([], this.originalItems);
      const orderedItems = [];
      for (let itemIndex = 0; itemIndex < itemList.length; itemIndex++) {
        const item = itemList[itemIndex];
        if (priceFilter.minValue && priceFilter.maxValue) {
          if (
            item.price >= priceFilter.minValue &&
            item.price <= priceFilter.maxValue
          ) {
            orderedItems.push(item);
          }
        } else if (priceFilter.minValue) {
          if (item.price < priceFilter.minValue) {
            orderedItems.push(item);
          }
        }
      }
      this.categoryItems = orderedItems;
    } else if (priceFilter.code === "GT") {
      const itemList = Object.assign([], this.originalItems);
      const orderedItems = [];
      for (let itemIndex = 0; itemIndex < itemList.length; itemIndex++) {
        const item = itemList[itemIndex];
        if (priceFilter.maxValue && item.price > priceFilter.maxValue) {
          orderedItems.push(item);
        }
      }
      this.categoryItems = orderedItems;
    }
  }
}
