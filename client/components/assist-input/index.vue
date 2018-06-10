<template>
  <div class="assist-input">
    <text-input
      v-if="type === 'text'"
      :label="label"
      @change="$emit('change', $event)"
      :value="value"
    />
    <select-input
      v-if="type === 'select'"
      :label="label"
      @change="$emit('change', $event)"
      :value="value"
    >
    </select-input>
  </div>
</template>
<script>
import TextInput from './text'
import SelectInput from './select'
import OptionInput from './option'


export default {
  components: { TextInput, SelectInput, OptionInput },
  props: {
    type: {
      type: String,
      default: 'text',
      validator: function (value) {
         const list = ['text', 'select', 'data', 'duration', 'checkbox', ]
        // 这个值必须匹配下列字符串中的一个
        return list.indexOf(value) !== -1
      }
    },
    label: String,
    placeholder: String,
    value: String,
  },
}
</script>
<style lang="postcss" scoped>
:root {
  --foreground: #355173;
}

.assist-input {
  display: inline-block;
  font-size: 32px;
}

label {
  dispaly: inline-block;
  font-weight: lighter;
  margin-right: 10px;
  color: var(--foreground);
}

input {
  dispaly: inline-block;
  border: none;
  border-bottom: 1px solid var(--foreground);
  padding: 5px 10px;
  outline: none;
}
</style>
