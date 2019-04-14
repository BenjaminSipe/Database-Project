import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { GETService } from '../services/get.service';
import { POSTService } from '../services/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-admin-new-book',
  templateUrl: './admin-new-book.component.html',
  styleUrls: ['./admin-new-book.component.sass']
})
export class AdminNewBookComponent{
  categories$;
  publishers$;
  authors$;
  formats$;
  constructor(private getService : GETService, private postService:POSTService,
              private modalService: NgbModal) {
    this.categories$ = getService.getCategories();
    this.formats$ = getService.getFormats();
    this.publishers$ = getService.getPublishers();
    this.getService.getBooks().subscribe((res)=>{
      console.log('This is the response: ', res)
    }, (err) => {
      console.log('Error :( ', err)
    });
    this.authors$ = getService.getAuthors();
   }

   saveBook(newBook){
     console.log("This is new book: " + newBook);

     this.postService.createBook(newBook).subscribe((response)=>{
      console.log('response from post data is ', response);
    },(error)=>{
      console.log('error during post is ', error)
    })
   }

   addNew(content) {
    this.modalService.open(content, { centered: true });
  }


  saveCategory(newCategory){
    console.log("This is new category "+newCategory);

    this.postService.createCategory(newCategory).subscribe((response)=>{
     console.log('response from post data is ', response);
   },(error)=>{
     console.log('error during post is ', error)
   });
  }
  savePublisher(newPublisher){
    console.log(newPublisher);

    this.postService.createPublisher(newPublisher).subscribe((response)=>{
     console.log('response from post data is ', response);
   },(error)=>{
     console.log('error during post is ', error)
   });
  }

  saveFormat(newFormat){
    console.log(newFormat);

    this.postService.createFormat(newFormat).subscribe((response)=>{
     console.log('response from post data is ', response);
   },(error)=>{
     console.log('error during post is ', error)
   });
  }

  saveAuthor(newAuthor){
    console.log(newAuthor);

    this.postService.createAuthor(newAuthor).subscribe((response)=>{
     console.log('response from post data is ', response);
   },(error)=>{
     console.log('error during post is ', error)
   });
  }
}
