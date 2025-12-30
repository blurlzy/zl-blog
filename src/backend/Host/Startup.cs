using Microsoft.ApplicationInsights.AspNetCore.Extensions;
using Microsoft.Azure.Cosmos.Serialization.HybridRow;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi;

namespace ZLBlog
{
     public static class Startup
     {
          // register mediatR
          public static void ConfigureMediatR(this IServiceCollection services)
          {
               services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Startup).Assembly));
          }

          // register automapper
          public static void ConfigureAutoMapper(this IServiceCollection services)
          {
               // register auto mapper            
               services.AddAutoMapper(typeof(Startup));
          }

          public static void ConfigureCors(this IServiceCollection services, string corsPolicy)
          {
               string[] allowedOrigins = new[]
               {
                                "http://localhost:4200",
                                "https://zongyi.me",
                                "http://zongyi.me",
                                "https://www.zongyi.me",
                                "http://www.zongyi.me",
                                "https://delightful-sky-0c8f4b600.4.azurestaticapps.net"
                        };

               // cors policy
               services.AddCors(
                       opt =>
                       {
                            opt.AddPolicy(corsPolicy,
                     builder => builder.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod());
                       });
          }

          // configure application insights
          public static void ConfigureApplicationInsights(this IServiceCollection services, IConfiguration configuration)
          {
               // retreive the connection string from key vault
               var appInsightsConnection = configuration[SecretKeys.AppInsightsConnection];
               var options = new ApplicationInsightsServiceOptions { ConnectionString = appInsightsConnection };
               services.AddApplicationInsightsTelemetry(options: options);
          }

          // configure swagger
          public static void ConfigureSwagger(this IServiceCollection services)
          {
               services.AddEndpointsApiExplorer();
               services.AddSwaggerGen(options =>
               {
                    options.SwaggerDoc("v1", new OpenApiInfo
                    {
                         Title = "ZL Blog APIs",
                         Description = "ZL Blog",
                         Version = "v2.1",
                    });
                    options.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
                    {
                         Type = SecuritySchemeType.Http,
                         Scheme = "bearer",
                         BearerFormat = "JWT",
                         Description = "JWT Authorization header using the Bearer scheme."
                    });
                    options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
                    {
                         [new OpenApiSecuritySchemeReference("bearer", document)] = []
                    });
               });
               //services.AddSwaggerGen(c =>
               //{

               //     c.SwaggerDoc("v1", new OpenApiInfo
               //     {
               //          Title = "ZL Blog APIs",
               //          Description = "ZL Blog",
               //          Version = "v2.1",
               //     });

               //     // add bearer token support
               //     var securitySchema = new OpenApiSecurityScheme
               //     {
               //          Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
               //          Name = "Authorization",
               //          In = ParameterLocation.Header,
               //          Type = SecuritySchemeType.Http,
               //          Scheme = "bearer",
               //          BearerFormat = "JWT",
               //          //Reference = new OpenApiReference
               //          //{
               //          //        Type = ReferenceType.SecurityScheme,
               //          //        Id = "Bearer"
               //          //}
               //     };

               //     c.AddSecurityDefinition("bearer", securitySchema);

               //     c.AddSecurityRequirement(document =>
               //     {
               //          OpenApiSecuritySchemeReference? schemeRef = new("Bearer");
               //          OpenApiSecurityRequirement? requirement = new()
               //          {
               //               [schemeRef] = []
               //          };
               //          return requirement;
               //     });

               //     //var securityRequirement = new OpenApiSecurityRequirement
               //     //{
               //     //    {
               //     //            new OpenApiSecuritySchemeReference("Bearer"),
               //     //            ["bearer"]
               //     //        }
               //     //};

               //     //c.AddSecurityRequirement(securityRequirement);
               //});
          }
     }
}
