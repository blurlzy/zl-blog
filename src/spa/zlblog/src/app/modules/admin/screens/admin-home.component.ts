import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
// services
import { BlogAdminDataService } from '../blog-admin.data.service';
// components
import { AdminBlogListComponent } from '../components/admin-blog-list.component';

@Component({
  selector: 'app-admin-home',
  imports: [ AdminBlogListComponent, RouterLink, MatButtonModule ],
  template: `
    <div class="row">
      <div class="col-12 mb-2">
         <a mat-flat-button routerLink="/admin/create">New Blog</a>
      </div>
      <div class="col-12">
        <app-admin-blog-list [data]="blogs"></app-admin-blog-list>
      </div>
    </div>
    
  `,
  styles: ``
})
export class AdminHomeComponent {
  blogs: any[] = [];

  // ctor
  constructor(private blogAdminDataService: BlogAdminDataService) { 

  }

  ngOnInit() { 
    this.loadBlogs();
  }

  private loadBlogs() { 
    this.blogAdminDataService.search('', 0, 12)
      .subscribe((pagedList: any) => {
        this.blogs = pagedList.data;
      });
  }
}
