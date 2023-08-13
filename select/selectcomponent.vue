<template>
<div>
  <label for="select" class="block text-sm font-medium leading-6 text-gray-900" v-if="label !== undefined">{{ label }}...</label>
  <select id="select" 
          :name="label" 
          class="block w-full rounded-md border-0 py-1 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          v-model="value">
    <slot></slot>
  </select>
</div>
</template>
<script>
export default {
  name: "SelectComponent",
  props: {
    label: {
      type: String,
    },
    modelValue: {
      required: true,
    },
  },
  emits: [ 'update:modelValue' ],
  computed: {
    value: {
      get() { return this.modelValue; },
      set(v) { this.$emit('update:modelValue', v); },
    },
  },
};
</script>
