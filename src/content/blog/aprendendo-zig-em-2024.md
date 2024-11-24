---
title: Aprendendo Zig em 2024
createdAt: "2024-11-24 00:00:00"
tags: ["zig", "low level"]
scope: Low Level Software Engineer
image: ../assets/zig-draw.webp
estimated: 10
---

Uma das coisas que sempre fui apaixonado, desde o ínicio da minha jornada como desenvolvedor, é aprender coisas próximas ao código de máquina. A parte _low-level_ sempre me trouxe bastante curiosidade: criar softwares que pudessem se comunicar com o hardware e entender exatamente como o computador lida com os diferentes casos em aplicações complexas. 

Dentre meus aprendizados, uma das linguagens que mais me marcou foi o **C++**. Ela me proporcionou um entendimento mais profundo da máquina, principalmente por seu uso explícito de ponteiros e sua flexíbilidade, permitindo inclusíve sua Programação Orientada a Objetos (OOP).
![Meme mostrando um ponteiro de ponteiro chamando um ponteiro que por sua vez aponta para um resultado](../assets/anya-ptrs.webp)

## Minha descoberta sobre a linguagem de programação Zig

Nos últimos dias, tive a oportunidade de conhecer e acompanhar um Youtuber chamado [sphaerophoria](https://www.youtube.com/@sphaerophoria) em suas livestreams. Durante essas transmissões, ele programava utilizando uma linguagem um pouco diferente do comum: Zig Language.

Confesso que já tinha escutado falar sobre a Zig Language e até mesmo pesquisado um pouco sobre ela, mas meu foco em outros projetos e o domínio de outras linguagens acabaram por deixá-la em segundo plano.

Entretanto, ao assistir suas livestreams, fiquei impressionado com a praticidade e o design minimalista da linguagem, tanto em sua sintaxe quanto em sua praticidade. Ela me trouxe na memória algumas semelhanças com linguagens como Rust, mas com uma abordagem um pouco diferente ([irei explicar no próximo tópico](#o-que-faz-do-zig-uma-linguagem-interessante)). Foi nesse momento que decidi dar uma chance ao dito-cujo, indo buscar mais afundo o que ela é capaz de entregar.

## O que faz do Zig uma linguagem interessante

Como mencionei anteriormente, o Zig tem algumas semelhanças de sintaxe com o Rust, mas ele brilha mesmo na sua compatibilidade com C/C++, fazendo dele praticamente um **"C++ se fosse criado em 2024"**. Dentre suas características, as que considero mais importantes são:

#### Compatibilidade com C/C++

Zig oferece compatibilidade out-of-the-box com qualquer biblioteca escrita em C ou C++, abrindo um leque incrível de possibilidades, mesmo sendo uma linguagem recente com (na teoria) poucos pacotes. Inclusive, como o Zig é uma linguagem fortemente tipada, todos os tipos das bibliotecas third-party funcionam corretamente no seu código, reduzindo possíveis bugs que poderiam acontecer.
```zig
// build.zig
exe.linkSystemLibrary("curl");
exe.linkLibC();
...

// main.zig
const c = @cImport(
    @cInclude("curl/curl.h"),
);

var curl_code = c.curl_global_init(c.CURL_GLOBAL_DEFAULT);
defer c.curl_global_cleanup();
```

#### Compilação simplificada

Diferente do C/C++, onde há diversas formas de compilar aplicações e gerenciar o _linking_ de pacotes, o Zig unifica todo o processo em um único arquivo chamado **build.zig**. Esse arquivo basicamente contém uma função exportada que descreve, passo a passo, como o Zig deve compilar seu código. Isso garante uma abordagem única, consistente e cross-platform para builds, além de você não ter que gastar mais tempo pensando: "Qual será a melhor forma que eu posso _buildar_ esse projeto?".

Veja um exemplo de como se parece o arquivo:

```zig
const std = @import("std");

// Função que o Zig irá ler para iniciar o processo de compilação (note que ela precisa ser pública)
pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{}); // Usar o target baseado na plataforma atual
    const optimize = b.standardOptimizeOption(.{}); // Usar o padrão de otimização criado pelo Zig

    const exe = b.addExecutable(.{
        .name = "meu-aplicativo",
        .target = target,
        .optimize = optimize,
        .root_source_file = b.path("main.zig"),
    }); // Criar um executável com o código começando no meu arquivo main.zig

    exe.linkSystemLibrary("curl"); // Linkar biblioteca Curl
    exe.linkLibC(); // Habilitar Link com código C/C++

    b.installArtifact(exe); // Adicionar etapas acima dentro do Builder do Zig
}
```

Depois do arquivo criado e com suas etapas bem definidas, basta rodar o comando abaixo que toda a mágica acontecerá. Bem simples, não?
```
> zig build
```

#### Alocadores

Diferente de outras linguagens, o Zig **não** conta com um **Garbage Collector**. Em vez disso, suas atribuições de memória são gerenciadas por meio de um **Alocador**, permitindo que você controle explicitamente o que será alocado e quando esses recursos deixarão de ser utilizados.

Além disso, existem diversos tipos de _Alocadores_, com usos diferentes dependendo do seu código. Vou dar um exemplo de um alocador de uso geral, o mais comum para ser útilizado:

```zig
const std = @import("std");

var heap_allocator = std.heap.GeneralPurposeAllocator(.{}){};
const allocator = heap_allocator.allocator(); // Cria um Alocador de uso geral

const value = try allocator.alloc(u8, 10); // Cria uma "array" com 10 elementos u8
//             ^ Utilizamos o "try" em tratativas que podem conter falhas

defer allocator.free(value); // Limpa a memória após todo o código escopado ser executado

@memset(value, 15); // Atualiza todos os elementos com o valor "15"

std.debug.print("My array is: {any}", .{value}); // My array is: { 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 }
```

Note como o gerenciamento de memória no código acima é bastante explícito, o que facilita enormemente a identificação de vazamentos de memória e reduz as chances de enfrentar o clássico _Segmentation Fault_.

#### Eu escutei alguém falar em... "Comptime"?

Uma das funcionalidades mais importante do núcleo do Zig é o _comptime_. É com ela que o Zig tenta executar a maior parte do código ainda em tempo de compilação, possibilitando ele realizar cálculos, validações e atribuições que anteriormente seriam feitas durante o tempo de execução.

```zig
fn whatIsTheHigher(comptime T: type, a: T, b: T) T {
    if (a > b) {
        return a;
    }

    return b;
}

const value1: u8 = 5;
const value2: u8 = 3;

const ret = whatIsTheHigher(u8, value1, value2);

std.debug.print("The highest value is: {any}", .{ret}); // The highest value is: 5
```

## Hello, Zig

Para finalizar, vou mostrar um simples "Hello, Zig" com todas as partes "encaixadas", e algumas regrinhas de guideline do Zig. Então para começar, vamos criar nossa estrutura de projeto:

```
hello-zig/
├─ src/
│  ├─ main.zig
├─ build.zig
```

Certo! Agora vamos criar nossas etapas de build, seguindo o padrão:

```zig
// build.zig
const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const exe = b.addExecutable(.{
        .name = "hello-zig",
        .target = target,
        .optimize = optimize,
        .root_source_file = b.path("src/main.zig"),
    });

    b.installArtifact(exe);
}
```

E por último, nosso simples e humilder arquivo main

```zig
// src/main.zig
const std = @import("std");


pub fn main() void {
    std.debug.print("Hello from Zig!", .{}); // Hello from Zig!
}
```

Bem simples, né? Inclusive, nossa função _main_ não precisa retornar um código de status igual no C.

Sobre a guideline, algumas regrinhas podem ser encontradas diretamente na [documentação do zig](https://ziglang.org/documentation/0.13.0/#Style-Guide). Passarei rapidamente por algumas delas:

* [X] Funções com nomeação sempre em **camelCase**;
* [X] Tipagem e Estruturas com nomeação sempre em **TitleCase**;
* [X] Váriaveis com nomeação sempre em **snake_case**;
* [X] Colchetes na mesma linha da sintaxe.

## Próximo passo

Por enquanto, o Zig ainda não chegou a uma versão final, portanto, mudanças em sua sintaxe e funções são esperadas. Além disso, cobri apenas uma pequena parte de tudo o que a linguagem já oferece. A [documentação](https://ziglang.org/documentation/0.13.0) do Zig é excelente e contém informações detalhadas sobre diversos casos de uso.

Atualmente, estou desenvolvendo um **Gerenciador de Pacotes** utilizando o Zig, mais como um desafio pessoal para testar e aprender mais sobre a linguagem. Em breve, estarei compartilhando minha evolução e jeito de estruturação que usei por trás da criação do meu _Package Manager_.

![Desenho do logo do Zig Language](../assets/zig-draw.webp)
