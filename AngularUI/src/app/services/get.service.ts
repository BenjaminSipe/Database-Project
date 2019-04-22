import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class GETService {
  private url = 'http://localhost:3000/';
  constructor(private http : HttpClient) { }

  getCategories(){
    return this.http.get(this.url + 'readCategories');
  }
  getPublishers(){
    return this.http.get(this.url + 'readPublishers');
  }
  getBooks(){
    return this.http.get(this.url + 'readBooks');
  }
  getBook(id){
    let book$;
    book$ = this.http.get(`http://localhost:3000/readBook/${id}`);
    console.log("getting book" + book$);
    return book$;
  }
  getAuthors(){
    return this.http.get(this.url + 'readAuthors');
  }
  getFormats(){
    return this.http.get(this.url + 'readFormats');
  }
  getFormat(id){
    return this.http.get(`http://localhost:3000/readFormat/${id}`);
  }
  getBookFormats(){
    return this.http.get(this.url + 'readBookFormats');
  }
  getBookFormat(id){
    return this.http.get(`http://localhost:3000/readBookFormat/${id}`);
  }
  getBookAuthor(id){
    return this.http.get(`http://localhost:3000/readBookAuthor/${id}`);
  }
  getBookCategory(id){
    return this.http.get(`http://localhost:3000/readBookCategory/${id}`);
  }
  getBooksByCategory(name){
    console.log("Getting books by category..")
    return this.http.get(`http://localhost:3000/readBooksByCategory/${name}`);
  }
  getCategory(id){
    return this.http.get(`http://localhost:3000/readCategory/${id}`);
  }
  getAuthor(id){
    return this.http.get(`http://localhost:3000/readAuthor/${id}`);
  }
  getPublisher(id){
    return this.http.get(`http://localhost:3000/readPublisher/${id}`);
  }
  getBookPublisher(id){
    return this.http.get(`http://localhost:3000/readBookPublisher/${id}`);
  }
  getCart(id) {
    let cart$;
    cart$ = this.http.get(`http://localhost:3000/ReadCart/${id}`);
    console.log(cart$);
    return cart$;
  }
}
