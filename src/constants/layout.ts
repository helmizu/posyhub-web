
import { UilAirplay, UilUser, UilKid, UilBabyCarriage, UilSignout } from '@iconscout/react-unicons';

export const SIDEBAR = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: UilAirplay,
    roles: ['admin', 'kader'],
    path: '/dashboard'
  },
  {
    key: 'user',
    label: 'Pengguna',
    icon: UilUser,
    roles: ['admin'],
    path: '/dashboard/user',
  },
  {
    key: 'toddler',
    label: 'Balita',
    icon: UilKid,
    roles: ['admin', 'kader'],
    path: '/dashboard/toddler',
  },
  {
    key: 'pregnant-mother',
    label: 'Ibu Hamil',
    icon: UilBabyCarriage,
    roles: ['admin', 'kader'],
    path: '/dashboard/pregnant-mother',
  },
];

export const BOTTOM_SIDEBAR = [
  {
    key: 'logout',
    label: 'Logout',
    icon: UilSignout,
    roles: [],
    path: '/logout'
  },
];
