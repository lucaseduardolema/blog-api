# Boas-vindas ao repositório do projeto API de Blogs!

## Orientações

### Instruções 

1. Clone o repositório
  * `git@github.com:lucaseduardolema/blog-api.git`.
  
2. Instale as dependências
  * `npm install`

3. Suba o servidor MySQL (caso rode o projeto fora do Docker), rode o comando para popular o banco
  * `npm run restart:db`

4. Suba o servidor da Api
  * `npm start`
  
5. Consuma os endpoints
  * POST `/login`
  * POST `/user`
  * GET `/user`
  * GET `/user/:id`
  * POST `/categories`
  * GET `/categories`
  * POST `/post`
  * GET `/post`
  * GET `/post/:id`
  * PUT `post/:id`
  * DELETE `/post/:id`
  * DELETE `/user/me`
  * GET `/post/search?q=:serarchTerm`

<details>
  <summary><strong>🐋 Rodando no Docker vs Localmente</strong></summary>
  
  ## 👉 Com Docker
 
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**


  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;

  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;

  > :information_source: Use o comando `docker exec -it blogs_api bash`.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`. (Instale dentro do container)
  
  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  - **:warning: Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  - **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - ✨ **Dica:** A extensão `Remote - Containers` (que estará na seção de extensões recomendadas do VS Code) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.

  <br />
  
  ## 👉 Sem Docker

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`
  
  - **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - **✨ Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  - **✨ Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.

  <br/>
</details>

<details>
  <summary><strong>🛠 Execução de testes localmente</strong></summary>

  > :information_source: IMPORTANTE
  
  - O teste local deve rodar o script `npm run start:test`, que vai iniciar e depois encerrar, em segundo plano **outra instância da sua API, na porta `3030`**. Dessa forma, o teste conseguira consumir sua API e validar os requisitos.
    - Caso seu computador não suporte rodar um servidor extra para os testes, execute um servidor na porta 3000 e rode o script `npm run test:dev`, este não vai criar outra instância, mas vai esperar um servidor na porta 3000. 

  - Sua API deve estar funcionando minimamente para que o teste comece, dado que ele aguarda o estabelecimento da mesma para começar o teste.

  - Todos os testes **vão gerar e consumir um banco de dados próprio com final `*-test`**, que é gerado através da configuração do arquivo `src/config/config.js`.

  - Isso vai garantir que durante seu desenvolvimento, o teste não manipule ou derrube sua API na porta padrão (`3000`) ou seu banco de dados padrão (final `*-dev`), isolando os mesmos.

  - Caso ocorra algum problema, encerre o teste com `[CTRL] + [C]` e utilize o script `npm run kill:test`

  ---

  O teste local já é configurado, internamente, com a variável de ambiente `NODE_ENV=test` para indicar o banco a ser utilizado pelo Sequelize, o que deve resultar na criação de um banco, somente para o teste:

  Sem essa variável (modo padrão de desenvolvimento), sua API deve resultar algo como:

  ---

  > :information_source: Scripts para executar os testes locais:

  Vamos usar o Jest para executar os testes, use o comando a seguir para executar todos os testes: 

  ```sh
  npm test
  ```

  Caso queira executar só um arquivo de test use o seguinte comando, considerado que quer testar o arquivo `tests/req07-createPost.test.js`:

  ```sh
  npm test tests/req07-createPost.test.js
  ```
  ou
  ```
  npm test req07
  ```

  Caso queira omitir dados de debug nos testes, utilize a variável de ambiente `DEBUG=false`, como em `DEBUG=false npm test`.

<br />
</details>
