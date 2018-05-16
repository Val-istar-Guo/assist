import moment from 'moment'
import uuid from 'uuid/v1'

const identify = value => value
export const editorTypes = ['text', 'textarea', 'checkbox', 'select', 'data', 'duration', 'multi', 'section']

export const createThing = (props, type) => {
  if (!('title' in props)) throw new Error('Must set name when create thing')
  if (!('editor' in type)) type.editor = []
  if (!('time') in props) props = { ...props, time: {} }

  return {
    type: props.type,
    // name: 'normal',
    // waiting, pending, completed, deleted
    state: 'pending',
    time: {
      create: moment().format(),
      deleted: null,
      ...props.time,
    },

    /**
     * server id
     * NOTE: 如果id为null，未同步到服务端
     */
    id: null,
    /**
     * client id
     * NOTE: 客户端id，检索任务、操作任务使用的id
     */
    uuid: props.uuid || uuid(),

    // 任务名称
    title: props.title,
    // 任务备注
    description: props.description || '',
    // 任务标签
    tags: props.tags || [],
    // 是否为主要任务
    important: props.important || false,

    // 快捷操作栏
    quickLine: type.quickLine || [],

    hooks: {
      onCreate: identify,
      onLoad: identify,
      beforeDelete: identify,
      onChange: identify,
      ...type.hooks,
    },
    editor: [
      {
        type: 'select',
        name: 'type',
        options: ({ thingTypes }) => thingTypes.map(t => ({ label: t.name, value: t.type })),
        onChange: (value, thing, { thingTypes }) => {
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
      {
        type: 'text',
        name: 'title',
        onChange: (value, thing) => ({ ...thing, title: value }),
      },
      {
        type: 'checkbox',
        name: 'important',
        onChange: (value, thing) => ({ ...thing, important: value }),
      },
      ...type.editor,
    ],
    extends: props.extends || type.extends || {},
    extendsCache: props.extendsCache || [],
  }
}
