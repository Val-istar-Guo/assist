import Index from '../views/index'
import Main from '../views/main'

import setting from './setting'

export default [
  {
    path: '/',
    component: Index,
    children: [
      { path: '', component: Main },
      setting,
    ],
  },
];
