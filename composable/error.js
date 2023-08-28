import { ref } from "vue";

export function useComponentError(dev, emit) {
  const on_error = ({msg, e}) => {
    console.error(e);
    // if (dev) { console.error(e); }
    // emit('error', {msg, e});
  };
  const catcher = (key, f) => {
    try {
      f();
    } catch (e) {
      on_error({msg: `Error in ${key}`, e});
    }
  };
  return { on_error, catcher };
}

export function useError(dev) {
  const error = ref(null);

  const on_error = ({msg, e}) => {
    if (dev) { console.error(e); }
    if (error.value === null) { error.value = {msg, e}; }
  };
  const catcher = (key, f) => {
    try {
      f();
    } catch (e) {
      on_error({msg: `Error in ${key}`, e});
    }
  };
  return { error, on_error, catcher };
}
