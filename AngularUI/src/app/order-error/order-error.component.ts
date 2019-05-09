import { Component, OnInit, Input } from '@angular/core';
import { GETService } from '../services/get.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-order-error',
  templateUrl: './order-error.component.html',
  styleUrls: ['./order-error.component.sass']
})
export class OrderErrorComponent implements OnInit {
  
  Books = [];
  constructor(get : GETService, userservice : UserService) {
    let errorList = userservice.errorList;
    get.getBooks().subscribe((obj:[any]) => {
      let b;
      for (b of obj) {

        let c;
        for (c of errorList) {
          if (c.BookID == b.BookID) {
            b.Quantity = c.quantity;
            this.Books.push(b);
       }
       }
      }
    })

   }

  ngOnInit() {
  }

}
