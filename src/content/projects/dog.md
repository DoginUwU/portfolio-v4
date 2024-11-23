---
title: Dog Engine
subtitle: Game Engine C++ com foco na simplicidade para criação de jogos
cover: ../assets/dog.webp
createdAt: "2023-12-31 00:00:00"
tags: ["c++", "opengl", "glfw"]
slug: dog-engine
---

### Escopo do projeto

O projeto surge com a ideia de criar uma **Game Engine** em C++ com o objetivo de escopar e abstrair partes de mais baixo nível, mantendo chamadas para o OpenGL e GLFW por baixo dos panos, para que um jogo desenvolvido utilizando essa base precise apenas se preocupar com ele mesmo e mais nada.

Meu objetivo com isso é utilizar e consolidar conhecimentos em computação gráfica e desenvolvimento de jogos, além de melhorar minhas habilidades nessa área de computação gráfica. O projeto também busca implementar e experimentar conceitos presentes em outras engines populares, principalmente utilizando a Unity como exemplo.

### Objetivos

- **Simplificar a criação de componentes de um jogo:** Permitir o uso abstrato de funções para renderização de um jogo, possibilitando futuramente a troca/adição de outros frameworks (Exemplo: Vulkan), sem alterar a parte de mais alto nível.
- **Gerenciamento de recursos (Assets):** Criação de um sistema para armazenamento e carregamento de assets no jogo, tais como: Shaders, Texturas, Objetos, etc...
- **Gerencimanto de cenas:** Gerenciamento de cenas para escopar componentes individuais do jogo, possibilitando ter um maior controle de quais elementos serão exibidos na tela.

