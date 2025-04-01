<template>
  <div class="block w-sm w-96 flex flex-col gap-y-2 p-4 rounded-lg border-1 border-light shadow">
      <InputComponent v-model="password" label="Update password" type="password" />
      <div class="ml-2 text-xs flex flex-col">
        <div v-if="contains8Characters === false">Contains at least 8 characters</div>
        <div v-if="contains1Number === false">Contains at least 1 number</div>
        <div v-if="contains1SpecialCharacter === false">Contains at least 1 special character</div>
        <div v-if="contains1Uppercase === false">Contains at least 1 uppercase letter</div>
        <div v-if="contains1Lowercase === false">Contains at least 1 lowercase letter</div>
      </div>
      <div class="mt-2 flex flex-row justify-end">
        <ButtonPrimary
          :disabled="contains8Characters === false || contains1Number === false || contains1SpecialCharacter === false || contains1Uppercase === false || contains1Lowercase === false"
          @click="() => {$emit('update:Password', {password});}"
          >
          Sign-in
        </ButtonPrimary>
      </div>
  </div>
</template>
<script setup>
const emit = defineEmits([ 'error', 'update:Password' ]);
import { useComponentError } from "../composable/error.js";
const { on_error, catcher } = useComponentError({ emit });

import { ref, computed } from 'vue';

import InputComponent from "../input/inputcomponent.vue";
import ButtonPrimary from "../button/buttonprimary.vue";

const password = ref("");
const contains8Characters = computed(() => catcher("contains8Characters", 
    () => password.value !== null && password.value.length >= 8, false));
const contains1Number = computed(() => catcher("contains1Number", 
    () => password.value !== null && /\d/.test(password.value)));
const contains1Uppercase = computed(() => catcher("contains1Uppercase", 
    () => password.value !== null && /[A-Z]/.test(password.value)));
const contains1Lowercase = computed(() => catcher("contains1LowUppercase", 
    () => password.value !== null && /[a-z]/.test(password.value)));
const contains1SpecialCharacter = computed(() => catcher("contains1SpecialCharacter", 
    () => password.value !== null && /[\^\$\*\.\[\]\{\}\(\)\?\-!@#%&,\>\<\'\:\;\|\_\~\`\+\=]/.test(password.value)));

</script>
