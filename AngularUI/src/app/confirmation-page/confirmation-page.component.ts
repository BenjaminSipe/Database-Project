import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { GETService } from '../services/get.service';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { Router } from '@angular/router';
=======
import { UserService } from '../services/user.service';
>>>>>>> fd9033ae3ff2d0fa82860a9667711c2b7d9281af

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.sass']
})
<<<<<<< HEAD
export class ConfirmationPageComponent{
  firstName;
  user = new User();
  constructor(private userservice: UserService, private get: GETService,
              private router: Router) {
    console.log(userservice.user.firstName);
=======
export class ConfirmationPageComponent implements OnInit {

  constructor(private userservice:UserService) { }

  ngOnInit() {
>>>>>>> fd9033ae3ff2d0fa82860a9667711c2b7d9281af
  }

}
