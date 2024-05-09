<template>
  <div class="fixed w-screen h-screen bg-black z-10 top-0 left-0 flex items-center justify-center">
    <img class="logo w-48 h-48" src="/logo.svg" alt="Logo with my last name (Loading State)">
  </div>
</template>

<style scoped>
.logo {
  animation: blink infinite 3s linear;
}

@keyframes blink {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
