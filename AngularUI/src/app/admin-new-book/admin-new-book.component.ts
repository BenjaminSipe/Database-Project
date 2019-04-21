import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { GETService } from '../services/get.service';
import { POSTService } from '../services/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-new-book',
  templateUrl: './admin-new-book.component.html',
  styleUrls: ['./admin-new-book.component.sass']
})
export class AdminNewBookComponent{
  bc = {
    BookID: '',
    CategoryID: ''
  };
  ab = {
    AuthorID: '',
    BookID: ''
  };
  fb = {
    FormatID: '',
    BookID: '',
    price: '',
    cost: '',
    quantity: '',
  };
  categories$;
  publishers$;
  authors$;
  formats$;
  books$;
  constructor(private getService : GETService, private postService:POSTService,
              private modalService: NgbModal, private router: Router) {
    this.categories$ = getService.getCategories();
    this.formats$ = getService.getFormats();
    this.publishers$ = getService.getPublishers();
    this.authors$ = getService.getAuthors();
   }

   //SAVE
   saveBook(newBook){
     this.postService.createBook(newBook).subscribe((response)=>{
      console.log('response from post data is ', response);
      console.log(response[0].BookID);
      this.ab.BookID = response[0].BookID;
      this.bc.BookID = response[0].BookID;
      this.fb.BookID = response[0].BookID;
      this.bc.CategoryID = newBook.category;
      this.ab.AuthorID = newBook.author;
      this.fb.FormatID = newBook.format;
      this.fb.price = newBook.formatPrice;
      this.fb.cost = newBook.formatCost;
      this.fb.quantity = newBook.formatQuantity;
      //console.log("This is fb: "+Object.values(this.fb));
      this.saveBookCategory(this.bc);
      //console.log('This is ab: '+this.ab);
      this.saveBookAuthor(this.ab);
      this.saveBookFormat(this.fb);
    }, (error)=>{
      console.log('error during post is ', error)
    }
    );
    //this.router.navigate(['/admin/books']);
   }
   saveBookCategory(nbc){
    this.postService.createBookCategory(nbc).subscribe((response)=>{
     console.log('response from bc post data is ', response);
   },(error)=>{
     console.log('error during post is ', error)
   });
  }
  saveBookAuthor(nab){
    this.postService.createBookAuthor(nab).subscribe((response)=>{
     console.log('response from ab post data is ', response);
   },(error)=>{
     console.log('error during post is ', error)
   });
  }
  saveBookFormat(nfb){
    this.postService.createBookFormat(nfb).subscribe((response)=>{
     console.log('response from fb post data is ', response);
   },(error)=>{
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
    console.log(newAuthor.newAuthorBio);
    newAuthor.newAuthorBio = newAuthor.newAuthorBio.replace(/'/g,"\\'");
    newAuthor.newAuthorBio = newAuthor.newAuthorBio.replace(/"/g,'\\"');
    console.log(newAuthor.newAuthorBio);
    this.postService.createAuthor(newAuthor).subscribe((response)=>{
     console.log('response from post data is ', response);
   },(error)=>{
     console.log('error during post is ', error)
   });
  }
  //ADD NEW (PUBLISHER/CATEGORY ETC)
  addNew(content) {
    this.modalService.open(content, { centered: true });
    this.router.navigate(['/admin/books/new']);
  }

  adminNewBooks() {
    this.router.navigate(['/admin/books/new']);
  }


}

