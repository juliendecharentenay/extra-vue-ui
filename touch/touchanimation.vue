<template>
  <div>
    <div v-for="touch in touches" :key="touch.identifier">
      <svg xmlns="http://www.w3.org/2000/svg"
           class="absolute z-10" 
           :style="{'top': `${touch.clientY.toFixed(0)-radius(touch)}px`, 'left': `${touch.clientX.toFixed(0)-radius(touch)}px`,
                    'width': `${2*radius(touch)}px`, 'height': `${2*radius(touch)}px`}"
           viewBox="-10 -10 20 20"
           stroke-width="1">
        <g :transform="`rotate(${touch.rotationAngle})`">
          <circle cx="0" cy="0" r="7" class="fill-slate-400 opacity-25" />
          <path class="fill-none stroke-white opacity-25" 
            d="M -4 -5 A 7 7 0 1 0 4 -5"
            />
          <polygon points="-1,1,0,-1,1,1" class="fill-slate-50 opacity-50" />
        </g>
      </svg>
    </div>
         
    <div
      @touchstart="onTouch"
      @touchmove="onTouch"
      @touchend="onTouch"
      @touchcancel="onTouch"
      >
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { useTouchList } from "@/extras/extra-vue-ui/composable/touchlist.js";

export default {
  name: "TouchAnimation",
  setup: function() {
    return useTouchList();
  },
  props: {
    default_radius: {
      type: Number,
      default: 10,
    },
  },
  data: function() { return {}; },
  emits: ['on_error'],
  methods: {
    radius: function(touch) {
      try {
        return Math.max(this.default_radius, 1.25*touch.radiusX, 1.25*touch.radiusY);
      } catch (e) {
        this.on_error("Error in radius", e);
      }
      return this.default_radius;
    },
    on_error: function(msg, e) {
      this.$emit('on_error', {msg, e});
    },
  }
};
  
</script>
