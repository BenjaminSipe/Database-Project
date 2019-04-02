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
  configUrl:string;
  buttonText:string;
  public test = true;
  category: any;
  array = [1, 2, 3, 4];
  constructor(private http:HttpClient) { 
    this.configUrl = 'http://localhost:3000/dbtest';
    this.buttonText="Please Submit";
  }
  
  //This is the Section For HTTP Data Retrieval
  getConfig() {
//    return this.http.get<Category>(this.configUrl);
    this.category = this.http.get(this.configUrl)
  }

  // showConfig() {
  //   this.getConfig()
  //     .subscribe((data: Category) => this.category = {
  //         CategoryName: data['CategoryName'],
  //         CategoryID:  data['CategoryID']
  //     });
  // }
  // //End Section on data Retrieval.



  onClick(userInput, passwordInput) {
    this.buttonText=userInput;
    this.getConfig();
  }
  ngOnInit() { 
  }

}
