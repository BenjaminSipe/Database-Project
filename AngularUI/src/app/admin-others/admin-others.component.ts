import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GETService } from '../services/get.service';
import { DataTableResource } from 'angular7-data-table';
import { Category } from '../category';

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
  constructor(private getService: GETService) {
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



  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
