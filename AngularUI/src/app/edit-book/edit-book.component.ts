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

  }

   //SAVE
   editBook(newBook){
     console.log("saving..." +newBook.bookTitle);
     this.putService.putBook(newBook);
     this.router.navigate(['/admin/books/edit']);
     location.reload();

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

