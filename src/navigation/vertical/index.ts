import type { VerticalNavItems } from '@/@layouts/types'

export default [
  {
    title: 'Home',
    to: { name: 'index' },
    icon: { icon: 'mdi-home-outline' },
  },
  {
    title: 'Profile',
    to: { name: 'profile' },
    icon: { icon: 'mdi-account' },
  },
  {
    title: 'All - Users',
    to: { name: 'allUser' },
    icon: { icon: 'mdi-account-box-multiple-outline' },
  },

] as VerticalNavItems
