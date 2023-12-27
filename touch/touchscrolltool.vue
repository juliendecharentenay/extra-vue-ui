<template>
    <svg xmlns="http://www.w3.org/2000/svg"
         class="w-6/12"
         viewBox="-120 -120 240 240"
         stroke-width="1"
         ref="svg"
         >
       <g class="fill-none stroke-white"
          :class="{'opacity-25': touches.length > 0,
                   'opacity-75': touches.length === 0,
                  }">
         <g v-for="angle in [0, -90, -225]"
            :key="angle"
            :transform="`translate(0, -75) rotate(${angle}, 0, 75)`"
            >
           <g transform="translate(-3, 0)"><path stroke-linecap="round" stroke-linejoin="round" d="M0.0 7.5 l -7.5 -7.5 l 7.5-7.5" /></g>
           <g transform="scale(-1) translate(-3, 0)"><path stroke-linecap="round" stroke-linejoin="round" d="M0.0 7.5 l -7.5 -7.5 l 7.5-7.5" /></g>
         </g>
       </g>
       <g v-for="touch in touches"
          :key="touch.identifier"
          :transform="rotation(touch)"
          >
         <path class="fill-none stroke-white opacity-50"
              d="M -34,-84
                 L -34,-94
                 A 100,100 0,0,1 34,-94
                 L 34,-84
                 M   0,-70
                 L   0,-100
                "
              />
         <path class="fill-slate-200 opacity-25 blur-sm"
               d="M -34,-94
                  A 100,100 0,0,1 34,-94
                  L  21,-56
                  A  60,60  0,0,0 -21,-56
                  Z"
               />
       </g>
       <circle cx="0" cy="0" r="100" class="fill-none stroke-white opacity-25" />
       <circle cx="0" cy="0" r="100" class="fill-slate-100 opacity-0"
               @touchstart="lOnTouch"
               @touchmove="lOnTouch"
               @touchend="lOnTouch"
               @touchcancel="lOnTouch" 
               />
       <circle cx="0" cy="0" r="50" class="fill-none stroke-white opacity-25" />
       <circle cx="0" cy="0" r="50" class="fill-white opacity-0"
               @touchstart="() => {}"
               @touchmove="() => {}"
               @touchend="() => {}"
               @touchcancel="() => {}" />
       <JoyController 
               @press="(evt) => {$emit('press', evt);}"
               @release="(evt) => {$emit('release', evt);}"
               @click="(evt) => {$emit('click', evt);}"
               @error="({msg, e}) => {on_error(msg, e);}" 
               />
    </svg>
</template>
<script>
import { useTouchList } from "../composable/touchlist.js";
import { getAngleDegrees } from "../js/eventpositioning.js";

import { EventScroll } from "./events.js";

import JoyController from "./touchscrolltool/joycontroller.vue";

export default {
  name: "TouchScrollTool",
  setup: function() {
    const { touches, onTouch, touches_start } = useTouchList();
    return { touches, onTouch, touches_start };
  },
  emits: [ 'error', 'scroll', 'click', 'press', 'release' ],
  data: function() { return {}; },
  components: { JoyController, },
  props: {
    delta: {
      type: Number,
      default: 5.0,
    },
  },
  methods: {
    rotation: function(touch) {
      const angle = getAngleDegrees(touch);
      if (angle !== null) {
        return `rotate(${angle})`;
      } else {
        return 'rotate(0)';
      }
    },
    lOnTouch: function(evt) {
      try {
      if (evt.type === 'touchmove') {
        let changedTouches = []; for (const touch of evt.changedTouches) { changedTouches.push(touch); }
        let scrolls = changedTouches
               .map((touch) => ({touch, angle_end: getAngleDegrees(touch), angle_start: getAngleDegrees(this.touches.find((t) => t.identifier === touch.identifier))}))
               .map(({touch, angle_end, angle_start}) => {
                 // Handle the transition at -180/180.
                 if (angle_end * angle_start < (-45.0 * 45.0)) { angle_end += Math.sign(angle_start)*360.0; }
                 return {touch, angle_end, angle_start};
               })
               .map(({touch, angle_end, angle_start}) => ({touch, angle_end, angle_start, delta: Math.floor(angle_end/this.delta) - Math.floor(angle_start/this.delta)}))
               .filter(({delta}) => delta !== 0);
        if (scrolls.length > 0) { 
          this.$emit('scroll', new EventScroll(scrolls[0].touch, scrolls[0].delta, getAngleDegrees(this.touches_start[scrolls[0].touch.identifier])));
        }
      }
      this.onTouch(evt);
      } catch (e) {
        this.on_error("Error in lOnTouch", e);
      }
    },
    on_error: function(msg, e) {
      this.$emit("error", {msg, e});
    }
  },
};
</script>
