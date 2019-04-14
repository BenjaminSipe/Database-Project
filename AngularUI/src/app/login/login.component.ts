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

      //router.navigate(["/books"]);
  }
  error = "";
  user = new User("", "", "", "", "");
  boolean = false;

  onClick() {
    this.user = this.userService.login(this.user);
    if (this.user.userID != undefined ) {
      this.router.navigate(['/userprofile']);
    } 
    else {
      this.error = "Email or Password are incorrect.";
    }
  }

  ngOnInit() {
  }

}
