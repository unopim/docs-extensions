<!--
  GoogleTranslate.vue
  Renders a styled flyout (matching VitePress's native language menu)
  that triggers Google Translate under the hood. The Google widget's
  default UI is hidden; we only use its translation engine.
-->
<template>
  <div
    class="vp-gt"
    v-click-outside="close"
    @mouseenter="onHoverOpen"
    @mouseleave="onHoverClose"
  >
    <button
      type="button"
      class="vp-gt-trigger"
      :aria-expanded="open"
      aria-haspopup="true"
      aria-label="Translate this page"
      title="Translate this page"
      @click="toggle"
      @focus="onHoverOpen"
      @keydown.escape="close"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path fill="currentColor"
          d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
      </svg>
      <span class="vp-gt-label">Translate</span>
    </button>

    <Transition name="vp-gt-fade">
      <div
        v-if="open"
        class="vp-gt-menu notranslate"
        translate="no"
        role="menu"
        aria-label="Translate this page"
      >
        <button
          v-for="lang in languages"
          :key="lang.code"
          role="menuitem"
          class="vp-gt-menu-item notranslate"
          translate="no"
          :class="{ 'is-active': current === lang.code }"
          @click="switchTo(lang.code)"
        >
          <span class="vp-gt-menu-flag" aria-hidden="true">{{ lang.flag }}</span>
          <span class="vp-gt-menu-label">{{ lang.label }}</span>
          <span v-if="current === lang.code" class="vp-gt-menu-check" aria-hidden="true">✓</span>
        </button>
      </div>
    </Transition>

    <!-- Hidden host that Google Translate injects its widget into -->
    <div id="google_translate_element" class="vp-gt-hidden-host" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const languages = [
  { code: 'en', label: 'English', native: 'English',    flag: '🇺🇸' },
  { code: 'de', label: 'German',  native: 'Deutsch',    flag: '🇩🇪' },
  { code: 'fr', label: 'French',  native: 'Français',   flag: '🇫🇷' },
  { code: 'es', label: 'Spanish', native: 'Español',    flag: '🇪🇸' },
  { code: 'nl', label: 'Dutch',   native: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', label: 'Polish',  native: 'Polski',     flag: '🇵🇱' }
] as const

const open = ref(false)
const current = ref<string>('en')
let scriptLoaded = false
let openedByHover = false

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(new RegExp('(?:^|;)\\s*' + name + '=([^;]+)'))
  return m ? decodeURIComponent(m[1]) : null
}

function writeCookie(name: string, value: string) {
  // Set on root and on the parent domain so GT picks it up on reload.
  document.cookie = `${name}=${encodeURIComponent(value)};path=/`
  const host = location.hostname
  if (host.indexOf('.') >= 0) {
    document.cookie = `${name}=${encodeURIComponent(value)};path=/;domain=.${host}`
  }
}

function detectCurrent() {
  // We write /auto/<lang>; GT may rewrite to /<src>/<lang> after translating.
  // The target language is always the last path segment.
  const c = readCookie('googtrans') || ''
  const m = c.match(/\/([a-z]{2,8})$/i)
  const lang = m ? m[1].toLowerCase() : 'en'
  current.value = lang === 'auto' ? 'en' : lang
}

function loadGoogleTranslate() {
  if (typeof window === 'undefined') return
  if (scriptLoaded) return
  scriptLoaded = true

  ;(window as any).googleTranslateElementInit = () => {
    const g = (window as any).google
    if (!g || !g.translate) return
    // eslint-disable-next-line no-new
    new g.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,de,fr,es,nl,pl',
        layout: g.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      'google_translate_element'
    )
  }

  const existing = document.querySelector('script[src*="translate_a/element.js"]')
  if (!existing) {
    const s = document.createElement('script')
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    s.defer = true
    document.body.appendChild(s)
  } else if ((window as any).google && (window as any).google.translate) {
    ;(window as any).googleTranslateElementInit()
  }
}

function triggerSelect(lang: string): boolean {
  // Don't trigger Google's dropdown - just return false to force reload
  // This prevents the Google Translate native UI from appearing
  return false
}

