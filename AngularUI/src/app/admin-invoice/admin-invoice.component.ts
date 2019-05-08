import { Component, OnDestroy } from '@angular/core';
import { GETService } from '../services/get.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-invoice',
  templateUrl: './admin-invoice.component.html',
  styleUrls: ['./admin-invoice.component.sass']
})
export class AdminInvoiceComponent implements OnDestroy {
  subscription: Subscription;
  orders: any[];
  users: any[];
  constructor(private getService : GETService, private userservice: UserService, private router: Router) {
    if (!this.userservice.isAdmin()) {
      this.router.navigateByUrl("/login");
    } else {
      this.subscription = this.getService.getOrdersForAdmin().subscribe(orders => this.orders = Object.values(orders));
      this.subscription = this.userservice.getUsers().subscribe(users => this.users = Object.values(users));
    }
   }
   getUser(id) {
    let name;
    this.users.forEach(u => {
      if(u.UserID === id) {
        name = u.Name;
      }
    });
    return name;
  }

   slice(str){
    return String(str).slice(0,10);
  }

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
