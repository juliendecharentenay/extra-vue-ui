import { ref } from "vue";

export function useSaveable() {
  const state = null;
  const save_state = ref(state);

  let save_f = null;
  const register_save_function = (f) => { save_f = f; };

  let short_timeout = null;
  let long_timeout = null;

  const on_save = () => {
    save_state.value = "Saving";
    console.log("Trigger save");
    if (short_timeout !== null) { clearTimeout(short_timeout); short_timeout = null; }
    if (long_timeout !== null) { clearTimeout(long_timeout); long_timeout = null; }
    if (save_f !== null) { 
      console.log("Call save");
      save_f(); 
      save_state.value = "saved";
      setTimeout(() => {if (save_state.value === "saved") { save_state.value = null; }}, 1500);
    }
  };

  const save = () => {
    save_state.value = "To be saved";
    if (short_timeout !== null) { clearTimeout(short_timeout); }
    short_timeout = setTimeout(on_save, 500);
    if (long_timeout === null) { long_timeout = setTimeout(on_save, 5000); }
  };

  return { register_save_function, save, save_state };
}
