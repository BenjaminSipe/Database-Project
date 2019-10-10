import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GETService } from '../services/get.service';
@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.sass']
})
export class AdminCategoriesComponent implements OnInit {

  @Input() bookId;
  pBookId;
  format$;
  category$;
  publisher$;
  author$;
  book$;
  formatName$: any;

  constructor(private router: Router, private route: ActivatedRoute, private getService : GETService) {
    
   }

   getFormat(id){

     //console.log("in get format " + id);
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

}
