import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
// material
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
// services
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [ RouterLink, MatChipsModule, DatePipe, UpperCasePipe, SafeHtmlPipe ],
  template: `
    @for (blog of data; track blog.id) {
        <article>        
            <h2 class="article-title">
               <a routerLink="/blogs/{{blog.id}}" class="link-dark link-underline-opacity-0"> {{ blog.title }} </a>              
            </h2>
            <p class="article-meta">
              <i class="bi bi-calendar-event me-1"></i> {{ blog.createdOn | date : 'MMM d, y, HH:mm' | uppercase }} <i class="bi bi-person-fill ms-1"></i> {{ blog.userName }}
            </p>
            
            <mat-chip-set>
              @for (tag of blog.tags; track tag) { 
                <mat-chip>
                 <a [routerLink]="['/']" [queryParams]="{ keywords: tag, type: 'tag' }" class="link-secondary link-underline-opacity-0">  
                  <i class="bi bi-tag"></i> {{ tag }}
                 </a> 
                </mat-chip>
              }           
            </mat-chip-set>


            <!-- html content -->
            <div [innerHTML]="blog.content | safeHtml" class="mt-2 mb-2"></div>

            <!-- COMMENTS SECTION (only the count, no individual comments) -->
            <section class="comments-section mt-3 py-2">
              <h5> 
                <a routerLink="/blogs/{{ blog.id }}" class="link-dark link-underline-opacity-0"> <i class="bi bi-chat-square"></i> Comments ({{ blog.totalComments ?? 0 }})</a>
              </h5>
            </section>
        </article>
    }

  `,
  styles: `    
    .comments-section h5 {
      font-size: 0.85rem;
    }
  `
})
export class BlogListComponent {
  @Input({ required: true }) data: any = [];

}
