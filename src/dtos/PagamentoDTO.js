// src/dtos/PagamentoDTO.js
const { IsNumber, IsEnum, IsNotEmpty } = require('class-validator');

class PagamentoDTO {
  @IsNumber()
  @IsNotEmpty()
  valor;

  @IsEnum(['pendente', 'pago'])
  @IsNotEmpty()
  status;

  @IsNumber()
  @IsNotEmpty()
  compraId;
}

module.exports = PagamentoDTO;