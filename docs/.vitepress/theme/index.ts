import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import Layout from './Layout.vue'
import ImagePopup from './components/ImagePopup.vue'
import Steps from './components/Steps.vue'
import FeatureGrid from './components/FeatureGrid.vue'
import FeatureCard from './components/FeatureCard.vue'
import VideoEmbed from './components/VideoEmbed.vue'
import GoogleTranslate from './components/GoogleTranslate.vue'
import ScopeTable from './components/ScopeTable.vue'
import ExtensionsMegaMenu from './components/ExtensionsMegaMenu.vue'
import NavIconsMore from './components/NavIconsMore.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('ImagePopup', ImagePopup)
    app.component('Steps', Steps)
    app.component('FeatureGrid', FeatureGrid)
    app.component('FeatureCard', FeatureCard)
    app.component('VideoEmbed', VideoEmbed)
    app.component('GoogleTranslate', GoogleTranslate)
    app.component('ScopeTable', ScopeTable)
    app.component('ExtensionsMegaMenu', ExtensionsMegaMenu)
    app.component('NavIconsMore', NavIconsMore)

    app.directive('click-outside', {
      mounted(el, binding) {
        el.__clickOutsideHandler__ = (event: MouseEvent) => {
          if (!(el === event.target || el.contains(event.target as Node))) {
            binding.value(event)
          }
        }
        document.addEventListener('click', el.__clickOutsideHandler__)
      },
      unmounted(el) {
        document.removeEventListener('click', el.__clickOutsideHandler__)
        delete el.__clickOutsideHandler__
      },
      getSSRProps() {
        return {}
      },
    })
  },
}
