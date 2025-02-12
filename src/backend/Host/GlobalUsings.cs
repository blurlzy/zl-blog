// identity & key vault
global using Azure.Identity;
global using Azure.Security.KeyVault.Secrets;

// web api
global using Microsoft.AspNetCore.Http;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.AspNetCore.Authorization;

// MediatR
global using MediatR;
global using AutoMapper;

// app
global using ZLBlog;
global using ZLBlog.Config;
global using ZLBlog.Persistence;
global using ZLBlog.Models;