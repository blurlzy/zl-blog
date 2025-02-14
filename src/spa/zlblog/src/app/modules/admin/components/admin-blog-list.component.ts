import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-blog-list',
  imports: [ DatePipe,RouterLink, MatButtonModule, MatIconModule, MatMenuModule ],
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
                </td>
                <td class="align-middle">{{ item.createdOn | date: 'short' }}</td>
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
                      <button mat-menu-item>
                        <a routerLink="/admin/edit/{{item.id}}" class="link-dark link-underline-opacity-0">
                          <i class="bi bi-pencil-square"></i> Edit
                        </a> 
                      </button>
                      <button mat-menu-item>
                        <i class="bi bi-archive"></i> Archive
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
}
