# -home-health
# HOME HEALTH API

Uma aplicação de exemplo que simula funcionalidades básicas de um app de academia.

## Requisitos Funcionais (RFs)
<!-- Funcionalidades da aplicação (o que o usuário poderá fazer) -->

- [] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível cadastrar um usuário como médico e responsável;
- [] Deve ser possível enviar um invite de acompanhado para outro usuário
- [] Médicos e responsáveis podem tem acesso aos registros de seus observados
- [] Todos os usuários devem poder fazer os próprios registros, mesmo sem reponsáveis e médicos cadastrados;

- [] Responsáveis e médicos podem obter o relatório de seus acompanhados
- [] Deve ser possível obter um relatório em pdf, excel e csv de um período de tempo de registro escolhido pelo o usuário
- [] 
- [] Deve ser possível registrar dados genéricos dos usuários
- [] Deve ser possível registrar um dado qualquer de escolha do usuário
- [] Deve ser possível cadastrar medicamentos
- [] Deve ser possível notificar o usuário no horário da medicação
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [] Deve ser possível o usuário obter seu histórico de check-ins;
- [] Deve ser possível o usuário buscar academias próximas (até 10 km);
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia.

## Regras de Negócio (RNs)
<!-- Condições aplicadas a cada Requisito Funcional (if) -->


- [] O relatório deve espelhar os dados persistidos no banco 
- [] A data de registro deve ser automática, mas pode ser setada pelo usuário
- [] Administradores podem ter acesso a qualquer perfil
## Requisitos Não Funcionais (RNFs)

- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas listas de dados precisam estar paginadas com 20 itens por página;
- 
- [] O usuário deve ser identificado por um JWT (JSON Web Token).
- 
## Scripts
- `dev`: Roda a aplicação em modo de desenvolvimento.
- `start`: Roda a aplicação em produção, após ser compilada.
- `build`: Compila a aplicação.

## Como usar
1. Clone o repositório: `git clone https://github.com/alexandrecpedro/03-api-solid.git`
2. Instale as dependências: `npm install`
3. Inicie o servidor: `npm run dev`
4. Acesse `http://localhost:3333` para testar a API.