<template>
  <div>
    <RouterLink to="/" class="detail-back">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
      </svg>
      Back to contacts
    </RouterLink>

    <div v-if="contact" class="detail-card">
      <!-- Header -->
      <div class="detail-header">
        <div class="detail-avatar" :style="{ background: avatarColor(contact) }">
          {{ initials(contact) }}
        </div>
        <div class="detail-name-block">
          <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
          <p>Contact Details</p>
        </div>
      </div>

      <!-- Body -->
      <div class="detail-body">
        <div class="detail-fields">
          <div class="detail-field">
            <label>Email Address</label>
            <p>{{ contact.email || '—' }}</p>
          </div>
          <div class="detail-field">
            <label>Phone Number</label>
            <p :class="{ empty: !contact.phone }">{{ contact.phone || 'Not provided' }}</p>
          </div>
          <div class="detail-field">
            <label>Address</label>
            <p :class="{ empty: !contact.address }">{{ contact.address || 'Not provided' }}</p>
          </div>
          <div class="detail-field" v-if="contact.notes">
            <label>Notes</label>
            <p>{{ contact.notes }}</p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="detail-actions">
        <RouterLink :to="{ name: 'contact-edit', params: { id: contact.id } }" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487a2.1 2.1 0 113 3L7.5 19.854 3 21l1.146-4.5L16.862 4.487z"/>
          </svg>
          Edit Contact
        </RouterLink>
        <button class="btn btn-danger" @click="confirmDelete = true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          Delete
        </button>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h3>Contact not found</h3>
      <p>This contact may have been deleted.</p>
    </div>

    <!-- Delete confirm modal -->
    <Transition name="fade">
      <div v-if="confirmDelete" class="modal-overlay" @click.self="confirmDelete = false">
        <div class="modal">
          <div class="modal-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
            </svg>
          </div>
          <h3>Delete Contact?</h3>
          <p>Are you sure you want to delete <strong>{{ contact?.firstName }} {{ contact?.lastName }}</strong>? This action cannot be undone.</p>
          <div class="modal-actions">
            <button class="btn btn-secondary" @click="confirmDelete = false">Cancel</button>
            <button class="btn btn-danger" @click="handleDelete">Yes, Delete</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContacts } from '../composables/useContacts'

const route = useRoute()
const router = useRouter()
const { getContact, deleteContact } = useContacts()

const contact = computed(() => getContact(route.params.id))
const confirmDelete = ref(false)

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

function handleDelete() {
  deleteContact(route.params.id)
  router.push({ name: 'home' })
}
</script>
