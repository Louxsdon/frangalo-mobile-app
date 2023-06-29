import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

export default function CustomersLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#6d0142" },
        headerTintColor: "#ffceeb",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Customers List" }} />
      <Stack.Screen name="create" options={{ title: "Add Customer" }} />
    </Stack>
  );
}
