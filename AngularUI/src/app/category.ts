import { CategoryService } from './services/category.service';
import { Observable } from 'rxjs';

export class Category {
  private categoriesObservable : Observable<any[]>;
  private categories = [];
  constructor(private categoryService : CategoryService) {
    categoryService.getCategories().subscribe((response : any[]) => {
      console.log(response);
      this.categories = response});
  }

}
