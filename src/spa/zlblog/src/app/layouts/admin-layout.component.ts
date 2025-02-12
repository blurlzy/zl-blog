import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  imports: [],
  template: `
      <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom">
        <div class="container">
          <a class="navbar-brand head-title" routerLink="">Admin Portal</a>
          <button  class="navbar-toggler" type="button" data-bs-toggle="collapse" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item head-item">
                <a class="nav-link" routerLink=""><i class="bi bi-search"></i></a>
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
export class AdminLayoutComponent {

}
