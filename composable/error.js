import { ref } from "vue";

const DEV = true;

export function useComponentError(context) {
  const on_error = ({msg, e}) => {
    if (DEV) { console.error(e); }
    context.emit('error', {msg, e});
  };
  const catcher = (key, f, d = null) => {
    try {
      return f();
    } catch (e) {
      on_error({msg: `Error in ${key}`, e});
    }
    return d;
  };
  return { on_error, catcher };
}

export function useError() {
  const error = ref(null);

  const on_error = ({msg, e}) => {
    if (DEV) { console.error(e); }
    if (error.value === null) { error.value = {msg, e}; }
  };
  const catcher = (key, f, d = null) => {
    try {
      return f();
    } catch (e) {
      on_error({msg: `Error in ${key}`, e});
    }
    return d;
  };
  return { error, on_error, catcher };
}
