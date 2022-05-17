import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryComponent } from "./category.component";
import { ItemComponent } from "./item.component";
import { CartComponent } from "./cart.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InvoiceComponent } from "./invoice.component";

const routes: Routes = [
  { path: "categories/:type", component: CategoryComponent },
  { path: "categories/:type/:id", component: ItemComponent },
  { path: "cart", component: CartComponent },
  { path: "invoice", component: InvoiceComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: CategoryComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule {}
