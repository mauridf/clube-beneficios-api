const { IsNumber, IsArray, IsEnum, IsNotEmpty } = require('class-validator');

class CompraDTO {
  @IsNumber()
  @IsNotEmpty()
  clienteId;

  @IsArray()
  @IsNotEmpty()
  produtos;

  @IsEnum(['pendente', 'pago'])
  @IsNotEmpty()
  status;
}

module.exports = CompraDTO;