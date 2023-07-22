<template>
  <a :href="href"
     class="block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
     :class="{'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800': !current,
              'border-indigo-500 bg-indigo-50 text-indigo-700': current}"
     >
    <slot></slot>
  </a>
</template>
<script>
export default {
  name: "NavbarMobileMenuItem",
  props: {
    href: {
      type: String,
      default: "#",
    },
    current: {
      type: Boolean,
      required: true,
    },
  }
};
</script>
