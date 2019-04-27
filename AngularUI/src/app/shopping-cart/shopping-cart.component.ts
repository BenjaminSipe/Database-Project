import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {
  selectedProducts;
  subTotal;
  productTotal;
  productCount;
  outOfStock;
  constructor(private cart : ShoppingCartService) {
    this.selectedProducts = localStorage.getItem('selectedProducts') ?
    JSON.parse(localStorage.getItem('selectedProducts')) : [];

    //console.log(this.selectedProducts);
   }

  ngOnInit() {
    const productTotal: number = localStorage.getItem('productTotal') ? parseFloat(localStorage.getItem('productTotal')) : 0;
    this.productTotal = productTotal;
    //console.log('product total:'+ this.productTotal);
  }

  removeItem(item){
    this.cart.removeItemFromCart(item);
    console.log('removed...');
    location.reload();
  }

  decreaseItem(item){
    //let answer;
    this.cart.ChangeCount(item, false);
    const productTotal: number = localStorage.getItem('productTotal') ? parseFloat(localStorage.getItem('productTotal')) : 0;
    this.productTotal = productTotal;
    location.reload();

  }

  increaseItem(item){
    console.log(item.BookID);
    //let answer;
    let itemProductCount = 0;
    //console.log('quantity1: ' + this.item.quantity);
    let selectedProducts = localStorage.getItem('selectedProducts') ?
    JSON.parse(localStorage.getItem('selectedProducts')) : [];
    selectedProducts.map(items => {
    console.log("items.BookID = " + items.BookID);
    if (items.BookID === item.BookID) {
       itemProductCount = items.productCount;
       itemProductCount +=1;
       console.log('Product count test: ' + itemProductCount);
    }
    });
    if(itemProductCount > item.quantity){
     this.outOfStock = true;
  } else {
    this.cart.ChangeCount(item, true);
    const productTotal: number = localStorage.getItem('productTotal') ? parseFloat(localStorage.getItem('productTotal')) : 0;
    this.productTotal = productTotal;
    location.reload();
  }
  }

  clearCart() {
    if(confirm("Are you sure you want to clear your cart?")){
    location.reload();
    return this.cart.ClearCart();
    }
  }

  getProductCount(item){
      return item.productCount;
  }

}
