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
              private router : Router) { 
    }
  error = "";
  user = new User("", "", "", "", "");
  repeatPassword = '';
  
  onClick() {
    if (this.user.password != this.repeatPassword) {
      this.error = "Passwords do Not Match";
    } else {
      this.user.userID = 1;
      this.error = "";
      this.user = this.userService.postUser(this.user);
      this.router.navigate(['/userprofile']);
      //Save these two a instance of user in a userAuth service and check for login.
  
    }
  }

  

  ngOnInit() {
  }

}
