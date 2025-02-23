import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class Util {
	// SEO
	private readonly meta = inject(Meta);
	private readonly title = inject(Title);

	// default SEO tags
	private readonly defaultTags = 'AI,Azure,Cloud computing,Tech,OpenAI,Azure OpenAI,AWS,GCP,Fabric,Microsoft,Google,Amazon,Cloud,Machine Learning,Generative AI, AGI, AI Agent, LLMs, LLM, Data Engineering,Security,DevOps,CICD,Container,Docker';
	private readonly defaultDescription = 'AI,Azure,Cloud computing,Tech,OpenAI,Azure OpenAI,AWS,GCP,Fabric,Microsoft,Google,Amazon,Cloud,Machine Learning,Generative AI, AGI, AI Agent, LLMs, LLM,Security,DevOps,CICD,Container,Docker';
	private readonly defaultTitle = 'ZL Blog - Tech & Beyond';

	isValidGUID(id: string): boolean {
		const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
		return guidRegex.test(id);
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

	createImgHtml(imgUrl: string, alt: string): string {
		return `<img src="${imgUrl}" alt="${alt}" class="img-fluid border rounded" width="90%" height="90%">`;
	}

	// remove the auto-generated "&nbsp;", the html editor will generate "&nbsp;" when the space key is pressed
	cleanHtml(html: string): string {
		return html.replace(/&nbsp;/g, ' ');
	}

	setMetaTags(blog: any): void {
		// set title
		this.title.setTitle(blog.title);
		// set meta tags
		if (blog.tags && blog.tags.length > 0) {
			this.meta.updateTag({ name: 'keywords', content: blog.tags.join(',') });
			this.meta.updateTag({ name: 'description', content: blog.tags.join(',') });
		}
		else {
			this.meta.updateTag({ name: 'keywords', content: this.defaultTags });
			this.meta.updateTag({ name: 'description', content: this.defaultDescription });
		}
	}

	resetMetaTags(): void {
		// set title
		this.title.setTitle(this.defaultTitle);
		// set meta tags
		this.meta.updateTag({ name: 'keywords', content: this.defaultTags });
		this.meta.updateTag({ name: 'description', content: this.defaultDescription });
	}

	// ensure the text length is less than 2150
	trimText(text: string): string {
		if (text.length > 250) {
			return text.substring(0, 250) + '...';
		}
		return text;
	}
}