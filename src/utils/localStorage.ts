/* eslint-disable no-undef,no-console */
export const setItemInLocal = (key: string, value: any) => {
  if (!globalThis.window) {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const getItemFromLocal = <T>(key: string): T | null => {
  if (!globalThis.window) {
    return null;
  }
  try {
    const value = window.localStorage.getItem(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const removeItemFromLocal = (key: string) => {
  if (!globalThis.window) {
    return;
  }
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const clearAllLocal = () => {
  if (!globalThis.window) {
    return;
  }
  try {
    window.localStorage.clear();
  } catch (error) {
    console.error(error);
  }
};
