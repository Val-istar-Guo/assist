import { createField } from './field'
import { createThing } from './thing'


// NOTE: 所有任务必须存在、必须支持的field
const systemStaticFields = []

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
    name: 'note',
    label: '备注',
    onChange: (value, thing) => ({ ...thing, note: value }),
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
  if (!('name' in type)) throw new Error('无效插件')

  type.fields = type.fields || [];

  let fields = [
    ...systemElasticFields,
    ...type.fields,
    ...systemStaticFields,
  ]

  fields = fields.map(createField)

  const fieldsMap = fields
    .reduce((o, field) => {
      console.log(field)
      o[field.name] = field
      return o
    }, {})

  const modifyThing = (thing, props, getters) => {
    thing = { ...thing }

    Object.entries(props)
      .forEach(([name, value]) => {
        if (!(name in fieldsMap)) return
        thing = fieldsMap[name].onChange(value, thing, getters)
      })

    return thing
  }

  return { ...type, fields, modifyThing }
}
