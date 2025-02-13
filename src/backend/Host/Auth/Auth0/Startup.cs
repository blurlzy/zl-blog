﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace ZLBlog.Auth.Auth0
{
    public static class Startup
    {
        public static void ConfigureAuth0(this IServiceCollection services,IConfiguration configuration)
        {
            var auth0Domain = configuration[SecretKeys.Auth0Domain];
            var auth0Audience = configuration[SecretKeys.Auth0Audience];
            // The ASP.NET Core JWT Bearer authentication handler downloads the JSON Web Key Set (JWKS) file with the public key.
            // The handler uses the JWKS file and the public key to verify the Access Token's signature.
            // openId configuration endpoint:
            // Sample: https://{domain}/.well-known/openid-configuration
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
        }
    }
}
