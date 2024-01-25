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
        <Button class="shadow-md">
          Entrar em contato
        </Button>
      </article>
    </section>
    <Transition name="opacity">
      <span v-if="isAtTop" class="absolute bottom-4 left-0 right-0 text-center text-gray-300 text-sm">
        Use a roda do mouse para navegar
      </span>
    </Transition>
    <div ref="languageBottomEffect" class="language-bottom-effect fixed bottom-0 left-0 right-0 transition-all z-10" />
    <Vue3Marquee class="mt-2 mb-44 uppercase text-4xl text-white/70 font-extrabold overflow-hidden" :duration="50">
      <span
        v-for="language in LANGUAGES"
        :key="language.name"
        class="mx-4 hover:cursor-pointer"
        @mouseenter="handleLanguage(language.color)"
        @mouseleave="handleLanguageLeave"
      >
        {{ language.name }}
      </span>
    </Vue3Marquee>
    <ClientOnly>
      <section class="flex flex-col gap-24 overflow-hidden">
        <TitleWithBackground />
        <Carousel />
      </section>
    </ClientOnly>
    <div class="mt-96" />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Vue3Marquee } from 'vue3-marquee'
import { useScroll } from '~/hooks/useScroll'

const { isAtTop } = useScroll()

const LANGUAGES = [
  {
    name: 'Typescript',
    color: '#007ACC'
  },
  {
    name: 'Javascript',
    color: '#F7DF1E'
  },
  {
    name: 'NodeJS',
    color: '#339933'
  },
  {
    name: 'Vue.JS',
    color: '#4FC08D'
  },
  {
    name: 'React',
    color: '#61DAFB'
  },
  {
    name: 'Mysql',
    color: '#4479A1'
  },
  {
    name: 'MongoDB',
    color: '#47A248'
  },
  {
    name: 'C#',
    color: '#239120'
  },
  {
    name: 'C++',
    color: '#00599C'
  },
  {
    name: 'Java',
    color: '#007396'
  },
  {
    name: 'Express',
    color: '#000000'
  },
  {
    name: 'Javascript',
    color: '#F7DF1E'
  },
  {
    name: 'NodeJS',
    color: '#339933'
  },
  {
    name: 'Vue.JS',
    color: '#4FC08D'
  },
  {
    name: 'Typescript',
    color: '#007ACC'
  },
  {
    name: 'React',
    color: '#61DAFB'
  },
  {
    name: 'Mysql',
    color: '#4479A1'
  }
]

const languageBottomEffect = ref<HTMLDivElement | null>(null)

const handleLanguage = (color: string): void => {
  if (languageBottomEffect.value === null) { return }

  languageBottomEffect.value.style.boxShadow = `0 0 20px 10px ${color}`
}

const handleLanguageLeave = (): void => {
  if (languageBottomEffect.value === null) { return }

  languageBottomEffect.value.style.boxShadow = '0 0 10px 10px transparent'
}
</script>

<style scoped>
.hero {
    height: calc(100vh - var(--navbar-height));
}
</style>
