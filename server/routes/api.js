import Router from 'koa-router'
import { join, resolve } from 'path'
import fs from 'fs'
import util from 'util'
import npm from 'npm-programmatic'

const pluginList = [
  { id: 1, name: 'assist-plugin-system', description: '系统插件', author: 'Assist', recommend: true },
];

const readFile = util.promisify(fs.readFile)

const router = new Router({ prefix: '/api' })

router
  .get('/plugin/:pluginName', async ctx => {
    const { pluginName } = ctx.params
    const installPath = resolve('plugins')
    const pluginPath = join(installPath, 'node_modules', pluginName)


    // await npm.install([`${pluginName}@latest`], {
    //   cwd: installPath,
    //   save: false,
    // })

    const packageJsonFile = await readFile(join(pluginPath, 'package.json'))
    const { main } = JSON.parse(packageJsonFile)

    ctx.body = await readFile(join(pluginPath, main))
    ctx.set('Content-Type', 'application/javascript; charset=UTF-8');
  })
  .get('/plugins', async ctx => {
    const { keyword = '', limit = 10, offset = 0 } = ctx.query
    ctx.body = JSON.stringify(pluginList)
    ctx.set('Content-Type', 'application/json; charset=UTF-8')
  })

export default router
