<template>
  <nav class="border-b border-gray-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-12 justify-between">
        <div class="flex">
          <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            <slot name="menu"></slot>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <slot name="sign"></slot>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button type="button" class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open or close main menu</span>
            <Bars3Icon class="h-6 w-6" :class="{'block': !mobile_menu_open, 'hidden': mobile_menu_open}"  @click="mobile_menu_open = true;" />
            <XMarkIcon class="h-6 w-6" :class="{'block': mobile_menu_open,  'hidden': !mobile_menu_open}" @click="mobile_menu_open = false;" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu" v-show="mobile_menu_open">
      <div class="flex flex-col space-y-1 pb-2 pt-2">
        <slot name="menu_mobile"></slot>
      </div>
      <div class="border-t border-gray-200 
                  flex flex-col space-y-1 pb-2 pt-2">
        <slot name="sign_mobile"></slot>
      </div>
    </div>
  </nav>
</template>
<script>
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

export default {
  name: "NavbarComponent",
  components: {
    Bars3Icon, XMarkIcon,
  },
  data: function() {
    return {
      mobile_menu_open: false,
    };
  },
};
</script>
