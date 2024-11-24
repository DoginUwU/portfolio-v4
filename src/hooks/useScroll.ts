import { type Ref, ref, onMounted, onUnmounted } from 'vue'

interface Scroll {
  y: Ref<number>
}

export function useScroll(): Scroll {
  const y = ref(0)

  const handleScroll = (): void => {
    y.value = window.scrollY
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    y,
  }
}
