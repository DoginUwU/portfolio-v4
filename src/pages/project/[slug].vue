<template>
  <section class="default-container-size pt-12 flex flex-col items-center gap-1">
    <div class="bg-gray-600/50 w-full p-4 rounded-xl flex flex-col items-center">
      <h1 class="font-bold text-2xl">
        Dog Engine
      </h1>
      <span class="text-gray-300">Objetivo do projeto</span>
    </div>
    <div class="bg-gray-600/50 w-full rounded-xl overflow-hidden max-h-96">
      <img
        class="w-full object-cover"
        src="https://cdn.discordapp.com/attachments/962841359243444224/1244376196788125696/GOQDBPebUAAFqzD.jpeg?ex=6654e324&is=665391a4&hm=3715f3653fa2ecc193d39712c8eea4f13085e09a67ba00a0d3c73319e7d59083&"
        alt=""
      >
    </div>
    <div class="grid grid-cols-3 gap-1 w-full">
      <div
        v-for="a in 3"
        class="bg-gray-600/50 w-full p-4 rounded-xl flex flex-col items-center text-center"
      >
        <h3 class="font-bold text-xl">
          Repositório
        </h3>
        <span class="text-gray-300 mb-6">O projeto pode ser encontrado no Github publicamente! Que tal dar uma olhada? 👀</span>
        <Button class="w-full rounded-xl">
          Abrir
        </Button>
      </div>
    </div>
    <div class="bg-gray-600/50 w-full p-4 rounded-xl">
      <p>README README README README README README README README README README README README README README</p>
      <p>README README README README README README README README README README README README README README</p>
      <p>README README README README README README README README README README README README README README</p>
    </div>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
