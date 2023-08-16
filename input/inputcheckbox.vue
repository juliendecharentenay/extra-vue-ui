<template>
  <div class="flex items-start">
    <div class="ml-3 h-6 items-center">
      <input id="my-checkbox" name="my-checkbox" type="checkbox" 
             class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
             v-model="value">
    </div>
    <div class="text-sm leading-6">
      <label for="my-checkbox" class="select-none font-medium text-gray-900"><slot></slot></label>
    </div>
  </div>
</template>
<script>
export default {
  name: "InputCheckbox",
  props: {
    'modelValue': {
      type: Boolean,
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
