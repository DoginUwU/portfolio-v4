import { ref, onMounted, onUnmounted } from 'vue';

export function useScroll() {
    const isAtTop = ref(true);

    const handleScroll = () => {
        isAtTop.value = window.scrollY <= 50;
    };

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });

    return {
        isAtTop,
    };
}
