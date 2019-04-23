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
  u:User;
  user: User;
  emptyImageUrl="https://us.123rf.com/450wm/salamatik/salamatik1801/salamatik180100019/92979836-stock-vector-profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-on.jpg?ver=6";
  showEdit:boolean;
  error = ["", ""];
  constructor(private userservice: UserService,
              private router: Router) { 
    if (this.userservice.user.userID == undefined) {
      this.router.navigate(['/login']);
    } else {
      this.user = new User();
      this.addUserContents();
      this.showEdit = false;
    }     
  }

  addUserContents() {
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
    let b = true;
    let num1 = this.user.homePhone.replace(/[- _]/g,"");    
    if (isNaN(+num1)|| !(num1.length == 7 || num1.length == 10)) {
      this.error[0] = "Not a phone number";
      b = false;
    } 
    let num2 = this.user.workPhone.replace(/[- _]/g,"");    
    if (isNaN(+num2)|| !(num2.length == 7 || num2.length == 10)) {
      this.error[1] = "Not a phone number";
      b = false;
    } 

    if (b) {
      this.user.homePhone = num1;
      this.user.workPhone = num2;
    }
    return b;
  }
  save() {
    this.error = ["",""];
    if (this.validate()) {

      this.userservice.putUser(this.user);
      this.showEdit = false;      
    }

  }

  editPassword() {
    this.userservice.changePassword = true;
    this.router.navigate(['edituser'])
  }

  ngOnInit() {
  }

}
