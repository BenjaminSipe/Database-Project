import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GETService } from '../services/get.service';
@Component({
  selector: 'book-view-categories',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.sass']
})
export class BookViewComponent implements OnInit {

  @Input() bookId;
  pBookId;
  format$;
  category$;
  publisher$;
  author$;
  book$;
  formatName$: any;

  constructor(private router: Router, private route: ActivatedRoute, private getService : GETService) {
    //let id = this.route.snapshot.paramMap.get('id');
    //console.log(id);
    // this.format$ = this.getService.getBookFormat(id);
    // this.category$ = this.getService.getBookCategory(id);
    // this.author$ = this.getService.getBookAuthor(id);
    // this.book$ = this.getService.getBook(id);
    console.log(this.bookId);
   }

   getFormat(id){
     console.log("in get format " + id);
    this.formatName$ = this.getService.getBookFormat(this.bookId);
   }

  ngOnInit() {
    //console.log("from on init " + this.bookId);
    this.format$ = this.getService.getBookFormat(this.bookId);
    this.category$ = this.getService.getBookCategory(this.bookId);
    this.author$ = this.getService.getBookAuthor(this.bookId);
    this.book$ = this.getService.getBook(this.bookId);
    this.publisher$ = this.getService.getBookPublisher(this.bookId);
  }

  slice(str){
    return String(str).slice(0,10);
  }

}
