import { useLocalStorage } from "@/utils/localStorage";

export function usePersistedState(name: string, value: any) {
  const persistedValue = useLocalStorage(name, value);
  let v = $state(persistedValue.value);

  return {
    get current() {
      return v;
    },
    set current(newValue: any) {
      const { value } = persistedValue.set(newValue);
      v = value;
    },
  };
}
