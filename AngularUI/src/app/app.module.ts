import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
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
import { ShoppingCartService } from './shopping-cart.service';
import { BooksService } from './books.service';
import { CategoryService } from './category.service';
import { PostsComponent } from './posts/posts.component';
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
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
  ],
  providers: [
    CategoryService,
    BooksService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
