import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
import {Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  bool = false;
  constructor (private userService : UserService,
               private router : Router) {
      if (userService.user.userID != undefined) {
        userService.logout();
        router.navigate(["/"]);
      }
   }
   testObject = "This is a test String"
  error = "";
  user = new User("", "", "", "", "");
  boolean = false;

  onClick() {
    this.error = "";
    this.bool = true;
    if (this.user.email == ""){
      this.error = "No Information Entered.";
      this.bool = false;
    } else {
    this.userService.login(this.user).then((message) =>
    {
      this.bool = false;
      this.router.navigate(['/books']);
    }).catch((message) => {
      this.error = "Email or Password are incorrect.";
      this.bool = false;
    })}
  }

  ngOnInit() {
  }

}
