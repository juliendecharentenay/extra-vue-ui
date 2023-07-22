<template>
  <button type="button" 
          class="rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          :disabled="disabled"
          >
     <slot></slot>
  </button>
</template>
<script>
export default {
  name: "ButtonComponent",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
