export type PersistedValue<T> = { value: T; set: (newValue: T) => { value: T } };

export function parseValue(value: string, type: string): string | boolean | number | object | null {
  switch (type) {
    case "string":
      return value;
    case "number":
      return !Number.isNaN(parseFloat(value)) ? parseFloat(value) : null;
    case "boolean":
      return value === "true";
    case "object":
      return JSON.parse(value);
    default:
      return null;
  }
}

function setLocalStorage(key: string, value: any) {
  let valueToSave = value.toString();

  if (typeof value === "object") {
    valueToSave = JSON.stringify(value);
  }

  localStorage.setItem(key, valueToSave);

  return { value };
}

function getFromLocalStorage(key: string, value: any) {
  const stored = localStorage.getItem(key);

  if (stored !== null) {
    const valueType = typeof value;
    const newValue = parseValue(stored, valueType);

    if (newValue !== null) {
      return { value: newValue };
    }

    return null;
  }
  return null;
}

export function useLocalStorage<K extends boolean | string | number | object>(key: string, value: K): PersistedValue<K> {
  const response = {
    set: (newValue: K) => setLocalStorage(key, newValue),
    value,
  };

  const found = getFromLocalStorage(key, value);

  if (found !== null) {
    response.value = found.value as K;
    return response;
  }

  const setObject = setLocalStorage(key, value);
  response.value = setObject.value;
  return response;
}
