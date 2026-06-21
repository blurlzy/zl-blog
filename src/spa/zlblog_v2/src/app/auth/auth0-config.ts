
// env
import { environment } from '../../environments/environment';

// auth0 allow list (require to add access token to http request header)
export const AllowList = [
	{
		uri: `${environment.apiEndpoint}/api/admin/*`,
		httpMethod: 'GET',
	},
	{
		uri: `${environment.apiEndpoint}/api/admin/*`,
		httpMethod: 'POST',
	},
	{
		uri: `${environment.apiEndpoint}/api/admin/*`,
		httpMethod: 'PUT',
	},
	{
		uri: `${environment.apiEndpoint}/api/admin/*`,
		httpMethod: 'DELETE',
	},
	{
		uri: `${environment.apiEndpoint}/api/blobs`, 
		httpMethod: 'POST',
	},
	{
		uri: `${environment.apiEndpoint}/api/blobs`,
		httpMethod: 'GET',
	},
	{
		uri: `${environment.apiEndpoint}/api/blobs/*`,
		httpMethod: 'GET',
	},
	{
		uri: `${environment.apiEndpoint}/api/blobs/*`,
		httpMethod: 'POST',
	},
	{
		uri: `${environment.apiEndpoint}/api/blobs/*`,
		httpMethod: 'PUT',
	},
	{
		uri: `${environment.apiEndpoint}/api/blobs/*`,
		httpMethod: 'DELETE',
	},
	{
		uri: `${environment.apiEndpoint}/api/blogcomments/*`,
		httpMethod: 'GET',
	},
	{
		uri: `${environment.apiEndpoint}/api/blogcomments/*`,
		httpMethod: 'DELETE',
	}
]