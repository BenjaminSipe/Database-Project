import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GETService } from '../services/get.service';
import { PUTService } from '../put.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.sass']
})
export class EditPublisherComponent implements OnDestroy {
  id;
  publisher = {
    PublisherID: "",
    Name: "",
    ContactName: "",
    Address: "",
    PhoneNumber: ""
  };
  subscription: Subscription;
  constructor(private getService: GETService, private putService: PUTService,
              private route: ActivatedRoute, private router: Router) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.subscription = this.getService.getPublisher(this.id)
      .subscribe(publisher => {this.publisher = publisher[0]});
      //console.log(Object.values(this.publisher));
  }

  editPublisher(publisher) {
    console.log("saving..." +publisher.Name);
    this.putService.putPublisher(publisher);
    this.router.navigate(['/admin/other']);
    location.reload();
  }


  adminOther() {
    if(confirm('Are you sure you want to cancel? \nAll unsaved information will be lost.')){
      this.router.navigate(['/admin/other']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
