import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
//  pipes
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';
// components
import { TagFilter } from './tag-filter';
@Component({
  selector: 'app-blog-list',
  imports: [RouterLink, DatePipe, UpperCasePipe, SafeHtmlPipe, TagFilter],
  template: ` 
        <section class="article-list">
          @for(blog of data; track blog.id) {
            <article class="post-row">
              <div class="post-date-col">
                <time class="post-date">{{ blog.createdOn | date : 'MMM d' | uppercase  }}</time>
              </div>
              <div class="post-main-col">
                
                <h2 class="post-title"><a routerLink="/blogs/{{blog.id}}">{{ blog.title }}</a></h2>
                <div class="post-excerpt" [innerHTML]="blog.preview | safeHtml"></div>                
                <div class="post-footer">
                  <app-tag-filter [data]="blog.tags"></app-tag-filter>                  
                </div>
              </div>
            </article>
          }
        </section>
  
  `,
  styles: ``,
})
export class BlogList {
  @Input({ required: true }) data: any = [];

}
