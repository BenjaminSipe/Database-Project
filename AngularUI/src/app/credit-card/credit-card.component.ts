import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserService
} from '../services/user.service';
import { GETService } from '../services/get.service';
import { Creditcard } from '../creditcard';
import { POSTService } from '../services/post.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.sass']
})
export class CreditCardComponent implements OnInit {
    creditCards:Creditcard[] = [];


  constructor(private userservice: UserService,
    private router: Router, 
    private get: GETService,
    private post: POSTService) {
      get.getCreditCardByUser(userservice.user.userID).subscribe((obj) => {
        
        for (let vl of obj) {
          console.log(vl);
          this.creditCards.push(vl);
        }
      })
  }

  cardDetails(id:number) {
    console.log(id);
  }
  ngOnInit() {}

}
