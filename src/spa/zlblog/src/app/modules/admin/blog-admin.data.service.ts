import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class BlogAdminDataService {
	// api endpoint
	private blogAdminApiEndpoint = `${environment.apiEndpoint}/api/admin/blogs`;

	// ctor
	constructor(private http: HttpClient) { }

	search(keyword:string, pageIndex:number, pageSize: number): Observable<any> { 
		const url = `${this.blogAdminApiEndpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`;
		return this.http.get(url);
	}
}