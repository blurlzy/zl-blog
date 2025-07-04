import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// ads
import { GoogleAdsComponent } from '../core/components/google-ads.component';
// material
import { MatProgressBarModule } from '@angular/material/progress-bar';
// services
import { Loader } from '../core/services/loader.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, CommonModule, MatProgressBarModule, GoogleAdsComponent],
  template: `
      <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom fixed-top">
        <div class="container">
          <a class="navbar-brand head-title" routerLink=""> Not Just <i class="bi bi-pencil-square"></i> Tech</a>
          <button  class="navbar-toggler" type="button" (click)="toggleNav()">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div [ngClass]="collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show'">
            <ul class="navbar-nav ms-auto">

              <li class="nav-item">
                <a class="nav-link" [routerLink]="['/']" [queryParams]="{ keywords: 'Azure', type: 'tag' }">Azure</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" [routerLink]="['/']" [queryParams]="{ keywords: 'AI', type: 'tag' }">AI</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" [routerLink]="['/']" [queryParams]="{ keywords: 'Misc', type: 'tag' }">Miscellaneous</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" [routerLink]="['/about']">About</a>
              </li>

            </ul>
          </div>

          <form class="d-flex ms-auto ms-3" role="search">
            <input class="form-control me-2 ms-1" type="search" placeholder="Search" aria-label="Search" [formControl]="keywordsCtrl">
            <button class="btn btn-light me-2" [disabled]="keywordsCtrl.invalid" (click)="search()"><i class="bi bi-search"></i></button>
          </form>
        </div>
      </nav>

      @if (loader.isLoading | async) {
        <mat-progress-bar mode="indeterminate" style="z-index:9999;"></mat-progress-bar>
      }

      <main class="container-xl main-content">
        <router-outlet></router-outlet>
      </main>

      <footer class="border-top py-3 text-center">
        <p class="mb-2 footer-item">
          &copy; 2025 ZL Blog. 🚀 All rights reserved. 
          <!-- 
          <a href="https://x.com/dczl1047" class="link-dark" target="_blank"><i class="bi bi-twitter-x ms-2 me-2 larger-icon"></i></a>  
          <a href="https://github.com/blurlzy/zl-blog" class="link-dark" target="_blank"><i class="bi bi-github ms-1 larger-icon"></i></a>    
          -->     
        </p>           
      </footer>

    <div class="mt-1 container-xl">
      <app-google-ads></app-google-ads>
    </div>
  `,
  styles: `
    .main-content {
        margin-top: 80px;
      }

    @media screen and (max-width: 768px) {
      .main-content {
        margin-top: 100px;
      }
    }
  `
})
export class MainLayoutComponent {
  // inject services
  private readonly router = inject(Router);
  public readonly loader = inject(Loader);

  // nav responsive (mobile view)
  collapsed = true;
  keywordsCtrl = new FormControl('', [Validators.required]);

  search(): void {
    this.router.navigate(['/'], {
      queryParams: { keywords: this.keywordsCtrl.value }
    });
  }

  toggleNav(): void {
    this.collapsed = !this.collapsed;
  }
}
