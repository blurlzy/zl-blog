import { Component, inject } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
// material
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// services
import { BlogAdminDataService } from '../blog-admin.data.service';
// components
import { AdminBlogImageListComponent } from '../components/admin-blog-image-list.component';

@Component({
  selector: 'app-admin-home-images',
  imports: [
    ReactiveFormsModule, MatPaginatorModule, MatButtonModule, AdminBlogImageListComponent
  ],
  template: `
      <div class="row">

          <div class="col-12 mt-3">
            <app-admin-blog-image-list [data]="pagedList.data"></app-admin-blog-image-list>
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
export class AdminHomeImagesComponent {
  // Inject ActivatedRoute and Router in the constructor of the component class so they are available to this component:
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogAdminDataService = inject(BlogAdminDataService);

  // properties
  pagedList: any = { data: [], total: 0 };
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
      this.pagedList = { data: [], total: 0 };

      // load images
      this.loadImages(this.filterFormGroup.value.pageIndex ?? 0, this.filterFormGroup.value.pageSize ?? 12);
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

  private loadImages(pageIndex: number, pageSize: number) {
    this.blogAdminDataService.getImages(pageIndex, pageSize)
      .subscribe((result: any) => {
        this.pagedList = result;
        console.log(result);
      });
  }
}
