<template>
  <div class="block w-sm w-96 flex flex-col gap-y-2 p-4 rounded-lg border-1 border-light shadow">
      <!-- Sign-in -->
      <InputComponent v-model="username" label="Username" type="text" />
      <InputComponent v-model="password" label="Password" type="password" />
      <div class="mt-2 flex flex-row justify-end">
        <ButtonPrimary
          @click="() => {$emit('signin', {username, password});}"
          >
          Sign-in
        </ButtonPrimary>
      </div>
  </div>
</template>
<script setup>
const emit = defineEmits([ 'error', 'signin' ]);
import { useComponentError } from "../composable/error.js";
const { on_error, catcher } = useComponentError({ emit });

import InputComponent from "../input/inputcomponent.vue";
import InputComponentPassword from "../input/inputcomponentpassword.vue";
import ButtonPrimary from "../button/buttonprimary.vue";

const username = "";
const password = "";
</script>
