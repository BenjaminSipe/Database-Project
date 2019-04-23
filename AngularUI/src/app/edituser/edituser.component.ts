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
import {
  validateConfig
} from '@angular/router/src/config';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.sass']
})
export class EdituserComponent implements OnInit {
  user: User;
  passCheck: boolean;
  error = ["", ""];
  showChangePassword = false;
  showChangeEmail = false;
  whatsBeingEdited: string;
  inputs = ["", ""];

  constructor(private userservice: UserService,
    private router: Router) {
    if (!userservice.changePassword) {
      router.navigate(['userprofile']);
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
    }).catch(() => {
    });
  }

  editEmail() {
    console.log("This is running")
    this.onClick().then((m) => {
      this.whatsBeingEdited = "email";
    }).catch(() => {
    });
  }


  onClick() {
    return new Promise((resolve, reject) => {
      this.userservice.login(this.user).then((message) => {
        this.passCheck = true;
        this.error[0] = "";
        resolve(true);
      }).catch((message) => {
        this.error[0] = "Password Incorrect";
        reject(false);
      });
    });

  }

  changeUser() {
    if (this.validate()) {
        this.userservice.changeUserInfo(this.inputs, this.whatsBeingEdited).then((m) => {
        this.router.navigate(["/userprofile"])});
    }
  }

  validate() {
    let b = true;
    if (this.inputs[0] == this.inputs[1]) {
      if (this.whatsBeingEdited == "password" && this.inputs[0].length < 8) {
        this.error[1] = "Password must be at least 8 characters.";
        return false;
      }
      if (this.whatsBeingEdited == "email" && !this.inputs[0].includes("@")) {
        this.error[1] = "Not a valid Email";
        return false
      }
      this.error[1] = "";
      return true;
    } else {
      this.error[1] = `${this.whatsBeingEdited}s do not match.`;
      return false;
    }
  }
  ngOnInit() {}

}
