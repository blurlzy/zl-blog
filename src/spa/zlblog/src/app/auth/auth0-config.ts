import { HttpMethod } from '@auth0/auth0-angular';
// env
import { environment } from '../../environments/environment';

// auth0 allow list (require to add access token to http request header)
export const AllowList = [
	{
		uri: `${environment.apiEndpoint}/api/admin/*`,
		httpMethod: HttpMethod.Get,
	},
	{
		uri: `${environment.apiEndpoint}/api/admin/*`,
		httpMethod: HttpMethod.Post,
	},
	{
		uri: `${environment.apiEndpoint}/api/admin/*`,
		httpMethod: HttpMethod.Put,
	},
	{
		uri: `${environment.apiEndpoint}/api/admin/*`,
		httpMethod: HttpMethod.Delete,
	},
	{
		uri: `${environment.apiEndpoint}/api/blobs`, // for upload file api
		httpMethod: HttpMethod.Post,
	},
	{
		uri: `${environment.apiEndpoint}/api/blobs/*`,
		httpMethod: HttpMethod.Get,
	},
	{
		uri: `${environment.apiEndpoint}/api/blobs/*`,
		httpMethod: HttpMethod.Post,
	},
	{
		uri: `${environment.apiEndpoint}/api/blobs/*`,
		httpMethod: HttpMethod.Put,
	},
	{
		uri: `${environment.apiEndpoint}/api/blobs/*`,
		httpMethod: HttpMethod.Delete,
	}
]