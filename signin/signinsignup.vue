<template>
  <div class="block w-sm w-96">
    <nav class="relative rounded-t-lg shadow flex flex mb-4" 
         aria-label="Sign in/sign up tabs"
         >
      <div @click="my_sign = 'sign-in'"
           class="flex-1 overflow-hidden py-4 px-4 text-sm font-medium
                  text-center hover:bg-gray-100 cursor-pointer"
          :class="{'text-gray-900 rounded-tl-lg border-indigo-500 border-b-2 bg-gray-50': sign === 'sign-in',
                   'text-gray-500 hover:text-gray-700 bg-white': sign !== 'sign-in'}"
          >
          Sign-in
      </div>
      <div @click="my_sign = 'sign-up'"
           class="flex-1 overflow-hidden py-4 px-4 text-sm font-medium
                  text-center hover:bg-gray-100 cursor-pointer"
          :class="{'text-gray-900 border-indigo-500 border-b-2 bg-gray-50': sign === 'sign-up',
                   'text-gray-500 hover:text-gray-700 bg-white': sign !== 'sign-up'}"
          >
          Sign-up
       </div>
    </nav>
    <div class="flex flex-col justify-center gap-y-2" v-show="sign === 'sign-in'">
      <!-- Sign-in -->
      <InputComponent v-model="username" label="Username" type="text" />
      <InputComponent v-model="password" label="Password" type="password" />
      <div class="flex flex-row justify-end gap-x-2 pr-2">
        <ButtonSecondary
          @click="my_sign = null"
          >
          Dismiss
        </ButtonSecondary>
        <ButtonPrimary
          @click="() => {$emit('signin', {username, password});}"
          >
          Sign-in
        </ButtonPrimary>
      </div>
    </div>
    <div class="flex flex-col justify-center gap-y-2" v-show="sign === 'sign-up'">
      <!-- Sign-up -->
      <InputComponent v-model="username" label="Username" type="text" />
      <InputComponent v-model="email" label="Email" type="email" />
      <div><InputComponentPassword v-model="password" label="Password" @on_password_change_valid="(e) => {password_valid = e;}" /></div>
      <div class="text-sm text-gray-500" v-if="password !== ''">Please record your password as there is no password recovery facility (no contact details asked)</div>
      <div class="flex flex-row justify-end gap-x-2 pr-2">
        <ButtonSecondary
          @click="my_sign = null" >
          Dismiss
        </ButtonSecondary>
        <ButtonPrimary
          @click="() => {$emit('signup', {username, password, email});}" 
          :disabled="! password_valid || username === ''" >
          Sign-up
        </ButtonPrimary>
      </div>
    </div>
  </div>
</template>
<script>
import InputComponent from "../input/inputcomponent.vue";
import InputComponentPassword from "../input/inputcomponentpassword.vue";
import ButtonPrimary from "../button/buttonprimary.vue";
import ButtonSecondary from "../button/buttonsecondary.vue";

export default {
  name: "SignInSignUp",
  props: {
    sign: {
      type: String,
      required: true,
      validator(value) {
        return ["sign-in", "sign-up"].includes(value);
      },
    },
  },
  components: {
    InputComponent,
    InputComponentPassword,
    ButtonPrimary, ButtonSecondary,
  },
  emits: [ 'error', 'update:sign', 'signin', 'signup' ],
  data: function() {
    return {
      username: "",
      password: "",
      email: "",
      password_valid: false,
    };
  },
  computed: {
    my_sign: {
      get() { return this.sign; },
      set(v) { this.$emit('update:sign', v); },
    },
  },
};
</script>
