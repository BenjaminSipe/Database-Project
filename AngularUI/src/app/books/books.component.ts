import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent{
  constructor() { }

  addToCart(){
    let cartId = localStorage.getItem('cartId');
    console.log('This cart id = '+cartId); //test
    //make if sttmt
    //if cart not exists - create
    //then add to cart

    //if exists
    //add to cart
  }
}
