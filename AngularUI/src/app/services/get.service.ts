import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Creditcard } from '../creditcard';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class GETService {
  private url = '/api/';
  constructor(private http : HttpClient) { }

  getCategories(){
    return this.http.get('/api/readCategories');
  }
  getPublishers(){
    return this.http.get(this.url + 'readPublishers');
  }
  getBooks(){
    return this.http.get('/api/readBooks');
  }
  getBook(id){
    let book$;
    book$ = this.http.get(`/api/readBook/${id}`);
    return book$;
  }
  getAuthors(){
    return this.http.get(this.url + 'readAuthors');
  }

  getUsers() {
    return this.http.get(this.url + 'ReadUsers');
  }

  getOrderByInvoiceID(id) {
    return this.http.get(this.url + 'ReadOrderByInvoiceID/' + id);
  }


  getOrdersByUser(id) {
    return this.http.get(this.url + 'ReadOrdersByUser/' + id);
  }
  getFormats(){
    return this.http.get(this.url + 'readFormats');
  }
  getFormat(id){
    return this.http.get(`${this.url}readFormat/${id}`);
  }
  getBookFormats(){
    return this.http.get(this.url + 'readBookFormats');
  }
  getBookFormat(id){
    return this.http.get(`/api/readBookFormat/${id}`);
  }
  getBookAuthor(id){
    return this.http.get(`/api/readBookAuthor/${id}`);
  }
  getBookCategory(id){
    return this.http.get(`/api/readBookCategory/${id}`);
  }
  getBooksByCategory(name){
    return this.http.get(`/api/readBooksByCategory/${name}`);
  }
  getCategory(id){
    return this.http.get(`/api/readCategory/${id}`);
  }
  getAuthor(id){
    return this.http.get(`/api/readAuthor/${id}`);
  }
  getPublisher(id){
    return this.http.get(`/api/readPublisher/${id}`);
  }
  getBookPublisher(id){
    return this.http.get(`/api/readBookPublisher/${id}`);
  }
  getCart(id) {
    return this.http.get(`/api/ReadCart/${id}`);
  }

  getCreditCardByUser(id){
    return this.http.get<Creditcard[]>(`/api/readCreditCardByUser/${id}`);
  }
  getCreditCard(id){
    return this.http.get(`/api/readCreditCard/${id}`);
  }
  getCreditCardNumber(creditCard:Creditcard){
    return this.http.get(`/api/readCreditCardNumber/${creditCard.CreditCardID}/${creditCard.CCV}`, httpOptions);
  }
  getBooksInvoice(){
    return this.http.get(this.url + 'readBooksInvoice');
  }
  getBookInvoice(id){
    return  this.http.get(`/api/readBookInvoice/${id}`);;
  }
  getTopBooks(){
    return this.http.get(this.url + 'ReadTopBooks');
  }
  getAveragePrice(){
    return this.http.get(this.url + 'readAveragePrice');
  }
  getBooksBySales(){
    return this.http.get(this.url + 'ReadBooksBySales');
  }
  getOrdersForAdmin(){
    return this.http.get(this.url + 'ReadOrders');
  }
  getRevenueByPublisherByDay(){
    return this.http.get(this.url + 'ReadRevenueByPublisherByDay');
  }
  getTotal(){
    return this.http.get(this.url + 'ReadTotalValue');
  }
  getTotalValueByPublisher(){
    return this.http.get(this.url + 'ReadTotalValueByPublisher');
  }
  getTotalValueByCategory(){
    return this.http.get(this.url + 'ReadTotalValueByCategory');
  }

}

