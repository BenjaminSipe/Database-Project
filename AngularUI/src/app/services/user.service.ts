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

  isLoggedIn() {
    return !(localStorage.getItem("UserID") == "0" || localStorage.getItem("UserID") == undefined);
  }

  isAdmin() {
    return (localStorage.getItem("UserLevel") == "2");
  }

  login(user:User) {
    return new Promise((resolve, reject) => {
      this.http.post("http://localhost:3000/authUser", user, httpOptions)
      .subscribe(res => {

        if (res[0].UserID == 0) {
          reject(false);
        } else {
          this.getUser(res[0].userID).then((m) => {
            resolve(true);
          }).catch((m)=>reject(m));

}})})}
  getUser(userID) {
    return new Promise((resolve, reject) => {
      this.http.get<User>(`http://localhost:3000/ReadUser/${userID}`,httpOptions)
      .subscribe(res2 =>
        {
          this.user = res2[0];
          this.loginText = "Log Out";
          this.userName = this.user.name;
          
          
          this.user.name.trim;
          let i = this.user.name.split(" ");
          this.user.firstName = i[0];
          this.user.lastName = i[i.length - 1];
          
          localStorage.setItem("UserLevel", this.user.userLevel);
          localStorage.setItem("UserID", this.user.userID + "");
          
          
          this.user.password = "";
          resolve(true);
})})}


  changeUserInfo(inputs, update) {
    return new Promise((resolve, reject) => {

    
    let aaa = [ this.user.userID, inputs[0], update];
    this.http.put("http://localhost:3000/updateUserLoginInfo", aaa, httpOptions)
    .subscribe((obj) => {
      if (update == "email") {
        this.user.email = inputs[0];
        
      }
      resolve(true);
    })})
  }

  logout() {
    this.user = new User("", "");
    this.loginText="Login";
    this.userName = "Guest";
    localStorage.setItem("UserID",0 + "");
    localStorage.setItem("UserLevel", "0");

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

  getUsers():Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/readUsers");
  }

  constructor(private http: HttpClient) {
    let l = localStorage.getItem("UserID");
    if (l == undefined || l == "0")
    this.loginText = "Login";
    else {
      this.loginText = "Log out";
      this.getUser(l);
    }

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

  deleteUser() {
    this.http.delete("http://localhost:3000/deleteUser/" + this.user.userID).subscribe((res) =>{
      return "successful";
    })
  }
}
