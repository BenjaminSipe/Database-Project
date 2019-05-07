import { Component, OnInit } from '@angular/core';
import { GETService } from '../services/get.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topBooks$
  constructor(private getService: GETService) {
    getService.getTopBooks().subscribe((obj) => {
      this.topBooks$ = obj;
    });
  }

  ngOnInit() {
  }

}
