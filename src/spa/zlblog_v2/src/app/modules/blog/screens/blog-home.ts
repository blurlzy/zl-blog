import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-home',
  imports: [],
  template: ` 
    <div class="page-wrap">

      <!-- LEFT: MAIN CONTENT  -->
      <div class="content-col">

        <!-- ── PAGE INTRO  -->
        <section class="page-intro">
          <h1 class="page-title">Not Just <i class="bi bi-pencil-square"></i> Tech</h1>
          <p class="page-desc">Published when I have something worth sharing.</p>
        </section>

        <!-- ── FILTER ────────────────────────────────────────────────────── -->
        <div class="tag-filter">
          <button class="tag-btn active">All</button>
          <button class="tag-btn">Technology</button>
          <button class="tag-btn">Design</button>
          <button class="tag-btn">Engineering</button>
          <button class="tag-btn">Thoughts</button>
        </div>

        <!-- ── ARTICLE LIST ───────────────────────────────────────────────── -->
        <section class="article-list">

          <article class="post-row">
            <div class="post-date-col">
              <time class="post-date">Jun 18</time>
            </div>
            <div class="post-main-col">
              <span class="post-tag">Technology</span>
              <h2 class="post-title"><a href="#">How LLMs Are Quietly Rewriting the Rules of Software Engineering</a></h2>
              <p class="post-excerpt">A deep look at what happens when AI becomes a co-author of the code that runs our world — and why the implications reach far beyond productivity metrics.</p>
              <div class="post-footer">
                <span class="post-read">9 min read</span>
              </div>
            </div>
          </article>

          <article class="post-row">
            <div class="post-date-col">
              <time class="post-date">Jun 12</time>
            </div>
            <div class="post-main-col">
              <span class="post-tag">Design</span>
              <h2 class="post-title"><a href="#">The Silent Language of Design Systems</a></h2>
              <p class="post-excerpt">Good design systems don't just solve consistency problems. They encode decisions, preserve intent, and carry the institutional memory of a product across time.</p>
              <div class="post-footer">
                <span class="post-read">5 min read</span>
              </div>
            </div>
          </article>

          <article class="post-row post-row--featured">
            <div class="post-date-col">
              <time class="post-date">Jun 5</time>
            </div>
            <div class="post-main-col">
              <span class="post-tag">Engineering</span>
              <h2 class="post-title"><a href="#">The Open Source Reckoning</a></h2>
              <p class="post-excerpt">When a single volunteer's burnout can take down half the web, it's time to reconsider how we value invisible labor. The sustainability crisis in open source is not a funding problem — it's a culture problem.</p>
              <div class="post-footer">
                <span class="post-read">6 min read</span>
              </div>
            </div>
          </article>

        </section>

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

  ngInit() { 
    console.log('blog-home initialized');
  }
}
