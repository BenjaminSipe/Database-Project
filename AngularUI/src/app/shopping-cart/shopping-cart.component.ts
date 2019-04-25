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
  constructor(private cart : ShoppingCartService) {
    this.selectedProducts = localStorage.getItem('selectedProducts') ? JSON.parse(localStorage.getItem('selectedProducts')) : [];
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

}
