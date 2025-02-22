import { Component, Inject, inject, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
// angular material
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
// services
import { BlogAdminDataService } from '../blog-admin.data.service';
import { SnackbarService } from '../../../core/services/snackbar.service';  
// components
import { ConfirmDialogComponent } from '../../../core/components/confirm-dialog.component';

@Component({
  selector: 'app-admin-blog-comment-list',
  imports: [ CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
      <table class="table table-striped table-hover">
          <thead>
              <tr>
                <th scope="col">Comment</th>              
                <th scope="col">Blog Id</th>
                <th scope="col">Created</th>
                <th scope="col"></th>
              </tr>
          </thead>
          <tbody>
            @for(item of data;track item.id) {
              <tr>
                  <td class="align-middle"> {{ item.commentText}} </td>
                  <td class="align-middle"> {{ item.blogId }} </td>
                
                  <td class="align-middle">{{ item.createdOn | date : 'MMM d, y, HH:mm' }} </td>
                  <td class="align-middle">
                    <button mat-icon-button [matMenuTriggerFor]="menu">
                        <mat-icon>more_vert</mat-icon>
                      </button>
                      <mat-menu #menu="matMenu">
                        <button mat-menu-item (click)="delete(item.blogId, item.id)">
                            <i class="bi bi-trash-fill"></i> Delete
                        </button>
                      </mat-menu>
                  </td>
              </tr>
            }
          </tbody>
      </table>
  `,
  styles: ``
})
export class AdminBlogCommentListComponent {
  @Input({ required: true }) data: any[] = [];
  deletedSuccess = output<string>(); // emit the deleted comment id
  
  // inject services
  private readonly dialog = inject(MatDialog);
  private readonly blogAdminDataService = inject(BlogAdminDataService);
  private readonly snackbarService = inject(SnackbarService);

  // delete
  delete(blogId:string, id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '380px',
      data: { message: 'Are you sure you want to delete this comment?' },
      hasBackdrop: true,
    });

    // confirmed
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.blogAdminDataService.deleteComment(blogId, id).subscribe(() => {
          // show snackbar
          this.snackbarService.success('Comment deleted successfully');
          // emit the deleted comment id
          this.deletedSuccess.emit(id);
        });                 
      }
    });
  }
}
