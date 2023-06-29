import React from "react";
import {
  Ionicons as Icon,
  MaterialCommunityIcons as MCicon,
  MaterialIcons as Micon,
} from "react-native-vector-icons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import tw from "../lib/tailwind";

export function TabItem({
  iconName,
  iconFamily,
  focused,
  size,
  tabBarActiveTintColor,
}) {
  return iconFamily === "MaterialCommunity" ? (
    <MCicon
      name={iconName}
      size={size}
      style={tw`${focused ? "text-[#f0139b]" : "text-[#860a80]"}`}
    />
  ) : iconFamily === "MaterialIcons" ? (
    <Micon
      name={iconName}
      size={size}
      style={tw` ${focused ? "text-pink-600" : "text-[#860a80]"}`}
    />
  ) : (
    <Icon
      name={iconName}
      size={size}
      style={tw` ${focused ? "text-pink-600" : "text-[#860a80]"}`}
    />
  );
}

export function ActionTabItem({ iconName, iconFamily, focused, size }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("posts/create")}
      activeOpacity={0.8}
      style={tw`absolute bottom-5 right-6 p-2 w-[60px] h-[60px] justify-center items-center 
        rounded-full bg-pink-600 shadow-md border-4 border-pink-300`}
    >
      <Icon name={iconName} size={32} color="#fff" />
    </TouchableOpacity>
  );
}
