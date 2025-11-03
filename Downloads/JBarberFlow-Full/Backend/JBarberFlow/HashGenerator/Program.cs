using BCrypt.Net;
using System;

string passwordPlana = "123456";
string hashValido = BCrypt.Net.BCrypt.HashPassword(passwordPlana, 10); 

Console.WriteLine($"El Hash que debes usar (clave 123456): {hashValido}");
