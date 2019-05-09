import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.scss']
})
export class NewaccountComponent implements OnInit {
  constructor(private userService : UserService,
              private router : Router) { }
  error = ["","","","","",""];
  user = new User("", "", "", "", "");
  repeatPassword = '';
  bool = false;

  validate() {
    let b = true;
    this.user.name.trim;
    let i = this.user.name.split(" ");
    if (i.length < 2 || i[0] == "" || i[1] == "") {
      this.error[0] = "Enter first and last name";
      b = false;
    }
    if (!this.user.email.includes("@")) {
      this.error[1] = "Invalid Email Address";
      b = false;
    }
    if (this.user.password.length < 8) {
      this.error[2] = "Password must be at least 8 characters long."
      b = false;
    }
    if (this.user.password != this.repeatPassword) {
      this.error[3] = "Passwords do not match";
      b = false;
    }
    let num1 = this.user.homePhone.replace(/[- _]/g,"");
    if (isNaN(+num1)|| !(num1.length == 7 || num1.length == 10)) {
      this.error[4] = "Not a phone number";
      b = false;
    }
    let num2 = this.user.workPhone.replace(/[- _]/g,"");
    if (isNaN(+num2)|| !(num2.length == 7 || num2.length == 10)) {
      this.error[5] = "Not a phone number";
      b = false;
    }

    if (b) {
      this.user.homePhone = num1;
      this.user.workPhone = num2;
    }
    return b;
  }

  onClick() {
    this.bool = true;
    this.error = ["","","","","",""];
    if (this.validate()) {

      this.user.userID = 1;
      this.userService.postUser(this.user).then((message) => {
        this.userService.login(this.user).then((message) => {
          this.router.navigate(['/userprofile']);
        }).catch((message) => {
          console.log(message);
        })}).catch((message)=>{
          console.log(message)
        })
    } else {
      this.bool = false;
    }
    }



  ngOnInit() {
  }

}
