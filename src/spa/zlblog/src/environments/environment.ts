export const environment = {
	production: true,
	apiEndpoint: 'https://app-laozaoshanghai-api-prod.azurewebsites.net',
	auth0Config:{
		tenantDomain: 'zlblog.au.auth0.com',
		clientId: '9BkIxugDGE3VB1p4zXF1CQinIJAMk9B5',
		audience: 'https://zlblog.com',
		callbackRedirectUri: '/admin',
	},
	msalConfig: {
	  auth: {
		 clientId: '<your-app-registration-client-id>',
		 authority: 'https://login.microsoftonline.com/<your-tenant-id>',
	  },
	},
	apiConfig: {
	  scopes: ['user.read'],
	  uri: 'https://graph.microsoft.com/v1.0/me',
	}
 };