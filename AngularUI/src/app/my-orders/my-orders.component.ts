import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.sass']
})
export class MyOrdersComponent implements OnInit {

  constructor(userservice :UserService,
    router : Router
  ) { 

    if (!userservice.isLoggedIn()) {
      router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}
