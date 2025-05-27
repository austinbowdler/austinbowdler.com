import { defineNuxtPlugin } from '#app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Brand icons
import { faVuejs, faJsSquare, faReact, faWindows, faHtml5, faCss3 } from '@fortawesome/free-brands-svg-icons'

// Solid icons
import { faCode, faDatabase, faDesktop } from '@fortawesome/free-solid-svg-icons'

// Add them all to the Font Awesome library
library.add(
    faVuejs,
    faJsSquare,
    faReact,
    faWindows,
    faHtml5,
    faCss3,
    faCode,
    faDatabase,
    faDesktop
)

// Register FontAwesomeIcon as a global component
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})