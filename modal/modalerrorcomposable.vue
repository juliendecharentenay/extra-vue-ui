<template>
  <ModalError @dismiss="$emit('dismiss')">
    <template #message>{{ error.msg }}</template>
    <template #error>{{ error.e }}</template>
  </ModalError>
</template>
<script>
import ModalError from "./modalerror.vue";
export default {
  name: "ModalErrorComposable",
  components: { ModalError, },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  emits: ['dismiss']
};
</script>
