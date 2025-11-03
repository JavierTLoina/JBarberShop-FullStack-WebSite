using BCrypt.Net;
using System;

// CÓDIGO TEMPORAL: Usa esto para generar el valor que necesitas
string passwordPlana = "123456";
string hashValido = BCrypt.Net.BCrypt.HashPassword(passwordPlana);

// El hashValido será un string largo que COPIARÁS y usarás en el paso 2.
Console.WriteLine($"El Hash que debes usar: {hashValido}");
