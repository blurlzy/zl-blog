import { Component } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
// material
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
// services
import { BlogDataService } from '../blog.data.service';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [ MatChipsModule, DatePipe, UpperCasePipe, SafeHtmlPipe ],
  template: `
    @for (blog of blogs; track blog) {
        <article>        
            <h2 class="article-title"> {{ blog.title }} </h2>
            <p class="article-meta">Posted on {{ blog.createdOn | date : 'MMM d, y, hh:mm' | uppercase }} by {{ blog.userName }}</p>
            
            <mat-chip-set>
              @for (tag of blog.tags; track tag) { 
                <mat-chip>
                  {{ tag }}
                </mat-chip>
              }           
            </mat-chip-set>


            <!-- html content -->
            <div [innerHTML]="blog.content | safeHtml" class="article-container mt-2"></div>

            <!-- COMMENTS SECTION (only the count, no individual comments) -->
            <section class="comments-section mt-2">
              <h3>Comments (2)</h3>
            </section>
        </article>
    }

  `,
  styles: `
    .article-container {
        word-wrap: break-word; /* Ensures long words break */
        overflow-wrap: break-word;
    }
      .article-container img {
        width: 100%;
        height: auto;
        display: block; /* prevents inline spacing issues in some cases */
      }
  `
})
export class BlogListComponent {
  blogs:any = [];

  constructor(private blogDataService: BlogDataService) { }

  ngOnInit() {
    this.listBlogs();
  }

  // load latest blogs
  private listBlogs() { 
    this.blogDataService.listBlogs(0, 10).subscribe((data: any) => {
      this.blogs = data.data;
    });
  }
}
