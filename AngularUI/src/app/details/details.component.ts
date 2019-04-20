import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GETService } from '../services/get.service';

@Component({
  selector: 'details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  format$;
  category$;
  publisher$;
  author$;
  book$;

  constructor(private router: Router, private route: ActivatedRoute, private getService : GETService) {
    let id = this.route.snapshot.paramMap.get('id');
    this.format$ = this.getService.getBookFormat(id);
    this.category$ = this.getService.getBookCategory(id);
    this.author$ = this.getService.getBookAuthor(id);
    this.book$ = this.getService.getBook(id);
   }

  ngOnInit() {
  }

}
