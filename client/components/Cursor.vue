<template>
    <div ref="cursor" class="absolute w-2 h-2 rounded-full bg-white transition z-50" />
</template>
  
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const cursor = ref<HTMLElement | null>(null);
let targetX = 0;
let targetY = 0;

onMounted(() => {
    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();
});

onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove);
});

const handleMouseMove = (event: MouseEvent) => {
    targetX = event.clientX;
    targetY = event.clientY;
};

const animateCursor = () => {
    if (cursor.value) {
        const easing = 0.3;

        const deltaX = (targetX - cursor.value.offsetLeft) * easing;
        const deltaY = (targetY - cursor.value.offsetTop) * easing;

        cursor.value.style.left = `${cursor.value.offsetLeft + deltaX}px`;
        cursor.value.style.top = `${cursor.value.offsetTop + deltaY}px`;

        requestAnimationFrame(animateCursor);
    }
};
</script>
  