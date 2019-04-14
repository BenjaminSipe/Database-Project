import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { User } from '../user';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {
  user : User[];
  constructor(private userservice: UserService) { 
    
  }
  getUser(): void {
    this.userservice.getUser()
      .subscribe(user => this.user = user);
  }


  ngOnInit() {
    this.getUser();
  }

}
