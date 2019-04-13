import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUser():Observable<User[]> {
    console.log("test")
    return this.http.get<User[]>("http://localhost:3000/readUsers");
  }
  constructor(private http: HttpClient) { }
}
