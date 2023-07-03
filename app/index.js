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
import Loader from "../components/Loader";

axios.defaults.baseURL = API_URL;

export default function Login() {
  const { login, errors } = useAuth((state) => state);
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setIsLoggingIn(true);
      // alert(JSON.stringify(values));
      login(values)
        .then((res) => {
          setIsLoggingIn(false);
          alert(res.data.message);
        })
        .catch((error) => {
          setIsLoggingIn(false);
          console.log(error);
        });
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
      <Loader text="Logging In..." isOpen={isLoggingIn} />
      <View style={` `}>
        <View style={`h-[300px]  bg-[#790e4c]`}>
          <Image
            style={tw`h-[100%] w-full  bg-[#ffefba] pr-3`}
            source={require("../assets/tailor_06.png")}
            resizeMode="cover"
          />
        </View>
        <View style={"p-12"}>
          <View style={`items-center mb-4 justify-center `}>
            <Text style={`font-black text-6xl text-[#790e4c]`}>Frangalo </Text>
            <Text style={`font-black text-2xl text-[#790e4c]`}>
              Dress Making
            </Text>
            <Text style={``}>Sign In to your account</Text>
          </View>
          <Input
            keyboardType="email-address"
            onChangeText={form.handleChange("email")}
            icon="person"
            value={form.values.email}
            placeholder="Email address"
          />
          <Input
            onChangeText={form.handleChange("password")}
            icon="lock"
            value={form.values.password}
            secureTextEntry={true}
            placeholder="Password"
            style={"my-2"}
          />

          <Button
            onPress={form.submitForm}
            rounded
            style="bg-[#790e4c] mt-1 border-2 rounded-md border-[#b30269]"
            innerStyle="px-5 p-2 text-[#ffceeb] text-xl font-semibold"
          >
            Login
          </Button>

          {/* dont have account */}
          <View style={`flex-row justify-center mt-8`}>
            <Text style={`text-slate-400`}>
              <Link href={"/register"}>Don't have account? Register</Link>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
