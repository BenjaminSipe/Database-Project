import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {
  user : User[];
  constructor(private userservice: UserService,
              private router: Router) { 
    
  }
  getUser(): void {
    
    if (this.userservice.user == undefined || this.userservice.user.userID == 1) {
      this.router.navigate(['/login']);
    } 
      
  }


  ngOnInit() {
    this.getUser();
  }

}
