import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user : User;
  loginText = "Login";
  login(user:User) {
    this.user = user;
    this.user.enterInfo(7, "3333333333", "Ben Sipe", "4444444444");
    this.loginText = "Log Out"
    return this.user;
    
  }

  
  postUser( user: User): User {
    this.http.post<User>("http://localhost:3000/createUser", user, httpOptions)
    .subscribe(obj => {
      console.log(obj[0].UserID);
      user.userID = obj[0].UserID;
    }); 
    this.user = user;
    return user;
    
    }

  getUser():Observable<User[]> {
    console.log("test")
    return this.http.get<User[]>("http://localhost:3000/readUsers");
  }
  constructor(private http: HttpClient) {   
    this.loginText = "Login";
  }
}
