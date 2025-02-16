import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// services
import { BlogDataService } from '../blog.data.service';
import { Loader } from '../../../core/services/loader.service';
// import components
import { BlogListComponent } from '../components/blog-list.component';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatPaginatorModule, BlogListComponent],
  template: `
  <div class="row">
    <div class="col-12 mt-3">
         <app-blog-list [data]="pagedList.data"></app-blog-list>
    </div>
    <mat-paginator 
              [pageSize]="filterFormGroup.value.pageSize"
							[pageIndex]="filterFormGroup.value.pageIndex" 
							[length]="pagedList.total"
              [hidePageSize]="true" 
							[disabled]="(loader.isLoading | async)"
							(page)="pageIndexChanged($event)"            
              showFirstLastButtons
              aria-label="Select page">
</mat-paginator>
  </div>
 
  `,
  styles: ``
})
export class BlogHomeComponent {
  // Inject ActivatedRoute and Router in the constructor of the component class so they are available to this component:
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogDataService = inject(BlogDataService);
  public readonly loader = inject(Loader);

  // properties
  pagedList: any = { data: [], total: 0 };
  // filter form group
  filterFormGroup = new FormGroup({
    keyword: new FormControl(''),
    pageSize: new FormControl(12),
    pageIndex: new FormControl(0)
  });

  ngOnInit() {
    // query params change
    this.activatedRoute.queryParams.subscribe(params => {
      // get the query params
      this.filterFormGroup.patchValue({ keyword: params['keywords'] ?? '' });
      // if keywords is a tag, then filter by tag
      if (params['type'] && params['type'] === 'tag') {
        this.listBlogsByTag(params['keywords'], this.filterFormGroup.value.pageIndex ?? 0, this.filterFormGroup.value.pageSize ?? 12);
      }
      else {
        // search blogs
        this.listBlogs(this.filterFormGroup.value.keyword ?? '', this.filterFormGroup.value.pageIndex ?? 0, this.filterFormGroup.value.pageSize ?? 12);
      }

    });

  }

  // page index changed
  pageIndexChanged(event: PageEvent): void {
    // update the page index in the query string, which will trigger the query params changes event		
    this.router.navigate(['/'], {
      queryParams: {
        pageIndex: event.pageIndex,
        keyword: this.filterFormGroup.value.keyword,
      }
    });
  }

  // list blogs by keywords
  private listBlogs(keywords: string, pageIndex: number, pageSize: number) {
    this.blogDataService.listBlogs(keywords, pageIndex, pageSize).subscribe((data: any) => {
      this.pagedList = data;
    });
  }

  // list blogs by a tag
  private listBlogsByTag(tag: string, pageIndex: number, pageSize: number) {
    this.blogDataService.listBlogsByTag(tag, pageIndex, pageSize).subscribe((data: any) => {
      this.pagedList = data;
    });
  }
}
