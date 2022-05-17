import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app.routing.module";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { CategoryComponent } from "./category.component";
import { ItemComponent } from "./item.component";
import { CartComponent } from "./cart.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModalBackdrop } from "@ng-bootstrap/ng-bootstrap/modal/modal-backdrop";
import { InvoiceComponent } from "./invoice.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ItemComponent,
    CartComponent,
    InvoiceComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: "toast-top-center"
    }),
    BrowserAnimationsModule
  ],
  providers: [NgbModalBackdrop],
  bootstrap: [AppComponent]
})
export class AppModule {}
