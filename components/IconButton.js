import React from "react";
import { TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Icon, MCIcon, MIcon } from "./Icons";

export default function IconButton({
  name,
  iconFamily,
  color,
  onPress,
  style,
  iconStyle,
  size,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[tw`p-2`, style]}
      activeOpacity={0.7}
    >
      {iconFamily === "material" ? (
        <MIcon
          name={name}
          color={color ? color : "#ffffff"}
          style={iconStyle}
          size={size ? size : 20}
        />
      ) : iconFamily === "MaterialCommunity" ? (
        <MCIcon
          name={name}
          color={color ? color : "#ffffff"}
          style={iconStyle}
          size={size ? size : 20}
        />
      ) : (
        <Icon
          name={name}
          color={color ? color : "#ffffff"}
          style={iconStyle}
          size={size ? size : 20}
        />
      )}
    </TouchableOpacity>
  );
}
