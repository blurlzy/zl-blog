import { Component, inject } from '@angular/core';
// services
import { Util } from '../../../core/services/util.service';
import { Loader } from '../../../core/services/loader.service';

@Component({
  selector: 'app-contact',
  imports: [],
  template: `
  <div class="ratio ratio-4x3">
    <iframe
      src="https://forms.office.com/Pages/ResponsePage.aspx?id=saBbiNVo4kCtqiOMtpnb3ONR4c4CD3RNjH4WjPfnf81UMlY5TDRPTkdBUE9UV1IySkFWMzRMMzBZSy4u"
      (load)="loader.isLoading.next(false)">
    </iframe>
  </div>
    `,
  styles: `
  `
})
export class ContactComponent {
  private readonly util = inject(Util);
  public readonly loader = inject(Loader);

  ngOnInit(): void {
    // reset meta tags
    this.util.resetMetaTags();

    // ensure it scrolls to the top of the page
    window.scroll(0, 0);

    // start loader
    setTimeout(() => {
      this.loader.isLoading.next(true);
    });

    // // ensure the loader is hidden after 5 seconds
    // setTimeout(() => {
    //   this.loader.isLoading.next(false);
    // }, 5000);
  }

}
