<template>
    <section>
        <section class="default-container-size hero grid grid-cols-2 py-4 items-center justify-center gap-12">
            <APIsList />
            <article class="flex flex-col gap-16 items-start">
                <p class="leading-7">
                    Olá, meu nome é Luiz, e sou um apaixonado desenvolvedor
                    web full-stack. Minha paixão pelo software se traduz na
                    habilidade de conceber ideias e transformá-las em realidade,
                    por meio de interfaces elegantes. Dedico um cuidado meticuloso
                    à experiência do usuário, à arquitetura e à qualidade do código
                    em todos os projetos que realizo. Atualmente, meu foco principal
                    é garantir a criação de produtos de alta qualidade que atendam
                    às expectativas e requisitos dos clientes.
                </p>
                <Button class="shadow-md shadow-purple-500/50">Entrar em contato</Button>
            </article>
        </section>
        <span class="absolute bottom-4 left-0 right-0 text-center text-gray-300 text-sm">
            Use a roda do mouse para navegar
        </span>
    </section>
</template>

<style scoped>
.hero {
    height: calc(100vh - var(--navbar-height));
}
</style>