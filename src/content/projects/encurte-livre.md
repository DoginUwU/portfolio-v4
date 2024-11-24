---
title: Encurte Livre
cover: ../assets/encurte-livre.webp
createdAt: "2022-08-29 00:00:00"
tags: ["typescript", "react"]
link: https://encurte-livre.vercel.app
---

O Encurte Livre foi um projeto desenvolvido como parte de um desafio técnico da Layers Education. Sendo basicamente um encurtador de URL simples e direto, com funcionalidades adicionais que oferecem mais controle e personalização.

Atualmente ele tem as seguintes features:

- **Limite de acessos:** Define o número máximo de vezes que um link pode ser acessado, se auto-deletando após o número ser atingido
- **Inserção de senha:** Possíbilidade de bloquear um link através de uma senha, para que apenas pessoas autorizadas possam ter acesso
- **Tempo de vida:** Define uma data limite de acesso ao link, que se auto-deleta após o limite ser atingido
- **Temporizador:** Define um temporizador de 5 segundos antes do redirect

Após a inserção do URL e suas configurações, os dados são enviados para um backend feito com NodeJS, onde as regras de negócio são aplicadas e com os dados sendo salvos em um banco PostgreSQL.
