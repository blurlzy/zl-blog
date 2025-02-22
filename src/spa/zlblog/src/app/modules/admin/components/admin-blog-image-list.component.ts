import { Component, Inject, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard';

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
                    <button mat-icon-button [matMenuTriggerFor]="menu">
                        <mat-icon>more_vert</mat-icon>
                      </button>
                      <mat-menu #menu="matMenu">
                        <button mat-menu-item (click)="copyToClipboard(item)">
                            <i class="bi bi-clipboard me-1"></i> Copy Uri
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
  // services
  private readonly clipboard = inject(Clipboard);

  ngOnInit() {
    
  }

  
  // copy url to clipboard
	copyToClipboard(img: any): void {		
		this.clipboard.copy(img.uri);
	}

}
