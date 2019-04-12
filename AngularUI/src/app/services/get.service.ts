import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
