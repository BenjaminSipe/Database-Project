import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.sass']
})
export class AdminOrdersComponent implements OnInit {

  constructor(userservice:UserService, router:Router) { 
    if (userservice.isAdmin()) {

    } else {
      router.navigateByUrl("/login");
    }

  }

  ngOnInit() {
  }

}
