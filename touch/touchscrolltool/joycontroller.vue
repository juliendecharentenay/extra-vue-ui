<template>
  <g>
    <path class="stroke-slate-500 fill-slate-500 opacity-25"
          d="M -10,-10
             L -10,-40
             L  10,-40
             L  10,-10
             L  40,-10
             L  40, 10
             L  10, 10
             L  10, 40
             L -10, 40
             L -10, 10
             L -40, 10
             L -40,-10
             Z"
          @touchstart="lOnTouchStart"
          @touchmove="lOnTouchMove"
          @touchend="lOnTouchEnd"
          @touchcancel="lOnTouchEnd" 
          />
          <!-- @click="(evt) => {$emit('click', evt);}" -->
    <path class="fill-none stroke-slate-100 opacity-50"
          d="M -35,0 L -15,0
             M  35,0 L  15,0
             M 0,-35 L 0,-15
             M 0,35  L 0,15"
             />
  </g>
</template>
<script>
import { getAngleDegrees, getDistanceAsRatio } from "../../js/eventpositioning.js";

const CLICK_RATIO = 0.3;
function degree_to_direction(angle) {
      if ((-180 <= angle) && (angle < -157.5)) {
        return "S";
      } else if (angle < -112.5) {
        return "SW";
      } else if (angle < -67.5) {
        return "W";
      } else if (angle < -22.5) {
        return "NW";
      } else if (angle < 22.5) {
        return "N";
      } else if (angle < 67.5) {
        return "NE";
      } else if (angle < 112.5) {
        return "E";
      } else if (angle < 157.5) {
        return "SE";
      } else if (angle <= 180) {
        return "S";
      } else {
        throw new Error(`angle ${angle} is not supported`);
      }
}

export default {
  name: "JoyController",
  data: function() {
    return {
      touch: null,
      moved: false,
    };
  },
  emits: [ 'error', 'click', 'press', 'release' ],
  methods: {
    onTouch: function(touch) {
      this.touch = touch;
      if (! (this.moved === false && getDistanceAsRatio(this.touch) < CLICK_RATIO)) {
        const angle = getAngleDegrees(this.touch);
        this.$emit('press', {angle, direction: degree_to_direction(angle)});
      }
    },
    getChangedTouch: function(changedTouches) {
      if (this.touch === null) { return null; }
      for (const t of changedTouches) { if (t.identifier === this.touch.identifier) { return t; } }
      return null;
    },
    lOnTouchStart: function(evt) {
      try {
        if (this.touch === null) {
          this.moved = false;
          this.onTouch(evt.changedTouches[0]);
        }
      } catch (e) {
        this.on_error("Error in lOnTouchStart", e);
      }
    },
    lOnTouchMove: function(evt) {
      try {
        const touch = this.getChangedTouch(evt.changedTouches);
        if (touch !== null) { this.moved = true; this.onTouch(touch); }
      } catch (e) {
        this.on_error("Error in lOnTouchMove", e);
      }
    },
    lOnTouchEnd: function(evt) {
      try {
        const touch = this.getChangedTouch(evt.changedTouches);
        if (touch !== null) {
          if (this.moved === false && getDistanceAsRatio(this.touch) < CLICK_RATIO) {
            this.$emit('click');
          } else {
            this.$emit('release');
          }
          this.touch = null;
        }
      } catch (e) {
        this.on_error("Error in lOnTouchEnd", e);
      }
    },
    on_error: function(msg, e) {
      this.$emit('error', {msg, e});
    },
  },
};
</script>
