import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ItemsService } from "./items.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private route: Router, private itemsService: ItemsService) {}
  /**
   * By using "selectedCategoryIndex" we are highlighting the selected category.
   */
  selectedCategoryIndex;
  /**
   * By using itemsData.priceFilterValue we are displaying the default value as "Select" in the price dropdown.
   */
  itemsData: any = {
    priceFilterValue: "NA"
  };
  /*
    These are the categories will display in the header
  */
  categories = [
    {
      code: "HOME",
      name: "Home"
    },
    {
      code: "MEN",
      name: "Men"
    },
    {
      code: "WOMEN",
      name: "Women"
    },
    {
      code: "CHILDREN",
      name: "Children"
    },
    {
      code: "SPORTS",
      name: "Sports"
    }
  ];
  showMsg = false;
  /*
    1. This Method will call when selecting each category.
    2. Need to pass category code (WOMEN, MEN...) and categoryIndex as a params.
    3. using categoryIndex need to highight the selected category
    4. When clicking each category, it will go to the category component
  */
  selectCategory(categoryCode, categoryIndex) {
    this.selectedCategoryIndex = categoryIndex;
    this.route.navigate(["/categories/" + categoryCode.toLowerCase()]);
  }

  /*
     This method will call when clicking the cart icon.
     When clicking the cart icon, it will navigate to the cart component.
  */
  navigateToCart() {
    this.route.navigate(["/cart"]);
  }

  /**
   * This method will call when selecting the price filter value in the price dropdown.
   * We are rendering the items in the category component and having price dropdown in the app component.
   * So we need to emit the price filter value from app component and based on that value need to sort the items in the category component.
   * We need to maintain the selected price filter value in itemsService.
   */
  sortingitemsByPriceFilter() {
    this.itemsService.priceFilterValue = this.itemsData.priceFilterValue;
    this.itemsService.onEmitPriceFilter(this.itemsData.priceFilterValue);
  }
}
