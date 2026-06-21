import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink],
  template: `
  <header class="site-header">
    <div class="container-xl">
      <nav class="top-nav">
        <a class="nav-home" routerLink="">👋 Zongyi Li</a>
        <ul class="nav-links">
          <li><a [routerLink]="['/']" [queryParams]="{ keywords: 'Azure', type: 'tag' }">Azure</a></li>
          <li><a [routerLink]="['/']" [queryParams]="{ keywords: 'AI', type: 'tag' }">Data & AI</a></li>
          <li><a [routerLink]="['/']" [queryParams]="{ keywords: 'Misc', type: 'tag' }">Notes</a></li>
          <li><a [routerLink]="['/about']">About</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <div class="container-xl">
      <router-outlet></router-outlet>
    </div>
  </main>

  <!-- FOOTER  -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-inner">
        <span class="footer-name">zongyi.me</span>
        <nav class="footer-nav">
          <a href="#">GitHub</a>
        </nav>
        <span class="footer-copy">© 2026 🚀 All rights reserved</span>
      </div>
    </div>
  </footer>

  `,
  styles: `    

  `,
})
export class MainLayout {}
