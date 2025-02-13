import { Component } from '@angular/core';
// services
import { BlogDataService } from '../blog.data.service';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [ DatePipe, UpperCasePipe, SafeHtmlPipe ],
  template: `
    @for (blog of blogs; track blog) {
        <article>        
            <h2 class="article-title"> {{ blog.title }} </h2>
            <p class="article-meta">Posted on {{ blog.createdOn | date : 'MMM d, y, hh:mm' | uppercase }} by {{ blog.userName }}</p>
                    
            <ul class="list-inline">
              <li class="list-inline-item">
                <i class="bi bi-tags"></i> Tags: 
              </li>
              <li class="list-inline-item">
                <span class="badge bg-secondary">Tech</span>
              </li>
                <li class="list-inline-item">
                <span class="badge bg-secondary">Other</span>
              </li>
            </ul>

            <!-- html content -->
            <div [innerHTML]="blog.content | safeHtml" class="article-container"></div>

            <!-- COMMENTS SECTION (only the count, no individual comments) -->
            <section class="comments-section mt-4">
              <h3>Comments (2)</h3>
            </section>
        </article>
    }

  `,
  styles: `
      .article-container {
      
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
      console.log(this.blogs);
    });
  }
}
