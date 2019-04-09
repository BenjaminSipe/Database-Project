import { Component, OnInit } from '@angular/core';
import { User } from '../User'
@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.scss']
})
export class NewaccountComponent implements OnInit {
  errorText: string;
  constructor() { }
  user : User;



  onClick(
  nameInput
  ,emailInput
  ,passwordInput1
  ,passwordInput2
  ,addressInput
  ,homePhoneInput
  ,workPhoneInput
  ) {
    if (passwordInput1 != passwordInput2) {
      this.errorText = "Passwords do Not match";
    } else {
      this.errorText = '';
      this.user = new User(
      nameInput
      ,addressInput
      ,emailInput
      ,homePhoneInput
      ,workPhoneInput);
    }
  }

  ngOnInit() {
  }

}
