import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NewaccountComponent } from './newaccount/newaccount.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { BooksComponent } from './books/books.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CategoriesComponent } from './categories/categories.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartService } from './services/shopping-cart.service';
import { BooksService } from './services/books.service';
import { CategoryService } from './services/category.service';
import { CustomFormsModule } from 'ngx-custom-validators';

import { AdminBooksComponent } from './admin-books/admin-books.component';
import { SearchComponent } from './search/search.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminNewBookComponent } from './admin-new-book/admin-new-book.component';
import { GETService } from './services/get.service';
import { POSTService } from './services/post.service';
import { BookCardComponent } from './book-card/book-card.component';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { EdituserComponent } from './edituser/edituser.component';
import { CatalogModalContainerComponent } from './catalog-modal-container/catalog-modal-container.component';
import { BookViewComponent } from './book-view/book-view.component';
import { AdminEditBookComponent } from './admin-edit-book/admin-edit-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AdminOthersComponent } from './admin-others/admin-others.component';
import { DataTableModule } from 'angular7-data-table';
import { AuthorCardComponent } from './author-card/author-card.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { EditPublisherComponent } from './edit-publisher/edit-publisher.component';
import { EditFormatComponent } from './edit-format/edit-format.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminInvoiceComponent } from './admin-invoice/admin-invoice.component';
import { OrderComponent } from './order/order.component';
import { ContactComponent } from './contact/contact.component';
import { OrderErrorComponent } from './order-error/order-error.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewaccountComponent,
    NavComponent,
    HomeComponent,
    ShoppingCartComponent,
    BooksComponent,
    CheckoutComponent,
    MyOrdersComponent,
    CategoriesComponent,
    AdminBooksComponent,
    SearchComponent,
    AdminCategoriesComponent,
    AdminOrdersComponent,
    CreditCardComponent,
    UserProfileComponent,
    AdminNewBookComponent,
    BookCardComponent,
    ModalContainerComponent,
    EdituserComponent,
    CatalogModalContainerComponent,
    BookViewComponent,
    AdminEditBookComponent,
    EditBookComponent,
    AdminOthersComponent,
    AuthorCardComponent,
    EditAuthorComponent,
    EditPublisherComponent,
    EditFormatComponent,
    ConfirmationPageComponent,
    AdminUsersComponent,
    AdminInvoiceComponent,
    OrderComponent,
    ContactComponent,
    OrderErrorComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule.forRoot(),
    NgbModule.forRoot(),
  ],
  entryComponents: [
    AdminCategoriesComponent,
    BookViewComponent,
    OrderComponent
  ],
  providers: [
    CategoryService,
    BooksService,
    GETService,
    POSTService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
