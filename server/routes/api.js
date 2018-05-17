import Router from 'koa-router'
import { join, resolve } from 'path'
import { readFile } from 'fs/promises'
import npm from 'npm-programmatic'


const router = new Router({ prefix: '/api' })


router
  .get('/plugin/:pluginName', async ctx => {
    const { pluginName } = ctx.params
    const installPath = resolve('plugins')
    const pluginPath = join(installPath, 'node_modules', pluginName)


    await npm.install([pluginName], {
      cwd: installPath,
      save: false,
    })

    const packageJsonFile = await readFile(join(pluginPath, 'package.json'))
    const { main } = JSON.parse(packageJsonFile)

    ctx.body = await readFile(join(pluginPath, main))
    ctx.set('Content-Type', 'application/javascript; charset=UTF-8');
  })

export default router