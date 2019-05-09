import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appTitle = 'myapp';
  cartTotal;

  constructor(public userservice : UserService, private router: Router, private cart: ShoppingCartService) {
  }


  myProfile() {
    this.router.navigate(["/userprofile"]);
  }
  contact() {
    this.router.navigate(["/contact"]);
  }
  myOrders() {
    this.router.navigate(["/myorders"]);
  }

  adminOrders() {
    this.router.navigate(['/admin/invoice']);
  }

  adminBooks() {
    this.router.navigate(['/admin/books']);
  }

  adminBookInvoice() {
    this.router.navigate(['/admin/invoice']);
  }

  adminOther() {
    this.router.navigate(['/admin/other']);
  }
  adminUsers() {
    this.router.navigate(['/admin/users']);
  }
  login() {
    if (this.userservice.user.userID == undefined) {
      this.router.navigate(["/login"]);
    } else {
      this.cart.ClearCart();
      this.userservice.logout();
      this.router.navigate(["/"]);
    }
  }

  getCartItems(){
    const cartTotal: number = localStorage.getItem('selectedProducts')
    ? parseFloat(localStorage.getItem('selectedProductsCount')) : 0;
    this.cartTotal = cartTotal;
    return this.cartTotal;
  }
  ngOnInit() {
  }

}
