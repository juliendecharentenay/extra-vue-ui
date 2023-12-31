import { ref } from "vue";

export function useTouchList() {
  const touches = ref([]);
  const touches_start = ref({});
  const onTouch = function(evt) {
    evt.preventDefault();
    switch (evt.type) {
      case "touchstart":
        touches.value.push(...evt.changedTouches);
        for (const touch of evt.changedTouches) { touches_start.value[touch.identifier] = touch; }
        break;
      case "touchmove":
        for (const touch of evt.changedTouches) {
          touches.value = touches.value.filter((t) => t.identifier !== touch.identifier);
        }
        touches.value.push(...evt.changedTouches);
        break;
      case "touchend":
      case "touchcancel":
        for (const touch of evt.changedTouches) {
          touches.value = touches.value.filter((t) => t.identifier !== touch.identifier);
          delete touches_start.value[touch.identifier];
        }
        break;
    }
  };
  return { touches, onTouch, touches_start };
}
