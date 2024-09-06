# Plataforma de engajamento de influenciadores @metropole4

## Visão Geral
Esta plataforma conecta marcas e influenciadores. A API oferece funcionalidades para registro de usuários, gerenciamento de marcas e influenciadores, além de categorias para influenciadores.

### 1. **Executando a Aplicação**
Para iniciar a aplicação e o banco de dados, execute o seguinte comando no diretório raiz do projeto:
  ```
  docker-compose up --build
  ```
  Este comando irá construir a imagem da aplicação, iniciar o contêiner do banco de dados e conectar ambos os serviços. A aplicação estará disponível em `http://localhost:3000`.


### 3. **Populando o Banco de Dados**
Após os contêineres estarem em execução, você pode popular o banco de dados utilizando as seeds definidas em `data/seed.js`. Para isso, siga os passos abaixo:

Execute o comando abaixo para acessar o contêiner da aplicação e executar o script de seed:
   ```bash
   docker exec -it metropole4_webapp sh -c "node data/seed.js"
   ```

### 4. **Criação de Usuário Administrador**

Popular o banco de dados executando as seeds cria um usuário Padrão:

**Credenciais Padrão**
- **Email**: default@example.com
- **Senha**: 123456

Você também pode criar outro usuário através de uma rota http. Após a inicialização da aplicação, caso queira criar outro usuário administrador, faça uma requisição para a rota `user/register` com os dados do usuário administrador.

Para criar um usuário administrador, você precisará fornecer os seguintes parâmetros na sua requisição para a rota `user/register`:
- `nome`: O nome do usuário administrador.
- `email`: O email do usuário administrador.
- `senha`: A senha do usuário administrador.
Exemplo de corpo de requisição:
```json
{
  "nome": "Administrador Exemplo",
  "email": "admin@example.com",
  "senha": "senhaSegura",
}
```
Certifique-se de que a requisição seja feita com o método HTTP `POST` e que o conteúdo seja enviado no formato JSON.

### 4. Tecnologias Utilizadas
A plataforma foi desenvolvida utilizando as seguintes tecnologias:

- **Next.js**: Um framework React que permite a criação de aplicações web escaláveis e de alto desempenho, com suporte a renderização do lado do servidor (SSR) e geração de sites estáticos (SSG).
- **Prisma**: Um ORM (Object-Relational Mapping) que facilita a interação com o banco de dados, permitindo consultas e manipulações de dados de forma intuitiva e segura.
- **TypeScript**: Uma linguagem de programação que adiciona tipagem estática ao JavaScript, melhorando a manutenção e a escalabilidade do código.
- **Bcrypt**: Uma biblioteca para hashing de senhas, garantindo que as senhas dos usuários sejam armazenadas de forma segura.
- **NextAuth.js**: Uma biblioteca para autenticação em aplicações **Next.js**, que simplifica a implementação de autenticação e autorização.

## Sobre Abordagens utilizadas
### Arquitetura
A arquitetura do aplicativo foi projetada com foco em modularidade e separação de responsabilidades. Cada recurso (marca, influenciador, usuário) possui suas próprias rotas e lógica de manipulação, facilitando a manutenção e a escalabilidade do código. A escolha do **Next JS** foi, para além da renderização no servidor, para ter baixa complexidade entre FrontEnd e BackEnd, considerando a baixa complexidade da aplicação, prazo, etc...

**Foi dada prioridade aos requisitos descritos no arquivo README e nos assets de design, posteriormente alguma atenção para a sessão de diferenciais**


### Performance
A API foi otimizada para performance, utilizando técnicas como paginação e filtragem em consultas ao banco de dados. Isso garante que as respostas sejam rápidas, mesmo com grandes volumes de dados.

## Fluxo de Chamadas HTTP

O fluxo de chamadas HTTP definido parte dos componentes, que utilizam server actions para fazer chamadas ao servidor.

Na arquitetura definida, seria possível utilizar instancias do ORM (Prisma) diretamente nas server actions, as rotas http foram construídas para fins de **avaliação**. Medidas posteriores seriam exigir autenticação para rotas convenientes com por exemplo JWT.

**Os fluxos se encerram nos controladores de rotas devido a baixa complexidade, e a falta de regras de negócio fez desnecessária uma camada de serviços.**

## Uso do Docker

Pode ser facilmente implantada utilizando Docker, proporcionando um ambiente isolado e consistente para desenvolvimento e produção. O uso do Docker simplifica o processo de configuração e garante que todas as dependências necessárias estejam disponíveis.

### 1.Configuração do Docker

O projeto inclui um `Dockerfile` e um arquivo `docker-compose.yml` que facilitam a construção e execução dos serviços necessários. Abaixo estão as instruções para utilizar o Docker para implantar a aplicação.

