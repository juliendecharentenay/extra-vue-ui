<template>
  <a 
     class="block py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800
            cursor-pointer"
     >
    <slot></slot>
  </a>
</template>
<script>
export default {
  name: "NavbarMobileMenuItem",
  props: {
  }
};
</script>
