import { Component, OnInit, OnDestroy } from '@angular/core';
import { GETService } from '../services/get.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.sass']
})
export class AdminBooksComponent implements OnDestroy{
  format;
  books : {Title : string}[];
  bookFormats : {BookID:string,
                 Format:string,
                 Cost:string,
                 Price:string,
                Quantity: string}[];
  filteredBooks : any[];
  subscription : Subscription;

  constructor(private getService : GETService) {
    this.subscription = this.getService.getBooks().subscribe(books => this.filteredBooks = this.books = Object.values(books));
    this.subscription = this.getService.getBookFormats().subscribe(bookFormats => this.bookFormats = Object.values(bookFormats));

   }
   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
   filter(query : string){

    this.filteredBooks = (query) ?
    this.books.filter(b => b.Title.toLowerCase().includes(query.toLowerCase())) :
    this.books;
       }

}
