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

export class PUTService {
  private url = 'http://localhost:3000/';
  constructor(private http : HttpClient) {}

  putBook(book) {
    console.log("Putting book...");
    this.http.put("http://localhost:3000/update/Book", book, httpOptions)
    .subscribe((res) =>
    {
      return "Successful";
    })

  }
}
