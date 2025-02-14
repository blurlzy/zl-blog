import { Injectable } from '@angular/core';
import { BehaviorSubject } from  'rxjs'

@Injectable({providedIn: 'root'})
export class Util {
	
	constructor() {
				
	}

	createImgHtml(imgUrl: string, alt: string): string {
		return `<img src="${imgUrl}" alt="${alt}" width="95%" height="95%">`;
	}
}