import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const useAuth = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      errors: null,

      // set auth token
      setAuthToken: (token) =>
        set(() => ({
          token: `Bearer ${token}`,
        })),

      // set auth user
      setAuthUser: (user) => set(() => ({ user })),

      setUserAvatar: (data) => set(() => ({ userAvatar: data })),

      // login user
      login: async (data) => {
        try {
          const res = await axios.post("/auth/login/", data, {
            headers: { Accept: "application/json" },
          });
          // console.log(res);
          axios.defaults.headers = {
            Authorization: "Bearer " + res.data.token,
          };
          console.log(res.data);
          // get().getUserProfile(res.data.token);
          set({ token: res.data.token, user: res.data.user });
          set({ errors: null });
          return;
        } catch (err) {
          console.log(err);
          if (err.response) {
            alert(err.response?.data?.message);
            return;
          }
          alert(err.message);
        }
      },

      // register user
      register: async (data) => {
        try {
          const res = await axios.post("/auth/register/", data, {
            headers: { Accept: "application/json" },
          });

          console.log(res?.data);
          set({ errors: null });
          alert(res.data?.message);
          return;
        } catch (err) {
          console.log(err);
          if (err.response) {
            // set({ errors: err.response.data.message });
            alert(err.response.data.message);
            return;
          }
          alert(err.message);
        }
      },
      // get user profile
      getUserProfile: async (token) => {
        try {
          const res = await axios.get("/users/me/");
          set(() => ({ token: token, user: res.data }));
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      },

      // logout user
      logout: async () => {
        try {
          const res = await axios.post("/auth/logout/", null, {
            headers: { Accept: "application/json" },
          });
          console.log(res.data);
          axios.defaults.headers = { Authorization: null };
          set((state) => ({ token: null, user: null }));
        } catch (error) {
          console.log(error.response);
        }
      },
    }),

    {
      name: "auth-user",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
