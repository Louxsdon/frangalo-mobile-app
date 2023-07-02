import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

export default function GalleryLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#6d0142" },
        headerTintColor: "#ffceeb",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Gallery" }} />
      <Stack.Screen name="create" options={{ title: "New Photos" }} />
    </Stack>
  );
}
