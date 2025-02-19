import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class BlogAdminDataService {
	// api endpoint
	private blogAdminApiEndpoint = `${environment.apiEndpoint}/api/admin`;
	private blobAdminApiEndpoint = `${environment.apiEndpoint}/api/blobs`;

	// ctor
	constructor(private http: HttpClient) { }

	// search blogs
	search(keyword: string, pageIndex: number, pageSize: number): Observable<any> {
		const url = `${this.blogAdminApiEndpoint}/blogs?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`;
		return this.http.get(url);
	}

	// create a blog
	createBlog(blog: any): Observable<any> {
		const url = `${this.blogAdminApiEndpoint}/blogs`;
		return this.http.post(url, blog);
	}

	// update a blog
	updateBlog(blog: any): Observable<any> {
		const url = `${this.blogAdminApiEndpoint}/blogs/${blog.id}`;
		return this.http.put(url, blog);
	}

	// get the latest blog images
	getLatestImages(): Observable<any> {
		const url = `${this.blobAdminApiEndpoint}/blog-images`;
		return this.http.get(url);
	}

	// upload blog images
	uploadImages(formData: any): Observable<any> {
		const url = `${this.blobAdminApiEndpoint}`;
		return this.http.post(url, formData);
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

	// archive or unarchive a blog
	archiveBlog(id: string, archive: boolean): Observable<any> {
		const url = `${this.blogAdminApiEndpoint}/blogs/${id}/archive`;
		return this.http.put(url, { id:id, isArchived: archive });
	}
}