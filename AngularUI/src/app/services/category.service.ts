import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categories  = [];
  constructor(private http : HttpClient) { }
    getCategories(){
    return this.http.get('http://localhost:3000/readCategories');
  }
}
