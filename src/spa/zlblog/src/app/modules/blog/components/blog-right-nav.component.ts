import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
// services
import { BlogDataService } from '../blog.data.service';
// components
import { GoogleAdsComponent } from '../../../core/components/google-ads.component';

@Component({
  selector: 'app-blog-right-nav',
  imports: [ RouterLink],
  template: `
  <aside class="sidebar sticky">
      <div class="pt-2 pt-lg-1 ps-lg-4">
        <h5 class=" mb-3">📝 Recent Posts</h5>
        <nav class="nav flex-column small">
          @for (post of recentPosts; track post.id) { 
            <a class="nav-link" routerLink="/blogs/{{post.id}}">{{post.title}}</a>
          }
          
        </nav>        

        <hr class="my-4">

        <h5 class="mb-3">🔗 Links</h5>
        <nav class="nav flex-column small">
          <a class="nav-link" href="https://azure.microsoft.com/en-au/updates" target="_blank">Azure Updates</a>                                     
          <a class="nav-link" href="https://datacenters.microsoft.com/globe/explore?view=map" target="_blank">Azure Datacenters</a>
          <a class="nav-link" href="https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/table/" target="_blank">Azure Product Availability by Region</a>
          <a class="nav-link" href="https://blog.fabric.microsoft.com/en-AU/blog/" target="_blank">Microsoft Fabric Updates</a>
          <a class="nav-link" href="https://www.microsoft.com/en-us/research/lab/ai-frontiers/" target="_blank">AI Frontiers</a>   
          <a class="nav-link" href="https://m365maps.com/" target="_blank">Microsoft 365 Licensing</a>
        </nav>

        <hr class="my-4">

        <p class="mb-3">
          📢 <a class="link-body-emphasis link-offset-1 icon-link icon-link-hover " routerLink="/contact">Contact<i class="bi bi-arrow-right"></i></a>  
        </p>

        <!-- google ads -->
         <!-- <div class="mt-2">
          <app-google-ads></app-google-ads>
         </div>  -->
        
      </div>
  </aside>

  `,
  styles: `
    .sidebar { border-left: 1px solid #e5e5e5; }
    .sidebar .nav-link { color: #111; padding-left: 2; text-decoration: underline; }
    // .sidebar .nav-link.active { text-decoration: underline; }
    // hover
    .sidebar .nav-link:hover { text-decoration: none; }
    .sidebar .muted { color: #111; font-size: .95rem; }
    .sticky { position: sticky; top: 75px; }
  `
})
export class BlogRightNavComponent {
    private readonly blogDataService = inject(BlogDataService);
    // recent posts
    recentPosts: any = [];
    // ctor
    constructor() {}

    ngOnInit(): void {
      this.getRecentPosts();
    }

    // get the recent posts 
    private getRecentPosts(): void  { 
          this.blogDataService.listBlogs('', 0, 11).subscribe((pagedList: any) => {
            // remove the first item (the latest post)
            // check if data.data has at least one item
            if (pagedList.data && pagedList.total > 1) {
              this.recentPosts = pagedList.data.slice(1);
            }   
          });
    }
}
