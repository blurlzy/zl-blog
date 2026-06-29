import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// angular material
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
// services
import { BlogAdminDataService } from '../admin.data.service';
import { Util } from '../../../core/services/util.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Loader } from '../../../core/services/loader.service';
// components
import { AdminBlogImageUploader } from './admin-blog-image-uploader';

@Component({
  selector: 'app-admin-blog-image-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule, AdminBlogImageUploader],
  template: ` 
      <h2 mat-dialog-title>
          Latest Blog Images
          @if (loader.isLoading | async) { 
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Uploading...</span>
            </div>
          }      
      </h2>
      <mat-dialog-content>
        <div class="row">
          @for (img of images(); track img.name) {
              <div class="col-3">
                <div class="card shadow-sm" [class.selected]="img.selected" (click)="toggleSelect(img)">
                  <img [src]="img.uri" class="card-img-top" alt="Image" />
                </div>
              </div>
          }
        </div>
        
        <!-- uploader -->
        <app-admin-blog-image-uploader (uploadedSuccess)="callback()"></app-admin-blog-image-uploader>

      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-flat-button class="me-3" (click)="selectImage()">Select</button>
        <button mat-button [mat-dialog-close]="false" cdkFocusInitial>Cancel</button>
      </mat-dialog-actions>
  `,
  styles: `
    .card {
      margin-top: 10px;
      cursor: pointer; /* Show a pointer cursor to indicate clickability */
    }

    .card.selected {
      border: 3px solid #ed008c; /* Blue border for selected state */
    }
  `,
})
export class AdminBlogImageDialog {
  images = signal<any[]>([]);


  // Inject services & components in the constructor of the component class so they are available to this component:
  private readonly blogAdminDataService = inject(BlogAdminDataService);
  private readonly dialogRef = inject(MatDialogRef<AdminBlogImageDialog>);
  private readonly util = inject(Util);
  private readonly snackbarService = inject(SnackbarService);
  public readonly loader = inject(Loader);

  ngOnInit() {
    this.getLatestBlogImages();
  }

  private getLatestBlogImages(): void {
    this.blogAdminDataService.getLatestImages().subscribe((images: any) => {
      this.images.set(images);
    });
  }

  toggleSelect(image: any) {
    this.images().forEach(item => {
      item.selected = false;
    });

    // Flip the 'selected' boolean
    image.selected = !image.selected;
  }

  selectImage(): void {
    const selectedImage = this.images().find(x => x.selected);
    this.dialogRef.close(selectedImage);
  }

  callback() { 
    this.getLatestBlogImages();
  }
}
