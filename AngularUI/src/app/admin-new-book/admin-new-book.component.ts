import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { GETService } from '../services/get.service';
import { POSTService } from '../services/post.service';


@Component({
  selector: 'app-admin-new-book',
  templateUrl: './admin-new-book.component.html',
  styleUrls: ['./admin-new-book.component.sass']
})
export class AdminNewBookComponent{
  categories$;
  publishers$;
  constructor(private getService : GETService, private postService:POSTService) {
    this.categories$ = getService.getCategories();
    this.publishers$ = getService.getPublishers();
   }

   save(newBook){
     console.log(newBook);
     this.postService.createBook(newBook);
   }
}
