import { useLocalStorage } from "@/utils/localStorage";
import { createThemeFromJSON } from "@/utils/";
import type { Theme } from "@/types";

export function usePersistedThemes(name: string, value: any) {
  const persistedValue = useLocalStorage(name, value);
  let v = $state(createThemeFromJSON(persistedValue.value));

  return {
    get current() {
      return v;
    },
    set current(newValue: any) {
      const { value } = persistedValue.set(newValue);
      v = createThemeFromJSON(value);
    },
  };
}
