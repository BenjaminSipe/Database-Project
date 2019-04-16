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
  constructor (private userService : UserService,
               private router : Router) {
      if (userService.user.userID != undefined) {
        userService.logout();
        router.navigate(["/"]);
      }
      //router.navigate(["/books"]);
  }
  error = "";
  user = new User("", "", "", "", "");
  boolean = false;

  onClick() {

    this.userService.login(this.user).then((message) =>
    {
      this.router.navigate(['/userprofile']);
    }).catch((message) => {
      this.error = "Email or Password are incorrect.";
    })
  }

  ngOnInit() {
  }

}
