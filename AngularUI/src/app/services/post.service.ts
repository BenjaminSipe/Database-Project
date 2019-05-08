import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Creditcard } from '../creditcard';

@Injectable({
  providedIn: 'root'
})
export class POSTService {
  private urlBase = 'http://localhost:3000/';
  constructor(private http:HttpClient) { }

  sendEmail(email) {
    console.log(email)
    return this.http.post('http://localhost:3000/sendMail', email);
  }

  createBook(book){
   return this.http.post(this.urlBase + 'createBook', book);
  }
  deleteBook(book){
    return this.http.post(this.urlBase + 'deleteBook', book);
   }

  createBookCategory(bc){
    return this.http.post(this.urlBase + 'createBookCategory', bc);
  }

  createBookAuthor(ac){
    return this.http.post(this.urlBase + 'createAuthorBook', ac);
  }

  createBookFormat(fc){
    return this.http.post(this.urlBase + 'createBookFormat', fc);
  }

  createCategory(category){
    return this.http.post(this.urlBase + 'createCategory', category);
   }

   createFormat(format){
    return this.http.post(this.urlBase + 'createFormat', format);
   }

   createPublisher(publisher){
    return this.http.post(this.urlBase + 'createPublisher', publisher);
   }
   createAuthor(author){
    return this.http.post(this.urlBase + 'createAuthor', author);
   }
  //  createCart(datetime){
  //    console.log("From service " + Object.values(datetime));
  //    return this.http.post(this.urlBase + 'createCart', datetime);
  //  }
   createCreditCard(creditCard: Creditcard){
    return this.http.post(this.urlBase + 'createCreditCard', creditCard).subscribe((obj) => {
      
    });
  }

  deleteCreditCard(creditCard: Creditcard){
    return this.http.delete(this.urlBase + 'deleteCreditCard/'+ creditCard.CreditCardID).subscribe((obj) => {
      console.log(obj);
    });
  }

  createInvoice(invoice){
    return this.http.post(this.urlBase + 'CreatePurchase', invoice).subscribe((obj) => {
      
    });
  }
}
