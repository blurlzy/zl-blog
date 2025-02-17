# ZL Blog
A simple and minimalist blog site designed for a clean reading experience. It includes an admin portal that allows administrators to create, edit, publish and delete blogs efficiently.

Frontend: Developed using Angular 19 for a modern and responsive UI.

Backend: Powered by ASP.NET Core 8.0, ensuring high performance and scalability.

Database: Securely stores data in Azure Cosmos DB for reliability and flexibility.

## Demo
[https://zongyi.me](https://zongyi.me/) 

![ZL Blog](https://stzlblog.blob.core.windows.net/app-images/site_1.png)
![ZL Blog](https://stzlblog.blob.core.windows.net/app-images/site_2.png)

## Backend (Asp.Net Core 8.0)
### Prerequisites

- Azure Key Vault
- Azure Cosmos DB
- Azure Storage Account - Blob Storage

## Azure Key Vault provides a way to store credentials and other secrets with increased security. 
### Add Key vault secrets
```
# cosmos db
az keyvault secret set --vault-name "<your-unique-keyvault-name>" --name "CosmosConnection" --value "<secret-value>"
az keyvault secret set --vault-name "<your-unique-keyvault-name>" --name "CosmosDb" --value "<secret-value>"
az keyvault secret set --vault-name "<your-unique-keyvault-name>" --name "BlogContainer" --value "<secret-value>"
az keyvault secret set --vault-name "<your-unique-keyvault-name>" --name "BlogCommentContainer" --value "<secret-value>"
 
# storage account
az keyvault secret set --vault-name "<your-unique-keyvault-name>" --name "StorageAccountConnection" --value "<secret-value>"
 
#auth0
az keyvault secret set --vault-name "<your-unique-keyvault-name>" --name "Auth0Domain" --value "<secret-value>"
az keyvault secret set --vault-name "<your-unique-keyvault-name>" --name "Auth0Audience" --value "<secret-value>"
 
# application insights
az keyvault secret set --vault-name "<your-unique-keyvault-name>" --name "AppInsightsConnection" --value "<secret-value>"

```

### Key vault intergration
``` C#
// register secret client
SecretClient secretClient = new SecretClient(new Uri($"https://{builder.Configuration["Azure:KeyVault"]}.vault.azure.net"),
                                              new DefaultAzureCredential(new DefaultAzureCredentialOptions
                                              {
                                                  ExcludeEnvironmentCredential = true,
                                                  ExcludeVisualStudioCodeCredential = true,
                                                  ExcludeSharedTokenCacheCredential = true,
                                                  ExcludeInteractiveBrowserCredential = true,
                                              }));

// loads secrets into configuration.
builder.Configuration.AddAzureKeyVault(secretClient, new KeyVaultSecretManager());
```

### Auth0 Intergration
```
  "Auth0": {
    "Domain": <your-auth0-domain>,         
    "Audience": "<your-auth0-audience>" 
  },

```

### Register / Configure Authentication
``` C#
  services.AddAuthentication(options =>
  {
      options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
      options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
  })
  .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
  {
      options.Authority = $"https://{auth0Domain}";
      options.Audience = auth0Audience;
      // If the access token does not have a `sub` claim, `User.Identity.Name` will be `null`. 
      // Map it to a different claim by setting the NameClaimType below.
      options.TokenValidationParameters = new TokenValidationParameters
      {
          NameClaimType = ClaimTypes.NameIdentifier
      };
  });

```

### Add auth middleware to pipeline
```
app.UseAuthentication();
app.UseAuthorization();

```

## Front-end (Angular)
### Prerequisites

- Install @auth0/auth0-angular (https://github.com/auth0/auth0-angular)
- Install @angular/material 
- Install bootstrap-icons
- npm i ngx-quill (https://www.npmjs.com/package/ngx-quill)

### Setup auth0 authentication in app.config.ts
```js
    provideAuth0({
      domain: environment.auth0Config.tenantDomain,
      clientId: environment.auth0Config.clientId,
      authorizationParams: {
        audience: environment.auth0Config.audience,
        redirect_uri: `${window.location.origin}${environment.auth0Config.callbackRedirectUri}`
      },
      // The AuthHttpInterceptor configuration
      httpInterceptor: {
        allowedList: [
          ...AllowList
        ],
      }
    }),

```

### Setup Quill in app.config.ts
```js
    provideQuillConfig({
      
    }), 

```