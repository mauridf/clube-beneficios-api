const { IsString, IsNumber, IsNotEmpty } = require('class-validator');

class ProdutoDTO {
  @IsString()
  @IsNotEmpty()
  nome;

  @IsString()
  @IsNotEmpty()
  descricao;

  @IsNumber()
  @IsNotEmpty()
  preco;

  @IsString()
  @IsNotEmpty()
  categoria;
}

module.exports = ProdutoDTO;