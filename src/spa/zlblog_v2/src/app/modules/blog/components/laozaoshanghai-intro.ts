import { Component } from '@angular/core';

@Component({
  selector: 'app-laozaoshanghai-intro',
  imports: [],
  template: `          
    <div class="widget mt-4 mb-3">
        <h4 class="widget-title">Also on the web</h4>
        <a href="https://laozaoshanghai.com" target="_blank" class="laozao-card">
          <img src="https://stlaoshanghaiprod.blob.core.windows.net/photos/c27eab90-59af-43b3-8beb-417c12613cac.jpg" class="laozao-img" alt="Laozao Shanghai" />
          <div class="laozao-body">
            <p class="laozao-name">老早上海</p>
            <p class="laozao-desc">A curated archive of historical photographs from Shanghai, China, mostly captured before the year 2000, when the city looked like a different world.</p>
            <span class="laozao-cta"> Visit site →</span>
          </div>
        </a>
      </div> `,
  styles: ``,
})
export class LaozaoshanghaiIntro {}
