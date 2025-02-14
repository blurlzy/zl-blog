import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// angular material
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
// services
import { BlogAdminDataService } from '../blog-admin.data.service';

@Component({
  selector: 'app-admin-blog-image-list',
  imports: [ MatDialogModule, CommonModule, MatButtonModule ],
  template: `
      <h2 mat-dialog-title>Latest Blog Images</h2>
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
      </mat-dialog-content>
      <mat-dialog-actions>
        <div class="mb-3 mt-1 full-width">
          <input #fileInput class="form-control" type="file" multiple>
        </div> 
        <button mat-flat-button class="me-3" (click)="selectImage()">Select</button>
        <button mat-button [mat-dialog-close]="false" cdkFocusInitial>Cancel</button>
      </mat-dialog-actions>
  `,
  styles: `
    .card {
      cursor: pointer; /* Show a pointer cursor to indicate clickability */
    }

    .card.selected {
      border: 5px solid #007bff; /* Blue border for selected state */
    }
  `
})
export class AdminBlogImageListComponent {
  images: any[] = [

  ];

  // ctor
  constructor(public dialogRef: MatDialogRef<AdminBlogImageListComponent>,
    private blogAdminDataService: BlogAdminDataService
  ) { 

  }

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
}
