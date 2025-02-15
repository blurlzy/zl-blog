import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
// quill editor
import { EditorChangeContent, EditorChangeSelection, QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
// auth0
import { AuthService } from '@auth0/auth0-angular';
// services
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Loader } from '../../../core/services/loader.service';
import { BlogAdminDataService } from '../blog-admin.data.service';
import { Util } from '../../../core/services/util.service';
// components
import { AdminBlogImageListComponent } from '../components/admin-blog-image-list.component';

@Component({
  selector: 'app-admin-blog-form',
  imports: [QuillEditorComponent, CommonModule, FormsModule, ReactiveFormsModule, MatChipsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h4 class="mb-3">Blog Editor</h4>

    <form [formGroup]="form">
      <div class="mb-3 col-10">  
        <mat-form-field class="full-width" appearance="outline">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title">
        </mat-form-field>
      </div>

      <div class="mb-2 col-10">
        <mat-form-field class="full-width" appearance="outline">
          <mat-label>Tags</mat-label>
          <mat-chip-grid #chipList>
            <mat-chip-row *ngFor="let tag of tags" (removed)="remove(tag)">
              {{tag}}
              <button matChipRemove>
                <i class="bi bi-x-circle-fill"></i>
              </button>
            </mat-chip-row>
            <input [matChipInputFor]="chipList"
              [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
              [matChipInputAddOnBlur]="addOnBlur"
              (matChipInputTokenEnd)="add($event)">
          </mat-chip-grid>
        </mat-form-field>
      </div>

      @if (htmlEditorEnabled) {
        <div class="mb-1">
          <button type="button" class="btn btn-light" (click)="toogleHtmlEditr()"><i class="bi bi-code"></i> Code</button>
          <button type="button" class="btn btn-light ms-2" (click)="openImageListDialog()"><i class="bi bi-images"></i> Upload Images</button>            
        </div>
        
        <quill-editor [styles]="{height: '580px'}"  format="html" formControlName="content"></quill-editor>
      }
      @else {
        <div class="mb-1">
          <button type="button" class="btn btn-light" (click)="toogleHtmlEditr()"><i class="bi bi-code-slash"></i> Editor</button> 
        </div>
        <textarea class="form-control editor" formControlName="content"></textarea>
      }      

        <div class="col-10 mt-3">
          <button type="submit" class="btn btn-primary me-3" [disabled]="form.invalid || (loader.isLoading | async)" (click)="saveBlog()">Save</button>
          <button type="submit" class="btn btn-light" (click)="goBack()">Cancel</button>
          @if (editing) {
            @if (form.value.published) {
              <button class="btn btn-secondary float-end" disabled>Published <i class="bi bi-check-lg"></i></button>
            }
            @else {
              <button class="btn btn btn-outline-success float-end" (click)="publishBlog()">Publish <i class="bi bi-arrow-right"></i></button>
            }            
          }
          
      </div>     
    </form>
  `,
  styles: `
    .editor {
      height: 520px;
    }
  `
})
export class AdminBlogFormComponent {  
  // form group
  form: FormGroup = this.fb.group({    
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    tags: new FormControl(''),
    id:'',
    published: false
  });

  // mat chip list configs
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  tags: string[] = [];
  htmlEditorEnabled = true;
  editing = false;
  // Inject ActivatedRoute and Router in the constructor of the component class so they are available to this component:
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // ctor
  constructor(private sanitizer: DomSanitizer,
    public auth: AuthService,
    private fb: FormBuilder,    
    private location: Location,
    public loader: Loader,
    public snackbarService: SnackbarService,
    public util: Util,
    private blogAdminDataService: BlogAdminDataService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    // ensure blog id is GUID    
    if(blogId && blogId.length > 10){
      this.editing = true;
      this.getBlog(blogId);
    }
    //console.log(blogId);
    this.auth.getAccessTokenSilently().subscribe(token => {
      console.log(token);
     });
  }

  toogleHtmlEditr(): void {
    this.htmlEditorEnabled = !this.htmlEditorEnabled;
  }

  // add a tag into tag list
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  // remove a tag from the tag list
  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  goBack(): void {
    // This tells the browser to move back one step in its history
    this.location.back();
  }

  openImageListDialog(): void { 
    const dialogRef = this.dialog.open(AdminBlogImageListComponent, {
      width: '750px',
      maxWidth: '750px',
      hasBackdrop: true,
    });

    // when an image is selected
    dialogRef.afterClosed().subscribe(result => {
      if(result.name){
        // create image tag
        const imgTag = this.util.createImgHtml(result.uri, result.name);
        // add image to the editor
        this.form.patchValue({ content: this.form.value.content + imgTag });
      }
    });
  }

  // create a new blog
  createBlog(): void { 
    // this.form.patchValue({ tags: this.tags.join(',') });
    this.blogAdminDataService.createBlog(this.form.value).subscribe((res) => {
      this.snackbarService.success('Blog created successfully');    
      // redirect to edit page
      this.router.navigate(['/admin/edit', res.id]);
    });
    
  }

  // update a blog
  updateBlog(): void { 
    // this.form.patchValue({ tags: this.tags.join(',') });
    this.blogAdminDataService.updateBlog(this.form.value).subscribe((res) => {
      this.snackbarService.success('Blog updated successfully');
    });
  } 

  saveBlog(): void {
    // convert tags
    this.form.patchValue({ tags: this.tags.join(',') });
    if(this.editing) {
      this.updateBlog();
      return;
    }

    this.createBlog();
  }

  getBlog(id:string): void {
    this.blogAdminDataService.getBlogById(id).subscribe((res) => {
      // patch form values
      this.form.patchValue({
        title: res.title,
        content: res.content,
        tags: res.tags,
        id: res.id,
        published: res.published       
      });

      // set tags
      this.tags = res.tags?? [];
    });
  }

  publishBlog(): void { 
    this.blogAdminDataService.publishBlog(this.form.value.id as string).subscribe((res) => {
      this.snackbarService.success('Blog published successfully');
      this.router.navigate(['/admin']);
    });

  }
}
