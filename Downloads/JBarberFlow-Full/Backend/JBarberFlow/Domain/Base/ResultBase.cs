using System.Collections.Generic;

namespace JBF.Domain.Base
{
    public class ResultBase
    {
        public bool IsSuccess { get; set; } = true;
        public string Message { get; set; } = "Operación exitosa.";
        public List<string> Errors { get; set; } = new List<string>();
    }
    public class ResultBase<T> : ResultBase
    {
        public T? Data { get; set; }
    }
}