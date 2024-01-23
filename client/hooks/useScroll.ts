import { type Ref, ref, onMounted, onUnmounted } from 'vue'

interface Scroll {
  isAtTop: Ref<boolean>
}

export function useScroll (): Scroll {
  const isAtTop = ref(true)

  const handleScroll = (): void => {
    isAtTop.value = window.scrollY <= 50
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    isAtTop
  }
}
