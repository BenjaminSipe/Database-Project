
import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {AdminCategoriesComponent} from 'src/app/admin-categories/admin-categories.component';
//import { AdminCategoriesComponent } from '.app/admin-categories/admin-categories.component';

@Component({
  selector: 'app-modal-container',
  template: ''
})
export class ModalContainerComponent implements OnDestroy {
  destroy = new Subject<any>();
  currentDialog = null;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    router: Router
  ) {
    route.params.pipe(takeUntil(this.destroy)).subscribe(params => {

        // When router navigates on this component is takes the params and opens up the photo detail modal
        this.currentDialog = this.modalService.open(AdminCategoriesComponent, {centered: true});
        this.currentDialog.componentInstance.bookId = this.route.snapshot.paramMap.get('id');
        //console.log("THis is id from modal container: " + this.route.snapshot.paramMap.get('id'));
        // Go back to home page after the modal is closed
        this.currentDialog.result.then(result => {
            router.navigateByUrl('/admin/books');
        }, reason => {
            router.navigateByUrl('/admin/books');
        });
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
