import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appTitle = 'myapp';
  constructor(private userservice : UserService, private router: Router) {

  }

  myProfile() {
    this.router.navigate(["/userprofile"]);
  }
  myOrders() {
    this.router.navigate(["/myorders"]);
  }

  adminBooks() {
    this.router.navigate(['/admin/books']);
  }

  login() {
    if (this.userservice.user.userID == undefined) {
      this.router.navigate(["/login"]);
    } else {
      this.userservice.logout();
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
  }

}
