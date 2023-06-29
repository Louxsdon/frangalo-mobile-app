import { TextInput } from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import Text from "./Text";
import View from "./View";

export default function Input({
  style,
  containerStyle,
  keyboardType,
  secureTextEntry,
  numberOfLines,
  label,
  ...props
}) {
  return (
    <View style={containerStyle}>
      {label && <Text style="text-slate-500 pb-1 text-base">{label}</Text>}
      <TextInput
        style={tw.style(
          "border border-slate-300 px-4 py-2.5 rounded-md",
          style
        )}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        numberOfLines={numberOfLines}
        {...props}
      />
    </View>
  );
}
