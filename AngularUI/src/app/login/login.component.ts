import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Category } from '../category';


import { HttpClient } from  "@angular/common/http";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  configUrl:string;
  buttonText:string;
  boolean = false;
  user : User;
  category: any;
  constructor(private http:HttpClient) {
    this.configUrl = 'http://localhost:3000/dbtest';
    this.buttonText="Login Please";
  }

  //This is the Section For HTTP Data Retrieval
  getConfig() {
    return this.http.get(this.configUrl);
    this.category = this.http.get(this.configUrl)
  }

  test() {
    return !this.boolean;
  }
  onClick(userInput, passwordInput) {

    this.username = userInput;
    this.password = passwordInput;
    this.boolean = true;
    this.getConfig();
  }
  ngOnInit() {
  }

}
