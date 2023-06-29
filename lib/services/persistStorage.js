import * as SecureStore from "expo-secure-store";

// Custom storage object
export const secureStorage = {
  getItem: async (name) => {
    console.log(name, "has been retrieved");
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name, value) => {
    console.log(name, "with value", value, "has been saved");
    return await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name) => {
    console.log(name, "has been deleted");
    await SecureStore.deleteItemAsync(name);
  },
};
