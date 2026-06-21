import { Component, inject, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
// services
import { BlogDataService } from '../blog.data.service';
import { Util } from '../../../core/services/util.service';
// components
import { BlogList } from '../components/blog-list';

@Component({
  selector: 'app-blog-home',
  imports: [CommonModule, ReactiveFormsModule, BlogList],
  template: ` 
    <div class="page-wrap">
      <!-- LEFT: MAIN CONTENT  -->
      <div class="content-col">

        <!-- ── PAGE INTRO  -->
        <section class="page-intro">
          <h1 class="page-title">Not Just <i class="bi bi-pencil-square"></i> Tech</h1>
          <p class="page-desc">Published when I have something worth sharing.</p>
        </section>

        <!-- blog list -->
        <app-blog-list [data]="pagedList().data"></app-blog-list>

        <!-- ── LOAD MORE ──────────────────────────────────────────────────── -->
        <div class="load-more-wrap">
          <button class="load-more-btn">Load older posts</button>
        </div>

      </div><!-- /content-col -->

      <!--  RIGHT: SIDEBAR  -->
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

        <!-- Filter by topic -->
        <div class="widget">
          <h4 class="widget-title">Topics</h4>
          <ul class="widget-topic-list">
            <li><a href="#" class="topic-link active"><span>All posts</span><span class="topic-count">8</span></a></li>
            <li><a href="#" class="topic-link"><span>Technology</span><span class="topic-count">3</span></a></li>
            <li><a href="#" class="topic-link"><span>Design</span><span class="topic-count">2</span></a></li>
            <li><a href="#" class="topic-link"><span>Engineering</span><span class="topic-count">2</span></a></li>
            <li><a href="#" class="topic-link"><span>Thoughts</span><span class="topic-count">1</span></a></li>
          </ul>
        </div>

        <!-- Popular posts -->
        <div class="widget">
          <h4 class="widget-title">Popular</h4>
          <ul class="widget-post-list">
            <li>
              <a href="#" class="mini-post-link">
                <span class="mini-post-title">The Open Source Reckoning</span>
                <span class="mini-post-meta">6 min · Engineering</span>
              </a>
            </li>
            <li>
              <a href="#" class="mini-post-link">
                <span class="mini-post-title">Thinking Machines, Uncertain Futures</span>
                <span class="mini-post-meta">11 min · Technology</span>
              </a>
            </li>
            <li>
              <a href="#" class="mini-post-link">
                <span class="mini-post-title">The Invisible Architecture</span>
                <span class="mini-post-meta">14 min · Engineering</span>
              </a>
            </li>
            <li>
              <a href="#" class="mini-post-link">
                <span class="mini-post-title">In Defense of Slowness</span>
                <span class="mini-post-meta">5 min · Thoughts</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Archive -->
        <div class="widget">
          <h4 class="widget-title">Archive</h4>
          <ul class="widget-archive-list">
            <li><a href="#">June 2026 <span>3</span></a></li>
            <li><a href="#">May 2026 <span>3</span></a></li>
            <li><a href="#">April 2026 <span>2</span></a></li>
            <li><a href="#">March 2026 <span>4</span></a></li>
            <li><a href="#">February 2026 <span>2</span></a></li>
          </ul>
        </div>

        <!-- Quick links -->
        <div class="widget">
          <h4 class="widget-title">Quick Links</h4>
          <ul class="widget-quick-links">
            <li><a href="#">→ Projects</a></li>
            <li><a href="#">→ About me</a></li>
            <li><a href="#">→ Newsletter archive</a></li>
            <li><a href="#">→ RSS Feed</a></li>
          </ul>
        </div>

      </aside><!-- /sidebar -->

    </div><!-- /page-wrap -->
  
  `,
  styles: ``,
})
export class BlogHome {
  // inject services
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogDataService = inject(BlogDataService);
  public readonly util = inject(Util);

  private readonly pageSize = 5;
  // properties
  pagedList = signal<any>({ data: [], total: 0 });
  // filter form group
  filterFormGroup = new FormGroup({
    keywords: new FormControl(''),
    type: new FormControl(''),
    pageSize: new FormControl(this.pageSize),
    pageIndex: new FormControl(0)
  });

  ngOnInit() {
    // query params change
    this.activatedRoute.queryParams.subscribe(params => {
      const pageIndex = +params['pageIndex'];
      // retrive the query params
      this.filterFormGroup.patchValue({
        pageIndex: pageIndex ? pageIndex : 0,
        keywords: params['keywords'] ?? '',
        type: params['type'] ?? ''
      });

      // reset the result      			
      this.pagedList.set({ data: [], total: 0 });
      // ensure it scrolls to the top of the page
      window.scroll(0, 0);
      // if keywords is a tag, then filter by tag
      if (params['type'] && params['type'] === 'tag') {
        this.listBlogsByTag(this.filterFormGroup.value.keywords ?? '', this.filterFormGroup.value.pageIndex ?? 0, this.filterFormGroup.value.pageSize ?? this.pageSize);
      }
      else {
        // search blogs
        this.listBlogs(this.filterFormGroup.value.keywords ?? '', this.filterFormGroup.value.pageIndex ?? 0, this.filterFormGroup.value.pageSize ?? this.pageSize);
      }
    });

    // reset meta tags
    this.util.resetMetaTags();
  }

  // list blogs by keywords
  private listBlogs(keywords: string, pageIndex: number, pageSize: number) {
    this.blogDataService.listBlogs(keywords, pageIndex, pageSize).subscribe((data: any) => {
      this.pagedList.set(data);  
    });
  }

  // list blogs by a tag
  private listBlogsByTag(tag: string, pageIndex: number, pageSize: number) {
    this.blogDataService.listBlogsByTag(tag, pageIndex, pageSize).subscribe((data: any) => {
      this.pagedList.set(data);
    });
  }
}
