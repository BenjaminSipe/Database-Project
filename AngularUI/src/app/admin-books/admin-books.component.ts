import { Component, OnInit } from '@angular/core';
import { GETService } from '../services/get.service';

@Component({
  selector: 'admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.sass']
})
export class AdminBooksComponent {
  books$;
  constructor(private getService : GETService) {
    this.books$ = this.getService.getBooks();
   }

}
