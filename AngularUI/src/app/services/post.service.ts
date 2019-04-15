import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class POSTService {
  private urlBase = 'http://localhost:3000/';
  constructor(private http:HttpClient) { }

  createBook(book){
   return this.http.post(this.urlBase + 'createBook', book);
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
   createCart(){
    return this.http.post(this.urlBase + 'createCart', Date());
   }
}
