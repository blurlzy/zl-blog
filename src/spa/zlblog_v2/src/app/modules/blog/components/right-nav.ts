import { Component } from '@angular/core';
import { QuickLink } from '../components/quick-link';
import { PopularBlogList } from '../components/popular-blog-list';
import { LaozaoshanghaiIntro  } from '../components/laozaoshanghai-intro';

@Component({
  selector: 'app-right-nav',
  imports: [QuickLink, PopularBlogList, LaozaoshanghaiIntro],
  template: ` 
      <aside class="sidebar">

        <!-- About -->
        <div class="widget">
          <div class="widget-about">
            <img src="https://stzlblog.blob.core.windows.net/app-images/about.jpg" class="about-avatar" alt="Zongyi Li" />
            <div>
              <p class="about-name">Zongyi Li</p>
              <p class="about-bio">Solution Architect | Data & AI</p>
            </div>
          </div>
        </div>

        <!-- Popular posts -->
        <app-popular-blog-list></app-popular-blog-list>

        <hr>
        <!-- Quick links -->
        <app-quick-link></app-quick-link>

        <!-- Laozao Shanghai -->
        <app-laozaoshanghai-intro></app-laozaoshanghai-intro>

      </aside><!-- /sidebar -->
  `,
  styles: ``,
})
export class RightNav {}
