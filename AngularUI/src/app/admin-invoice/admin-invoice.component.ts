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
  invoice: {InvoiceID: number}[];
  filteredInvoices: any[];
  constructor(private getService : GETService, private userservice: UserService, private router: Router) {
    if (!this.userservice.isAdmin()) {
      this.router.navigateByUrl("/login");
    } else {
    // this.subscription = this.getService.getBooksInvoice().subscribe((invoices) => {
    //   this.filteredInvoices = this.invoice = Object.values(invoices);
    //   console.log(invoices);
    // });
    }
   }

   ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
  filter(query: number) {
      // this.filteredInvoices = (query) ?
      // this.invoice.filter(i => i.InvoiceID == query) :
      // this.invoice;
  }
}
