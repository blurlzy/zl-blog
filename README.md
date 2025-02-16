# ZL Blog
A simple and minimalist blog site designed for a clean reading experience. It includes an admin portal that allows administrators to manage blogs and comments efficiently.

Frontend: Developed using Angular 19 for a modern and responsive UI.

Backend: Powered by ASP.NET Core 8.0, ensuring high performance and scalability.

Database: Securely stores data in Azure Cosmos DB for reliability and flexibility.

## Demo
[demo](https://zongyi.me/) 

![ZL Blog](https://stzlblog.blob.core.windows.net/app-images/site_1.png)
![ZL Blog](https://stzlblog.blob.core.windows.net/app-images/site_2.png)

## Backend (Asp.Net Core 8.0)
### Prerequisites

- Azure Identity
- Azure Cosmos DB
- Azure Storage Account - Blob Storage
- MediatR

## Azure Key Vault provides a way to store credentials and other secrets with increased security. 
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

- Install @auth0/auth0-angular
- Install @angular/material 
- Install bootstrap-icons
- npm i ngx-quill

```
npm install @azure/msal-browser @azure/msal-angular@latest
ng add @angular/material
npm i bootstrap-icons
```

## https://www.npmjs.com/package/ngx-quill