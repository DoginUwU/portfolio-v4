export interface HeroSpotify {
    name: string
    artist: string
    album: string
    image: string
    duration: number
    currentProgress?: number
}

export interface HeroGithub {
    repos: number
    followers: number
}

export interface HeroWakatime {
    languages: {
        name: string
        text: string
    }[]
}
