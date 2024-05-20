import { type Ref, ref, onMounted, onUnmounted } from 'vue'

interface Scroll {
  isAtTop: Ref<boolean>
  y: Ref<number>
}

export function useScroll(): Scroll {
  const isAtTop = ref(true)
  const y = ref(0)

  const handleScroll = (): void => {
    isAtTop.value = window.scrollY <= 50
    y.value = window.scrollY
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    isAtTop,
    y,
  }
}
