import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
// material
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
// services
import { BlogDataService } from '../blog.data.service';
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
            <div class="mb-2">
              <h1 class="post-title"> {{ blog.title }}</h1>
              <p class="post-meta"><i class="bi bi-calendar-event"></i> {{ blog.createdOn | date : 'MMM d, y, hh:mm' | uppercase }} <i class="bi bi-person-fill ms-1"></i> {{ blog.userName }}</p>
              <mat-chip-set>
                @for (tag of blog.tags; track tag) { 
                  <mat-chip>
                    {{ tag }}
                  </mat-chip>
                }           
              </mat-chip-set>
            </div>

            <!-- blog content -->
            <div class="post-content" [innerHTML]="blog.content | safeHtml"></div>

            <!-- comments -->
            <app-blog-comments [blogId]="blogId"></app-blog-comments>
            
            <div class="d-flex justify-content-between mt-1 mb-2">
              <a mat-button routerLink="">&larr; Back to Home</a>     
            </div>
      </div>
    </div>
  `,
  styles: `
    .post-title {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .post-meta {
      font-size: 0.875rem;
      color: #6c757d; /* Light gray for meta info */
      margin-bottom: 1rem;
    }

    .post-content {
      word-wrap: break-word; /* Ensures long words break */
      overflow-wrap: break-word;
    }
      .post-content img {
        max-width: 100%; /* Ensure images are responsive */
        height: auto;
        display: block;
        margin: 1rem 0;
      }
  `
})
export class BlogDetailComponent {
  blogId: string  = '';
  blog: any = {};

  // Inject ActivatedRoute and Router in the constructor of the component class so they are available to this component:
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogDataService = inject(BlogDataService);


  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id') ?? '';
    // ensure blog id is GUID    
    if(this.blogId && this.blogId.length > 10){
      this.getBlog(this.blogId);
    }
  }

  // get blog
  private getBlog(id: string): void {
    this.blogDataService.getBlog(id).subscribe((data: any) => {
      this.blog = data;
    });
  }
}
