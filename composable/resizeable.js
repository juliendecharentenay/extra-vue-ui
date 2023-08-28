import { ref } from "vue";

function size(id) {
  const e = document.getElementById(id);
  if (e === null) {
    return {w: 100, h: 100};
  } else {
    return {w: e.clientWidth, h: e.clientHeight};
  }
}

export function useResizeable(id) {
  const { w, h } = size(id);
  const width = ref(w);
  const height = ref(h);

  const resize = () => {
    const { w, h } = size(id);
    width.value = w; height.value = h;
  };
  
  window.onresize = resize;

  return { width, height, resize };
}

