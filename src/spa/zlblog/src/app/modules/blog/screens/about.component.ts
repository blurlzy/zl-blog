import { Component, inject } from '@angular/core';
// services
import { Util } from '../../../core/services/util.service';
@Component({
  selector: 'app-about',
  imports: [],
  template: `
  <div class="profile-header text-center">
    <img src="https://stzlblog.blob.core.windows.net/blog-images/cb60013f-361f-4742-988e-5ea4656f1765.jpg"  alt="ZL" class="profile-img"/>
    <h3 class="mt-3">ZL</h3>
    <small>Cloud Solution Architect &#64; msft</small> <i class="bi bi-microsoft ms-2"></i>
  </div>

  <!-- About Section -->
  <div class="row mb-3">
    <div class="col-md-10 offset-md-1">
      <h2 class="section-title">About ZL Blog </h2>
      <p>
A space where I share my knowledge, experiences, and ideas on Cloud, AI, industry insights, and beyond. Whether it’s tech-related discussions or interesting thoughts on non-tech topics, this is where I explore and share what matters most.
      </p>

      <h2 class="section-title">Overview of the technology stack and high-level architectural design of ZL Blog:</h2>
      <ul class="profile-list">
        <li>Frontend: Angular 18</li>
        <li>Backend: .NET 8.0</li>
        <li>Authentication: Auth0</li>
        <li>Hosting: Fully deployed on Azure</li>
        <li><a href="https://github.com/blurlzy/zl-blog" target="_blank">Source Code - GitHub</a></li>
      </ul>
    </div>

    <div class="col-md-10 offset-md-1">
      <img src="https://stzlblog.blob.core.windows.net/blog-images/e54271e6-c3f9-4fec-8635-643a1a8ada41.png" alt="design" class="border rounded-4 img-fluid">
    </div>
   
  </div>
  `,
  styles: `
    .profile-header {
      margin-bottom: 2rem;
      border-bottom: 2px dashed #000;
      padding-bottom: 1rem;

    }
    .profile-img {
      width: 260px;
      height: 260px;
      object-fit: cover;
      border-radius: 50%;
      border: 2px solid #212529;
      margin-bottom: 1rem;
    }
    .section-title {
      font-size: 1.25rem;    
      margin-bottom: 1rem;
    }
  .profile-list {
    font-size: 0.95rem;
  }
  `
})
export class AboutComponent {
  private readonly util = inject(Util);

  ngOnInit(): void {
    // reset meta tags
    this.util.resetMetaTags();

    // ensure it scrolls to the top of the page
    window.scroll(0, 0);
  }
}
