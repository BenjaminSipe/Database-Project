import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { User } from '../user';
import { Router } from '@angular/router';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  deleteUser = false;
  userToDelete = new User();
  u:User;
  user: User;
  emptyImageUrl="http://www.stickpng.com/assets/images/585e4be1cb11b227491c3398.png";
  showEdit:boolean;
  error = ["", "", "", ""];
  constructor(private userservice: UserService,
              private router: Router) {
    if (!userservice.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.userToDelete.email="";
      this.userToDelete.password="";
      this.user = new User();
      userservice.getUser(localStorage.getItem('UserID')).then((message) => {
        this.addUserContents();
      }).catch((m) =>{
        this.router.navigate(["/login"]);
      })
      this.showEdit = false;
    }
  }

  addUserContents() {
    while (this.userservice.user == undefined) {

    }
    if (this.u == undefined) {
      this.u = this.userservice.user;
    }
    this.user.email = this.u.email;
    this.user.name = this.u.name;
    this.user.homePhone = this.u.homePhone;
    this.user.workPhone = this.u.workPhone;
  }
  editContents() {
    if (this.showEdit) {
      this.addUserContents();
    }
    this.showEdit = !this.showEdit;
  }
  validate() {
    this.error = ["","","", ""];
    let b = true;
    this.user.name.trim;
    let i = this.user.name.split(" ");
    if (i.length < 2 || i[0] == "" || i[1] == "") {
      this.error[0] = "Enter first and last name";
      b = false;
    }
    

    let num1 = this.user.homePhone.replace(/[- _]/g,"");
    if (isNaN(+num1)|| !(num1.length == 7 || num1.length == 10)) {
      this.error[1] = "Not a phone number";
      b = false;
    }
    let num2 = this.user.workPhone.replace(/[- _]/g,"");
    if (isNaN(+num2)|| !(num2.length == 7 || num2.length == 10)) {
      this.error[2] = "Not a phone number";
      b = false;
    }

    if (b) {
      this.user.homePhone = num1;
      this.user.workPhone = num2;
    }
    return b;
  }
  save() {

    if (this.validate()) {

      this.userservice.putUser(this.user);
      this.showEdit = false;
    }

  }

  deleteUserButton() {
    this.error[3] = "";
    if (this.userservice.user.email == this.userToDelete.email) {
      
      this.userservice.login(this.userToDelete).then((m) => {
        if (confirm("Are you sure you want to delete User?")) {
          this.userservice.deleteUser();
          this.userservice.logout();
          this.router.navigate(["/books"]);
        }
      }).catch((m) =>{
        this.error[3] = "Incorrect email or password.";
      })
      
    } else {
      this.error[3] = "Incorrect email or password.";  
    }
  }
  editPassword() {
    this.userservice.changePassword = true;
    this.router.navigate(['edituser'])
  }

  ngOnInit() {
  }

}
