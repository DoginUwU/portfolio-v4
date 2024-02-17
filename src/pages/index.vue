<template>
  <section>
    <img class="w-full max-w-[450px] px-20 mt-6 mx-auto lg:hidden" src="/logo.svg" alt="Logo with my last name">
    <section class="default-container-size hero grid grid-cols-1 lg:grid-cols-2 py-4 items-center justify-center gap-12 mt-12 lg:mt-0">
      <APIsList class="order-1 lg:-order-1" />
      <article class="flex flex-col gap-16 items-start -order-1 lg:order-1">
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
        <Button class="shadow-md w-full sm:w-fit">
          Entrar em contato
        </Button>
      </article>
    </section>
    <Transition name="opacity">
      <span v-if="isAtTop" class="absolute bottom-4 left-0 right-0 text-center text-gray-300 text-sm hidden lg:block">
        Use a roda do mouse para navegar
      </span>
    </Transition>
    <div ref="languageBottomEffect" class="language-bottom-effect fixed bottom-0 left-0 right-0 transition-all z-10 hidden lg:block" />
    <Vue3Marquee class="my-12 lg:mt-2 lg:mb-44 uppercase text-4xl text-white/70 font-extrabold overflow-hidden" :duration="50">
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
    <section class="relative flex flex-col items-center gap-11 p-6 lg:p-24 my-16">
      <ClientOnly>
        <Stars />
      </ClientOnly>
      <div class="text-center flex flex-col">
        <h1 class="text-4xl font-bold mb-8">
          O que eu faço?
        </h1>
        <p class="text-white/70">
          Eu sou um desenvolvedor web full-stack, com foco em
          desenvolvimento de aplicações web e mobile.
        </p>
        <p class="text-white/70">
          Também tenho experiência com desenvolvimento de jogos e
          aplicações desktop.
        </p>
      </div>
      <div class="flex flex-col lg:flex-row gap-8">
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </div>
    </section>
    <section class="default-container-size flex flex-col lg:flex-row items-stretch justify-between relative gap-8 mb-16">
      <div class="flex flex-col items-start justify-between gap-6">
        <div class="flex flex-col items-start justify-start gap-4">
          <h1 class="text-4xl font-bold">
            Entre em contato
          </h1>
          <p class="text-white/70 max-w-96">
            Fique a vontade para escolher o modo de contato, irei te responder o mais breve possível.
          </p>
        </div>
        <div class="flex flex-col items-start justify-start gap-4 w-full lg:w-fit">
          <ContactCard icon="uil-envelope" :active="true">
            contato@legotardo.com
          </ContactCard>
          <ContactCard icon="uil-map-marker">
            Londrina, Brazil
          </ContactCard>
        </div>
        <div class="flex items-center justify-between gap-4 *:flex *:items-center *:justify-center *:p-3 *:bg-purple-600 *:rounded-full *:w-12 *:h-12">
          <a href="https://github.com/DoginUwU" target="_blank" rel="noreferrer" aria-label="Github profile">
            <i class="uil uil-github-alt" />
          </a>
          <a
            href="https://www.linkedin.com/in/luiz-gotardo/"
            target="_blank"
            rel="noreferrer"
            aria-label="Linkedin profile"
          >
            <i class="uil uil-linkedin-alt" />
          </a>
        </div>
      </div>
      <form class="max-w-[500px] flex-1 p-8 default-card flex flex-col gap-8">
        <Input id="name" label="Seu nome" placeholder="Seu nome..." />
        <Input id="email" label="Seu email" placeholder="Seu email..." />
        <Textarea id="message" label="Sua mensagem" placeholder="Sua mensagem..." />
        <Button>Enviar</Button>
      </form>
    </section>
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
@media (min-width: 1024px) {
  .hero {
    height: calc(100vh - var(--navbar-height));
  }
}
</style>
