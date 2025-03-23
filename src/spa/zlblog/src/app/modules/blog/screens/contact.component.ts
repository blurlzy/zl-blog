import { Component, inject } from '@angular/core';
// services
import { Util } from '../../../core/services/util.service';
@Component({
  selector: 'app-contact',
  imports: [],
  template: `
  <div class="ratio ratio-4x3">
    <iframe
      src="https://forms.office.com/Pages/ResponsePage.aspx?id=saBbiNVo4kCtqiOMtpnb3ONR4c4CD3RNjH4WjPfnf81UMlY5TDRPTkdBUE9UV1IySkFWMzRMMzBZSy4u">
    </iframe>
  </div>
    `,
  styles: `
  `
})
export class ContactComponent {
  private readonly util = inject(Util);

  ngOnInit(): void {
    // reset meta tags
    this.util.resetMetaTags();

    // ensure it scrolls to the top of the page
    window.scroll(0, 0);
  }
}
