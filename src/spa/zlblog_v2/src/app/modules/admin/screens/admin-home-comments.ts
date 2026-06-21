import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
// material
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// services
import { BlogAdminDataService } from '../admin.data.service';
// components
import { AdminBlogCommentList } from '../components/admin-blog-comment-list';
@Component({
  selector: 'app-admin-home-comments',
  imports: [ ReactiveFormsModule, MatPaginatorModule, AdminBlogCommentList ],
  template: ` 
    <div class="row">
        <div class="col-12 mt-3">
          <app-admin-blog-comment-list [data]="pagedList().data" (deletedSuccess)="callback($event)"></app-admin-blog-comment-list>
        </div>
        <mat-paginator 
                [pageSize]="filterFormGroup.value.pageSize"
                [pageIndex]="filterFormGroup.value.pageIndex" 
                [length]="pagedList().total"
                [hidePageSize]="true" 
                (page)="pageIndexChanged($event)"            
                showFirstLastButtons
                aria-label="Select page">
      </mat-paginator>
    </div>
  `,
  styles: ``,
})
export class AdminHomeComments {
  // Inject ActivatedRoute and Router in the constructor of the component class so they are available to this component:
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogAdminDataService = inject(BlogAdminDataService);

  // properties
  pagedList = signal({ data: [], total: 0 });
  // filter form group
  filterFormGroup = new FormGroup({
    pageSize: new FormControl(12),
    pageIndex: new FormControl(0)
  });

    ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      // retrive the query params
      this.filterFormGroup.patchValue({
        pageIndex: params['pageIndex'] ? +params['pageIndex'] : 0,
      });

      // reset the result      			
      this.pagedList.set({ data: [], total: 0 });

      // load images
      this.loadComments(this.filterFormGroup.value.pageIndex ?? 0, this.filterFormGroup.value.pageSize ?? 12);
    });
  }

  // page index changed
  pageIndexChanged(event: PageEvent): void {
    // update the page index in the query string, which will trigger the query params changes event		
    this.router.navigate(['/admin/images'], {
      queryParams: {
        pageIndex: event.pageIndex,
      }
    });
  }

  // callback
 callback(id: string): void {
    console.log('deleted comment id: ', id);
    // remove the deleted comment from the list
    this.pagedList.update(pagedList => ({
      ...pagedList,
      data: pagedList.data.filter((item: any) => item.id !== id)
    }));
  }

  private loadComments(pageIndex: number, pageSize: number): void {
    this.blogAdminDataService.getComments(pageIndex, pageSize)
      .subscribe((result: any) => {
        // update the result
        this.pagedList.set(result);
      });
  }
}
