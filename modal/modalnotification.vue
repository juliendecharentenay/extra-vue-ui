<template>
  <ModalBackground>
    <div class="rounded-lg bg-green-50 p-4 min-w-[50%] 2xl:min-w-[33%]">
      <h3 class="text-sm font-medium text-green-800">Please wait</h3>
      <div class="mt-2 text-sm text-green-700">
        <slot></slot>
      </div>
    </div>
  </ModalBackground>
</template>
<script>
import ModalBackground from "./modalbackground.vue";
export default {
  name: "ModalNotification",
  components: {
    ModalBackground,
  },
};
</script>
