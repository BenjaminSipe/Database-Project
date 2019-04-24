import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {
  productTotal;
  cartTotal;
  selectedProducts;
  constructor() {
    this.selectedProducts = localStorage.getItem('selectedProducts') ? JSON.parse(localStorage.getItem('selectedProducts')) : [];}

  ngOnInit() {
    const productTotal: number = localStorage.getItem('productTotal')
    ? parseFloat(localStorage.getItem('productTotal')) : 0;
    this.productTotal = productTotal;

    const cartTotal: number = localStorage.getItem('selectedProducts')
    ? parseFloat(localStorage.getItem('selectedProductsCount')) : 0;
    this.cartTotal = cartTotal;
  }

}
