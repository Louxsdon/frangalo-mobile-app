import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { StatusBar } from "expo-status-bar";
import Input from "../components/Input";
import { Link, Redirect, useRouter } from "expo-router";
import axios from "axios";
import View from "../components/View";
import Text from "../components/Text";
import { Image, ImageBackground, ScrollView } from "react-native";
import tw from "../lib/tailwind";
import { useFormik } from "formik";
import { API_URL } from "../lib/config";
import { useAuth } from "../lib/services/auth";

axios.defaults.baseURL = API_URL;

export default function Register() {
  const { register, errors } = useAuth((state) => state);

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      register(values);
    },
  });

  useEffect(() => {
    if (errors) {
      alert(errors);
    }
  }, [errors]);

  return (
    <ScrollView style={tw`bg-violet-50`}>
      {/* forms */}
      <View style={` `}>
        <View style={`h-[220px]  bg-[#790e4c]`}>
          <Image
            style={tw`h-[100%] w-full  bg-[#ffefba] pr-3`}
            source={require("../assets/tailor_06.png")}
            resizeMode="cover"
          />
        </View>
        <View style={"p-12 pt-8"}>
          <View style={`items-center mb-4 justify-center `}>
            <Text style={`font-black text-6xl text-[#790e4c]`}>Frangalo </Text>
            <Text style={`font-black text-2xl text-[#790e4c]`}>
              Dress Making
            </Text>
            <Text style={``}>Account Registration</Text>
          </View>
          <Input
            onChangeText={form.handleChange("name")}
            value={form.values.name}
            placeholder="Name"
          />
          <Input
            keyboardType="email-address"
            onChangeText={form.handleChange("email")}
            icon="person"
            value={form.values.email}
            placeholder="Email address"
            style={"mt-2"}
          />
          <Input
            onChangeText={form.handleChange("password")}
            icon="lock"
            value={form.values.password}
            secureTextEntry={true}
            placeholder="Password"
            style={"mt-2"}
          />
          <Input
            onChangeText={form.handleChange("password_confirmation")}
            icon="lock"
            value={form.values.password_confirmation}
            secureTextEntry={true}
            placeholder="Confirm Password"
            style={"my-2"}
          />

          <Button
            onPress={form.submitForm}
            rounded
            style="bg-[#790e4c] mt-1 border-2 rounded-md border-[#b30269]"
            innerStyle="px-5 p-2 text-[#ffceeb] text-xl font-semibold"
          >
            Register
          </Button>

          {/* dont have account */}
          <View style={`flex-row justify-center mt-8`}>
            <Text style={`text-slate-400`}>
              <Link href={"/"}>Already have account? Login</Link>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
