
import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {BookViewComponent} from 'src/app/book-view/book-view.component';
//import { AdminCategoriesComponent } from '.app/admin-categories/admin-categories.component';

@Component({
  selector: 'catalog-modal-container',
  template: ''
})
export class CatalogModalContainerComponent implements OnDestroy {
  destroy = new Subject<any>();
  currentDialog = null;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    router: Router
  ) {
    route.params.pipe(takeUntil(this.destroy)).subscribe(params => {

        // When router navigates on this component is takes the params and opens up the photo detail modal
        this.currentDialog = this.modalService.open(BookViewComponent, {centered: true, size: "lg"});
        this.currentDialog.componentInstance.bookId = this.route.snapshot.paramMap.get('id');
        //console.log("This is id from catalog modal container: " + this.route.snapshot.paramMap.get('id'));
        // Go back to home page after the modal is closed
        this.currentDialog.result.then(result => {
            router.navigateByUrl('/books');
        }, reason => {
            router.navigateByUrl('/books');
        });
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
