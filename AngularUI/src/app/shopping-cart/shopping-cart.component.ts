import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

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

    ////console.log(this.selectedProducts);
   }

  ngOnInit() {
    const productTotal: number = localStorage.getItem('productTotal') ? parseFloat(localStorage.getItem('productTotal')) : 0;
    this.productTotal = productTotal;
    ////console.log('product total:'+ this.productTotal);
  }

  removeItem(item){
    
    this.cart.removeItemFromCart(item);
    //console.log('removed...');
    
    this.selectedProducts = localStorage.getItem('selectedProducts') ?
    JSON.parse(localStorage.getItem('selectedProducts')) : [];
    
  }

  decreaseItem(item){
    //let answer;
    this.cart.ChangeCount(item, false);
    const productTotal: number = localStorage.getItem('productTotal') ? parseFloat(localStorage.getItem('productTotal')) : 0;
    this.productTotal = productTotal;
    this.selectedProducts = localStorage.getItem('selectedProducts') ?
    JSON.parse(localStorage.getItem('selectedProducts')) : [];
    
    //location.reload();
    //Example 2

  }

  increaseItem(item){
    //console.log(item.BookID);
    //let answer;
    let itemProductCount = 0;
    ////console.log('quantity1: ' + this.item.quantity);
    let selectedProducts = localStorage.getItem('selectedProducts') ?
    JSON.parse(localStorage.getItem('selectedProducts')) : [];
    selectedProducts.map(items => {
    //console.log("items.BookID = " + items.BookID);
    if (items.BookID === item.BookID) {
       itemProductCount = items.productCount;
       itemProductCount +=1;
       //console.log('Product count test: ' + itemProductCount);
    }
    });
    if(itemProductCount > item.quantity){
     this.outOfStock = true;
  } else {
    this.cart.ChangeCount(item, true);
    const productTotal: number = localStorage.getItem('productTotal') ? parseFloat(localStorage.getItem('productTotal')) : 0;
    this.productTotal = productTotal;
    this.selectedProducts = localStorage.getItem('selectedProducts') ?
    JSON.parse(localStorage.getItem('selectedProducts')) : [];
    
     }
  }

  clearCart() {
    if(confirm("Are you sure you want to clear your cart?")){
    
    
    this.selectedProducts = [];
    this.cart.ClearCart();
    this.productTotal = 0;
      
    }
  }

  getProductCount(item){
      return item.productCount;
  }

}
