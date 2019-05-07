import { Component, OnInit, Input } from '@angular/core';
import { GETService } from '../services/get.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {
  @Input() InvoiceID;

  
  list;
  TotalPrice = 0;
  TotalQuantity = 0;
  Discount = 0;
  constructor(private Get : GETService) { }

  ngOnInit() {
    this.Get.getOrderByInvoiceID(this.InvoiceID).subscribe((obj:[any]) => {
      this.list = obj;
      for (let i of obj) {
        this.TotalPrice += i.Price*i.Quantity;
        this.TotalQuantity += i.Quantity;
      }
      this.Discount = this.list[0].Discount
      this.TotalPrice *= (1 - this.Discount/100)
    })
  }

}
