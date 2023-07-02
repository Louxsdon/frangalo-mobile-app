import "react-native-gesture-handler";
import React, { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../lib/config";
import { Slot, Stack, useRouter } from "expo-router";
import { useAuth } from "../lib/services/auth";
import { NativeBaseProvider } from "native-base";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAppState } from "../lib/hooks/useAppStatus";

axios.defaults.baseURL = API_URL;

const queryClient = new QueryClient();

export default function AppLayout() {
  useAppState();
  const { token, user } = useAuth((state) => state);
  const router = useRouter();

  if (token) {
    axios.defaults.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
  }

  useEffect(() => {
    if (token && user) {
      router.replace("/home/gallery");
    }
  }, [token, user]);

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <Stack initialRouteName="home">
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen
            name="index"
            options={{ title: "Login", headerShown: false }}
          />
          <Stack.Screen
            name="register"
            options={{ title: "Account Registration" }}
          />
        </Stack>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
