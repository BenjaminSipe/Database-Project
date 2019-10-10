import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { GETService } from '../services/get.service';
import { POSTService } from '../services/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forEach } from '@angular/router/src/utils/collection';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PUTService } from '../put.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.sass']
})
export class EditBookComponent implements OnDestroy{
  categories$;
  publishers$;
  authors$;
  formats$;
  books$;
  book$;
  subscription : Subscription;
  bookCategory: string;
  bookPublisher: any[];
  bookAuthor: string;
  bookFormatID: any;
  bookFormatPrice: any;
  bookFormatCost: any;
  bookFormatQuantity: any;
  title: string;
  Isbn13: any;
  imageUrl: string;
  publisher: string;
  id: string;
  date: string;
  submit:boolean = false;

  constructor(private getService : GETService, private putService: PUTService,
              private modalService: NgbModal, private router: Router, private route: ActivatedRoute,
              private userservice:UserService, private postService:POSTService) {
                if (userservice.isAdmin()) {
    this.categories$ = getService.getCategories();
    this.formats$ = getService.getFormats();
    this.publishers$ = getService.getPublishers();
    this.authors$ = getService.getAuthors();

    this.id = this.route.snapshot.paramMap.get('id');
    ////console.log("id?"+this.id);
    // this.book$ = this.getService.getBook(id);
    this.subscription = this.getService.getBook(this.id)
      .subscribe(book => {this.imageUrl = book[0].ImageLink;
                          this.title = book[0].Title;
                          this.Isbn13 = book[0].Isbn13;
                          this.date = book[0].PublishingDate.slice(0, 10);
                          this.publisher = book[0].PublisherID;
    });

    this.subscription = this.getService.getBookCategory(this.id)
    .subscribe(category => {this.bookCategory = category[0].CategoryID;
    });

    this.subscription = this.getService.getBookAuthor(this.id)
    .subscribe(author => {this.bookAuthor = author[0].AuthorID;
    });

    this.subscription = this.getService.getBookFormat(this.id)
    .subscribe(format => {this.bookFormatID = format[0].FormatID;
                          this.bookFormatPrice = format[0].Price;
                          this.bookFormatCost = format[0].Cost;
                          this.bookFormatQuantity = format[0].Quantity;
    });


  } else {
    router.navigate(["/login"]);
  }
}

   //SAVE
   editBook(newBook){
    if(confirm('Are you sure you want to edit this book?')){
      this.putService.putBook(newBook);
      this.router.navigate(['/admin/books/edit/']);
    }
   }

  //ADD NEW (PUBLISHER/CATEGORY ETC)
  addNew(content) {
    this.modalService.open(content, { centered: true });
    this.router.navigate(['/admin/books/edit/' + this.id]);
  }

  adminNewBooks() {
    this.router.navigate(['/admin/books/edit/' + this.id]);
  }
  saveCategory(newCategory){
    this.postService.createCategory(newCategory).subscribe((response)=>{
     //console.log('response from post data is ', response);
     this.categories$ = this.getService.getCategories();
     this.submit = true;
     }, (error)=> {
     //console.log('error during post is ', error)
     this.submit = false;
   });

  }
  savePublisher(newPublisher){
    this.postService.createPublisher(newPublisher).subscribe((response)=>{
     //console.log('response from post data is ', response);
     this.publishers$ = this.getService.getPublishers();
     this.submit = true;
   },(error)=>{
     //console.log('error during post is ', error)
     this.submit = false;
   });
  }
  saveFormat(newFormat){
    this.postService.createFormat(newFormat).subscribe((response)=>{
      this.formats$ = this.getService.getFormats();
     //console.log('response from post data is ', response);
     this.submit = true;
   },(error)=>{
     //console.log('error during post is ', error);
     this.submit = false;
   });
  }

  saveAuthor(newAuthor){
    //console.log(newAuthor.newAuthorBio);
    newAuthor.newAuthorBio = newAuthor.newAuthorBio.replace(/'/g,"\\'");
    newAuthor.newAuthorBio = newAuthor.newAuthorBio.replace(/"/g,'\\"');
    //console.log(newAuthor.newAuthorBio);
    this.postService.createAuthor(newAuthor).subscribe((response)=>{
     //console.log('response from post data is ', response);
     this.authors$ = this.getService.getAuthors();
     this.submit = true;
   },(error)=>{
     //console.log('error during post is ', error);
     this.submit = false;
   });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  adminBooks() {
    if(confirm('Are you sure you want to return to book list? \nAll unsaved information will be lost.')){
      this.router.navigate(['/admin/books']);
    }
  }
}

