import { Component, OnDestroy } from '@angular/core';
import { GETService } from '../services/get.service';
import { PUTService } from '../put.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.sass']
})
export class EditAuthorComponent implements OnDestroy {
  id;
  author = {
    AuthorID: "",
    Name: "",
    ImageLink: "",
    Bio: ""
  };
  subscription: Subscription;
  constructor(private getService: GETService, private putService: PUTService,
              private route: ActivatedRoute, private router: Router) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.subscription = this.getService.getAuthor(this.id)
      .subscribe(author => {this.author = author[0]});
      console.log(Object.values(this.author));
  }

  editAuthor(author) {
    console.log("saving..." +author.authorName);
    this.putService.putAuthor(author);
    this.router.navigate(['/admin/other']);
    //location.reload();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
