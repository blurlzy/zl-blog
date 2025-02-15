import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BlogDataService {
	// api endpoint
	private blogApiEndpoint = `${environment.apiEndpoint}/api/blogs`;

	// ctor
	constructor(private http: HttpClient) { }

	listBlogs(pageIndex:number, pageSize: number): Observable<any> { 
		const url = `${this.blogApiEndpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
		return this.http.get(url);
	}

	getBlog(id:string): Observable<any> { 
		const url = `${this.blogApiEndpoint}/${id}`;
		return this.http.get(url);
	}
}