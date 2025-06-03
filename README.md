# Homologação
Projeto BenchMark para Carros
# Projeto BenchMark para Carros

## Descrição

O projeto **BenchMark para Carros** é uma API desenvolvida em ASP.NET Core com o objetivo de permitir o **cadastro**, **busca**, **atualização**, **exclusão** e **comparação** de carros.  
A comparação é feita com base em critérios de desempenho (potência, torque, aceleração, etc.) e custo-benefício (consumo, valor e ano), facilitando a escolha do melhor veículo de forma objetiva.

---

## Integrantes da Dupla

- Yorx Contreras - [@yorxcon](https://github.com/yorxcon)  
- Cauê Gonçalves - [@crustaceos](https://github.com/crustaceos)

---

## Tecnologias Utilizadas

- **Linguagem:** C# (.NET 8)  
- **Framework:** ASP.NET Core MVC  
- **ORM:** Entity Framework Core  
- **Banco de Dados:** MySQL  
- **Interface (em desenvolvimento):** React, JavaScript  
- **Controle de Versão:** Git + GitHub  

---

## Como Executar o Projeto

### Requisitos prévios

- [.NET SDK 8.0+](https://dotnet.microsoft.com/en-us/download)
- [MySQL](https://dev.mysql.com/downloads/)
- [Node.js + npm](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Passos para rodar o projeto

```bash
# 1. Clone o repositório
git clone https://github.com/crustaceos/APIBenchMarkCarros.git

# 2. Acesse a pasta do projeto
cd ProjetoBenchMarkCarros

# 3. Restaure os pacotes
dotnet restore

# 4. Execute a aplicação
dotnet run

# 5. Acesse a pasta do frontend
cd front

# 6. Instale as dependências (se necessário)
npm install

# 7. Inicie o frontend
npm start