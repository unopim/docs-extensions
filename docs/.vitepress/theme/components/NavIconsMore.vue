<script setup lang="ts">
import { ref } from 'vue'
import VPSwitchAppearance from 'vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue'
import GoogleTranslate from './GoogleTranslate.vue'

const open = ref(false)
function close() { open.value = false }
function toggle() { open.value = !open.value }
</script>

<template>
  <div class="nim-root">

    <!-- ── Narrow-tablet (768–860px): collapsed "⋯" flyout ── -->
    <div class="nim-flyout-wrap" v-click-outside="close">
      <button
        class="nim-flyout-btn"
        :class="{ active: open }"
        :aria-expanded="open"
        aria-label="More options"
        @click="toggle"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
             fill="currentColor" aria-hidden="true">
          <circle cx="5" cy="12" r="2"/>
          <circle cx="12" cy="12" r="2"/>
          <circle cx="19" cy="12" r="2"/>
        </svg>
      </button>

      <Transition name="nim-fade">
        <div v-if="open" class="nim-panel" role="menu">
          <!-- Appearance -->
          <div class="nim-row nim-row--appearance">
            <span class="nim-row-label">Appearance</span>
            <VPSwitchAppearance />
          </div>
          <!-- GitHub -->
          <a
            href="https://github.com/unopim"
            target="_blank"
            rel="noopener noreferrer"
            class="nim-row nim-row--link"
            role="menuitem"
            @click="close"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56
                       0-.28-.01-1.02-.02-2-3.19.69-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.68-1.28-1.68
                       -1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96
                       .1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.19-3.08
                       -.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.79 0
                       c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.82 1.19 3.08
                       0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.13
                       0 .31.21.68.8.56C20.22 21.38 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5Z"/>
            </svg>
            <span>GitHub</span>
          </a>
          <!-- Translate -->
          <div class="nim-row nim-row--translate">
            <GoogleTranslate />
          </div>
        </div>
      </Transition>
    </div>

    <!-- ── Icon bar (mobile + ≥861px) ── -->
    <div class="nim-icons">
      <!-- Appearance: hidden on mobile (<768px) and ≥1280px (VPNavBarAppearance shows there) -->
      <VPSwitchAppearance class="nim-icon-appearance" />
      <!-- GitHub -->
      <a
        class="nim-icon-github"
        href="https://github.com/unopim"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="UnoPim on GitHub"
        title="GitHub"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56
                   0-.28-.01-1.02-.02-2-3.19.69-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.68-1.28-1.68
                   -1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96
                   .1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.19-3.08
                   -.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.79 0
                   c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.82 1.19 3.08
                   0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.13
                   0 .31.21.68.8.56C20.22 21.38 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5Z"/>
        </svg>
      </a>
      <!-- Translate -->
      <GoogleTranslate class="nim-icon-translate" />
    </div>

  </div>
</template>

<style scoped>
.nim-root {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.nim-icons {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding-left: 0.5rem;
  margin-left: 0.25rem;
  border-left: 1px solid var(--vp-c-divider);
}

.nim-icon-github {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  border-radius: 9999px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.nim-icon-github:hover {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-brand);
}

.nim-flyout-wrap {
  display: none;
  position: relative;
  align-items: center;
}

.nim-flyout-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: var(--vp-nav-height);
  padding: 0;
  color: var(--vp-c-text-1);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.nim-flyout-btn:hover,
.nim-flyout-btn.active {
  color: var(--vp-c-brand);
}

.nim-panel {
  position: absolute;
  top: calc(100% - 4px);
  right: 0;
  min-width: 200px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.14);
  padding: 6px 0;
  z-index: 9999;
}

.nim-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
}

.nim-row--appearance {
  justify-content: space-between;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 10px;
}

.nim-row-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.nim-row--link {
  text-decoration: none;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  border-radius: 6px;
  margin: 2px 4px;
  padding: 8px 10px;
  transition: background 0.15s, color 0.15s;
}

.nim-row--link:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-brand);
}

.nim-row--translate {
  border-top: 1px solid var(--vp-c-divider);
  padding: 6px 4px 4px;
  border-radius: 0 0 6px 6px;
}

.nim-row--translate :deep(.vp-gt) {
  width: 100%;
}

.nim-row--translate :deep(.vp-gt-trigger) {
  width: 100%;
  height: auto;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 13.5px;
  font-weight: 500;
  justify-content: flex-start;
  transition: background 0.15s, color 0.15s;
}

.nim-row--translate :deep(.vp-gt-trigger:hover),
.nim-row--translate :deep(.vp-gt-trigger:focus) {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-brand);
}

.nim-fade-enter-active,
.nim-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.nim-fade-enter-from,
.nim-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.nim-icons :deep(.vp-gt-label) { display: none; }

.nim-icons :deep(.vp-gt-trigger) {
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  justify-content: center;
}


@media (min-width: 768px) and (max-width: 860px) {
  .nim-flyout-wrap { display: inline-flex; }
  .nim-icons       { display: none; }
}

@media (max-width: 767px) {
  .nim-icon-appearance { display: none !important; }
}

@media (min-width: 1280px) {
  .nim-icon-appearance { display: none !important; }
}
</style>
