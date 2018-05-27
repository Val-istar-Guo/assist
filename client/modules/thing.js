import moment from 'moment'
import uuid from 'uuid/v4'

const identify = value => value

export const createThing = (props, type) => {
  if (!('time') in props) props = { ...props, time: {} }

  console.log(props, uuid(), uuid());
  return {
    type: type.type,
    // name: 'normal',
    // waiting, pending, completed, deleted
    state: 'pending',
    time: {
      create: moment().format(),
      deleted: null,
      ...props.time,
    },

    children: props.children || [],
    nesting: 'nesting' in type ? !!type.nestring : true,

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
    fields: type.fields,
    extends: props.extends || type.extends || {},
    extendsCache: props.extendsCache || [],
  }
}
