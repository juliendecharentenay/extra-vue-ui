<template>
  <ModalError @dismiss="$emit('dismiss')">
    <template #message>{{ error.msg }}</template>
    <template #error>
      <div v-if="typeof error.e.message === 'function'">
        {{ error.e.message() }}
        {{ error.e.cause() }}
      </div>
      <div v-else>
        {{ error.e }}
      </div>
    </template>
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
