import { Component, Inject, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
// services
import { BlogAdminDataService } from '../blog-admin.data.service';
import { Util } from '../../../core/services/util.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Loader } from '../../../core/services/loader.service';

@Component({
  selector: 'app-admin-blog-image-list',
  imports: [ CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
        <table class="table table-striped table-hover">
          <thead>
              <tr>
               <th scope="col"></th>
                <th scope="col">Uri</th>              
                <th scope="col">Created On</th>
                <th scope="col"></th>
              </tr>
          </thead>
          <tbody>
            @for(item of data;track item.tag) {
              <tr>
                  <td>
                    <img [src]="item.uri" class="img-fluid border rounded" style="max-width: 100px; max-height: 150px;" />
                  </td>
                  <td class="align-middle">
                    {{ item.uri  }}
                  </td>
                
                  <td class="align-middle">{{ item.createdOn | date : 'MMM d, y, HH:mm' }} </td>
                  <td class="align-middle">
                    <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
                        <mat-icon>more_vert</mat-icon>
                      </button>
                      <mat-menu #menu="matMenu">
                        <button mat-menu-item>
                          <a routerLink="" class="link-dark link-underline-opacity-0">
                            <i class="bi bi-trash-fill"></i> Delete
                          </a> 
                        </button>
                      </mat-menu>
                  </td>
              </tr>
            }
          </tbody>
      </table>
  `,
  styles: `

  `
})
export class AdminBlogImageListComponent {
   @Input({ required: true }) data: any[] = [];

  // Inject services & components in the constructor of the component class so they are available to this component:
  private readonly blogAdminDataService = inject(BlogAdminDataService);
  private readonly snackbarService = inject(SnackbarService);
  public readonly loader = inject(Loader);

  ngOnInit() {
    
  }


}
