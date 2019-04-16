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
  user = new User("", "");
  userName = "Guest";
  loginText = "Login";
  login(user:User) {
    return new Promise((resolve, reject) => {
      this.http.post("http://localhost:3000/authUser", user, httpOptions)
      .subscribe(res => {

        if (res[0].UserID == 0) {

          reject(false);
        } else {
          this.http.get<User>(`http://localhost:3000/ReadUser/${res[0].userID}`,httpOptions)
          .subscribe(res2 =>
            {
              
              this.user = res2[0];
              this.loginText = "Log Out";
              this.userName = this.user.name;
              resolve(true);
            
            })
          }
      })
    })
  }

  logout() {
    this.user = new User("", "");
  }
  postUser( user: User): User {
    this.http.post<User>("http://localhost:3000/createUser", user, httpOptions)
    .subscribe(obj => {
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
