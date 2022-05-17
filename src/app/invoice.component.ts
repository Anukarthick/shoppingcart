import { Component } from "@angular/core";
import { ItemsService } from "./items.service";

@Component({
  selector: "invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.css"]
})
export class InvoiceComponent {
  // This "invoiceNumber" used to display the invoice number in the UI.
  invoiceNumber = Math.floor(Math.random() * 90000) + 10000;
  // This "invoiceDate" used to display the current date in the UI.
  invoiceDate = new Date();
  cartItems = Object.assign([], this.itemsService.cartItems);
  // This "headers" used to display the item table headers.
  headers = ["Item Name", "Category", "Unit Price", "Price"];
  constructor(private itemsService: ItemsService) {
    this.itemsService.cartItems = [];
  }
}
