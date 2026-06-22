import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, UpperCasePipe, Location } from '@angular/common';
// services
import { BlogDataService } from '../blog.data.service';
import { Util } from '../../../core/services/util.service';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';
// components
import { TagFilter } from '../components/tag-filter';
import { PopularBlogList} from '../components/popular-blog-list';
import { GoogleAds } from '../../../core/components/google-ads';

@Component({
  selector: 'app-blog-detail',
  imports: [ RouterLink, DatePipe, UpperCasePipe, SafeHtmlPipe, TagFilter, PopularBlogList, GoogleAds ],
  template: ` 
      <!-- ── ARTICLE HEADER ─────────────────────────────────────── -->
      <header class="article-header">
        <span class="article-category">
          <!-- Tags -->
          <app-tag-filter [data]="blog().tags"></app-tag-filter >
        </span>
        <h1 class="article-title">{{ blog().title }}</h1>
        
        <div class="article-byline">
          
          <div class="byline-info">
            <span class="byline-name">{{ blog().userName }}</span>
            <span class="byline-meta">{{ blog().createdOn | date : 'MMM d, y, HH:mm' | uppercase }}</span>
          </div>

        </div>
      </header>

      <!--  TWO-COLUMN: ARTICLE + TOC  -->
      <div class="article-wrap mb-3">

        <!-- ── ARTICLE BODY  -->
        <div class="article-col">

          <!-- blog content -->
          <div class="article-body" [innerHTML]="blog().content | safeHtml"></div>

        </div>

        <!-- ── TABLE OF CONTENTS  -->
        <aside class="toc">
          <app-popular-blog-list></app-popular-blog-list>          
          <a routerLink="/" class="toc-back mb-2">← All posts</a>
          <app-google-ads></app-google-ads>
        </aside>

      </div><!-- /article-wrap -->


  
  `,
  styles: `
      /* ── ARTICLE LAYOUT ───────────────────────────────────────── */
    .article-wrap {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 200px;
      gap: 0 4rem;
      align-items: start;
    }

    .article-col { min-width: 0; }

    /* ── ARTICLE HEADER ───────────────────────────────────────── */
    .article-header {
      padding: 1.5rem 0 1.0rem;
      border-bottom: 1px solid var(--rule);
      margin-bottom: 1.5rem;
    }

    .article-category {
      display: inline-block;
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--faint);
      margin-bottom: 1rem;
    }

    .article-title {
      font-family: var(--font-serif);
      font-size: clamp(1.75rem, 3.5vw, 1.95rem);
      font-weight: 600;
      line-height: 1.18;
      letter-spacing: -0.03em;
      color: var(--black);
      margin-bottom: 0.85rem;
    }

    .article-deck {
      font-size: 1.1rem;
      color: var(--muted);
      line-height: 1.65;
      font-style: italic;
      font-family: var(--font-serif);
      max-width: 60ch;
      margin-bottom: 1.75rem;
    }

    .article-byline {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .byline-info { display: flex; flex-direction: column; gap: 0.1rem; }

    .byline-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--black);
    }

    .byline-meta {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--faint);
    }

    /* ── ARTICLE BODY ─────────────────────────────────────────── */
    .article-body {
      font-family: var(--font-serif);
      font-size: 1.05rem;
      line-height: 1.8;
      color: var(--ink);
    }

    .article-body p { margin-bottom: 1.5rem; }

    .article-body p:first-child::first-letter {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1;
      float: left;
      margin-right: 0.1em;
      margin-top: 0.05em;
      color: var(--black);
      font-family: var(--font-serif);
    }

    .article-body h2 {
      font-family: var(--font-serif);
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--black);
      letter-spacing: -0.02em;
      margin-top: 3rem;
      margin-bottom: 1rem;
      line-height: 1.25;
    }

    .article-body h3 {
      font-family: var(--font-sans);
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
      margin-top: 2.5rem;
      margin-bottom: 0.85rem;
    }

    .article-body blockquote {
      border-left: 3px solid var(--black);
      margin: 2.5rem 0;
      padding: 0.25rem 0 0.25rem 1.75rem;
    }

    .article-body blockquote p {
      font-size: 1.15rem;
      font-style: italic;
      color: var(--black);
      margin: 0;
      line-height: 1.65;
    }

    .article-body blockquote cite {
      display: block;
      margin-top: 0.65rem;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--faint);
      font-style: normal;
    }

    .article-body ul,
    .article-body ol {
      padding-left: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .article-body li { margin-bottom: 0.4rem; }

    :host ::ng-deep .article-body a {
      color: #1a73e8;
      text-decoration: underline;
      transition: color 0.15s ease;
    }

    :host ::ng-deep .article-body a:hover { color: #0d47a1; }

    .article-body hr {
      border: none;
      border-top: 1px solid var(--rule);
      margin: 3rem 0;
    }

    /* ── TABLE OF CONTENTS ────────────────────────────────────── */
    .toc {
      position: sticky;
      top: 2rem;
      padding-top: 0.6rem;
    }

    .toc-title {
      font-family: var(--font-sans);
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--faint);
      margin-bottom: 1rem;
    }

  
    .toc-back {
      display: block;
      margin-top: 2rem;
      font-family: var(--font-mono);
      font-size: 0.92rem;
      color: var(--faint);
      transition: color 0.15s ease;
    }

    .toc-back:hover { color: var(--black); }

    /* ── RESPONSIVE ───────────────────────────────────────────── */
    @media (max-width: 860px) {
      .article-wrap {
        grid-template-columns: 1fr;
      }
      .toc {
        display: none;
      }
    }

  `,
})
export class BlogDetail {
  blogId = '';
  blog = signal({ content: '', title: '', tags: [], userName: '', createdOn:'' });

  // Inject ActivatedRoute and Router in the constructor of the component class so they are available to this component:
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogDataService = inject(BlogDataService);
  private readonly util = inject(Util);

  ngOnInit() {
    // subscribe to route param changes
    this.route.paramMap.subscribe(params => {
      // get the blog id
      this.blogId = params.get('id') ?? '';
      //this.blogId = this.route.snapshot.paramMap.get('id') ?? '';

      // validate blog id
      if (!this.util.isValidGUID(this.blogId)) {
        // route to home
        this.router.navigate(['/404']);
        return;
      }

      // move to the top of the page
      window.scroll(0, 0);
      // get blog by id
      this.getBlog(this.blogId);
    });

  }

  // get blog
  private getBlog(id: string): void {
    this.blogDataService.getBlog(id).subscribe((data: any) => {
      this.blog.set(data); console.log('blog data', data);
      // set meta tags
      this.util.setMetaTags(this.blog());
    });
  }
}
