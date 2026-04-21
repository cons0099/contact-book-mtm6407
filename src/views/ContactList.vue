<template>
  <div>
    <div class="page-header">
      <h2>All Contacts</h2>
      <p>Browse and search your personal directory</p>
    </div>

    <!-- Search -->
    <div class="search-wrap" style="margin-left: auto; margin-right: auto;">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
      </svg>
      <input
        v-model="search"
        class="search-input"
        type="text"
        placeholder="Search by name…"
        autocomplete="off"
      />
    </div>

    <!-- Count -->
    <p class="contacts-count">{{ totalFiltered }} result{{ totalFiltered !== 1 ? 's' : '' }}</p>

    <!-- Empty state -->
    <div v-if="totalFiltered === 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      <h3>{{ search ? 'No matches found' : 'No contacts yet' }}</h3>
      <p>{{ search ? 'Try a different search name.' : 'Add a contact using the button below.' }}</p>
    </div>

    <!-- Grouped list -->
    <div v-for="group in groupedContacts" :key="group.letter" class="contact-group">
      <div class="group-letter">{{ group.letter }}</div>
      <div class="contact-list">
        <RouterLink
          v-for="contact in group.contacts"
          :key="contact.id"
          :to="{ name: 'contact-detail', params: { id: contact.id } }"
          class="contact-card"
        >
          <div class="avatar" :style="{ background: avatarColor(contact) }">
            {{ initials(contact) }}
          </div>
          <div class="contact-info">
            <div class="contact-name">{{ contact.firstName }} {{ contact.lastName }}</div>
            <div class="contact-email">{{ contact.email }}</div>
          </div>
          <svg class="contact-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:18px;height:18px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </RouterLink>
      </div>
    </div>

    <!-- FAB add button -->
    <RouterLink to="/new" class="btn-fab" title="Add new contact">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
      </svg>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useContacts } from '../composables/useContacts'

const { contacts } = useContacts()
const search = ref('')

const AVATAR_COLORS = [
  '#e8533a', '#3a6ee8', '#2e9e6e', '#9b59b6', '#e67e22',
  '#1abc9c', '#e91e8c', '#3498db', '#f39c12', '#27ae60'
]

function initials(c) {
  return (c.firstName[0] || '') + (c.lastName[0] || '')
}

function avatarColor(c) {
  const str = c.firstName + c.lastName
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return [...contacts.value]
  return contacts.value.filter(c =>
    (c.firstName + ' ' + c.lastName).toLowerCase().includes(q) ||
    c.lastName.toLowerCase().includes(q) ||
    c.firstName.toLowerCase().includes(q)
  )
})

const totalFiltered = computed(() => filtered.value.length)

const groupedContacts = computed(() => {
  const sorted = [...filtered.value].sort((a, b) =>
    a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName)
  )
  const groups = {}
  for (const c of sorted) {
    const letter = c.lastName[0]?.toUpperCase() || '#'
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(c)
  }
  return Object.keys(groups).sort().map(letter => ({ letter, contacts: groups[letter] }))
})
</script>
