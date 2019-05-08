import { Component, OnInit } from '@angular/core';
import { GETService } from '../services/get.service';
import { POSTService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topBooks$
  EmailSent =false;
  commentError = "";
  email = {
    name:"",
    email:"",
    comments:""
  }
  constructor(private getService: GETService, private post: POSTService) {
    getService.getTopBooks().subscribe((obj) => {
      this.topBooks$ = obj;
    });
  }


  ngOnInit() {
  }


  sendEmail() {
    this.commentError="";
    if (this.email.name != "" && this.email.email.includes("@") && this.email.comments != "") {
      this.EmailSent=true;
      this.post.sendEmail(this.email).subscribe((m) => {
      });
    } else {
      if (this.email.name == "") {
        this.commentError = "Please enter a name";
      } else if (!this.email.email.includes("@")) {
        this.commentError = "Invalid Email Address";
      } else if (this.email.comments == "") {
        this.commentError = "No Comment Entered.";
      }
    }
  }
}