- **Serviço de Banco de Dados:**
  - O serviço `db` definido no arquivo compose utiliza a imagem mais recente do PostgreSQL.
  - As variáveis de ambiente configuram o usuário, senha e nome do banco de dados.
  - Os dados do banco de dados são persistidos em um volume Docker.

### 2. Caso de Uso de Deploy
O uso do Docker pra deploy ready torna a aplicação pronta para deploy em ambientes de produção. Com a configuração adequada, pode facilmente escalar os serviços, gerenciar dependências, etc...

Com essa abordagem, a plataforma é facilmente implantável em qualquer servidor que suporte Docker, simplificando o processo de entrega contínua e integração contínua (CI/CD).

## UI/UX

Optei por usar Shadcn UI, **somente componentes necessários** foram trazidos.

### 1. Design pré definido

A aplicação foi construída encima do layout pré definido, houveram algumas poucas mudanças que improvaram performance e usabilidade.

### 2. Estilos

Inicialmente utilizei SASS, migrei para o tailwind posteriormente pela melhor compatibilidade com o Shadcn UI, o SASS foi retirado por não haver mais necessidade.

**Valores HSL de cores foram extraídas das images e podem não corresponder exatamente.**

# Documentação da API

## Rotas da API

### 1. **Rota: `/api/brand`**
- **Método: GET**
  - **Descrição:** Retorna uma lista de marcas, com suporte a paginação e pesquisa.
  - **Parâmetros:**
    - `page`: Número da página (padrão: 1).
    - `take`: Número de marcas por página (padrão: 14).
    - `search`: Termo de pesquisa para filtrar marcas pelo nome.

- **Método: POST**
  - **Descrição:** Cria uma nova marca.
  - **Corpo da Requisição:**
    - `nome`: Nome da marca.
    - `descricao`: Descrição da marca.
    - `nicho`: ID do nicho ao qual a marca pertence.

### 2. **Rota: `/api/brand/:id`**
- **Método: GET**
  - **Descrição:** Retorna os detalhes de uma marca específica pelo ID.
  
- **Método: PUT**
  - **Descrição:** Atualiza os dados de uma marca existente.
  - **Corpo da Requisição:** Dados da marca a serem atualizados.

### 3. **Rota: `/api/influencer`**
- **Método: GET**
  - **Descrição:** Retorna uma lista de influenciadores, com suporte a filtros, paginação e pesquisa.
  - **Parâmetros:**
    - `asOption`: Se deve retornar apenas ID e nome.
    - `page`, `take`, `search`, `minAlcance`, `maxAlcance`, `nicho`: Filtros e opções de paginação.

- **Método: POST**
  - **Descrição:** Cria um novo influenciador.
  - **Corpo da Requisição:** Dados do influenciador, incluindo informações de endereço.

### 4. **Rota: `/api/influencer/:id`**
- **Método: GET**
  - **Descrição:** Retorna os detalhes de um influenciador específico pelo ID.

- **Método: PUT**
  - **Descrição:** Atualiza os dados de um influenciador existente.
  - **Corpo da Requisição:** Dados do influenciador a serem atualizados.

### 5. **Rota: `/api/influencerCategory`**
- **Método: GET**
  - **Descrição:** Retorna uma lista de categorias de influenciadores, com suporte a pesquisa.
  - **Parâmetros:**
    - `search`: Termo de pesquisa para filtrar categorias pelo nome.

### 6. **Rota: `/api/user/register`**
- **Método: POST**
  - **Descrição:** Registra um novo usuário.
  - **Corpo da Requisição:**
    - `nome`: Nome do usuário.
    - `email`: Email do usuário.
    - `senha`: Senha do usuário (armazenada de forma segura).

### 7. **Rota: `/api/health`**
- **Método: GET**
  - **Descrição:** Verifica a saúde da API, retornando uma mensagem de status.



# Estrutura de dados

   ```mermaid
graph TD;
subgraph "Usuários"
U1[User]
end
subgraph "Endereços"
A1[Address]
end
subgraph "Influenciadores"
I1[Influencer]
IC1[InfluencerCategory]
end
subgraph "Marcas"
B1[Brand]
end
I1 -->|N:1| IC1
I1 -->|N:1| A1
I1 -->|N:M| B1
B1 -->|N:1| IC1
style U1 fill:#f4f,stroke:#333,stroke-width:2px;
style A1 fill:#f4f,stroke:#333,stroke-width:2px;
style I1 fill:#f4f,stroke:#333,stroke-width:2px;
style IC1 fill:#f4f,stroke:#333,stroke-width:2px;
style B1 fill:#f4f,stroke:#333,stroke-width:2px;


