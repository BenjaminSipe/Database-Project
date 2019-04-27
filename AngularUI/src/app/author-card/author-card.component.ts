import { Component, OnInit, Input } from '@angular/core';
import { GETService } from '../services/get.service';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.sass']
})

export class AuthorCardComponent implements OnInit {
  @Input('author') author;

  constructor(private getService : GETService) { }

  ngOnInit() {
  }

}
