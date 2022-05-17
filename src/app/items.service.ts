import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ItemsService {
  cartItems = [];
  totalAmount = 0;
  priceFilterItems = [
    {
      value: "High to Low",
      code: "HTL"
    },
    {
      value: "Low to High",
      code: "LTH"
    },
    {
      value: "less than $5",
      minValue: 5,
      code: "LT"
    },
    {
      value: "$5 - $10",
      minValue: 5,
      maxValue: 10,
      code: "LT"
    },
    {
      value: "$10 - $15",
      minValue: 10,
      maxValue: 15,
      code: "LT"
    },
    {
      value: "$15 - $20",
      minValue: 15,
      maxValue: 20,
      code: "LT"
    },
    {
      value: "over $20",
      code: "GT",
      maxValue: 20
    }
  ];
  priceFilterValue;
  @Output() emitPriceFilter = new EventEmitter();
  onEmitPriceFilter(value) {
    this.emitPriceFilter.emit(value);
  }
}
