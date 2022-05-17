import { Component, OnInit } from "@angular/core";
import { ItemsService } from "./items.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Component({
  selector: "cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  // By using this "header", we are displaying the headers in table.
  headers = ["Item Name", "Category", "Unit Price", "Price"];
  closeModal: string;
  constructor(
    private modalService: NgbModal,
    private itemsService: ItemsService,
    private router: Router
  ) {}
  totalAmount = 0; // used to display the total amount.
  /*
     1. In the ngOnInit, we need to calculate the total amount.
     2. We need to iterate the itemsService.cartItems and calculate the total amount.
  */
  ngOnInit() {
    this.itemsService.totalAmount = 0;
    for (
      let itemIndex = 0;
      itemIndex < this.itemsService.cartItems.length;
      itemIndex++
    ) {
      const item = this.itemsService.cartItems[itemIndex];
      this.itemsService.totalAmount =
        this.itemsService.totalAmount + item.price;
    }
  }

  /**
   * This method will call when clicking the checkout button.
   * Used to display the modal.
   * @param content
   */
  openModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then((res) => {
        this.closeModal = `Closed with: ${res}`;
      });
  }

  /**
   * This Method will call when clicking the proceed button in the modal popup.
   * It will navigate to the invoice component.
   */
  getInvoice() {
    this.router.navigate(["invoice"]);
  }
}
