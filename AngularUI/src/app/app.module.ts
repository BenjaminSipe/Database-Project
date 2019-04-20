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
import { PostsComponent } from './posts/posts.component';

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
<<<<<<< HEAD
import { DetailsComponent } from './details/details.component';
import { ModalContainerComponent } from './modal-container/modal-container.component';
=======
import { EdituserComponent } from './edituser/edituser.component';
>>>>>>> 6e6458b18843e2feaf9fa081ca69eec41bddcfe6
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
    PostsComponent,
    AdminBooksComponent,
    SearchComponent,
    AdminCategoriesComponent,
    AdminOrdersComponent,
    CreditCardComponent,
    UserProfileComponent,
    AdminNewBookComponent,
    BookCardComponent,
<<<<<<< HEAD
    DetailsComponent,
    ModalContainerComponent,
=======
    EdituserComponent,
>>>>>>> 6e6458b18843e2feaf9fa081ca69eec41bddcfe6


  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  entryComponents: [
    AdminCategoriesComponent
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
