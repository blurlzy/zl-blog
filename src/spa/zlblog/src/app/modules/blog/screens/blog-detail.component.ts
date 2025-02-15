import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
// material
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
// services
import { BlogDataService } from '../blog.data.service';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink, MatChipsModule, MatButtonModule, SafeHtmlPipe, DatePipe, UpperCasePipe],
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

            <div class="post-content" [innerHTML]="blog.content | safeHtml"></div>

            <section class="comments-section my-2">
              <p> <i class="bi bi-chat-left"></i> Comments (2)</p>

              <!-- Example existing comments -->
              <div class="comment-box">
                <strong>Alice:</strong>
                <p class="mb-0">Great post! I'm definitely trying these tips.</p>
              </div>

              <!-- Add a comment form (static example) -->
              <h5 class="mt-4">Add a Comment</h5>
              <form>
                <div class="mb-3">
                  <label for="commentName" class="form-label">Name</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="commentName" 
                    placeholder="Your name"
                  >
                </div>
                <div class="mb-3">
                  <label for="commentContent" class="form-label">Comment</label>
                  <textarea 
                    class="form-control" 
                    id="commentContent" 
                    rows="3" 
                    placeholder="Write your comment here"
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-dark">Submit</button>
              </form>
            </section>

            <!-- Back / Continue Navigation (Optional) -->
            <div class="d-flex justify-content-between my-1 mt-3">
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


    .comment-box {
      border: 1px solid #dee2e6;
      border-radius: 0.25rem;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .comment-box strong {
      display: block;
      margin-bottom: 0.1rem;
    }
  `
})
export class BlogDetailComponent {
  blog: any = {};

  // Inject ActivatedRoute and Router in the constructor of the component class so they are available to this component:
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogDataService = inject(BlogDataService);


  ngOnInit() {
    const blogId = this.route.snapshot.paramMap.get('id');
    // ensure blog id is GUID    
    if(blogId && blogId.length > 10){
      this.getBlog(blogId);
    }
  }

  // get blog
  private getBlog(id: string): void {
    this.blogDataService.getBlog(id).subscribe((data: any) => {
      this.blog = data;
      console.log(data);
    });
  }
}
