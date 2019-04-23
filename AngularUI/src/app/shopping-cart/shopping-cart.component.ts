import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {

  constructor() {
    this.selectedProducts = localStorage.getItem('selectedProducts') ? JSON.parse(localStorage.getItem('selectedProducts')) : [];
    console.log(this.selectedProducts);
   }

  ngOnInit() {

  }

}
