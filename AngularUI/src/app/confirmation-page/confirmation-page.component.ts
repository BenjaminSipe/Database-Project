import { Component, OnInit } from '@angular/core';
import { GETService } from '../services/get.service';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.sass']
})
export class ConfirmationPageComponent{
  firstName;
  user = new User();
  constructor(public userservice: UserService, private get: GETService,
              private router: Router) {
  }

}
