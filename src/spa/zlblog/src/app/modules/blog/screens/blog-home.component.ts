import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
// services
import { BlogDataService } from '../blog.data.service';
// import components
import { BlogListComponent } from '../components/blog-list.component';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [BlogListComponent],
  template: `
  <div class="row">
    <div class="col-12 mt-3">
         <app-blog-list [data]="blogs"></app-blog-list>
    </div>
  </div>
 
  `,
  styles: ``
})
export class BlogHomeComponent {
  // Inject ActivatedRoute and Router in the constructor of the component class so they are available to this component:
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly blogDataService = inject(BlogDataService);
  blogs: any = [];
  pager: any = { pageIndex: 0, pageSize: 15};

  ngOnInit() {
    // query params change
    this.activatedRoute.queryParams.subscribe(params => {
      // get the query params
      let keywords = params['keywords'];
      // list latest blogs
      if(!keywords) {
        keywords = '';
      }

      // search blogs
      this.listBlogs(keywords, this.pager.pageIndex, this.pager.pageSize);
    });
  }

  // load latest blogs
  private listBlogs(keywords: string, pageIndex: number, pageSize: number) {
    this.blogDataService.listBlogs(keywords, pageIndex, pageSize).subscribe((data: any) => {
      this.blogs = data.data;
    });
  }
}
