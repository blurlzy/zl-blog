global using System.Text.Json.Serialization;

// identity & key vault
global using Azure.Identity;
global using Azure.Security.KeyVault.Secrets;
global using Azure.Storage.Blobs;
global using Azure.Storage.Blobs.Models;

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
global using ZLBlog.Persistence.Storage;
global using ZLBlog.Filters;
global using ZLBlog.Requests;
global using ZLBlog.Models;
global using ZLBlog.Models.Dtos;
