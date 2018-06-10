import Index from '../views/setting'
import Main from '../views/setting/main'
import PluginManager from '../views/setting/pluginManager'
import PluginAdder from '../views/setting/pluginAdder'


export default {
  path: 'setting',
  component: Index,
  children: [
    { path: '', component: Main },
    { path: 'plugin-manager', component: PluginManager },
    { path: 'plugin-adder', component: PluginAdder },
  ],
}
