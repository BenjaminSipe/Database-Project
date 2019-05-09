import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserService
} from '../services/user.service';
import {
  Router
} from '@angular/router';
import { Subscription } from 'rxjs';
import { POSTService } from '../services/post.service';
import { GETService } from '../services/get.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.sass']
})
export class AdminUsersComponent implements OnInit {

  constructor(private getService : GETService, private userservice: UserService, private router: Router, private postService:POSTService) {
    if (!this.userservice.isAdmin()) {
      this.router.navigateByUrl("/login");
    } else {
    this.subscription = this.getService.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
    });
    }
  }

  users;
  filteredUsers;
  subscription: Subscription;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  filter(query: string) {
      this.filteredUsers = (query) ?
      this.users.filter(b => b.Name.toLowerCase().includes(query.toLowerCase())) :
      this.users;
  }

  adminUser(user) {

    this.userservice.CreateAdmin(user.UserID);
    user.UserLevel = 2;
  }


  ngOnInit() {

  }


}
