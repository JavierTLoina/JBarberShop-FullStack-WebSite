using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;

using JBF.Infraestructure.Data;
using JBF.Domain.Base;
using JBF.Infraestructure.Base;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder
        .WithOrigins("http://localhost:5173")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});

// 1.2. Configuración de JWT Authentication
var tokenSection = builder.Configuration.GetSection("AppSettings:Token");
// 💡 La clave es requerida. Asegúrate de tenerla en appsettings.json.
var tokenKey = tokenSection.Value ?? throw new InvalidOperationException("La clave 'AppSettings:Token' no se encuentra en la configuración.");
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

// 1.3. 🚨 CORRECCIÓN CRÍTICA: Añadir el servicio de Autorización
builder.Services.AddAuthorization();


// 1.4. 💡 Registro del DbContext
// ⚠️ Reemplaza "DefaultConnection" con el nombre real de tu ConnectionString en appsettings.json
builder.Services.AddDbContext<JBarberFlowDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});


// 1.5. 💡 Registro de la Inyección de Dependencias (Patrón Repositorio)
// Registra IRepositoryBase<T> para que apunte a RepositoryBase<T>
// Esto permite a los controladores usar IRepositoryBase<MUsers>
builder.Services.AddScoped(typeof(IRepositoryBase<>), typeof(RepositoryBase<>));


// 1.6. Otros servicios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// --- 2. CONFIGURACIÓN DEL PIPELINE (app.Use...) ---

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 2.1. Uso de CORS
app.UseCors("CorsPolicy");

// 2.2. Uso de Autenticación y Autorización (DEBE SER ANTES DE app.MapControllers)
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();