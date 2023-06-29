import { View as RnView } from "react-native";
import React from "react";
import tw from "../lib/tailwind";

export default function View({ children, style, ...props }) {
  return (
    <RnView style={tw.style(style)} {...props}>
      {children}
    </RnView>
  );
}
