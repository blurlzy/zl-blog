import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BlogDataService {
	// api endpoint
	private blogApiEndpoint = `${environment.apiEndpoint}/api/blogs`;
	private commentApiEndpoint = `${environment.apiEndpoint}/api/BlogComments`;
	// ctor
	constructor(private http: HttpClient) { }

	// search blogs by keywords
	listBlogs(keywords:string, pageIndex:number, pageSize: number): Observable<any> { 
		const url = `${this.blogApiEndpoint}?keywords=${keywords}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
		return this.http.get(url);
	}

	// filter blogs by a tag
	listBlogsByTag(tag:string, pageIndex:number, pageSize: number): Observable<any> { 
		const url = `${this.blogApiEndpoint}/tags/${tag}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
		return this.http.get(url);
	}
	
	getBlog(id:string): Observable<any> { 
		const url = `${this.blogApiEndpoint}/${id}`;
		return this.http.get(url);
	}

	listComments(blogId:string): Observable<any> { 
		const url = `${this.blogApiEndpoint}/${blogId}/comments`;
		return this.http.get(url);
	}
	
	createComment(comment:any): Observable<any> {
		const url = `${this.commentApiEndpoint}`;
		return this.http.post(url, comment);
	}
}