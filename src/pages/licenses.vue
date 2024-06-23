<template>
  <article class="default-container-size default-card px-4 py-4 mt-6 flex flex-col gap-2 min-h-[75vh]">
    <a
      v-for="license in LICENSES"
      :key="license.name"
      :href="license.url"
      target="_blank"
    >
      <span><strong>{{ license.name }}: </strong> {{ license.license }}</span>
    </a>
  </article>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: 'Licenças - Gotardo',
})

const LICENSES = [
  {
    name: 'Stylized planet',
    url: 'https://sketchfab.com/3d-models/stylized-planet-789725db86f547fc9163b00f302c3e70',
    license: 'CC BY 4.0',
  },
  {
    name: 'Game background music',
    url: 'https://www.fesliyanstudios.com',
    license: 'Royalty Free',
  },
  {
    name: 'Game sprites',
    url: 'https://itch.io',
    license: 'CC0',
  },
]
</script>
