import {
  Ionicons,
  MaterialCommunityIcons as MCicon,
} from "react-native-vector-icons";
import tw from "../lib/tailwind";

export default function Icon({ name, iconFamily, focused, size, style }) {
  return iconFamily === "MaterialCommunity" ? (
    <MCicon name={name} size={size} style={tw.style(style)} />
  ) : (
    <Ionicons name={name} size={size} style={tw.style(style)} />
  );
}
