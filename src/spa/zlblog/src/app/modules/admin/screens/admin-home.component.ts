import { Component, inject } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
// material
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// services
import { BlogAdminDataService } from '../blog-admin.data.service';
// components
import { AdminBlogListComponent } from '../components/admin-blog-list.component';

@Component({
  selector: 'app-admin-home',
  imports: [ReactiveFormsModule, MatPaginatorModule, RouterLink, MatButtonModule, AdminBlogListComponent],
  template: `
        <div class="row">
            <div class="col-12 mb-2">
              <a mat-flat-button routerLink="/admin/create">New Blog</a>
            </div>
            <div class="col-12">
              <app-admin-blog-list [data]="pagedList.data"></app-admin-blog-list>
            </div>
            <mat-paginator 
                    [pageSize]="filterFormGroup.value.pageSize"
                    [pageIndex]="filterFormGroup.value.pageIndex" 
                    [length]="pagedList.total"
                    [hidePageSize]="true" 
                    (page)="pageIndexChanged($event)"            
                    showFirstLastButtons
                    aria-label="Select page">
          </mat-paginator>
        </div>
    
  `,
  styles: ``
})
export class AdminHomeComponent {
  // Inject ActivatedRoute and Router in the constructor of the component class so they are available to this component:
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogAdminDataService = inject(BlogAdminDataService);
  // properties
  pagedList: any = { data: [], total: 0 };
  // filter form group
  filterFormGroup = new FormGroup({
    keyword: new FormControl(''),
    pageSize: new FormControl(15),
    pageIndex: new FormControl(0)
  });

  //blogs: any[] = [];


  ngOnInit() {
    // query params change
    this.activatedRoute.queryParams.subscribe(params => {
      const pageIndex = +params['pageIndex'];
			// retrive the query params
			this.filterFormGroup.patchValue({
				pageIndex: pageIndex ? pageIndex : 0,
				keyword: params['keywords'] ?? '',        
			});
      
      // load blogs
      this.loadBlogs(this.filterFormGroup.value.keyword ?? '', this.filterFormGroup.value.pageIndex ?? 0, this.filterFormGroup.value.pageSize ?? 15);
    });

  }

  private loadBlogs(keyword: string, pageIndex: number, pageSize: number) {
    this.blogAdminDataService.search(keyword, pageIndex, pageSize)
      .subscribe((pagedList: any) => {
        this.pagedList = pagedList;
        // this.blogs = pagedList.data;
        // console.log(this.blogs);
      });
  }

  // page index changed
  pageIndexChanged(event: PageEvent): void {
    // update the page index in the query string, which will trigger the query params changes event		
    this.router.navigate(['/admin'], {
      queryParams: {
        pageIndex: event.pageIndex,
        keyword: this.filterFormGroup.value.keyword,
      }
    });
  }
}
