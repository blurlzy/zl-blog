import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,  ReactiveFormsModule, Validators } from '@angular/forms';
// components
import { PopularBlogList } from '../components/popular-blog-list';
import { LaozaoshanghaiIntro  } from '../components/laozaoshanghai-intro';
import { QuickLink } from '../components/quick-link';

@Component({
  selector: 'app-right-nav',
  imports: [ QuickLink, PopularBlogList, LaozaoshanghaiIntro, ReactiveFormsModule],
  template: ` 
      <aside class="sidebar">
          <!-- Search -->
          <div class="widget">
            <h4 class="widget-title">Search</h4>
            <div class="input-group">
              <input [formControl]="keywordsCtrl" type="text" class="form-control" placeholder="Search posts…">
              <button class="btn btn-dark" type="button" [disabled]="keywordsCtrl.invalid" (click)="search()">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>

        <!-- About -->
        <div class="widget">
          <div class="widget-about">
            <img src="https://stzlblog.blob.core.windows.net/app-images/about.jpg" class="about-avatar" alt="Zongyi Li" />
            <div>
              <p class="about-name">Zongyi Li</p>
              <p class="about-bio">Cloud Solution Architect</p>
              <p class="about-bio">Data &amp; AI Innovator</p>
              <p class="about-bio">Living in <img src="https://stzlblog.blob.core.windows.net/app-images/Australia.png" style="width: 18px; height: 18px;"  /></p>
            </div>
          </div>
        </div>
        <!-- Quick links -->
        <app-quick-link></app-quick-link>
        <hr>
        <!-- Laozao Shanghai -->
        <app-laozaoshanghai-intro></app-laozaoshanghai-intro>

        <!-- Popular posts -->
        <app-popular-blog-list></app-popular-blog-list>        

      </aside><!-- /sidebar -->
  `,
  styles: ``,
})
export class RightNav {
  // inject services
  private readonly router = inject(Router);

  keywordsCtrl = new FormControl('', [Validators.required]);

  search(): void {
    this.router.navigate(['/'], {
      queryParams: { keywords: this.keywordsCtrl.value }
    });
  }
}
