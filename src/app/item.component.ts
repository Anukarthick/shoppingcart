import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ItemsService } from "./items.service";
import * as itemData from "./itemData.json";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"]
})
export class ItemComponent {
  // In the "selectedItem" only the selected item detail will save
  selectedItem: any = {};
  /*
    1. We are getting the category name and itemId from the route params.
    2. We are getting the items json from the itemData json file.
    3. To iterate the items and by using the category name and item id we need to get the corresponding item.
  */
  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private toastrService: ToastrService
  ) {
    this.route.params.subscribe((params) => {
      const categoryName = params.type.toUpperCase();
      this.selectedItem = {};
      for (let itemIndex = 0; itemIndex < itemData.items.length; itemIndex++) {
        const item = itemData.items[itemIndex];
        if (item.category === categoryName && item.id == params.id) {
          this.selectedItem = item;
          break;
        }
      }
    });
  }

  /**
   * This Method will call when clicking the addtocart button.
   * We are adding the items in the itemsService.cartItems varaible.
   * Because based on this value only we will display the cart items count.
   */
  additemToCart() {
    let isItemExist = false;
    for (
      let itemIndex = 0;
      itemIndex < this.itemsService.cartItems.length;
      itemIndex++
    ) {
      const item = this.itemsService.cartItems[itemIndex];
      if (item.id === this.selectedItem.id) {
        isItemExist = true;
      }
    }
    if (!isItemExist) {
      this.itemsService.cartItems.push(this.selectedItem);
    }
    this.toastrService.success("Product is added your cart successfully");
  }
}
