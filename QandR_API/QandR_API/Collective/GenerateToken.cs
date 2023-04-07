﻿using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using QandR_API.DTO;
using QandR_API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace QandR_API.Collective
{
    public class GenerateToken
    {
        private readonly IConfiguration? _config;
        public GenerateToken(IConfiguration? config)
        {
            _config = config;
        }

        public string generateToken(Token_DTO user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config!.GetSection("Jwt:Key").Value));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var Claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user!.Id!.ToString()!),
                new Claim(ClaimTypes.Name, user!.Firstname!),
                new Claim(ClaimTypes.GivenName, user!.Lastname!),
                new Claim(ClaimTypes.Role, user!.Role!),
                new Claim(ClaimTypes.Email, user!.Email!),
            };
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(Claims),
                Expires = DateTime.Now.AddYears(1),
                SigningCredentials = credentials,
                Issuer = _config.GetSection("Jwt:Issuer").Value,
                Audience = _config.GetSection("Jwt:Audience").Value
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var mainToken = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            };

            return JsonConvert.SerializeObject(mainToken);
        }
    }
}
