import { createRouter, createWebHashHistory } from 'vue-router'
import ContactList from '../views/ContactList.vue'
import ContactDetail from '../views/ContactDetail.vue'
import ContactNew from '../views/ContactNew.vue'
import ContactEdit from '../views/ContactEdit.vue'

const routes = [
  { path: '/', name: 'home', component: ContactList },
  { path: '/contact/:id', name: 'contact-detail', component: ContactDetail },
  { path: '/new', name: 'contact-new', component: ContactNew },
  { path: '/contact/:id/edit', name: 'contact-edit', component: ContactEdit },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
