import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, count } from 'rxjs/operators';
import { POSTService } from './post.service';
import { GETService } from './get.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  selectedProducts: any[] = [];
  cartTotal = 0;
  productTotal = 0;
  cart;
  currentdate = new Date();
  date = {Datetime: ''};
  constructor(private http: HttpClient, private postService:POSTService, private getService : GETService) {
   }

  //  private getCart(cartId){
  //   this.getService.getCart(cartId).subscribe(cart => {this.cart = cart[0].CartId;
  //   //console.log(cart[0].CartId)});
  //   //console.log("From cart[0]"+this.cart);
  //   return this.cart;
  //  }
  //  public getOrCreateCart(){
  //   let datetime =    this.currentdate.getFullYear() + "-"
  //   + (this.currentdate.getMonth()+1) + "-"
  //   + this.currentdate.getDate() +  " "
  //   + this.currentdate.getHours() + ":"
  //   + this.currentdate.getMinutes() + ":"
  //   + this.currentdate.getSeconds();
  //   this.date.Datetime = datetime;
  //   let cartId = localStorage.getItem('cartId');
  //   //console.log(cartId);
  //   if(!cartId){
  //     //console.log("in if..");
  //     this.postService.createCart(this.date).subscribe((response)=>{
  //     localStorage.setItem('cartId', response[0].CartId);
  //     cartId = response[0].CartId;
  //     return cartId;
  //   });
  // }
  //     //console.log("almost there...");
  //     //console.log(this.getLocalStorageData());

  //     return cartId;
  // }

  //  async addToCart(){

  //   let CartId = this.getOrCreateCart();
  //  }
   addItemsToCart(item) {
    let exists = false;
    this.getLocalStorageData();
    this.selectedProducts = this.selectedProducts.map(items => {
        ////console.log("item.BookID = " + item.BookID);
        if (items.BookID === item.BookID) {
            exists = true;
            ////console.log("items.productCount = " + items.productCount);
            if (item.productCount) {
                items.productCount += item.productCount;
                this.cartTotal += item.productCount;
            } else {
                items.productCount += 1;
                this.cartTotal += 1;
            }
        }
        return items;
    });
    if (!exists) {
        ////console.log('should be here adding...' + item);;
        this.selectedProducts.push(item);
        ////console.log("should be here...");
        if (!item.productCount) {
            item.productCount = 1;
        }
        this.cartTotal += item.productCount;
        ////console.log("this.cartTotal should be 1 = "+ this.cartTotal);
    }
    this.productTotal = 0;
    this.selectedProducts.forEach(_price => {
        const tempPrice = Number(_price.price * _price.productCount);
        this.productTotal += tempPrice;
        ////console.log('total price = ' + this.productTotal);
    });
    const cartParams: any = {};
    cartParams.products = this.selectedProducts;
    cartParams.productTotal = this.cartTotal;
    cartParams.totalPrice = this.productTotal;
    this.HandleCart(cartParams);
    //console.log('Book '  + item.Title + ' is added to cart.');
    this.getLocalStorageData();
    ////console.log('Working? ' + localStorage.getItem('selectedProducts'));

}
removeItemFromCart(item) {
  this.getLocalStorageData();
  let deletedCount: any = 0;
  this.selectedProducts = this.selectedProducts.filter(items => {
      if (items.BookID === item.BookID) {
          deletedCount = items.productCount;
          return false;
      }
      return true;
  });
  this.cartTotal -= deletedCount;
  this.productTotal = 0;
  this.selectedProducts.forEach(_price => {
      const tempPrice = Number(_price.price);
      this.productTotal += (tempPrice * _price.productCount);
  });
  const cartParams: any = {};
  cartParams.products = this.selectedProducts;
  cartParams.productTotal = this.cartTotal;
  cartParams.totalPrice = this.productTotal;
  this.HandleCart(cartParams);
}
ChangeCount(item, operation) {
  //let itemCount: number;
  this.getLocalStorageData();
  if (operation) {
      this.selectedProducts = this.selectedProducts.map(items => {
          if (items.BookID === item.BookID) {
              items.productCount += 1;
              this.cartTotal += 1;
          }
          //console.log("in service items: " + items.productCount);
          //itemCount = items.productCount
          return items;
      });
  } else if (!operation) {
      if (item.productCount > 1) {
          this.selectedProducts = this.selectedProducts.map(items => {
              if (items.BookID === item.BookID) {
                  items.productCount -= 1;
                  this.cartTotal -= 1;
              }
              //itemCount = items.productCount;
              return items;
          });
      } else if (item.productCount === 1) {
          //console.log("should be here if 1.." + item.productCount);
          this.cartTotal -= 1;
          this.selectedProducts = this.selectedProducts.filter(items => {
              //console.log("items.count: " + items.productCount);
              if (items.BookID === item.BookID) {
                  return false;
              } else {
                  return true;
              }
          });
          //return false;
      }
  }

  this.productTotal = 0;
  this.selectedProducts.forEach(_price => {
      const tempPrice = Number(_price.price);
      this.productTotal += (tempPrice * _price.productCount);
  });
  const cartParams: any = {};
  cartParams.products = this.selectedProducts;
  cartParams.productTotal = this.cartTotal;
  cartParams.totalPrice = this.productTotal;
  this.HandleCart(cartParams);
  //return itemCount;
}

HandleCart(params){
  ////console.log("in Handle Cart...");
  localStorage.setItem('productTotal', JSON.stringify(params.totalPrice));
  localStorage.setItem('selectedProducts', JSON.stringify(params.products));
  localStorage.setItem('selectedProductsCount', JSON.stringify(params.productTotal));

}

public ClearCart() {
  const cartParams: any = {};
  cartParams.products = [];
  cartParams.productTotal = 0;
  cartParams.totalPrice = 0;
  this.HandleCart(cartParams);
}

public Checkout(){
//   Body :
// {
//   "CreditCardID":ccID,
//   "ShippingAddress":shippingAddress,
//   "Discount":percentage,
//   "Books": [
//     {
//       "BookID":bID,
//       "FormatID":formatID,
//       "Quantity":quantity
//     }, . . .
//   ]
// }

}
public getLocalStorageData() {
    this.selectedProducts = localStorage.getItem('selectedProducts') ? JSON.parse(localStorage.getItem('selectedProducts')) : [];
    const cartTotal: number = localStorage.getItem('selectedProducts')
    ? parseFloat(localStorage.getItem('selectedProductsCount')) : 0;
    this.cartTotal = cartTotal;
    ////console.log('Cart total in service = ' + this.cartTotal);
    const productTotal: number = localStorage.getItem('productTotal') ? parseFloat(localStorage.getItem('productTotal')) : 0;
    this.productTotal = productTotal;
}

}


