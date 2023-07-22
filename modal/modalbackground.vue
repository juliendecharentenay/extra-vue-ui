<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
  <div class="fixed inset-0 z-10 overflow-y-auto
              flex items-center justify-center content-center">
      <slot></slot>
  </div>
</template>
<script>
export default {
  name: "ModalBackground",
};
</script>
