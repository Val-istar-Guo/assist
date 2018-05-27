<template>
  <div class="container">
    <label>{{label}}</label>
    <input
      type="text"
      :placeholder="placeholder"
      @change="$emit('change', $event.target.value)"
      :value="value"
    />
  </div>
</template>
<script>
export default {
  props: {
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

.container {
  display: inline-block;
}

label {
  display: inline-block;
  font-weight: lighter;
  margin-right: 10px;
  color: var(--foreground);
}

input {
  display: inline-block;
  border: none;
  border-bottom: 1px solid var(--foreground);
  padding: 5px 10px;
  outline: none;
}
</style>
