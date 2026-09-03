<template>
  <div class="scope-table">
    <div class="scope-header">
      <span class="scope-title">{{ title }}</span>
      <button
        class="scope-copy-all"
        type="button"
        @click="copy(allPermissions, 'all')"
      >
        <component :is="copied === 'all' ? CheckIcon : CopyIcon" />
        {{ copied === 'all' ? 'Copied!' : `Copy all ${allPermissions.length}` }}
      </button>
    </div>

    <ul class="scope-list">
      <li v-for="(scope, i) in scopes" :key="scope.name" class="scope-row">
        <div class="scope-info">
          <span class="scope-index">{{ i + 1 }}</span>
          <div>
            <div class="scope-name">{{ scope.name }}</div>
            <code class="scope-perms">{{ scope.permissions.join(', ') }}</code>
          </div>
        </div>
        <button
          class="scope-copy"
          type="button"
          :aria-label="`Copy ${scope.name} permissions`"
          @click="copy(scope.permissions, scope.name)"
        >
          <component :is="copied === scope.name ? CheckIcon : CopyIcon" />
          <span>{{ copied === scope.name ? 'Copied!' : 'Copy' }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, h, onUnmounted, ref } from 'vue'

// Renders a list of API access scopes with copy-to-clipboard buttons —
// one per scope, plus a "copy all" in the header. Permissions are copied
// comma-separated, which is the format Shopify's scopes field expects.
//
// Usage in markdown:
//
// <ScopeTable :scopes="[
//   { name: 'Shop locales', permissions: ['write_locales', 'read_locales'] },
//   { name: 'Inventory', permissions: ['write_inventory', 'read_inventory'] }
// ]" />

const props = defineProps({
  scopes: { type: Array, required: true },
  title: { type: String, default: 'Access scopes' },
})

const copied = ref(null)
let timer = null

const allPermissions = computed(() => props.scopes.flatMap((s) => s.permissions))

async function copy(permissions, key) {
  const text = permissions.join(',')
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // Clipboard API needs a secure context (https or localhost). Fall back to
    // a temporary textarea so copy still works over plain http on a LAN host.
    const el = document.createElement('textarea')
    el.value = text
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  copied.value = key
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = null), 2000)
}

onUnmounted(() => clearTimeout(timer))

const CopyIcon = () =>
  h(
    'svg',
    {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'aria-hidden': 'true',
    },
    [
      h('rect', { x: '9', y: '9', width: '13', height: '13', rx: '2' }),
      h('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' }),
    ],
  )

const CheckIcon = () =>
  h(
    'svg',
    {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2.5',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'aria-hidden': 'true',
    },
    [h('path', { d: 'M20 6 9 17l-5-5' })],
  )
</script>

<style scoped>
.scope-table {
  margin: 1.25rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.scope-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.scope-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.scope-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.scope-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.scope-row:last-child {
  border-bottom: none;
}

.scope-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.scope-index {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--vp-c-brand, #8b5cf6);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.scope-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.scope-perms {
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  background: none;
  padding: 0;
  word-break: break-word;
}

.scope-copy,
.scope-copy-all {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

.scope-copy:hover,
.scope-copy-all:hover {
  color: var(--vp-c-brand-1, #8b5cf6);
  border-color: var(--vp-c-brand-1, #8b5cf6);
}

.scope-copy svg,
.scope-copy-all svg {
  width: 14px;
  height: 14px;
}

@media (max-width: 640px) {
  .scope-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .scope-copy span {
    display: none;
  }
}
</style>
