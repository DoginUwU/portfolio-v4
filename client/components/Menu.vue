<template>
    <header class="default-container-size navbar flex items-center py-4">
        <img src="/logo.svg" alt="Logo with my last name" />
        <ul class="ml-auto mr-auto list-none py-2 px-4 border-2 border-gray-600/50 rounded-2xl flex gap-4">
            <li v-for="menu in MENU" :key="menu.link" class="transition hover:text-purple-500">
                <nuxt-link :to="menu.link">
                    {{ menu.title }}
                </nuxt-link>
            </li>
        </ul>
    </header>
</template>

<script lang="ts" setup>
const MENU = [
    {
        title: 'Início',
        link: '/',
    },
    {
        title: 'Projetos',
        link: '/',
    },
    {
        title: 'Sobre',
        link: '/',
    },
    {
        title: 'Contato',
        link: '/',
    },
]
</script>

<style scoped>
.navbar {
    height: var(--navbar-height);
}
</style>