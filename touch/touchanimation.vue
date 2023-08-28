<template>
  <div>
    <div v-for="touch in touches" :key="touch.identifier">
      <svg xmlns="http;//www.w3.org/2000/svg"
           class="absolute w-10 h-10 -ml-5 -mt-5"
           :style="{'top': `${touch.clientY.toFixed(0)}px`, 'left': `${touch.clientX.toFixed(0)}px`}"
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
export default {
  name: "TouchAnimation",
  data: function() {
    return {
      touches: [],
      interval: null,
    };
  },
  emits: ['on_error'],
  beforeUnmount: function() {
    try {
      this.clearInterval();
    } catch (e) {
      this.on_error("Error in TouchAnimation::beforeUnmout", e);
    }
  },
  methods: {
    clearInterval: function() {
      try {
        if (this.interval !== null) {
          clearInterval(this.interval);
          this.interval = null;
        }
      } catch (e) {
        this.on_error("Error in TouchAnimation::clearInterval", e);
      }
    },
    onTouch: function(evt) {
      try {
        evt.preventDefault();
        switch (evt.type) {
          case "touchstart":
          console.log(evt.changedTouches[0]);
            this.touches.push(...evt.changedTouches);
            break;
          case "touchmove":
            for (const touch of evt.changedTouches) {
              this.touches = this.touches.filter((t) => t.identifier !== touch.identifier);
            }
            this.touches.push(...evt.changedTouches);
            break;
          case "touchend":
          case "touchcancel":
            for (const touch of evt.changedTouches) {
              this.touches = this.touches.filter((t) => t.identifier !== touch.identifier);
            }
            break;
        }
      } catch (e) {
        this.on_error("Error in TouchAnimation::onTouch", e);
      }
    },
    on_error: function(msg, e) {
      this.$emit('on_error', {msg, e});
    },
  }
};
  
</script>
