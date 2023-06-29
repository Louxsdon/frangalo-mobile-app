import React from "react";
import View from "../../../components/View";
import Text from "../../../components/Text";
import Icon from "../../../components/Icon";
import { Pressable, ScrollView } from "react-native";
import tw from "../../../lib/tailwind";
import { useAuth } from "../../../lib/services/auth";
import { StatusBar } from "expo-status-bar";
import Input from "../../../components/Input";
import { useRouter } from "expo-router";
import Button from "../../../components/Button";
import { useFormik } from "formik";
import { Radio } from "native-base";
import { useAddCustomer } from "../../../lib/services/customers";

export default function index() {
  const { addCustomer } = useAddCustomer();
  const router = useRouter();

  const form = useFormik({
    initialValues: {
      name: "",
      phone: "",
      gender: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      addCustomer(values, {
        onSuccess: (res) => {
          alert("Customer added successfully!");
          router.push("/home/customers");
        },
        onError: (err) => {
          const errors = err.response?.data?.errors;
          alert(JSON.stringify(errors));
          form.setErrors(errors);
        },
      });
    },
  });
  return (
    <View style={"relative flex-1 bg-white"}>
      <StatusBar style="light" backgroundColor="#790e4c" />
      <View style={"bg-white p-4"}>
        <Input
          onChangeText={form.handleChange("name")}
          icon="person"
          value={form.values.name}
          placeholder="Customer Name"
          style={"mb-4"}
        />
        <Input
          onChangeText={form.handleChange("phone")}
          icon="person"
          value={form.values.phone}
          placeholder="Customer Phone"
          style={"mb-4"}
        />
        <Radio.Group
          name="gender"
          accessibilityLabel="favorite number"
          value={form.values.gender}
          onChange={form.handleChange("gender")}
        >
          <Radio value="male" my={1}>
            Male
          </Radio>
          <Radio value="female" my={1}>
            Female
          </Radio>
        </Radio.Group>

        <Button
          onPress={form.submitForm}
          rounded
          style="bg-[#790e4c] mt-8 border-2 rounded-md border-[#b30269]"
          innerStyle="px-5 p-2 text-[#ffceeb] text-xl font-semibold"
        >
          Add Customer
        </Button>
      </View>
    </View>
  );
}
