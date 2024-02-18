<template>
  <header class="navbar default-container-size sticky top-0 flex items-center py-4 z-50 *:transition-all"
    :class="{ fixed: !isAtTop && width > 640 }">
    <nuxt-link to="/" class="hidden sm:block">
      <img class="logo transition-all" src="/logo.svg" alt="Logo with my last name">
    </nuxt-link>
    <ul ref="links"
      class="links ml-auto list-none py-2 px-6 border border-gray-600/50 rounded-full flex gap-4 backdrop-blur-md">
      <li v-for="menu in MENU" :key="menu.link"
        class="font-semibold text-sm text-white/80 transition hover:text-purple-500 active:scale-90">
        <nuxt-link :to="menu.link">
          {{ menu.title }}
        </nuxt-link>
      </li>
    </ul>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useScroll } from '~/hooks/useScroll'

const { isAtTop } = useScroll()
const { width } = useWindowSize()

const links = ref<HTMLElement | null>(null)

const MENU = [
  {
    title: 'Início',
    link: '/'
  },
  {
    title: 'Projetos',
    link: '/'
  },
  {
    title: 'Contato',
    link: '/'
  }
]

onMounted(() => {
  const linksElement = links.value

  if (linksElement === null) { return }

  const linksWidth = linksElement.offsetWidth ?? 0

  linksElement.style.marginRight = `calc(50% - ${linksWidth / 2}px)`
})
</script>

<style scoped>
.navbar {
  height: var(--navbar-height);
}

.navbar.fixed {
  user-select: none;
  pointer-events: none;
}

.navbar.fixed .logo {
  opacity: 0;
}

.navbar.fixed .links {
  margin-right: 0 !important;
  pointer-events: all;
}
</style>
