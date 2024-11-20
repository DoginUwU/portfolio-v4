<template>
  <article>
    <img
      class="w-full max-w-[450px] px-20 mt-6 mx-auto lg:hidden"
      src="/logo.svg"
      alt="Logo with my last name"
    >
    <section
      class="default-container-size hero grid grid-cols-1 lg:grid-cols-2 py-4 items-center justify-center gap-12 mt-12 lg:mt-0"
    >
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
        <a
          class="w-full sm:w-fit"
          href="#contact"
        >
          <Button class="shadow-md w-full sm:w-fit">
            Entrar em contato
          </Button>
        </a>
      </article>
      <client-only>
        <nuxt-img
          ref="background"
          class="background absolute top-0 left-0 w-screen h-screen object-cover -z-10"
          src="/assets/background2.webp"
          alt="Background"
          preload
          loading="lazy"
          :style="{ opacity: backgroundOpacity }"
          @load="handleBackgroundLoad"
        />
      </client-only>
    </section>
    <Transition name="opacity">
      <span
        v-if="isAtTop"
        class="absolute bottom-4 left-0 right-0 text-center text-gray-300 text-sm hidden lg:block"
      >
        Use a roda do mouse para navegar
      </span>
    </Transition>
    <div
      ref="languageBottomEffect"
      class="language-bottom-effect fixed bottom-0 left-0 right-0 transition-all z-10 hidden lg:block"
    />
    <Vue3Marquee
      class="my-12 lg:mt-2 lg:mb-44 uppercase text-4xl text-white/70 font-extrabold overflow-hidden"
      :duration="50"
    >
      <span
        v-for="language in LANGUAGES"
        :key="language.name"
        class="mx-4 hover:cursor-pointer hover:opacity-80"
        @mouseenter="handleLanguage(language.color)"
        @mouseleave="handleLanguageLeave"
      >
        {{ language.name }}
      </span>
    </Vue3Marquee>
    <PlanetAnimation />
    <section class="default-container-size flex flex-col gap-12 overflow-hidden pb-12">
      <TitleWithBackground />
      <ProjectsGrid :limit="3" />
      <nuxt-link
        class="mx-auto"
        href="/projects"
      >
        <Button class="sm:w-fit">
          Ver todos os projetos
        </Button>
      </nuxt-link>
    </section>
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
        <ExperienceCard icon="uil-react">
          <template #title>
            Front-end
          </template>
          <span>
            Desenvolvimento de interfaces elegantes e responsivas
            com foco na experiência do usuário. Utilizando tecnologias
            como Vue.JS, React.
            Tenho experiência também com aplicativos mobile utilizando React Native.
          </span>
        </ExperienceCard>
        <ExperienceCard icon="uil-database">
          <template #title>
            Back-end
          </template>
          <span>
            Desenvolvimento de APIs robustas e escaláveis, com foco
            na segurança e performance. Utilizando tecnologias como
            NodeJS, Express.
            Também tenho experiência com bancos de dados SQL e NoSQL.
          </span>
        </ExperienceCard>
        <ExperienceCard icon="uil-apps">
          <template #title>
            Aplicativos e Jogos
          </template>
          <span>
            Desenvolvimento de aplicativos para computadores e celular, utilizando linguagens como C++, C#, React-Native, Java e Kotlin.
            Em questão de jogos, tenho experiência com Unity e Godot Engine.
          </span>
        </ExperienceCard>
      </div>
    </section>
    <section
      id="contact"
      class="default-container-size flex flex-col lg:flex-row items-stretch justify-between relative gap-8 mb-16"
    >
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
          <ContactCard
            icon="uil-envelope"
            :active="true"
            text="contato@legotardo.com"
          />
          <ContactCard
            icon="uil-map-marker"
            text="Londrina, Brazil"
          />
        </div>
        <div
          class="flex items-center justify-between gap-4 *:flex *:items-center *:justify-center *:p-3 *:bg-purple-600 *:rounded-full *:w-12 *:h-12"
        >
          <a
            href="https://github.com/DoginUwU"
            target="_blank"
            rel="noreferrer"
            aria-label="Github profile"
          >
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
      <form
        class="max-w-[500px] flex-1 p-8 default-card flex flex-col gap-8"
        @submit="handleContactSubmit"
      >
        <Input
          id="name"
          name="user_name"
          label="Seu nome"
          placeholder="Seu nome..."
          required
        />
        <Input
          id="email"
          name="user_email"
          label="Seu email"
          placeholder="Seu email..."
          type="email"
          required
        />
        <Textarea
          id="message"
          name="message"
          label="Sua mensagem"
          placeholder="Sua mensagem..."
          required
        />
        <Button
          type="submit"
          :disabled="state.sendingEmail"
          :error="state.sendingEmailError"
          :success="state.sendingEmailSuccess"
        >
          <div class="transition-wrapper">
            <transition
              name="scale"
              appear
            >
              <span
                v-if="state.sendingEmail"
                key="sending"
              >
                Enviando...
              </span>
              <span
                v-else-if="state.sendingEmailError"
                key="error"
              >
                Não foi possível enviar... Quer tentar novamente?
              </span>
              <span
                v-else-if="state.sendingEmailSuccess"
                key="success"
              >
                Enviado com sucesso!
              </span>
              <span
                v-else
                key="default"
              >
                Enviar
              </span>
            </transition>
          </div>
        </Button>
      </form>
    </section>
  </article>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Vue3Marquee } from 'vue3-marquee'
