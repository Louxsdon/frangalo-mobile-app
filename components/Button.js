import { Pressable, Text } from "react-native";
import React from "react";
import tw from "../lib/tailwind";

export default function Button({
  children,
  style,
  innerStyle,
  onPress,
  ...props
}) {
  return (
    <Pressable
      style={tw.style("items-center justify-center", style)}
      onPress={onPress}
      {...props}
    >
      <Text style={tw.style(innerStyle)}>{children}</Text>
    </Pressable>
  );
}
