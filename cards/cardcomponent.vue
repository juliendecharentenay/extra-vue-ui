<template>
  <div class="p-2 shadow rounded-lg border border-gray-200 flex flex-col gap-y-2 cursor-pointer">
    <div class="pb-2 border-b border-gray-100 text-gray-800 font-bold text-xl"><slot name="header"></slot></div>
    <div class="pt-1 pb-1 border-b border-gray-100"><slot name="description"></slot></div>
    <div class="flex flex-row justify-end pr-2"><ButtonPrimary>Open</ButtonPrimary></div>
  </div>
</template>
<script>
import ButtonPrimary from "../button/buttonprimary.vue";
export default {
  name: "CardComponent",
  components: {
    ButtonPrimary,
  },
};
</script>
