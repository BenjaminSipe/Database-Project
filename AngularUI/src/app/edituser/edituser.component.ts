import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.sass']
})
export class EdituserComponent implements OnInit {
  user:User;
  edit:boolean;
  error = "";
  constructor(private userservice: UserService,
    private router: Router) {
      if (!userservice.changePassword) {
        router.navigate(['userprofile']);
      } else {
        this.user = new User();
        this.user.password = "";
        this.user.email = userservice.user.email;
        this.edit = false;
        userservice.changePassword = false;

      }
     }

     editPassword() {
      this.onClick().then().catch();
     }

     editEmail() {
      this.onClick().then().catch();
     }


  onClick() {
    return new Promise((resolve, reject) => {
      this.userservice.login(this.user).then((message) => {
        this.edit = true;
        resolve(true);
      }).catch((message) => {
        this.error = "Password Incorrect";
        reject(false);
      });
    });
    
  }

  ngOnInit() {
  }

}
