import { API_GITHUB_USER } from '~/server/constants/github'
import type { GithubRepository } from '~/types/github'

export default defineEventHandler(async (event): Promise<GithubRepository> => {
  return {
    name: 'LooofiX',
    description: '🔊 Minimalist Desktop Lofi Player To Relax and Enjoy',
    url: 'https://github.com/DoginUwU/LooofiX',
    stars: 8,
    createdAt: '2022-11-12T22:02:51Z',
    language: 'TypeScript',
    topics: [
      'app', 'desktop',
      'electron', 'javascript',
      'lofi', 'minimalist',
      'music', 'relax',
      'typescript', 'waves',
      'youtube',
    ],
    readme: '<p align="center">\n'
    + '  <img src="https://user-images.githubusercontent.com/59850361/201925831-5dbeccba-d32c-49e6-8533-2a2c893e71f7.png" width="150" />\n'
    + '</p>\n'
    + '\n'
    + '<samp>\n'
    + '  <h6 align="center">\n'
    + '    #lofi, #player, #desktop, #relax, #minimalist\n'
    + '  </h6>\n'
    + '</samp>\n'
    + '\n'
      + '<h1 align="center">LooofiX</h1>\n'
      + '  <p align="center">\n'
      + '    <samp>\n'
      + '      A Minimalist Desktop Lofi Player To Relax and Enjoy\n'
      + '    </samp>\n'
      + '   </p>\n'
      + '</samp>\n'
      + '\n'
      + '<p align="center">\n'
      + '  <img src="https://img.shields.io/badge/Music-22272E?logo=youtube&style=flat-square" />\n'
      + '  <img src="https://img.shields.io/badge/Typescript-22272E?logo=typescript&style=flat-square" />\n'
      + '  <img src="https://img.shields.io/badge/React-22272E?logo=react&style=flat-square" />\n'
      + '</p>\n'
      + '\n'
      + '<br />\n'
      + '\n'
      + '<p align="center">\n'
      + '  <img src="https://user-images.githubusercontent.com/59850361/201932932-2db56fcc-1ee6-4c04-bb9d-5dd765248367.png" />\n'
      + '  &nbsp;&nbsp;&nbsp;&nbsp;\n'
      + '  <img src="https://user-images.githubusercontent.com/59850361/201933416-145755bd-0c09-4265-9126-4fb0760aa2de.png" />\n'
      + '</p>\n'
      + '\n'
      + '## Demo\n'
      + '![image](https://user-images.githubusercontent.com/59850361/201935913-c8b186c5-2123-478b-83b8-f5433f43fd9e.png)\n'
      + '\n'
      + '\n'
      + '## Download\n'
      + '\n'
      + 'Download and use the Looofix on [Releases Page](https://github.com/DoginUwU/LooofiX/releases)\n'
      + '\n'
      + '## Features\n'
      + '\n'
      + '- Light/dark mode toggle\n'
      + '- Smooth animations\n'
      + '- Settings page\n'
      + '- Player controls\n'
      + '\n'
      + '\n'
      + '## Roadmap\n'
      + '\n'
      + '- Add app on system tray\n'
      + '\n'
      + '- Deep performance optimization\n'
      + '\n'
      + '- Add pomodoro integration\n'
      + '\n'
      + '- Add better player controls\n'
      + '\n'
      + '- Add more appearance settings\n'
      + '\n'
      + '- Add youtube music search n\' save\n'
      + '\n'
      + '- Add motivational phrases\n'
      + '\n'
      + '\n'
      + '## Contributing\n'
      + '\n'
      + 'Contributions are always welcome! You can simple clone this repository and user npm/yarn to make it run :)\n'
      + '\n'
      + '## Credits\n'
      + '- All open source packages stay in `package.json` file\n'
      + '- [Wave.js](https://github.com/foobar404/Wave.js)\n'
      + '- [Lofi Girl](https://www.youtube.com/@LofiGirl) for 24/7 livestreams\n',
  }
  // const name = getRouterParam(event, 'name')

  // const API_URL = `https://api.github.com/repos/${API_GITHUB_USER}/${name}`

  // const response = await fetch(API_URL)
  // const data = await response.json()

  // const README_URL = `${API_URL}/contents/README.md`
  // const responseReadme = await fetch(README_URL)
  // const dataReadme = await responseReadme.json()

  // return formatGithubRepository(data, dataReadme)
})
