CREATE DATABASE market_cubos;

CREATE TABLE IF NOT EXISTS usuarios(
  id serial PRIMARY KEY,
  nome varchar(50) NOT NULL,
  nome_loja varchar(50) NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  senha text NOT NULL
);

CREATE TABLE IF NOT EXISTS produtos(
  id serial PRIMARY KEY,
  usuario_id INT NOT NULL,
  nome varchar(100) NOT NULL,
  estoque int NOT NULL,
  categoria text,
  preco int NOT NULL,
  descricao varchar(100) NOT NULL,
  imagem text
);