<template>
  <ButtonComponent :disabled="disabled"
     class="bg-white border"
    :class="{'text-gray-600 border-gray-400 hover:bg-gray-100 focus-visible:outline-gray-400': ! disabled,
             'text-gray-300 border-gray-100': disabled,
            }"
    >
    <slot></slot>
  </ButtonComponent>
</template>
<script>
import ButtonComponent from "./buttoncomponent.vue";
export default {
  name: "ButtonSecondary",
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
