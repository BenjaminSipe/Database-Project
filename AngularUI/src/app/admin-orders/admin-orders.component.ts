import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GETService } from '../services/get.service';
import { POSTService } from '../services/post.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.sass']
})
export class AdminOrdersComponent implements OnDestroy {
  bookCollapsed = false;
  categoryCollapsed = true;
  publisherCollapsed = true;
  publisherDayCollapsed = true;
  subscription: Subscription;
  total;
  orders: any[];
  categories: any[];
  publishers: any[];
  books: any[];
  filteredBooks : any[];
  booksByCategory: any[];
  booksByPublisher: any[];
  revenueByPublisher: any[];
  constructor(userservice: UserService, router: Router,
              private getService : GETService) {
   if (userservice.isAdmin()) {
    this.subscription = this.getService.getOrdersForAdmin().subscribe(orders => this.orders = Object.values(orders));
    this.subscription = this.getService.getCategories().subscribe(categories => this.categories = Object.values(categories));
    this.subscription = this.getService.getPublishers().subscribe(publishers => this.publishers = Object.values(publishers));
    this.subscription = this.getService.getBooksBySales().subscribe(books => this.books = this.filteredBooks = Object.values(books));
    this.subscription = this.getService.getTotal().subscribe(total => this.total = Object.values(total));
    this.subscription = this.getService.getTotalValueByCategory()
    .subscribe(booksByCategory => this.booksByCategory = Object.values(booksByCategory));
    this.subscription = this.getService.getTotalValueByPublisher()
    .subscribe(booksByPublisher => this.booksByPublisher = Object.values(booksByPublisher));
    this.subscription = this.getService.getRevenueByPublisherByDay()
    .subscribe(revenueByPublisher => this.revenueByPublisher = Object.values(revenueByPublisher));
   } else {
   router.navigateByUrl("/login");
   }
   }

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPublisher(id) {
    let name;
    this.publishers.forEach(p => {
      if(p.PublisherID === id) {
        name = p.Name;
      }
    });
    return name;
  }
  getCategory(id) {
    let name;
    this.categories.forEach(c => {
      if(c.CategoryID === id) {
        name = c.CategoryName;
      }
    });
    return name;
  }
  filter(query : string){

    this.filteredBooks = (query) ?
    this.books.filter(b => b.Title.toLowerCase().includes(query.toLowerCase())) :
    this.books;
    }

  slice(str){
    return String(str).slice(0,10);
  }

  collapseBook() {
    this.categoryCollapsed = true;
    this.publisherCollapsed = true;
    this.publisherDayCollapsed = true;
    return this.bookCollapsed = !this.bookCollapsed;
  }

  collapseCategory() {
    this.bookCollapsed = true;
    this.publisherCollapsed = true;
    this.publisherDayCollapsed = true;
    return this.categoryCollapsed = !this.categoryCollapsed;
  }

  collapsePublisher() {
    this.categoryCollapsed = true;
    this.bookCollapsed = true;
    this.publisherDayCollapsed = true;
    return this.publisherCollapsed = !this.publisherCollapsed;
  }

  collapsePublisherDay() {
    this.categoryCollapsed = true;
    this.bookCollapsed = true;
    this.publisherCollapsed = true;
    return this.publisherDayCollapsed = !this.publisherDayCollapsed;
  }


}
