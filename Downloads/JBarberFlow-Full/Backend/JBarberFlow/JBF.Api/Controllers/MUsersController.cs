using Microsoft.AspNetCore.Mvc;
using JBF.Domain.Entities;
using JBF.Application.Base;
using JBF.Domain.Base;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JBF.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MUsersController : ControllerBase
    {
        // ⭐️ Descomentado: Variable de repositorio real
        private readonly IRepositoryBase<MUsers> _repository;

        // ⭐️ Descomentado: Constructor con inyección de dependencias
        public MUsersController(IRepositoryBase<MUsers> repository)
        {
            _repository = repository;
        }

        // GET: api/MUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MUsers>>> GetUsers()
        {
            // ⭐️ CÓDIGO REAL: Llama a la base de datos
            var result = await _repository.GetAllasync();

            if (!result.IsSuccess)
                // Esto devolverá un error 400 si la conexión falla (lo cual ya hemos corregido)
                return BadRequest(result.Message);

            // Devuelve los datos reales de la BD: Carlos Pérez, Ana Gómez, etc.
            return Ok(result.Data);
        }

        // GET: api/MUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MUsers>> GetUser(int id)
        {
            var result = await _repository.GetbyIdasync(id);
            if (!result.IsSuccess)
                return NotFound(result.Message);

            return Ok(result.Data);
        }

        // POST: api/MUsers
        [HttpPost]
        public async Task<ActionResult<MUsers>> CreateUser(MUsers user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _repository.Createasync(user);
            if (!result.IsSuccess)
                return BadRequest(result.Message);

            return CreatedAtAction(nameof(GetUser), new { id = user.ID_User }, user);
        }

        // PUT: api/MUsers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, MUsers user)
        {
            if (id != user.ID_User)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _repository.Updateasync(user);
            if (!result.IsSuccess)
                return BadRequest(result.Message);

            return NoContent();
        }

        // POST: api/MUsers/exists
        [HttpPost("exists")]
        public async Task<ActionResult<bool>> CheckUserExists([FromBody] string nombreUsuario)
        {
            var exists = await _repository.ExistsAsync(u => u.NombreUsuario == nombreUsuario);
            return Ok(exists);
        }
    }
}