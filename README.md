# Sistema de Negociações

Este é um projeto simples de sistema de negociações desenvolvido em TypeScript. Ele permite que os usuários registrem negociações, verifiquem se ocorrem em dias úteis e visualizem suas negociações registradas. Tudo isso foi feito para meu treinamento de TypeScript, meus primeiros passos na linguagem!

## Visão Geral do Código

O código-fonte está organizado em várias classes e estruturas para facilitar a manutenção e a compreensão. Aqui está um resumo das principais classes e funcionalidades:

- `Negociacao`: Esta classe representa uma negociação financeira com propriedades como data, quantidade e valor. Ela possui métodos para criar negociações a partir de strings, calcular o volume e formatar a exibição.

- `Negociacoes`: Esta classe gerencia uma lista de negociações e oferece métodos para adicionar e listar negociações.

- `Visualizacao`: Esta é uma classe abstrata que serve como base para classes de visualização específicas. Ela permite atualizar elementos DOM com base em modelos de dados específicos.

- `NegociacoesView`: Uma classe que herda de `Visualizacao` e é usada para exibir a lista de negociações em uma tabela HTML.

- `MensagemView`: Outra classe que herda de `Visualizacao` e é usada para exibir mensagens na interface do usuário.

- `NegociacaoControle`: A classe principal que lida com a interação do usuário. Ela controla o formulário, a validação da data e a atualização das visualizações.

## Como Usar

Para usar este sistema, siga estas etapas:

1. Clone este repositório para o seu ambiente de desenvolvimento.

2. Você deve conter o NodeJS na versão 10 em diante!! Veja sua versão no terminal: ```node --version```.

3. Execute no seu terminal: ```npm install``` para instalar dependências.

4. Depois execute no terminal, estando no local onde se encontra seu repositório, o comando: ```npm run server```

5. Preencha o formulário com os detalhes da negociação, incluindo data, quantidade e valor.

6. Clique no botão "Incluir" para adicionar a negociação.

7. A tabela de negociações será atualizada com a nova entrada, e uma mensagem de sucesso será exibida.

8. Certifique-se de que a data da negociação seja em um dia útil, caso contrário, uma mensagem de erro será exibida.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar solicitações de pull (pull requests) para melhorar este projeto.

Projeto desenvolvido por Davyd Ferreira com ajuda de @alura