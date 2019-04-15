import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book';
import { GETService } from '../services/get.service';
import { POSTService } from '../services/post.service';

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.sass']
})
export class BookCardComponent {
  @Input('book') book : Book;
  constructor(private getService : GETService, private postService:POSTService) { }
  addToCart(book : Book){
    //console.log("Date: "+Date());
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      this.postService.createCart();
    }
  }
}
