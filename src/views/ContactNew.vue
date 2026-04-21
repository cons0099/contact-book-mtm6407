<template>
  <div>
    <RouterLink to="/" class="detail-back">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
      </svg>
      Back to contacts
    </RouterLink>

    <div class="page-header">
      <h2>New Contact</h2>
      <p>Fill in the details below to add someone to your directory</p>
    </div>

    <form class="form-card" @submit.prevent="handleSubmit" novalidate>
      <div class="form-row">
        <div class="form-group">
          <label>First Name <span>*</span></label>
          <input
            v-model="form.firstName"
            class="form-input"
            :class="{ error: errors.firstName }"
            type="text"
            placeholder="e.g. Annabeth"
            autocomplete="given-name"
          />
          <span v-if="errors.firstName" class="field-error">{{ errors.firstName }}</span>
        </div>
        <div class="form-group">
          <label>Last Name <span>*</span></label>
          <input
            v-model="form.lastName"
            class="form-input"
            :class="{ error: errors.lastName }"
            type="text"
            placeholder="e.g. Chase"
            autocomplete="family-name"
          />
          <span v-if="errors.lastName" class="field-error">{{ errors.lastName }}</span>
        </div>
      </div>

      <div class="form-group">
        <label>Email Address <span>*</span></label>
        <input
          v-model="form.email"
          class="form-input"
          :class="{ error: errors.email }"
          type="email"
          placeholder="annabeth@example.com"
          autocomplete="email"
        />
        <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label>Phone Number</label>
        <input
          v-model="form.phone"
          class="form-input"
          type="tel"
          placeholder="212-234-5678"
          autocomplete="tel"
        />
      </div>

      <div class="form-group">
        <label>Address</label>
        <input
          v-model="form.address"
          class="form-input"
          type="text"
          placeholder="123 Main St, New York, NY"
          autocomplete="street-address"
        />
      </div>

      <div class="form-group">
        <label>Notes</label>
        <textarea
          v-model="form.notes"
          class="form-textarea"
          placeholder="Any additional notes…"
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z"/>
          </svg>
          Add Contact
        </button>
        <RouterLink to="/" class="btn btn-secondary">Cancel</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useContacts } from '../composables/useContacts'

const router = useRouter()
const { addContact } = useContacts()

const form = reactive({ firstName: '', lastName: '', email: '', phone: '', address: '', notes: '' })
const errors = reactive({ firstName: '', lastName: '', email: '' })

function validate() {
  errors.firstName = form.firstName.trim() ? '' : 'First name is required.'
  errors.lastName = form.lastName.trim() ? '' : 'Last name is required.'
  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  } else {
    errors.email = ''
  }
  return !errors.firstName && !errors.lastName && !errors.email
}

function handleSubmit() {
  if (!validate()) return
  const newContact = addContact(form)
  router.push({ name: 'contact-detail', params: { id: newContact.id } })
}
</script>
