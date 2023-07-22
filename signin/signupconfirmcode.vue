<template>
  <ModalBackground>
    <div class="rounded-lg bg-white p-4 min-w-[50%] 2xl:min-w-[33%]">
      <div class="flex flex-col space-y-2">
        <h3 class="font-medium text-gray-700">Account verification:</h3>
        <p class="mt-2 px-4 text-gray-700">A code has been sent to your email address. Please enter the code below and click verify.</p>
        <div class="px-4"><InputComponent v-model="my_username" label="Username" type="text" /></div>
        <div class="px-4"><InputComponent v-model="code"        label="Verification code" type="text" /></div>
        <div class="mt-4 flex flex-row justify-end pr-4 space-x-2">
          <ButtonSecondary @click="() => {$emit('dismiss');}">Dismiss</ButtonSecondary>
          <ButtonPrimary :disabled="code === null" @click="() => {$emit('verify', {username: my_username, code});}">Verify</ButtonPrimary>
        </div>
      </div>
    </div>
  </ModalBackground>
</template>
<script>
import ButtonPrimary from "../button/buttonprimary.vue";
import ButtonSecondary from "../button/buttonsecondary.vue";
import InputComponent from "../input/inputcomponent.vue";
import ModalBackground from "../modal/modalbackground.vue";

export default {
  name: "SignUpConfirmCode",
  components: {
    InputComponent,
    ModalBackground,
    ButtonPrimary, ButtonSecondary,
  },
  props: {
    username: {
      type: String,
      default: '',
    },
  },
  emits: ['dismiss', 'verify', 'error'],
  data: function() {
    return {
      my_username: null,
      code: null,
    };
  },
  mounted: function() {
    try {
      this.my_username = username;
    } catch (e) {
      this.on_error("Error in mounted", e);
    }
  },
  methods: {
    on_error: function(msg, e) { this.$emit('error', {msg, e}); },
  },
};
</script>
