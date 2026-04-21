import { ref } from 'vue'

const STORAGE_KEY = 'contact-book-contacts'

const seedContacts = [
  { id: '1', firstName: 'Riki', lastName: 'Nishimura', email: 'riki@example.com', phone: '086-543-7890', address: '29 Hirafuku St, Okayama, JP', notes: '' },
  { id: '2', firstName: 'Briana', lastName: 'Candamil', email: 'briana@example.com', phone: '689-456-6789', address: '45 Orange Ave, Orange County, FL', notes: 'Internet friend' },
  { id: '3', firstName: 'Makaya', lastName: 'Constance', email: 'makaya@example.com', phone: '613-123-5678', address: '28 Catt Cres, Ottawa, ON', notes: 'I really enjoyed Dwele !! So far my fave songs are Lady at Mohogany & Find A Way :) but! the whole Subject album is like hit after hit, Thanks for the rec!' },
  { id: '5', firstName: 'Peter', lastName: 'Parker', email: 'peter@example.com', phone: '212-123-3456', address: '20 Ingram Street, New York, NY', notes: 'Just a friendly neighbor' },
  { id: '6', firstName: 'Brooklyn', lastName: 'Levy', email: 'brooklyn@example.com', phone: '613-321-7890', address: '87 Bridge St, Ottawa, ON', notes: 'Cousin !' },
  { id: '7', firstName: 'Tomioka', lastName: 'Giyuu', email: 'giyuu@example.com', phone: '514-123-0707', address: '5 Hara, Okutama, JP', notes: 'Water guy' },
  { id: '8', firstName: 'Annabeth', lastName: 'Chase', email: 'annabeth@example.com', phone: '212-123-3456', address: '20 Blake Street, New York, NY', notes: 'Athena\'s daughter' },
]

function loadContacts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedContacts))
    return seedContacts
  } catch {
    return seedContacts
  }
}

function saveContacts(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
}

const contacts = ref(loadContacts())

export function useContacts() {
  function getContact(id) {
    return contacts.value.find(c => c.id === id) || null
  }

  function addContact(data) {
    const newContact = {
      id: Date.now().toString(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || '',
      address: data.address?.trim() || '',
      notes: data.notes?.trim() || '',
    }
    contacts.value.push(newContact)
    saveContacts(contacts.value)
    return newContact
  }

  function updateContact(id, data) {
    const idx = contacts.value.findIndex(c => c.id === id)
    if (idx === -1) return null
    contacts.value[idx] = {
      ...contacts.value[idx],
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || '',
      address: data.address?.trim() || '',
      notes: data.notes?.trim() || '',
    }
    saveContacts(contacts.value)
    return contacts.value[idx]
  }

  function deleteContact(id) {
    contacts.value = contacts.value.filter(c => c.id !== id)
    saveContacts(contacts.value)
  }

  return { contacts, getContact, addContact, updateContact, deleteContact }
}
