import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class POSTService {
  private urlBase = 'http://localhost:3000/';
  constructor(private http:HttpClient) { }

  createBook(book){
    this.http.post(this.urlBase + 'createBook', book);
  }
}
