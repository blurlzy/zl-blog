import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
// angular material
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// services
import { BlogDataService } from '../blog.data.service';
import { Loader } from '../../../core/services/loader.service';
import { Util } from '../../../core/services/util.service';
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
  public readonly util = inject(Util);

  private readonly pageSize = 5;
  // properties
  pagedList: any = { data: [], total: 0 };
  // filter form group
  filterFormGroup = new FormGroup({
    keywords: new FormControl(''),
    type: new FormControl(''),
    pageSize: new FormControl(this.pageSize),
    pageIndex: new FormControl(0)
  });

  ngOnInit() {
    // query params change
    this.activatedRoute.queryParams.subscribe(params => {
      const pageIndex = +params['pageIndex'];
      // retrive the query params
      this.filterFormGroup.patchValue({
        pageIndex: pageIndex ? pageIndex : 0,
        keywords: params['keywords'] ?? '',
        type: params['type'] ?? ''
      });

      // reset the result      			
      this.pagedList = { data: [], total: 0 };
      // if keywords is a tag, then filter by tag
      if (params['type'] && params['type'] === 'tag') {
        this.listBlogsByTag(this.filterFormGroup.value.keywords ?? '', this.filterFormGroup.value.pageIndex ?? 0, this.filterFormGroup.value.pageSize ?? this.pageSize);
      }
      else {
        // search blogs
        this.listBlogs(this.filterFormGroup.value.keywords ?? '', this.filterFormGroup.value.pageIndex ?? 0, this.filterFormGroup.value.pageSize ?? this.pageSize);
      }

      // ensure it scrolls to the top of the page
      // window.scroll(0, 0);     
    });

    // reset meta tags
    this.util.resetMetaTags();
  }

  // page index changed
  pageIndexChanged(event: PageEvent): void {
    // update the page index in the query string, which will trigger the query params changes event		
    this.router.navigate(['/'], {
      queryParams: {
        pageIndex: event.pageIndex,
        keywords: this.filterFormGroup.value.keywords,
        type: this.filterFormGroup.value.type
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

  // keyboard event handler - right / left arrow keys
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    //console.log(event); 
    const totalPages = Math.ceil(this.pagedList.total / this.pageSize);
    const currentPageIndex = this.filterFormGroup.value.pageIndex ?? 0;
    let newPageIndex = currentPageIndex;

    if (event.key === 'ArrowLeft') {
      if (currentPageIndex > 0) {
        // go to previous page
        newPageIndex = currentPageIndex - 1;
      }
    }

    if (event.key === 'ArrowRight') {
      if (currentPageIndex < totalPages - 1) {
        // go to next page
        newPageIndex = currentPageIndex + 1;
       
      }
    }

    if (newPageIndex !== currentPageIndex) {
      // update the page index in the query string, which will trigger the query params changes event		
      this.router.navigate(['/'], {
        queryParams: {
          pageIndex: newPageIndex,
          keywords: this.filterFormGroup.value.keywords,
          type: this.filterFormGroup.value.type
        }
      });
    }
  }
}
