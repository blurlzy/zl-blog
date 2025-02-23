import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
// material
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
// services
import { BlogAdminDataService } from '../blog-admin.data.service';
import { Util } from '../../../core/services/util.service';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-admin-blog-preview',
  imports: [RouterLink, MatChipsModule, MatButtonModule, SafeHtmlPipe, DatePipe, UpperCasePipe,],
  template: `
    <div class="row">
      <div class="col-12 mt-2">
            <div class="mb-3">
              <h1 class="post-title"> {{ blog.title }}</h1>
              <p class="post-meta"><i class="bi bi-calendar-event"></i> {{ blog.createdOn | date : 'MMM d, y, hh:mm' | uppercase }} <i class="bi bi-person-fill ms-1"></i> {{ blog.userName }}</p>
              <mat-chip-set>
                @for (tag of blog.tags; track tag) { 
                  <mat-chip>
                    <a [routerLink]="['/']" [queryParams]="{ keywords: tag, type: 'tag' }" class="link-dark link-underline-opacity-0">  
                      <i class="bi bi-tag"></i> {{ tag }}
                    </a> 
                  </mat-chip>
                }           
              </mat-chip-set>
            </div>

            <!-- blog content -->
            <div class="post-content" [innerHTML]="blog.content | safeHtml"></div>

      </div>
    </div>
  `,
  styles: `
  .post-title {
      font-size: 1.75rem;     
    }
    
  .post-meta {
      font-size: 0.875rem;
      color: #6c757d; /* Light gray for meta info */   
    }
  `
})
export class AdminBlogPreviewComponent {
  blogId: string = '';
  blog: any = {};

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogAdminDataService = inject(BlogAdminDataService);
  private readonly util = inject(Util);

  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id') ?? '';
    this.getBlog(this.blogId);
  }

  private getBlog(id:string) { 
    this.blogAdminDataService.getBlogById(id).subscribe(data => { 
      this.blog = data;
    });
  }
}
