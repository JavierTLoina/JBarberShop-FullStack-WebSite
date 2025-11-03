// ARCHIVO: JBF.Api\Models\LoginRequest.cs

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace JBF.Api.Models
{
    public class LoginRequest
    {
        [Required]
        [JsonPropertyName("email")] // Mapea el campo 'email' de JavaScript a 'Correo' de C#
        public string Correo { get; set; } = string.Empty;

        [Required]
        [JsonPropertyName("password")] // Mapea el campo 'password' de JavaScript
        public string Password { get; set; } = string.Empty; // <--- ¡Cambiado de 'Contrasena' a 'Password'!
    }
}