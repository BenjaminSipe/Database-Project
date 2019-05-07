import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { GETService } from '../services/get.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminCategoriesComponent } from '../admin-categories/admin-categories.component';
import { OrderComponent } from '../order/order.component';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.sass']
})
export class MyOrdersComponent implements OnInit {
  orders;
  currentDialog = null;
  destroy = new Subject<any>();
  constructor(
    private userservice :UserService, 
    private get : GETService,
    private router : Router,
    private route : ActivatedRoute,
    private modalService: NgbModal
  ) { 
    get.getOrdersByUser(localStorage.getItem("UserID")).subscribe((obj:[any]) => {
      for (let i of obj) {
        i.OrderDate = i.OrderDate.substr(0, 10)
      }
      this.orders = obj;
    })
    if (!userservice.isLoggedIn()) {
      router.navigate(['/login']);
    }
  }

  orderDetails(Invoice) {
    this.route.params.pipe(takeUntil(this.destroy)).subscribe(params => {

      // When router navigates on this component is takes the params and opens up the photo detail modal
      this.currentDialog = this.modalService.open(OrderComponent, {centered: true, size:"lg"});
      this.currentDialog.componentInstance.InvoiceID = Invoice.InvoiceID;
      //console.log("THis is id from modal container: " + this.route.snapshot.paramMap.get('id'));
      // Go back to home page after the modal is closed
      this.currentDialog.result.then(result => {
          this.router.navigateByUrl('/myorders');
      }, reason => {
          this.router.navigateByUrl('/myorders');
      });
  });
  }



  ngOnInit() {
  }

}
