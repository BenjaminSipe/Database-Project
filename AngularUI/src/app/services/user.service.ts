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
  changePassword = false;
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
              this.user.password = "";
              resolve(true);
  })}})})}

  logout() {
    this.user = new User("", "");
    this.loginText="Login";
    this.userName = "Guest";
  
  }
  postUser( user: User) {
    return new Promise((resolve, reject) => {

    this.http.post<User>("http://localhost:3000/createUser", user, httpOptions)
    .subscribe(obj => {
      user.userID = obj[0].UserID;
      this.user = user;
      resolve(this.user);
      if (obj[0].error == "No Users Found")
      reject("Failed");
    });})}

  getUser():Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/readUsers");
  }

  constructor(private http: HttpClient) {   
    this.loginText = "Login";
  }

  putUser(u:User) {
    let user = new User();
    user.email = u.email;
    user.homePhone = u.homePhone;
    user.workPhone = u.workPhone;
    user.name = u.name;
    this.http.put<User>("http://localhost:3000/update/User", user, httpOptions)
    .subscribe((res) =>
    { 
      return "Successful";
    })
    
  }
}
