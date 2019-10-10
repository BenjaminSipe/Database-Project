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
    //console.log("Putting book...");
    this.http.put("http://localhost:3000/update/Book", book, httpOptions)
    .subscribe((res) =>
    {
      return "Successful";
    })

  }

  putCategory(category) {
    //console.log("Putting category...");
    this.http.put("http://localhost:3000/update/Category", category, httpOptions)
    .subscribe((res) =>
    {
      return "Successful";
    })

  }
  putFormat(format) {
    //console.log("Putting format...");
    this.http.put("http://localhost:3000/update/Format", format, httpOptions)
    .subscribe((res) =>
    {
      return "Successful";
    });
  }
  putPublisher(publisher) {
    //console.log("Putting Publisher...");
    this.http.put("http://localhost:3000/update/Publisher", publisher, httpOptions)
    .subscribe((res) =>
    {
      return "Successful";
    });
  }
  putAuthor(author) {
    //console.log("Putting author...");
    this.http.put("http://localhost:3000/update/Author", author, httpOptions)
    .subscribe((res) =>
    {
      return "Successful";
    });
  }
}
