import type { App } from 'vue'

// Styles — importés ici, bundlés par Vite en dist/style.css
import './tokens/midnight.css'
import './tokens/reset.css'
import './tokens/typography.css'

// Composants (à décommenter au fur et à mesure)
// import QuantButton from './components/QuantButton/QuantButton.vue'
// import QuantBadge  from './components/QuantBadge/QuantBadge.vue'

// const components = [
//   QuantButton,
//   QuantBadge,
// ]

// Plugin Vue — app.use(QuantUI)
export default {
  install(app: App) {
    // components.forEach(c => app.component(c.__name!, c))
  },
}

// Named exports pour import à la carte
// export { QuantButton, QuantBadge }