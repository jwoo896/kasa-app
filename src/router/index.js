import Vue from 'vue'
import VueRouter from 'vue-router'
import Properties from '@/views/Properties.vue'
import CharEncoder from '../services/CharEncoder'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home/properties/ACH'
  },
  {
    path: '/home/properties/:property',
    name: 'Properties',
    component: Properties,
    props: true,
    children: [
      {
        path: `${CharEncoder('encode')('name&address')}`,
        alias: '',
        name: 'Name & Address',
        component: () => import('@/components/NameAddress.vue')
      },
      {
        path: 'access',
        name: 'Access',
        component: () => import('@/components/AccessComponent.vue')
      },
      {
        path: 'pets',
        name: 'Pets',
        component: () => import('@/components/PetsComponent.vue')
      },
      {
        path: 'contacts',
        name: 'Contacts',
        component: () => import('@/components/ContactsComponent.vue')
      },
      {
        path: 'housekeepers',
        name: 'Housekeepers',
        component: () => import('@/components/HousekeepersComponent.vue')
      },
      {
        path: 'facilities',
        name: 'Facilities',
        component: () => import('@/components/FacilitiesComponent.vue')
      },
      {
        path: 'iot-devices',
        name: 'Iot Devices',
        component: () => import('@/components/IotDevicesComponent.vue')
      },
      {
        path: 'utilities',
        name: 'Utilities',
        component: () => import('@/components/UtilitiesComponent.vue')
      },
      {
        path: 'room-types',
        name: 'Room Types',
        component: () => import('@/components/RoomTypesComponent.vue')
      },
      {
        path: 'notes',
        name: 'Notes',
        component: () => import('@/components/NotesComponent.vue')
      },
      {
        path: 'website',
        name: 'Website',
        component: () => import('@/components/WebsiteComponent.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/components/SettingsComponent.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
