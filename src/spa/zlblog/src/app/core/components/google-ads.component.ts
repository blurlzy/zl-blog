import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import common module if needed

@Component({
  selector: 'app-google-ads',
  imports: [ CommonModule],
  template: `
    <div>
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-7792978464943079"
        data-ad-slot="3671627987"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </div>  
  `,
  styles: ``
})
export class GoogleAdsComponent {

  ngAfterViewInit() { 
    setTimeout(() => {
			if (window) {
				try {
					((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
	
				} catch (e) {
					console.error('Google adsense error.');
					console.error(e);
				}	
			}

		}, 0);
  }
}
