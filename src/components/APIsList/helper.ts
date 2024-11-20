import Spotify from './apis/Spotify.vue'
import Github from './apis/Github.vue'
import Code from './apis/Code.vue'

export const APIS = [
  {
    icon: '/assets/spotify.png',
    component: Spotify,
    color: '#000000',
    caption: 'last played song',
    alt: 'spotify logo',
  },
  {
    icon: '/assets/github.png',
    title: 'My Github Profile',
    component: Github,
    color: '#FFFFFF',
  },
  {
    icon: '/assets/code.png',
    title: 'Code Status',
    component: Code,
    color: '#FFFFFF',
    caption: 'last month (first 5 languages)',
  },
]
