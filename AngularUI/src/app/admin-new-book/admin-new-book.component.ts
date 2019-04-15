import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { GETService } from '../services/get.service';
import { POSTService } from '../services/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-admin-new-book',
  templateUrl: './admin-new-book.component.html',
  styleUrls: ['./admin-new-book.component.sass']
})
export class AdminNewBookComponent{
  categories$;
  publishers$;
  authors$;
  formats$;
  books$;
  constructor(private getService : GETService, private postService:POSTService,
              private modalService: NgbModal) {
    this.categories$ = getService.getCategories();
    this.formats$ = getService.getFormats();
    this.publishers$ = getService.getPublishers();
    this.authors$ = getService.getAuthors();
   }

   //SAVE
   saveBook(newBook){
     this.postService.createBook(newBook).subscribe((response)=>{
      console.log('response from post data is ', response)
    }, (error)=>{
      console.log('error during post is ', error)
    });
   }
  saveCategory(newCategory){
    this.postService.createCategory(newCategory).subscribe((response)=>{
     console.log('response from post data is ', response);
   },(error)=>{
     console.log('error during post is ', error)
   });
  }
  savePublisher(newPublisher){
    this.postService.createPublisher(newPublisher).subscribe((response)=>{
     console.log('response from post data is ', response);
   },(error)=>{
     console.log('error during post is ', error)
   });
  }
  saveFormat(newFormat){
    this.postService.createFormat(newFormat).subscribe((response)=>{
     console.log('response from post data is ', response);
   },(error)=>{
     console.log('error during post is ', error)
   });
  }

  saveAuthor(newAuthor){
    this.postService.createAuthor(newAuthor).subscribe((response)=>{
     console.log('response from post data is ', response);
   },(error)=>{
     console.log('error during post is ', error)
   });
  }

  //ADD NEW (PUBLISHER/CATEGORY ETC)
  addNew(content) {
    this.modalService.open(content, { centered: true });
  }
  //GET LIST OF BOOKS
  getBookID(book) {
    this.books$ = this.getService.getBooks();
    console.log("This books$ : "+ JSON.stringify(this.books$));
    var b;
    for (b in this.books$){
      console.log("b="+b);
      if(book === b){
        return b.BookID;
      }
    }
  }

}

