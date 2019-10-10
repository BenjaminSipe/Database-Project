import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent{
  private categoriesObservable : Observable<any[]>;
  public categories = [];
  constructor(private categoryService : CategoryService) {
    categoryService.getCategories().subscribe((response : any[]) => {
      //console.log(response);
      this.categories = response});
  }
}
