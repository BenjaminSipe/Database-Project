import { Component, OnInit, OnDestroy } from '@angular/core';
import { GETService } from '../services/get.service';
import { Subscription } from 'rxjs';
import { POSTService } from '../services/post.service';

@Component({
  selector: 'admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.sass']
})
export class AdminBooksComponent implements OnDestroy{
  format;
  bookToDelete = {BookID : ''};
  books : {Title : string}[];
  bookFormats : {BookID:string,
                 Format:string,
                 Cost:string,
                 Price:string,
                Quantity: string}[];
  filteredBooks : any[];
  subscription : Subscription;
  page = 1;
  pageSize = 10;
  count: number;

  constructor(private getService : GETService, private postService:POSTService) {
    this.subscription = this.getService.getBooks().subscribe(books => {this.filteredBooks = this.books = Object.values(books)
                                                                       this.count = Object.keys(books).length;});
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

    deleteBook(book){
      ////console.log(book)
      this.bookToDelete.BookID = book;
      if(confirm("Are you sure to delete this book?")) {

          this.postService.deleteBook(this.bookToDelete).subscribe((response)=>{
           location.reload();
         },(error)=>{
           //console.log('error during post is ', error)
         });
        }
    }


}
