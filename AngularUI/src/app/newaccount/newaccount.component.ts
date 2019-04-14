import { Component, OnInit } from '@angular/core';
import { User } from '../User'
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.scss']
})
export class NewaccountComponent implements OnInit {
  constructor(private userService : UserService) { 
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
      console.log(this.user.userID);
      //Save these two a instance of user in a userAuth service and check for login.
  
    }
  }

  

  ngOnInit() {
  }

}
