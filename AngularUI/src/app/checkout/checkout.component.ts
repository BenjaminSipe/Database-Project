import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../user';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {
  user = new User();
  productTotal;
  cartTotal;
  discount: boolean;
  selectedProducts;
  constructor(userservice: UserService, router:Router) {
    this.user = userservice.user;
    console.log(this.user);
    this.selectedProducts = localStorage.getItem('selectedProducts') ? JSON.parse(localStorage.getItem('selectedProducts')) : [];
    if (userservice.user.userID == undefined) {
      router.navigate(["/login"]);
    }
    let str = this.user.name;
    console.log(str.split(" "));
    }

  ngOnInit() {
    const productTotal: number = localStorage.getItem('productTotal')
    ? parseFloat(localStorage.getItem('productTotal')) : 0;
    this.productTotal = productTotal;
    this.discount = (this.productTotal > 70) ? true : false;
    this.productTotal = (this.productTotal > 70) ? (this.productTotal - (this.productTotal*0.1)) : this.productTotal;
    const cartTotal: number = localStorage.getItem('selectedProducts')
    ? parseFloat(localStorage.getItem('selectedProductsCount')) : 0;
    this.cartTotal = cartTotal;
  }

  getDiscount(){
    console.log(this.discount);
    return this.discount;
  }
  getProductTotal(){

    return this.productTotal = this.discount ? (this.productTotal - (this.productTotal*0.1)) : this.productTotal;
  }

}
