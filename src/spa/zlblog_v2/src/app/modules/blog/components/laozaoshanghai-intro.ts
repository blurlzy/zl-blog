import { Component } from '@angular/core';

@Component({
  selector: 'app-laozaoshanghai-intro',
  imports: [],
  template: `          
    <div class="widget mt-4 mb-3">
        <h4 class="widget-title">🌀 My Side Project</h4>
        <a href="https://laozaoshanghai.com" target="_blank" class="laozao-card">
          <img src="https://stlaoshanghaiprod.blob.core.windows.net/photos/5bcc457d-7a37-47a3-9079-50e3ab8effb8.png" class="laozao-img" alt="Shanghai Then" />
          <div class="laozao-body">
            <p class="laozao-name">Shanghai Then</p>
            <p class="laozao-desc">A curated archive of historical photographs from Shanghai, China, mostly captured before the year 2000, when the city looked like a different world.</p>
            <span class="laozao-cta"> Visit site →</span>
          </div>
        </a>
      </div> `,
  styles: ``,
})
export class LaozaoshanghaiIntro {}
