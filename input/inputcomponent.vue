<template>
  <div>
    <label for="input" class="block text-sm font-medium text-gray-700"> {{ label }} </label>
    <div class="mt-1">
      <input id="input" name="input" v-model="value" :type="type" 
       class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 sm:text-sm text-gray-700 ring-1 ring-inset ring-gray-300"
       :class="{'focus:ring-indigo-500': disabled === false, 
                'bg-gray-50': disabled === true,
               }"
       :disabled="disabled">
    </div>
  </div>
</template>
<script>
export default {
  name: "InputComponent",
  props: ['label', 'type', 'modelValue', 'disabled'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() { return this.modelValue; },
      set(v) { this.$emit('update:modelValue', v); },
    }
  }
};
</script>
