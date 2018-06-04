import Index from '../views/setting'
import Main from '../views/setting/main'
import Plugins from '../views/setting/plugins'


export default {
  path: 'setting',
  component: Index,
  children: [
    { path: '', component: Main },
    { path: 'plugins', component: Plugins },
  ],
}
