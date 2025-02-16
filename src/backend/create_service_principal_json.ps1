# create a service principal or create an app registration from Azure portal
az ad sp create-for-rbac `
		--name <app-registration-name> ` 
		--role contributor `
		--scopes /subscriptions/<subscription-GUID>/resourceGroups/<resource-group> `
		--output json

##  create a GitHub Action secret AZURE_CREDENTIALS with the value like below: 
{
    "clientSecret":  "******",
    "subscriptionId":  "******",
    "tenantId":  "******",
    "clientId":  "******"
}

## ensure the created service principal also has the permission - "contributor" to access Azure Container registry
https://github.com/Azure/login?tab=readme-ov-file#login-with-a-service-principal-secret