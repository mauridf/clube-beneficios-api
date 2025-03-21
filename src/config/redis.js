const Redis = require('ioredis');

const redis = new Redis({
  host: 'localhost', // Endereço do Redis
  port: 6379, // Porta padrão do Redis
});

module.exports = redis;