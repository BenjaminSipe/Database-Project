import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { POSTService } from './post.service';
import { GETService } from './get.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart : {DateCreated:string}[];
  currentdate = new Date();
  date = {Datetime: ''};
  constructor(private http: HttpClient, private postService:POSTService, private getService : GETService) {
   }

   private getCart(cartId){
    this.getService.getCart(cartId).subscribe(cart => this.cart = Object.values(cart));
    console.log("From cart[0]"+this.cart);
    return this.cart;
   }
   public getOrCreateCart(){
    let datetime =    this.currentdate.getFullYear() + "-"
    + (this.currentdate.getMonth()+1) + "-"
    + this.currentdate.getDate() +  " "
    + this.currentdate.getHours() + ":"
    + this.currentdate.getMinutes() + ":"
    + this.currentdate.getSeconds();
    this.date.Datetime = datetime;
    console.log("This date: " + this.date);
    let cartId = localStorage.getItem('cartId');
    console.log(cartId);
    if(!cartId){
      this.postService.createCart(this.date).subscribe((response)=>{
      localStorage.setItem('cartId', response[0].CartId);
    });
    } else {
      return this.getCart(cartId);
    }
   }

}
