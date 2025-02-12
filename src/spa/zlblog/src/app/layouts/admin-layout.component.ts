import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [ RouterOutlet, RouterLink, CommonModule ],
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
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      <main class="container" style="margin-top: 80px;">
        <router-outlet></router-outlet>
      </main>

      <footer class="border-top py-3 text-center">
        <p class="mb-0">&copy; 2025 ZL Blog. All rights reserved.</p>
      </footer>
  `,
  styles: ``
})
export class AdminLayoutComponent {

}
