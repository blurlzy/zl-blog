import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
// material
import { MatButtonModule } from '@angular/material/button';
// services
import { BlogDataService } from '../blog.data.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Loader } from '../../../core/services/loader.service';
import { Util } from '../../../core/services/util.service';

@Component({
  selector: 'app-blog-comments',
  imports: [ FormsModule, ReactiveFormsModule, MatButtonModule, DatePipe, CommonModule ],
  template: `
    <section class="comments-section border-top mt-2">            
      <!-- Add a comment form (static example) -->     
      @if(showCommentForm) {
         <button type="button" class="btn btn-link mt-2" (click)="toggleCommentForm()">Cancel</button>
      } 
      @else {
    
        <button type="button" class="btn btn-light mt-2" (click)="toggleCommentForm()"> <i class="bi bi-chat"></i> Add a Comment</button>
      }
      
      @if (showCommentForm) {
        <form [formGroup]="form">
          <div class="row mt-1 ms-2 py-2 border border-secondary rounded">
              <div class="mt-2 mb-3">            
                <input  type="text" class="form-control" formControlName="by" placeholder="Your name" maxlength="50">
              </div>
              <div class="mb-3">               
                <textarea  class="form-control" rows="3" formControlName="commentText" placeholder="Write your comment here" maxlength="250"></textarea>
              </div>
              <div>
                <button mat-flat-button (click)="createComment()" [disabled]="form.invalid || (loader.isLoading | async)">Submit</button>
              </div>              
          </div>
        </form>
      }

      <!-- comment list -->
      <div class="list-group list-group-flush scrollarea mt-1 col-10">
        
        @for(comment of comments; track comment.id) { 
            <div class="list-group-item list-group-item-action py-3 ">
              <div class="d-flex w-100 align-items-center justify-content-between">
                <strong class="mb-1"><i class="bi bi-person-fill"></i> {{ comment.name }}</strong>
                <small class="text-muted"> <i class="bi bi-calendar"></i> {{ comment.createdOn | date : 'MMM d, y, hh:mm' }} </small>
              </div>
              <div class="col-10 mb-1 small">
                <figcaption style="white-space: pre-line">
                  {{ comment.commentText }}
                </figcaption>
              </div>
            </div>
        }

		  </div>
      
    </section>
  `,
  styles: `
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
export class BlogCommentsComponent {
  @Input({ required: true }) blogId: string = '';

  // inject services
  private readonly fb = inject(FormBuilder);
  private readonly blogDataService = inject(BlogDataService);
  private readonly snackbarService = inject(SnackbarService);
  public readonly loader = inject(Loader);
  public readonly util = inject(Util);

  comments: any[] = [];
  showCommentForm: boolean = false;

  // form group
  form: FormGroup = this.fb.group({    
    blogId: new FormControl(''),
    commentText: new FormControl('', [Validators.required]),
    by: new FormControl('', [Validators.required]),
  });

  ngOnInit() { 
    if (this.blogId && this.blogId.length > 0) {
      if(this.util.isValidGUID(this.blogId)) {
        this.getComments();
      }      
    }    
  }

  private getComments() { 
    this.blogDataService.listComments(this.blogId).subscribe((res: any) => {
      this.comments = res;
    });
  }

  toggleCommentForm() { 
    this.showCommentForm = !this.showCommentForm;
  }
  // create a comment
  createComment() { 
    // patch the blog id
    this.form.patchValue({ blogId: this.blogId });    
    // ensure the length of the comment
    if (this.form.value.commentText.length > 250) {
      this.snackbarService.error('Comment should not exceed 250 characters');
      return;
    }
    
    this.blogDataService.createComment(this.form.value).subscribe((res: any) => {
      this.snackbarService.success('Comment added successfully');
      // console.log(res);
      // add the comment to the list
      this.comments.push(res);
      // reset form
      this.form.reset();
    });
  }

}
