import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class BlogAdminDataService {
	// api endpoint
	private blogAdminApiEndpoint = `${environment.apiEndpoint}/api/admin`;

	// ctor
	constructor(private http: HttpClient) { }

	// search blogs
	search(keyword:string, pageIndex:number, pageSize: number): Observable<any> { 
		const url = `${this.blogAdminApiEndpoint}/blogs?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`;
		return this.http.get(url);
	}

	// create or update a blog
	saveBlog(blog: any): Observable<any> { 
		const url = `${this.blogAdminApiEndpoint}/blogs`;
		return this.http.post(url, blog);
	}

	// get the latest blog images
	getLatestImages(): Observable<any> { 
		const url = `${this.blogAdminApiEndpoint}/blog-images`;
		return this.http.get(url);
	}
	
	// get blog by id
	getBlogById(id: string): Observable<any> { 
		const url = `${this.blogAdminApiEndpoint}/blogs/${id}`;
		return this.http.get(url);
	}

	// publish a blog
	publishBlog(id: string): Observable<any> { 
		const url = `${this.blogAdminApiEndpoint}/blogs/${id}/publish`;
		return this.http.post(url, null);
	}
}