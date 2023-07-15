<template>
  <a :href="href"
     class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
     :class="{'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !current,
              'border-indigo-500 text-gray-900': current}"
     >
    <slot></slot>
  </a>
</template>
<script>
export default {
  name: "NavbarMenuItem",
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
