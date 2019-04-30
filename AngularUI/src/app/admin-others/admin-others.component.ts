import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GETService } from '../services/get.service';
import { DataTableResource } from 'angular7-data-table';
import { Category } from '../category';
import { PUTService } from '../put.service';

@Component({
  selector: 'app-admin-others',
  templateUrl: './admin-others.component.html',
  styleUrls: ['./admin-others.component.sass']
})
export class AdminOthersComponent implements OnInit, OnDestroy {
  bookFormats: {FormatID: string,
                FormatName: string,
                }[];
  bookCategories: { CategoryID: string,
                    CategoryName: string
                    }[];
  bookAuthors: { AuthorID: string,
                  Name: string,
                  Bio : string,
                  ImageLink: string
                }[];
  bookPublishers: { PublisherID: string,
                 Name: string,
                 ContactName: string,
                 Address: string
                 PhoneNumber: string
                }[];
   subscription : Subscription;
   //tableResource: DataTableResource<Category>;
  categoryCount: number;
  authorCount: number;
  formatCount: number;
  publisherCount: number;
  cPage = 1;
  aPage = 1;
  pPage = 1;
  pageSize = 5;
  categoryCollapsed = false;
  authorCollapsed = true;
  formatCollapsed = true;
  publisherCollapsed = true;
  constructor(private getService: GETService, private putService: PUTService) {
    this.subscription = this.getService.getFormats()
    .subscribe(bookFormats => {this.bookFormats = Object.values(bookFormats)
                               this.formatCount = Object.keys(bookFormats).length;});
    this.subscription = this.getService.getPublishers()
    .subscribe(bookPublishers => {this.bookPublishers = Object.values(bookPublishers)
                                  this.publisherCount = Object.keys(bookPublishers).length;});
    this.subscription = this.getService.getCategories()
    .subscribe(bookCategories => {this.bookCategories = Object.values(bookCategories);
                                  this.categoryCount = Object.keys(this.bookCategories).length;
    this.subscription = this.getService.getAuthors()
    .subscribe(bookAuthors => {this.bookAuthors = Object.values(bookAuthors);
                               this.authorCount = Object.keys(bookAuthors).length});
    });
    }

  // reloadItems(params) {
  //   if(!this.tableResource) return;
  //   this.tableResource.query(params).then(items => this.items = items);


  editCategory(category, categoryID){
    if(confirm('Would you like to rename this category to ' + category.categoryName+ '?')){
    let updateCategory = { categoryID: '',
                           categoryName: ''
                          }
    console.log('editing..');
    updateCategory.categoryID = categoryID;
    updateCategory.categoryName = category.categoryName;
    // console.log('name..' + category.categoryName);
    // console.log('id..' + categoryID);
    console.log('uc..' + Object.values(updateCategory));
    this.putService.putCategory(updateCategory);
    }

  }

  editFormat(format, formatID){
    if(confirm('Would you like to rename this format to ' + format.FormatName + '?')) {
    let updateFormat = { formatID: '',
                           formatName: ''
                          }
    console.log('editing..');
    updateFormat.formatID = formatID;
    updateFormat.formatName = format.FormatName;
    console.log('uc..' + Object.values(updateFormat));
    this.putService.putFormat(updateFormat);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}