import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, CommonModule],
  template: `
      <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom fixed-top">
        <div class="container">
          <a class="navbar-brand head-title" routerLink=""> We <i class="bi bi-chat-square"></i> AI</a>
          <button  class="navbar-toggler" type="button" data-bs-toggle="collapse" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">

              <li class="nav-item head-item">
                <a class="nav-link" routerLink="">About</a>
              </li>
              <li class="nav-item head-item">
                <a class="nav-link" routerLink="">Contact</a>
              </li>
            </ul>
          </div>

          <form class="d-flex ms-auto ms-3" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-light me-2"><i class="bi bi-search"></i></button>
          </form>
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
export class MainLayoutComponent {

}
