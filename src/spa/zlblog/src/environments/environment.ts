export const environment = {
	production: true,
	apiEndpoint: 'https://app-laozaoshanghai-api-prod.azurewebsites.net',
	msalConfig: {
	  auth: {
		 clientId: '16deee61-e9e6-4493-b1a3-57ed14e1c33b',
		 authority: 'https://login.microsoftonline.com/885ba0b1-68d5-40e2-adaa-238cb699dbdc',
	  },
	},
	apiConfig: {
	  scopes: ['user.read'],
	  uri: 'https://graph.microsoft.com/v1.0/me',
	}
 };