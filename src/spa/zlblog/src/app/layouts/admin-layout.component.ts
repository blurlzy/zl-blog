import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
// material
import { MatProgressBarModule } from '@angular/material/progress-bar';
// auth0
import { AuthService } from '@auth0/auth0-angular';
import { Loader } from '../core/services/loader.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, CommonModule, MatProgressBarModule],
  template: `
      <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom fixed-top">
        <div class="container">
          <a class="navbar-brand head-title" routerLink="">Admin Portal</a>
          <button  class="navbar-toggler" type="button" data-bs-toggle="collapse" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
   
            <form class="d-flex ms-auto " role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-light me-2"><i class="bi bi-search"></i></button>
              <button class="btn btn-light" (click)="logout()"><i class="bi bi-box-arrow-in-right"></i></button>
            </form>
          </div>
        </div>
      </nav>

      @if (loader.isLoading | async) {
        <mat-progress-bar mode="indeterminate" style="z-index:9999;"></mat-progress-bar>
      }
      
      <main class="container" style="margin-top: 80px;">
        <router-outlet></router-outlet>
      </main>

      <footer class="border-top py-3 text-center mt-3">
        <p class="mb-0">&copy; 2025 ZL Blog. All rights reserved.</p>
      </footer>
  `,
  styles: ``
})
export class AdminLayoutComponent {

  // ctor
  constructor(public auth: AuthService, 
              public loader: Loader, 
              private router: Router) { }

  // public methods
  logout(): void {
    // logout 
    this.auth.logout();
  }
}