function switchTo(lang: string) {
  current.value = lang
  close()

  // Keep the cookie in sync so a page reload (or other components reading
  // it) see the current target language.
  if (lang === 'en') {
    const expired = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    const host = location.hostname
    const domains: string[] = ['', host, `.${host}`]
    const parts = host.split('.')
    if (parts.length > 2) {
      const parent = parts.slice(-2).join('.')
      domains.push(parent, `.${parent}`)
    }
    for (const d of domains) {
      const domainPart = d ? `; domain=${d}` : ''
      document.cookie = `googtrans=; ${expired}${domainPart}`
    }
    try { localStorage.removeItem('googtrans') } catch (_) {}
  } else {
    writeCookie('googtrans', '/auto/' + lang)
  }

  // Try in-page switch first (no reload, no flash).
  if (triggerSelect(lang)) return

  // Engine not loaded yet — reload so GT picks up the cookie.
  location.reload()
}

function toggle() {
  if (open.value && openedByHover) {
    // Menu was opened by hover — clicking the trigger should keep it open
    // so the user can select a language without the menu closing on them.
    openedByHover = false
    return
  }
  open.value = !open.value
  openedByHover = false
  if (open.value) loadGoogleTranslate()
}

function close() {
  open.value = false
  openedByHover = false
}

// Hover support — opens immediately on mouseenter, closes after a short
// delay on mouseleave so the user can move from trigger to menu without
// it closing under their cursor.
let closeTimer: ReturnType<typeof setTimeout> | null = null

function onHoverOpen() {
  if (closeTimer) { clearTimeout(closeTimer); closeTimer = null }
  if (!open.value) {
    open.value = true
    openedByHover = true
    loadGoogleTranslate()
  }
}

function onHoverClose() {
  if (closeTimer) clearTimeout(closeTimer)
  closeTimer = setTimeout(() => {
    open.value = false
    openedByHover = false
    closeTimer = null
  }, 180)
}

onMounted(() => {
  detectCurrent()
  // If a non-default lang is in the cookie, eagerly load GT so the
  // page translates on first paint after a refresh.
  if (current.value !== 'en') loadGoogleTranslate()
})

onBeforeUnmount(() => {
  // No-op: keep GT engine loaded across route changes.
})
</script>

<style scoped>
/** ========================================
    Google Translate custom styles
    ======================================== */

.vp-gt {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.vp-gt-trigger {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 2rem;
  padding: 0.25rem 0rem;
  border: none;
  border-radius: 9999px;
  background-color: transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  transition: background-color 0.25s;
}

.vp-gt-label {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.vp-gt-trigger:hover,
.vp-gt-trigger:focus {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-brand);
  outline: none;
}

.vp-gt-trigger:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}

.vp-gt-menu {
  position: absolute;
  top: calc(100% + 0.25rem);
  right: 0;
  z-index: 10;
  min-width: 12rem;
  padding: 0.5rem 0;
  margin: 0;
  list-style: none;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 0.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.vp-gt-menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  background-color: transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  text-align: left;
  text-decoration: none;
  transition: background-color 0.2s;
}

.vp-gt-menu-item:hover {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-brand);
}

.vp-gt-menu-item.is-active {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 500;
}

.vp-gt-menu-flag {
  display: inline-block;
  width: 1rem;
  margin-right: 0.5rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1;
}

.vp-gt-menu-label {
  flex: 1;
}

.vp-gt-menu-check {
  display: inline-block;
  margin-left: 0.5rem;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.vp-gt-hidden-host {
  display: none;
}

.vp-gt-fade-enter-active,
.vp-gt-fade-leave-active {
  transition: all 0.2s ease;
}

.vp-gt-fade-enter-from,
.vp-gt-fade-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}

.notranslate {
  --disable-google-translate: true;
}

[v-click-outside] {
 
}
</style>

<style>
.goog-te-banner-frame,
.goog-te-banner-frame.skiptranslate,
.goog-te-gadget-simple,
.goog-logo-link,
.goog-te-gadget .goog-logo-link,
.goog-te-spinner-pos,
.goog-te-spinner-animation,
iframe.goog-te-banner-frame,
iframe.skiptranslate,
.skiptranslate > iframe,
#goog-gt-tt,
.goog-te-balloon-frame {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  width: 0 !important;
}

html {
  top: 0 !important;
  position: static !important;
}

html.translated-ltr,
html.translated-rtl {
  margin-top: 0 !important;
  top: 0 !important;
  position: static !important;
}

html.translated-ltr body,
html.translated-rtl body {
  top: 0 !important;
  margin-top: 0 !important;
  position: static !important;
}

.goog-text-highlight {
  background: none !important;
  box-shadow: none !important;
}

.goog-te-menu-frame {
  display: none !important;
}
</style>
