import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
// services
import { BlogDataService } from '../blog.data.service';

@Component({
  selector: 'app-popular-blog-list',
  imports: [ RouterLink, DatePipe, UpperCasePipe],
  template: ` 
      <div class="widget">
          <h4 class="widget-title">📝 Popular</h4>
          <ul class="widget-post-list">
            @for (post of pagedList().data; track post.id) {
              <li>
                <a routerLink="/blogs/{{post.id}}" class="mini-post-link">
                  <span class="mini-post-title">{{ post.title }}</span>
                  <span class="mini-post-meta">{{ post.createdOn | date : 'MMM d, y' | uppercase }}</span>
                </a>
              </li>
            }

          </ul>
      </div>
  `,
  styles: ``,
})
export class PopularBlogList {
  private readonly blogDataService = inject(BlogDataService);
  pagedList = signal<any>({ data: [], total: 0 });

  ngOnInit() { 
    this.getPopularBlogs();
  }

  // get popular blogs
  private getPopularBlogs() {
    this.blogDataService.getPopularBlogs().subscribe((data: any) => {
      this.pagedList.set(data);
    });
  }
}
