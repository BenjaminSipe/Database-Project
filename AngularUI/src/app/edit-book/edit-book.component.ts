import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { GETService } from '../services/get.service';
import { POSTService } from '../services/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forEach } from '@angular/router/src/utils/collection';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PUTService } from '../put.service';


@Component({
  selector: 'edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.sass']
})
export class EditBookComponent implements OnDestroy{
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
  book$;
  subscription : Subscription;
  book : any[];
  title: string;
  Isbn13: any;
  imageUrl:string;
  publisher:string;
  id:string;
  date:string;

  constructor(private getService : GETService, private putService: PUTService,
              private modalService: NgbModal, private router: Router, private route: ActivatedRoute) {
    this.categories$ = getService.getCategories();
    this.formats$ = getService.getFormats();
    this.publishers$ = getService.getPublishers();
    this.authors$ = getService.getAuthors();

    this.id = this.route.snapshot.paramMap.get('id');
    console.log("id?"+this.id);
    // this.book$ = this.getService.getBook(id);
    this.subscription = this.getService.getBook(this.id)
      .subscribe(book => {this.book = Object.values(book[0]);
                          this.imageUrl = book[0].ImageLink;
                          this.title = book[0].Title;
                          this.Isbn13 = book[0].Isbn13;
                          this.date = book[0].PublishingDate.slice(0, 10);
                          this.publisher = book[0].PublisherID;
      //console.log(book[0]);

    });

  }

   //SAVE
   editBook(newBook){
     console.log("saving..." +newBook.bookTitle);
     this.putService.putBook(newBook);

    //  this.postService.createBook(newBook).subscribe((response)=>{
    //   console.log('response from post data is ', response);
    //   console.log(response[0].BookID);
    //   this.ab.BookID = response[0].BookID;
    //   this.bc.BookID = response[0].BookID;
    //   this.fb.BookID = response[0].BookID;
    //   this.bc.CategoryID = newBook.category;
    //   this.ab.AuthorID = newBook.author;
    //   this.fb.FormatID = newBook.format;
    //   this.fb.price = newBook.formatPrice;
    //   this.fb.cost = newBook.formatCost;
    //   this.fb.quantity = newBook.formatQuantity;
    //   this.saveBookCategory(this.bc);
    //   this.saveBookAuthor(this.ab);
    //   this.saveBookFormat(this.fb);
    // }, (error)=>{
    //   console.log('error during post is ', error)
    // }
    // );
    //  this.router.navigate(['/admin/books']);
    //  location.reload();
   }

  //ADD NEW (PUBLISHER/CATEGORY ETC)
  addNew(content) {
    this.modalService.open(content, { centered: true });
    this.router.navigate(['/admin/books/new']);
  }

  adminNewBooks() {
    this.router.navigate(['/admin/books/new']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

