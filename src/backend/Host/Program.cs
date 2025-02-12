using Azure.Extensions.AspNetCore.Configuration.Secrets;
using ZLBlog.Extensions;


var builder = WebApplication.CreateBuilder(args);

// register secret client
SecretClient secretClient = new SecretClient(new Uri($"https://{builder.Configuration["Azure:KeyVault"]}.vault.azure.net"),
                                              new DefaultAzureCredential(new DefaultAzureCredentialOptions
                                              {
                                                  ExcludeEnvironmentCredential = true,
                                                  ExcludeVisualStudioCodeCredential = true,
                                                  ExcludeSharedTokenCacheCredential = true,
                                                  ExcludeInteractiveBrowserCredential = true,
                                              }));

// loads secrets into configuration. ## it requres Azure.Extensions.AspNetCore.Configuration.Secrets package
builder.Configuration.AddAzureKeyVault(secretClient, new KeyVaultSecretManager());


// Add services to the container.
// todo: add auth services
// register mediatR & auto mapper
builder.Services.ConfigureMediatR();
builder.Services.ConfigureAutoMapper();

// register persistence services
builder.Services.ConfigurePersistence(builder.Configuration);
// register application insights
builder.Services.ConfigureApplicationInsights(builder.Configuration);

// api controller
builder.Services.AddControllers();
// cors policy
builder.Services.ConfigureCors("AllowCors");
// swagger
builder.Services.ConfigureSwagger();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// get the logger instance from the app
// ILogger<Program> logger = app.Services.GetRequiredService<ILogger<Program>>();
// error handling pipeline (middleware)
app.UseGlobalExceptionHandler(app.Logger);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
