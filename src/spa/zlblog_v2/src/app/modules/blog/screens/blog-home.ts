import { Component, inject, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
// angular material
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// services
import { BlogDataService } from '../blog.data.service';
import { Util } from '../../../core/services/util.service';
// components
import { BlogList } from '../components/blog-list';
import { RightNav } from '../components/right-nav';

@Component({
  selector: 'app-blog-home',
  imports: [CommonModule,RouterLink, ReactiveFormsModule, MatPaginatorModule, BlogList, RightNav],
  template: ` 
    <div class="page-wrap">
      <!-- LEFT: MAIN CONTENT  -->
      <div class="content-col">

        <!--  intro  -->
        <section class="page-intro">
          <a routerLink="/"><h1 class="page-title">Not Just <i class="bi bi-pencil-square"></i> Tech</h1></a>
          <p class="page-desc">🎯 Published when I have something worth sharing.</p>
        </section>

        <!-- blog list -->
        <app-blog-list [data]="pagedList().data"></app-blog-list>

        <!-- pagination  -->
        <div class="load-more-wrap">
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

      </div><!-- /content-col -->

      <!--  RIGHT: SIDEBAR  -->
      <app-right-nav></app-right-nav>

    </div><!-- /page-wrap -->
  
  `,
  styles: ``,
})
export class BlogHome {
  // inject services
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogDataService = inject(BlogDataService);
  public readonly util = inject(Util);

  private readonly pageSize = 8;
  // properties
  pagedList = signal<any>({ data: [], total: 0 });
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
      this.pagedList.set({ data: [], total: 0 });
      // ensure it scrolls to the top of the page
      window.scroll(0, 0);
      // if keywords is a tag, then filter by tag
      if (params['type'] && params['type'] === 'tag') {
        this.listBlogsByTag(this.filterFormGroup.value.keywords ?? '', this.filterFormGroup.value.pageIndex ?? 0, this.filterFormGroup.value.pageSize ?? this.pageSize);
      }
      else {
        // search blogs
        this.listBlogs(this.filterFormGroup.value.keywords ?? '', this.filterFormGroup.value.pageIndex ?? 0, this.filterFormGroup.value.pageSize ?? this.pageSize);
      }
    });

    // reset meta tags
    this.util.resetMetaTags();
  }

  // list blogs by keywords
  private listBlogs(keywords: string, pageIndex: number, pageSize: number) {
    this.blogDataService.listBlogs(keywords, pageIndex, pageSize).subscribe((data: any) => {
      this.pagedList.set(data);  
    });
  }

  // list blogs by a tag
  private listBlogsByTag(tag: string, pageIndex: number, pageSize: number) {
    this.blogDataService.listBlogsByTag(tag, pageIndex, pageSize).subscribe((data: any) => {
      this.pagedList.set(data);
    });
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
}
