import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
// material
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
// services
import { BlogDataService } from '../blog.data.service';
import { Util } from '../../../core/services/util.service';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';
// components
import { BlogCommentsComponent } from '../components/blog-comments.component';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink, MatChipsModule, MatButtonModule, SafeHtmlPipe, DatePipe, UpperCasePipe,
    BlogCommentsComponent
  ],
  template: `
    <div class="row">
      <div class="col-12 mt-3">
            <div class="mb-3">
              <h2 class="post-title"> {{ blog.title }}</h2>
              <p class="post-meta"><i class="bi bi-calendar-event me-1"></i> {{ blog.createdOn | date : 'MMM d, y, hh:mm' | uppercase }} <i class="bi bi-person-fill ms-1"></i> {{ blog.userName }}</p>
              <mat-chip-set>
                @for (tag of blog.tags; track tag) { 
                  <mat-chip>
                    <a [routerLink]="['/']" [queryParams]="{ keywords: tag, type: 'tag' }" class="link-dark link-underline-opacity-0 article-meta-tag">  
                      <i class="bi bi-tag"></i> {{ tag }}
                    </a> 
                  </mat-chip>
                }           
              </mat-chip-set>
            </div>

            <!-- blog content -->
            <div [innerHTML]="blog.content | safeHtml"></div>

            <!-- comments -->
            <app-blog-comments [blogId]="blogId"></app-blog-comments>
            
            <div class="d-flex justify-content-between mt-1 mb-2">
              <a class="btn btn-outline-dark mt-3" routerLink="/"role="button"><i class="bi bi-arrow-left"></i> Back to Home</a>   
            </div>
      </div>
    </div>
  `,
  styles: `
    .post-title {
      font-size: 1.75rem;
    }
    
    .post-meta {
      font-size: 0.85rem;
      color: #6c757d; /* Light gray for meta info */
    }
  `
})
export class BlogDetailComponent {
  blogId: string = '';
  blog: any = {};

  // Inject ActivatedRoute and Router in the constructor of the component class so they are available to this component:
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogDataService = inject(BlogDataService);
  private readonly util = inject(Util);


  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id') ?? '';
    // validate blog id
    if(!this.util.isValidGUID(this.blogId)) {
      // route to home
      this.router.navigate(['/404']);
      return;
    }

    // get blog by id
    this.getBlog(this.blogId);
  }

  // get blog
  private getBlog(id: string): void {
    this.blogDataService.getBlog(id).subscribe((data: any) => {
      this.blog = data;

      // set meta tags
      this.util.setMetaTags(this.blog);
    });
  }

}
