<template>
  <ButtonComponent :disabled="disabled"
     class="text-white"
    :class="{'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600': ! disabled,
              'bg-indigo-400': disabled,
            }"
    >
    <slot></slot>
  </ButtonComponent>
</template>
<script>
import ButtonComponent from "./buttoncomponent.vue";
export default {
  name: "ButtonPrimary",
  components: {
    ButtonComponent,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
