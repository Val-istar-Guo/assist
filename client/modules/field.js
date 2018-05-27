export const types = {
  text: { defaulted: '' },
  textarea: { defaulted: '' },
  checkbox: { defaulted: '' },
  select: { defaulted: '' },
  data: { defaulted: '' },
  duration: { defaulted: '' },
  interface: { defaulted: null },

  // OPTIMIZE: NOT SUPPORT TYPES
  // multi: { defaulted: '' },
  // section: { defaulted: '' },
}


export const createField = field => {
  field = { ...field }

  if ('default' in field) {

  } else {
    field.defaulted = types[field.type].defaulted
  }

  return field;
}
