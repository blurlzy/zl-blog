import { Component, Input, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
// angular material
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// services
import { BlogAdminDataService } from '../blog-admin.data.service';
import { Loader } from '../../../core/services/loader.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-admin-blog-list',
  imports: [DatePipe, RouterLink, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
       <table class="table table-striped table-hover">
        <thead>
            <tr>
              <th scope="col">Blog</th>
              <th scope="col">Date</th>
              <th scope="col">By</th>
              <th scope="col">Published</th>
              <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
          @for(item of data;track item.id) {
            <tr>
                <td class="align-middle">
                    <a routerLink="/admin/edit/{{item.id}}" class="link-dark link-underline-opacity-0">
                          {{ item.title  }}
                    </a>  

                    @if(item.isArchived) {
                      <span class="text-danger">[ Archived ]</span>
                    }            
                </td>
                <td class="align-middle">{{ item.createdOn | date : 'MMM d, y, HH:mm' }}</td>
                <td class="align-middle">{{ item.userName  }}</td>
                <td class="align-middle">
                  @if (item.published) {
                    <i class="bi bi-check-circle-fill text-success"></i>
                  }
                  @else {
                    <i class="bi bi-x-circle-fill"></i>
                  }

                </td>
                <td>
                  <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
                      <mat-icon>more_vert</mat-icon>
                    </button>
                    <mat-menu #menu="matMenu">
                      <button mat-menu-item routerLink="/admin/edit/{{item.id}}">
                        <i class="bi bi-pencil-square me-2"></i> Edit 
                      </button>
                      <button mat-menu-item routerLink="/admin/preview/{{item.id}}">
                        <i class="bi bi-eye me-2"></i> Preview 
                      </button>
                      <button mat-menu-item (click)="archiveBlog(item)">
                        @if(!item.isArchived) { 
                          <i class="bi bi-archive me-2"></i> Archive
                        }
                        @else { 
                          <i class="bi bi-arrow-counterclockwise"></i> Unarchive
                        }                        
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
export class AdminBlogListComponent {
  @Input({ required: true }) data: any[] = [];
  // angular 19 version
  // Because data is a signal, you call it like a function to get the current array value - data().
  // data = input.required<any[]>();

  // inject services
  private readonly blogAdminDataService = inject(BlogAdminDataService);
  private readonly loader = inject(Loader);
  private readonly snackbarService = inject(SnackbarService);

  archiveBlog(blog: any): void  {
    this.blogAdminDataService.archiveBlog(blog.id, !blog.isArchived)
      .subscribe(() => {
        this.snackbarService.success('Blog updated successfully');
        blog.isArchived = !blog.isArchived;
      });
  }
}
