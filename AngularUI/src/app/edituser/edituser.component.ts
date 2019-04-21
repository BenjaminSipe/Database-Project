import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserService
} from "../services/user.service";
import {
  User
} from '../user';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.sass']
})
export class EdituserComponent implements OnInit {
  user: User;
  passCheck: boolean;
  error = "";
  showChangePassword = false;
  showChangeEmail = false;
  whatsBeingEdited: string;
  inputs = ["", ""];

  constructor(private userservice: UserService,
    private router: Router) {
    if (!userservice.changePassword) {
      //router.navigate(['userprofile']);
      this.user = new User();
      this.user.password = "";
      this.user.email = "sipe.nation3@gmail.com";
      this.passCheck = false;
      userservice.changePassword = false;
    } else {
      this.user = new User();
      this.user.password = "";
      this.user.email = userservice.user.email;
      this.passCheck = false;
      userservice.changePassword = false;

    }
  }

  editPassword() {
    this.onClick().then((m) => {
      this.whatsBeingEdited = "password";
    }).catch();
  }

  editEmail() {
    console.log("This is running")
    this.onClick().then((m) => {
      this.whatsBeingEdited = "email";
    }).catch();
  }


  onClick() {
    return new Promise((resolve, reject) => {
      this.userservice.login(this.user).then((message) => {
        this.passCheck = true;
        resolve(true);
      }).catch((message) => {
        this.error = "Password Incorrect";
        reject(false);
      });
    });

  }

  changeUser() {
    
  }
  ngOnInit() {}

}
