import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user : User[];
  constructor(private userservice: UserService,
              private router: Router) { 
    if (this.userservice.user.userID == undefined) {
      this.router.navigate(['/login']);
    } else {
      
    }     
  }
  

  ngOnInit() {
  }

}
