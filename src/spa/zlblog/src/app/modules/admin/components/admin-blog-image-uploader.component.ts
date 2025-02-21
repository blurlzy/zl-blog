import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
// services
import { BlogAdminDataService } from '../blog-admin.data.service';
import { Util } from '../../../core/services/util.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Loader } from '../../../core/services/loader.service';
@Component({
  selector: 'app-admin-blog-image-uploader',
  imports: [CommonModule, MatButtonModule, MatChipsModule],
  template: `
          <form>
            <div class="row border-bottom mb-2 mt-3 py-1">
              <div class="input-group">
                <input type="file" class="form-control" id="inputGroupFile01" aria-label="Upload" multiple (change)="setFilename($event)">
                <button class="btn btn-primary" type="button" id="inputGroupFile01" 
                      [disabled]="selectedFiles.length == 0 || (loader.isLoading | async)"
                      (click)="uploadImages()">Upload</button>         
              </div> 

              <mat-chip-set class="mt-2">
               @for(file of selectedFiles; track file.name) {
                    <mat-chip>{{ file.name }}</mat-chip>
                } 
              </mat-chip-set>

            </div>
        </form>
  `,
  styles: ``
})
export class AdminBlogImageUploaderComponent {
  // event to emit when the images are uploaded successfully
  uploadedSuccess = output<void>();
  // multiple files ( up to 5 images each time )
  selectedFiles: any = [];

  // Inject services & components in the constructor of the component class so they are available to this component:
  private readonly blogAdminDataService = inject(BlogAdminDataService);
  private readonly util = inject(Util);
  private readonly snackbarService = inject(SnackbarService);
  public readonly loader = inject(Loader);

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
  uploadImages(): void {
    const formData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('files', this.selectedFiles[i]);
    }
    // upload files
    this.blogAdminDataService.uploadImages(formData).subscribe(() => {
      this.snackbarService.success('Images uploaded successfully.');
      console.log('Images uploaded successfully.');
      // reset the selected files
      this.selectedFiles = [];
      // emit event to notify the parent component
      this.uploadedSuccess.emit();
    });
  }
}
