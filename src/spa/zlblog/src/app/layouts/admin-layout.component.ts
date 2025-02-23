import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
// material
import { MatProgressBarModule } from '@angular/material/progress-bar';
// auth0
import { AuthService } from '@auth0/auth0-angular';
import { Loader } from '../core/services/loader.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, CommonModule, ReactiveFormsModule, FormsModule, MatProgressBarModule],
  template: `
    <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom fixed-top">
      <div class="container">
        <a class="navbar-brand head-title" routerLink="/admin">Admin Portal</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>

        
        <div Class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item head-item">
                <a class="nav-link" [routerLink]="['/admin']" >Blogs</a>
              </li>
              <li class="nav-item head-item ms-2">
                <a class="nav-link" [routerLink]="['/admin/comments']" >Comments</a>
              </li>
              <li class="nav-item head-item ms-2 me-3">
                <a class="nav-link" [routerLink]="['/admin/images']">Images</a>
              </li>
            </ul>
        </div>

        <form class="d-flex ms-auto ms-3" role="search">
          <input class="form-control" type="search" placeholder="Search" aria-label="Search" [formControl]="keywordsCtrl">
          <button class="btn btn-light ms-2" (click)="search()"><i class="bi bi-search"></i></button>
          <button class="btn btn-light ms-2" (click)="logout()"><i class="bi bi-box-arrow-in-right"></i></button>
        </form>
      </div>
    </nav>

      @if (loader.isLoading | async) {
        <mat-progress-bar mode="indeterminate" style="z-index:9999;"></mat-progress-bar>
      }
      
      <main class="container" style="margin-top: 80px;">

        <router-outlet></router-outlet>

        <footer class="py-3">
          <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p style="font-family: 'Comic Sans MS', Courier, monospace;">&copy; ZL Blog, Inc. All rights reserved.</p>
            <ul class="list-unstyled d-flex">
              <li class="ms-3"><a class="link-body-emphasis" href="https://x.com/dczl1047" target="_blank"><i class="bi bi-twitter-x larger-icon"></i></a></li>
              <li class="ms-3"><a class="link-body-emphasis" href="https://github.com/blurlzy/zl-blog" target="_blank" ><i class="bi bi-github larger-icon"></i></a></li>           
            </ul>
          </div>
      </footer>
    </main>


  `,
  styles: ``
})
export class AdminLayoutComponent {
  // inject services
  private readonly router = inject(Router);
  public readonly loader = inject(Loader);
  public readonly auth = inject(AuthService);

  // form control
  keywordsCtrl = new FormControl('', [Validators.required]);

  // public methods
  search(): void {
    this.router.navigate(['/admin'], {
      queryParams: { keywords: this.keywordsCtrl.value }
    });
  }

  logout(): void {
    // logout 
    this.auth.logout();
  }
}
