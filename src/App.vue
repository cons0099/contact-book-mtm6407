<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-logo">
        <h1>Contact Book !!</h1>
      </div>
      <nav class="sidebar-nav">
        <RouterLink to="/" class="nav-link" exact-active-class="router-link-active">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          All Contacts
        </RouterLink>
        <RouterLink to="/new" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          New Contact
        </RouterLink>
      </nav>
      <div class="sidebar-footer">
        <p>{{ contactCount }} contact{{ contactCount !== 1 ? 's' : '' }} stored</p>
      </div>
    </aside>
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useContacts } from './composables/useContacts'
const { contacts } = useContacts()
const contactCount = computed(() => contacts.value.length)
</script>
