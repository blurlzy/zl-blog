import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class Util {

	constructor() {

	}

	createImgHtml(imgUrl: string, alt: string): string {
		return `<img src="${imgUrl}" alt="${alt}" width="70%" height="70%">`;
	}

	// validate images
	isValidImage(fileName: string): boolean {
		const supportedTypes = ['.png', '.jpg', '.jpeg', '.gif', '.jfif', '.webp', '.bmp', '.dpg', '.svg', '.psd', '.tiff', '.tif', '.ico'];
		if (fileName.indexOf('.') === -1) {
			return false;
		}

		// get the file extension
		const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
		return supportedTypes.findIndex(m => m === fileExtension.toLocaleLowerCase()) > -1;
	}
}