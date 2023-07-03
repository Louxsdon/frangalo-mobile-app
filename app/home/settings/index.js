import React from "react";
import Button from "../../../components/Button";
import { Link, Stack, useRouter } from "expo-router";
import View from "../../../components/View";
import Text from "../../../components/Text";
import { useAuth } from "../../../lib/services/auth";
import { TouchableOpacity } from "react-native";
import tw from "../../../lib/tailwind";

export default function settings() {
  const { user } = useAuth((state) => state);
  const { logout } = useAuth((state) => state);
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={tw`bg-primary-100 px-4 py-1.5 mr-4 rounded-full`}
              onPress={() => logout().then(() => router.replace("/"))}
            >
              <Text style="text-primary text-base font-bold">Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={"p-4"}>
        <View style={`items-center mb-4 justify-center `}>
          <Text style={`font-black text-6xl text-[#790e4c]`}>Frangalo </Text>
          <Text style={`font-black text-2xl text-[#790e4c]`}>
            Dress Making Shop
          </Text>
        </View>
      </View>
    </>
  );
}
