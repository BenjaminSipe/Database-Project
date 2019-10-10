import { Component, OnInit, OnDestroy } from '@angular/core';
import { GETService } from '../services/get.service';
import { Subscription } from 'rxjs';
import { POSTService } from '../services/post.service';

@Component({
  selector: 'admin-edit-book',
  templateUrl: './admin-edit-book.component.html',
  styleUrls: ['./admin-edit-book.component.sass']
})
export class AdminEditBookComponent implements OnDestroy{
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

  constructor(private getService : GETService, private postService:POSTService) {
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

    deleteBook(book){
      ////console.log(book)
      this.bookToDelete.BookID = book;
      if(confirm("Are you sure to delete this book?")) {
        //console.log("Implement delete functionality here");

          this.postService.deleteBook(this.bookToDelete).subscribe((response)=>{
           //console.log('response from delete book is ', response);
           location.reload();
         },(error)=>{
           //console.log('error during post is ', error)
         });
        }
    }

}
