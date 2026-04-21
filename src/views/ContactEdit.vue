<template>
  <div>
    <RouterLink :to="{ name: 'contact-detail', params: { id: route.params.id } }" class="detail-back">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
      </svg>
      Back to contact
    </RouterLink>

    <div v-if="contact">
      <div class="page-header">
        <h2>Edit Contact</h2>
        <p>Update the details for {{ contact.firstName }} {{ contact.lastName }}</p>
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
              placeholder="First name"
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
              placeholder="Last name"
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
            placeholder="email@example.com"
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
            placeholder="514-555-0100"
            autocomplete="tel"
          />
        </div>

        <div class="form-group">
          <label>Address</label>
          <input
            v-model="form.address"
            class="form-input"
            type="text"
            placeholder="123 Main St, City, Province"
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
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            Save Changes
          </button>
          <RouterLink :to="{ name: 'contact-detail', params: { id: contact.id } }" class="btn btn-secondary">Cancel</RouterLink>
        </div>
      </form>
    </div>

    <div v-else class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h3>Contact not found</h3>
      <p>This contact may have been deleted.</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContacts } from '../composables/useContacts'

const route = useRoute()
const router = useRouter()
const { getContact, updateContact } = useContacts()

const contact = computed(() => getContact(route.params.id))

const form = reactive({
  firstName: contact.value?.firstName || '',
  lastName: contact.value?.lastName || '',
  email: contact.value?.email || '',
  phone: contact.value?.phone || '',
  address: contact.value?.address || '',
  notes: contact.value?.notes || '',
})

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
  updateContact(route.params.id, form)
  router.push({ name: 'contact-detail', params: { id: route.params.id } })
}
</script>
