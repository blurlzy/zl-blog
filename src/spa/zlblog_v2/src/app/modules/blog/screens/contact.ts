import { Component, inject } from '@angular/core';

// services
import { Util } from '../../../core/services/util.service';
import { Loader } from '../../../core/services/loader.service';

@Component({
  selector: 'app-contact',
  imports: [],
  template: ` <p>contact works!</p> `,
  styles: ``,
})
export class Contact {
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
  }
}
