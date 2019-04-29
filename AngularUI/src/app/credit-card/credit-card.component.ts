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
    creditCard:Creditcard;
    newCard = new Creditcard();

  

    error = ["","","","",""]
    showDetails = false;
    newCardPage=false;
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

  cardDetails(index: number) {
    console.log(index);
    this.creditCard = this.creditCards[index];
    this.showDetails = true;
  }

  deleteCard(card: Creditcard, index: number) {
    let cc = this.creditCards.splice(index, 1);
    this.post.deleteCreditCard(cc[0]);
  }

  newCreditCard() {
    this.newCard.BillingAddress = "";
    this.newCard.NameOnCard ="";
    this.newCard.ExpirationDate = "";
    this.newCard.CreditCardNumber = "";
    this.newCard.CCV = "";
    this.newCardPage=true;
  }

  validate():boolean {

    this.newCard.BillingAddress = "";
    this.newCard.NameOnCard ="";
    this.newCard.ExpirationDate = "";
    this.newCard.CreditCardNumber = "";
    this.newCard.CCV = "";
    return true;
  }
  onClick() {
    if (this.validate()) {
      // Save credit Card
    }
  }

  ngOnInit() {}

}
