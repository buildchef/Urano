# Projeto Urano - Plataforma de Manutenção de Aeronaves

Projeto Urano é um aplicativo mobile desenvolvido como Trabalho de Conclusão de Curso (TCC), utilizando Flutter para a interface de usuário, Node.js para o backend, TypeScript para a linguagem de programação e MongoDB para o banco de dados. Além disso, integra a tecnologia de IA da IBM Watson para aprimorar a funcionalidade de manutenção de aeronaves.

## Visão Geral

O Projeto Urano visa fornecer uma plataforma abrangente para facilitar a manutenção de aeronaves. Através deste aplicativo, os técnicos e engenheiros podem gerenciar facilmente tarefas de manutenção, monitorar o estado das aeronaves, receber alertas de manutenção preventiva e acessar informações cruciais em tempo real.

## Funcionalidades Principais

- **Gestão de Tarefas**: Permitindo aos usuários atribuir, acompanhar e concluir tarefas de manutenção.
- **Monitoramento em Tempo Real**: Fornece dados em tempo real sobre o status e o desempenho das aeronaves.
- **Alertas de Manutenção Preventiva**: Utiliza IA para prever necessidades de manutenção com antecedência, reduzindo falhas e aumentando a segurança.
- **Integração com IBM Watson**: Incorpora recursos avançados de processamento de linguagem natural e análise de dados para insights mais profundos.

## Tecnologias Utilizadas

- **Flutter**: Framework de desenvolvimento de aplicativos multiplataforma para criar a interface do usuário.
- **Node.js**: Plataforma de desenvolvimento de aplicativos back-end baseada em JavaScript.
- **TypeScript**: Uma linguagem de programação que adiciona tipos à linguagem JavaScript.
- **MongoDB**: Um banco de dados NoSQL amplamente utilizado para armazenamento de dados flexível e escalável.
- **IBM Watson**: Plataforma de IA da IBM que oferece uma variedade de serviços cognitivos, incluindo processamento de linguagem natural e análise de dados.

## Instalação e Configuração

1. **Clonar o Repositório**: `git clone https://github.com/seu-usuario/projeto-urano.git`
2. **Instalar Dependências do Flutter**: `cd projeto-urano/flutter_app && flutter pub get`
3. **Instalar Dependências do Node.js**: `cd projeto-urano/node_app && npm install`
4. **Configurar o Banco de Dados MongoDB**: Certifique-se de ter o MongoDB instalado localmente ou configurado em um serviço de nuvem. Edite o arquivo `projeto-urano/node_app/config/database.ts` com as informações de conexão corretas.
5. **Configurar as Credenciais do IBM Watson**: Registre-se na plataforma IBM Cloud e obtenha as credenciais do serviço Watson. Edite o arquivo `projeto-urano/node_app/config/watson.ts` com suas credenciais.
6. **Executar o Servidor Node.js**: `cd projeto-urano/node_app && npm start`
7. **Executar o Aplicativo Flutter**: `cd projeto-urano/flutter_app && flutter run`

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar o projeto.