import Email from '@emailjs/browser'
import { useScroll } from '~/hooks/useScroll'

useSeoMeta({
  title: 'Gotardo - Desenvolvedor',
  description: 'Desenvolvedor web full-stack, com foco em desenvolvimento de aplicações web e desktop.',
  ogTitle: 'Gotardo - Desenvolvedor',
  ogDescription: 'Desenvolvedor web full-stack, com foco em desenvolvimento de aplicações web e desktop.',
})

const { isAtTop, y } = useScroll()

const LANGUAGES = [
  {
    name: 'Typescript',
    color: '#007ACC',
  },
  {
    name: 'Javascript',
    color: '#F7DF1E',
  },
  {
    name: 'NodeJS',
    color: '#339933',
  },
  {
    name: 'Vue.JS',
    color: '#4FC08D',
  },
  {
    name: 'React',
    color: '#61DAFB',
  },
  {
    name: 'Mysql',
    color: '#4479A1',
  },
  {
    name: 'MongoDB',
    color: '#47A248',
  },
  {
    name: 'C#',
    color: '#239120',
  },
  {
    name: 'C++',
    color: '#00599C',
  },
  {
    name: 'Java',
    color: '#007396',
  },
  {
    name: 'Express',
    color: '#000000',
  },
  {
    name: 'Javascript',
    color: '#F7DF1E',
  },
  {
    name: 'NodeJS',
    color: '#339933',
  },
  {
    name: 'Vue.JS',
    color: '#4FC08D',
  },
  {
    name: 'Typescript',
    color: '#007ACC',
  },
  {
    name: 'React',
    color: '#61DAFB',
  },
  {
    name: 'Flutter',
    color: '#02569B',
  },
  {
    name: 'Jetpack Compose',
    color: '#6200EE',
  },
  {
    name: 'Mysql',
    color: '#4479A1',
  },
]

const languageBottomEffect = ref<HTMLDivElement | null>(null)
const background = ref<{ $el: HTMLImageElement } | null>(null)

const state = reactive({
  sendingEmail: false,
  sendingEmailError: false,
  sendingEmailSuccess: false,
})

const backgroundOpacity = computed(() => {
  if (import.meta.server === true) { return 1 }

  const pageHeight = window.innerHeight

  return 0.8 - (y.value / (pageHeight / 2))
})

onMounted(() => {
  Email.init('user_pbH18gsT3YH3yt2bffOUA')
})

const handleLanguage = (color: string): void => {
  if (languageBottomEffect.value === null) { return }

  languageBottomEffect.value.style.boxShadow = `0 0 20px 10px ${color}`
}

const handleLanguageLeave = (): void => {
  if (languageBottomEffect.value === null) { return }

  languageBottomEffect.value.style.boxShadow = '0 0 10px 10px transparent'
}

const handleBackgroundLoad = (): void => {
  if (background.value === null) { return }

  background.value.$el.style.animationPlayState = 'running'
}

const handleContactSubmit = async (event: Event): Promise<void> => {
  event.preventDefault()

  const form = event.target as HTMLFormElement

  try {
    state.sendingEmail = true
    state.sendingEmailError = false

    await Email.sendForm(
      'service_x9v3gy7',
      'template_gpu5tlq',
      form,
    )

    state.sendingEmailSuccess = true
    state.sendingEmail = false
    form.reset()

    setTimeout(() => {
      state.sendingEmailSuccess = false
    }, 5000)
  }
  catch (error) {
    state.sendingEmailError = true
    console.error(error)
  }
  finally {
    state.sendingEmail = false
  }
}
</script>

<style scoped>
.hero .background {
  animation: background 200ms cubic-bezier(0.4, 0, 0.2, 1);
  animation-play-state: paused;
}

@keyframes background {
  0% {
    scale: 0.8;
  }
  100% {
    scale: 1;
  }
}

@media (min-width: 1024px) {
  .hero {
    height: calc(100vh - var(--navbar-height));
  }
}

.transition-wrapper {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
}

.transition-wrapper span {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: scale(1) translate(-50%, -50%);
}

.scale-enter-active {
  animation: scale 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-enter-from {
  transform: scale(0) translate(-50%, -50%);
}
</style>
