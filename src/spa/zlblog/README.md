# ZL Blog
This blog application is built on top of Semantic Kernel and hosted on Azure. The data is securely stored in Azure Cosmos DB. The user interface is developed using Angular 19, and the backend API is powered by ASP.NET Core 8.0.


## Backend (Asp.net Core Web API)
### Installation

- Install Azure.Identity & Azure.Security.KeyVault.Secrets (Azure KeyVault integration)

```
dotnet add package Microsoft.Identity.Web
dotnet add package Azure.Identity
dotnet add package Azure.Security.KeyVault.Secrets
```

### Auth0 Intergration
```
  "Auth0": {
    "Domain": <your-auth0-domain>,         
    "Audience": "<your-auth0-audience>" 
  },

```

### Register / Configure Authentication
```
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

Complete Auth0 setup

### Installation

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