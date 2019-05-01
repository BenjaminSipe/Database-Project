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
    address;
    error = ["","","","","","","","",""]
    showDetails = false;
    newCardPage=false;
  constructor(private userservice: UserService,
    private router: Router, 
    private get: GETService,
    private post: POSTService) {
      this.address = {
        address1:"",
        address2:"",
        city:"",
        state:"",
        zip:""
      };
  
      get.getCreditCardByUser(localStorage.getItem("UserID")).subscribe((obj) => {
        
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
    console.log(cc);
    this.post.deleteCreditCard(cc[0]);
  }


  clear() {
    this.newCard.BillingAddress = "";
    this.newCard.NameOnCard ="";
    this.newCard.ExpirationDate = "";
    this.newCard.CreditCardNumber = "";
    this.newCard.CCV = "";
    
  }
  newCreditCard() {
    this.clear()
    this.newCardPage=true;
  }

  validate():boolean {
    this.error = ["","","","","","","","",""]
    let b = true;
    if (this.address.address1 == "") {
      b = false;
      this.error[5] = "Must Enter Address";
    }
    if (this.address.city == "") {
      b = false;
      this.error[6] = "Must Enter City";
    }
    
    if (this.address.state.length != 2) {
      b = false;
      this.error[7] = "Must Choose State";
    }
    if (this.address.zip.length != 5) {
      console.log(this.address.zip);
      b = false;
      this.error[8] = "Invalid ZIP code";
    }
    if (this.newCard.NameOnCard == "") {
      b = false;
      this.error[1] = "Must Enter Name";
    }
    if (this.newCard.ExpirationDate == "") {
      b = false;
      this.error[2] = "Must Enter Expiration Date";
    }
    if (this.newCard.CreditCardNumber.length != 16) {
      b = false;
      this.error[3] = "Invalid Card Number";
    }
    if (this.newCard.CCV == "") {
      b = false;
      this.error[4] = "Invalid";
    }
    return b;
  }
  onClick() {
    if (this.validate()) {
      this.newCard.BillingAddress = this.address.address1 + ' ' + this.address.address2 + 
      ' ' + this.address.city + ' ' + this.address.state + ' ' + this.address.zip;     
      // Save credit Card
      this.newCard.ExpirationDate = this.newCard.ExpirationDate.replace("/", "");
      this.newCard.UserID = this.userservice.user.userID;
      this.post.createCreditCard(this.newCard);
      this.clear();
      this.newCardPage = false;
    }
  }

  ngOnInit() {}

}
