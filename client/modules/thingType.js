import { createField } from './field'
import { createThing } from './thing'


// NOTE: 所有任务必须存在、必须支持的field
const systemStaticFields = [
  {
    // 类型
    type: 'select',
    // name即id，必须唯一
    name: 'type',
    label: '类型',
    // 是否必填
    required: true,
    options: ({ thingTypes }) => thingTypes.map(t => ({ label: t.name, value: t.type })),
    onChange: (value, thing, { thingTypes }) => {
      console.log(thing)
      if (thing.type === value) return thing;

      if (!(value in thing.extendsCache)) {
        const thingType = thingTypes.find(item => item.type === value)
        thing.extendsCache[value] = thingType.extends
      }

      thing.extendsCache[thing.type] = thing.extends
      thing.extends = thing.extendsCache[value]

      thing = createThing(thing)
      if (!(value in thing.extendsCache)) thing = thing.hooks.onCreate(thing)

      return thing
    },
  },
]

// NOTE: 为保障系统正常运行设定的默认fields，可以进行覆盖
const systemElasticFields = [
  {
    type: 'text',
    name: 'title',
    label: '标题',
    required: true,
    onChange: (value, thing) => ({ ...thing, title: value }),
  },
  {
    type: 'text',
    name: 'description',
    label: '描述',
    onChange: (value, thing) => ({ ...thing, description: value }),
  },
  {
    type: 'checkbox',
    name: 'important',
    label: '重要性',
    onChange: (value, thing) => ({ ...thing, important: !!value }),
  },
  {
    type: 'interface',
    name: 'children',
    label: '子事务',
    onChange: (value, thing) => ({ ...thing, children: [...thing.children, value] }),
    visible: false,
  },
]

export const createThingType = type => {
  if (!('type' in type)) throw new Error('无效插件')

  type.fields = type.fields || [];

  let fields = [
    ...systemElasticFields,
    ...type.fields,
    ...systemStaticFields,
  ]

  fields = fields.map(createField)

  return { ...type, fields }
}
