const { IsString, IsEmail, IsEnum, IsNotEmpty } = require('class-validator');

class ClienteDTO {
  @IsString()
  @IsNotEmpty()
  nome;

  @IsEmail()
  @IsNotEmpty()
  email;

  @IsString()
  @IsNotEmpty()
  senha;

  @IsEnum(['admin', 'cliente'])
  @IsNotEmpty()
  tipoUsuario;
}

module.exports = ClienteDTO;