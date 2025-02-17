import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// angular material
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
// services
import { BlogAdminDataService } from '../blog-admin.data.service';
import { Util } from '../../../core/services/util.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Loader } from '../../../core/services/loader.service';

@Component({
  selector: 'app-admin-blog-image-list',
  imports: [MatDialogModule, CommonModule, MatButtonModule],
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
          @for (img of images; track img.name) {
              <div class="col-3">
                <div class="card shadow-sm" [class.selected]="img.selected" (click)="toggleSelect(img)">
                  <img [src]="img.uri" class="card-img-top" alt="Image" />
                </div>
              </div>
          }
        </div>
        <form>
            <div class="row border-bottom mb-2 mt-3 py-1">
              <div class="input-group">
                <input type="file" class="form-control" id="inputGroupFile01" aria-label="Upload" multiple (change)="setFilename($event)">
                <button class="btn btn-primary" type="button" id="inputGroupFile01" 
                      [disabled]="selectedFiles.length == 0 || (loader.isLoading | async)"
                      (click)="uploadImages()">Upload</button>         
              </div>          
              <ul class="list-inline mt-2">
                  @for(file of selectedFiles; track file.name) {
                    <li class="list-inline-item me-2 mb-2"><i class="bi bi-image"></i> {{ file.name }} |</li>
                  }     
              </ul>

            </div>
        </form>

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
  `
})
export class AdminBlogImageListComponent {
  images: any[] = [

  ];

  // multiple files ( up to 5 images each time )
  selectedFiles: any = [];

  // Inject services & components in the constructor of the component class so they are available to this component:
  private readonly blogAdminDataService = inject(BlogAdminDataService);
  private readonly dialogRef = inject(MatDialogRef<AdminBlogImageListComponent>);
  private readonly util = inject(Util);
  private readonly snackbarService = inject(SnackbarService);
  public readonly loader = inject(Loader);

  ngOnInit() {
    this.getLatestBlogImages();
  }

  private getLatestBlogImages(): void {
    this.blogAdminDataService.getLatestImages().subscribe((images: any) => {
      this.images = images;
    });
  }

  toggleSelect(image: any) {
    this.images.forEach(item => {
      item.selected = false;
    });

    // Flip the 'selected' boolean
    image.selected = !image.selected;
  }

  selectImage(): void {
    const selectedImage = this.images.find(x => x.selected);
    this.dialogRef.close(selectedImage);
  }

  // select the file to upload
  setFilename(event: any) {
    // reset
    this.selectedFiles = [];
    const files = event.target.files;

    if (files && files.length > 0) {
      // validate the file type, ONLY images are allowed
      for (let i = 0; i < files.length; i++) {
        if (!this.util.isValidImage(files[i].name)) {
          this.snackbarService.error(`Invalid file type: ${files[i].name}.`);
          this.selectedFiles = [];
          return;
        }
      }
      this.selectedFiles = files;
    }

  }

  // upload files to the server
  // reload latest images once upload is successful
  uploadImages(): void {
    const formData = new FormData();
		for (let i = 0; i < this.selectedFiles.length; i++) {
			formData.append('files', this.selectedFiles[i]);
		}
    // upload files
    this.blogAdminDataService.uploadImages(formData).subscribe(() => {
      this.snackbarService.success('Images uploaded successfully.');
      // reload images
      this.getLatestBlogImages();
    });
  }
}
