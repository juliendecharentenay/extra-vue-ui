<template>
  <div>
    <div class="">
      <input id="input" name="input" v-model="value" :type="type" 
       class="block w-full px-2 border-0 border-b border-gray-300 placeholder:text-gray-300 sm:text-sm text-gray-700 focus:outline-none focus:ring-0"
       :class="{'focus:border-gray-600 focus:text-gray-900': disabled === false, 
                'bg-gray-50 text-gray-500': disabled === true,
                }"
       :disabled="disabled">
    </div>
  </div>
</template>
<script>
export default {
  name: "InputMinimalComponent",
  props: {
    'type': {
      type: String,
      default: 'text',
    }, 
    'modelValue': {
      required: true,
    }, 
    'disabled': {
      type: Boolean,
      default: false,
    }
  },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() { return this.modelValue; },
      set(v) { this.$emit('update:modelValue', v); },
    }
  }
};
</script>
