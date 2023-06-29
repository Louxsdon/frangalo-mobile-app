import { Text as RnText } from "react-native";
import React from "react";
import tw from "../lib/tailwind";

export default function Text({ children, style, ...props }) {
  return (
    <RnText style={tw.style(style)} {...props}>
      {children}
    </RnText>
  );
}
