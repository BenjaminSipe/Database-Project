import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewaccountComponent } from './newaccount/newaccount.component';
import { BooksComponent } from './books/books.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoriesComponent } from './categories/categories.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EdituserComponent } from './edituser/edituser.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminNewBookComponent } from './admin-new-book/admin-new-book.component';
import { PostsComponent } from './posts/posts.component';
import { FormsModule, NgForm } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { ModalContainerComponent } from './modal-container/modal-container.component';
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'newaccount', component: NewaccountComponent},
  { path: 'books', component: BooksComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'userprofile', component: UserProfileComponent},
  { path: 'myorders', component: MyOrdersComponent},
  { path: 'admin/books/new', component: AdminNewBookComponent},
  { path: 'admin/books/:id', component: ModalContainerComponent},
  { path: 'admin/books', component: AdminBooksComponent},
  { path: 'posts', component: PostsComponent},
  { path: 'edituser', component: EdituserComponent},
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes),
  FormsModule
  ],
  exports: [RouterModule,
    NgForm]



})
export class AppRoutingModule { }
