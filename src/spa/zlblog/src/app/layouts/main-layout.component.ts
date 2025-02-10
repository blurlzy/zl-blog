import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, CommonModule],
  template: `
      <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom">
        <div class="container">
          <a class="navbar-brand head-title">ZL Blog</a>
          <button  class="navbar-toggler" type="button" data-bs-toggle="collapse" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item head-item">
                <a class="nav-link" href="#">Home</a>
              </li>
              <li class="nav-item head-item">
                <a class="nav-link" href="#">About</a>
              </li>
              <li class="nav-item head-item">
                <a class="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main class="container my-5">
        <router-outlet></router-outlet>
      </main>

      <footer class="border-top py-3 text-center">
        <p class="mb-0">&copy; 2025 ZL Blog. All rights reserved.</p>
      </footer>
  `,
  styles: ``
})
export class MainLayoutComponent {

}
