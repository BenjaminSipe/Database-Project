import { Component, OnInit } from '@angular/core';
import { User } from '../User'
@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.scss']
})
export class NewaccountComponent implements OnInit {
  constructor() { }
  error = "";
  user = new User("", "", "", "", "");
  repeatPassword = '';
  
  onClick() {
    if (this.user.password != this.repeatPassword) {
      this.error = "Passwords do Not Match";
    } else {
      this.error = "";
    //Save these two a instance of user in a userAuth service and check for login.
  
    }
  }

  

  ngOnInit() {
  }

}
