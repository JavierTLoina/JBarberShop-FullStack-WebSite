using Microsoft.AspNetCore.Mvc;
using JBF.Domain.Entities;
using JBF.Domain.Base;
using JBF.Api.Models;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using System.Collections.Generic;
using BCrypt.Net;

namespace JBF.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IRepositoryBase<MUsers> _repository;
        private readonly IConfiguration _configuration;

        public AuthController(IRepositoryBase<MUsers> repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        // POST: api/Auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            // 1. Buscar Usuario por Correo
            // model.Correo contendrá el valor enviado desde el frontend (ej: "carlos.perez@cliente.com")
            var result = await _repository.GetOneByConditionAsync(u => u.Correo == model.Correo);

            if (!result.IsSuccess || result.Data == null)
            {
                return Unauthorized(new { Message = "Correo o contraseña incorrectos." });
            }

            var user = result.Data;

            // 2. 🚨 VERIFICACIÓN DE CONTRASEÑA con HASH (BCrypt.Net)
            // model.Contrasena contendrá el valor plano enviado por el usuario (ej: "123456").
            // user.PasswordHash contendrá el hash largo de la DB (ej: "$2a$11$...")
            if (string.IsNullOrEmpty(user.PasswordHash) || !BCrypt.Net.BCrypt.Verify(model.Contrasena, user.PasswordHash))
            {
                return Unauthorized(new { Message = "Correo o contraseña incorrectos." });
            }

            // 3. Generar y devolver el JWT Token
            var token = GenerateJwtToken(user);

            return Ok(new
            {
                token = token,
                role = user.TipoUsuario,
                email = user.Correo
            });
        }

        // --- Método de Ayuda para Generar JWT ---

        private string GenerateJwtToken(MUsers user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.ID_User.ToString()),
                new Claim(ClaimTypes.Name, user.NombreUsuario),
                new Claim(ClaimTypes.Role, user.TipoUsuario)
            };

            var keyString = _configuration.GetSection("AppSettings:Token").Value
                            ?? throw new InvalidOperationException("La clave 'AppSettings:Token' no está configurada.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}