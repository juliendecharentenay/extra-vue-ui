<template>
  <div class="fixed right-5 bottom-5 flex flex-row items-end justify-between">
    <div>{{ touches.length }}</div>
    <svg xmlns="http://www.w3.org/2000/svg"
         class="w-6/12 lg:w-3/12"
         viewBox="-120 -120 240 240"
         stroke-width="1"
         ref="svg"
         >
       <g v-for="touch in touches"
          :key="touch.identifier"
          :transform="rotation(touch)"
          >
         <line x1="0" y1="-100" x2="0" y2="-110" class="stroke-white opacity-50" />
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
               @touchcancel="lOnTouch" />
       <circle cx="0" cy="0" r="50" class="fill-none stroke-white opacity-25" />
       <circle cx="0" cy="0" r="50" class="fill-white opacity-0"
               @touchstart="() => {}"
               @touchmove="() => {}"
               @touchend="() => {}"
               @touchcancel="() => {}" />
    </svg>
  </div>
</template>
<script>
import { useTouchList } from "../composable/touchlist.js";
import { getAngleDegrees } from "../js/eventpositioning.js";

export default {
  name: "TouchScrollTool",
  setup: function() {
    const { touches, onTouch } = useTouchList();
    return { touches, onTouch };
  },
  emits: [ 'scroll' ],
  data: function() {
    return {};
  },
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
               .map(({touch, angle_end, angle_start}) => ({touch, delta: Math.floor(angle_end/this.delta) - Math.floor(angle_start/this.delta)}))
               .filter(({delta}) => delta !== 0);
        if (scrolls.length > 0) { 
          navigator.vibrate(100); 
          this.$emit('scroll', {touch: scrolls[0].touch, delta: scrolls[0].delta});
        }
      }
      this.onTouch(evt);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
