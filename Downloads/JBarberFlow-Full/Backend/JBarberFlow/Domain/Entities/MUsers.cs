// ARCHIVO: JBF.Domain\Entities\MUsers.cs

using System.ComponentModel.DataAnnotations;

namespace JBF.Domain.Entities
{
    public class MUsers
    {
        [Key]
        public int ID_User { get; set; }

        public required string NombreUsuario { get; set; }
        public required string Correo { get; set; }
        public required string TipoUsuario { get; set; }
        public required string PasswordHash { get; set; }

        public bool IsDeleted { get; set; }
    }
}