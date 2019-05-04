import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.sass']
})
export class ConfirmationPageComponent implements OnInit {

  constructor(private userservice:UserService) { }

  ngOnInit() {
  }

}
