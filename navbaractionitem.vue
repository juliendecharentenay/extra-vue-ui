<template>
  <div 
     class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 
            cursor-pointer"
     >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "NavbarActionItem",
  props: {
  }
};
</script>
