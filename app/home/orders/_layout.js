import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

export default function OrdersLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#6d0142" },
        headerTintColor: "#ffceeb",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Order Management" }} />
      <Stack.Screen name="create" options={{ title: "New Order" }} />
      <Stack.Screen name="[order]" options={{ title: "Order Details" }} />
      <Stack.Screen name="edit/[orderID]" options={{ title: "Update Order" }} />
      {/* <Stack.Screen name="customers/create" /> */}
    </Stack>
  );
}
