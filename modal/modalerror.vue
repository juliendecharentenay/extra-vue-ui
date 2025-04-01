<template>
  <ModalBackground>
    <div class="rounded-lg bg-red-50 p-4 min-w-[50%] 2xl:min-w-[33%]">
      <div class="flex flex-col">
        <h3 class="text-sm font-medium text-red-800">Sorry...</h3>
        <div class="mt-2 text-sm text-red-700">
          An error occured:
          <ul role="list" class="list-disc space-y-1 pl-5">
            <li><slot name="message"></slot></li>
            <li><slot name="error"></slot></li>
          </ul>
          <div class="text-xs mt-2 max-h-48 overflow-y-auto" v-if="$slots.stack">
            Stack:
            <pre class="ml-2"><slot name="stack"></slot></pre>
          </div>
        </div>
        <div class="flex flex-row justify-end mt-3">
          <button type="button" class="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100"
            @click="$emit('dismiss')"
            >
            dismiss
          </button>
        </div>
      </div>
    </div>
  </ModalBackground>
</template>
<script>
import ModalBackground from "./modalbackground.vue";
export default {
  name: "ModalError",
  components: {
    ModalBackground,
  },
  emits: ['dismiss']
};
</script>
