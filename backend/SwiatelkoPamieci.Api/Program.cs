var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://127.0.0.1:5173", "http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors();

app.MapGet("/api/health", () => Results.Ok(new
{
    status = "ok",
    service = "PlomykPamieci.Api"
}));

app.MapGet("/api/orders/layout-preview", () => Results.Ok(new
{
    message = "Placeholder pod przyszły formularz zamówień, płatności online i panel administracyjny."
}));

app.Run();
