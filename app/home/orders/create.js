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
import { CheckIcon, Radio, Select } from "native-base";
import { useCustomers } from "../../../lib/services/customers";
import { useAddOrder } from "../../../lib/services/orders";

export default function index() {
  const router = useRouter();
  const { addOrder } = useAddOrder();
  const { data, isLoading } = useCustomers();

  const form = useFormik({
    initialValues: {
      shirt_length: "",
      around_arm: "",
      waist: "",
      neck: "",
      trouser_length: "",
      shoulder_to_chest: "",
      hip: "",
      shoulder_to_hip: "",
      breast_length: "",
      shoulder_to_waist: "",
      ankle: "",
      dress_length: "",
      notes: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      addOrder(values, {
        onSuccess: (res) => {
          alert("Order added successfully!");
          router.push("/home/orders");
        },
        onError: (err) => {
          const errors = err.response?.data?.errors;
          // alert(JSON.stringify(errors));
          form.setErrors(errors);
        },
      });
    },
  });

  if (!isLoading) {
    console.log(JSON.stringify(data.customers));
  }

  (function displayError() {
    if (form.errors) {
      for (const error in form.errors) {
        alert(form.errors[error][0]);
        form.setErrors(null);
        return;
      }
    }
  })();

  return (
    <ScrollView style={"relative flex-1 bg-white"}>
      <StatusBar style="light" backgroundColor="#790e4c" />
      <View style={"bg-white p-4"}>
        <View style={"flex flex-row items-center pb-4"}>
          <View style={"w-5/6"}>
            <Select
              selectedValue={form.values.customer}
              minWidth="200"
              accessibilityLabel="Select Customer"
              placeholder={isLoading ? "Loading..." : "Select Customer"}
              isDisabled={isLoading}
              _selectedItem={{
                bg: "#ffceeb",
                endIcon: <CheckIcon size="2" />,
              }}
              mt={1}
              mr={4}
              style={tw`w-full`}
              onValueChange={(val) => form.setFieldValue("customer_id", val)}
            >
              {data?.customers.map((customer, i) => (
                <Select.Item
                  key={i}
                  label={customer?.name + " - " + customer?.phone}
                  value={customer?.id}
                />
              ))}
            </Select>
          </View>
          <Button
            onPress={() => router.push("home/customers/create")}
            style={"bg-green-600 p-3 rounded-full"}
          >
            <Icon name={"add"} style={"text-green-100"} size={28} />
          </Button>
        </View>
        <Wrapper>
          <OrderInput
            onChangeText={form.handleChange("shirt_length")}
            value={form.values.shirt_length}
            placeholder="Shirt Length"
            label="Shirt Length"
            style={"mr-3"}
          />
          <OrderInput
            onChangeText={form.handleChange("around_arm")}
            value={form.values.around_arm}
            placeholder="Around Arm"
            label="Around Arm"
            style={"mr-3"}
          />
        </Wrapper>
        <Wrapper>
          <OrderInput
            onChangeText={form.handleChange("waist")}
            value={form.values.waist}
            placeholder="Waist"
            label="Waist"
            style={"mr-3"}
          />
          <OrderInput
            onChangeText={form.handleChange("neck")}
            value={form.values.neck}
            placeholder="Neck"
            label="Neck"
            style={"mr-3"}
          />
        </Wrapper>
        <Wrapper>
          <OrderInput
            onChangeText={form.handleChange("trouser_length")}
            value={form.values.trouser_length}
            placeholder="Trouser length"
            label="Trouser length"
            style={"mr-3"}
          />
          <OrderInput
            onChangeText={form.handleChange("shoulder_to_chest")}
            value={form.values.shoulder_to_chest}
            placeholder="Shoulder to nest"
            label="Shoulder to nest"
            style={"mr-3"}
          />
        </Wrapper>
        <Wrapper>
          <OrderInput
            onChangeText={form.handleChange("hip")}
            value={form.values.hip}
            placeholder="Hip"
            label="Hip"
            style={"mr-3"}
          />
          <OrderInput
            onChangeText={form.handleChange("shoulder_to_hip")}
            value={form.values.shoulder_to_hip}
            placeholder="Shoulder to hip"
            label="Shoulder to hip"
            style={"mr-3"}
          />
        </Wrapper>
        <Wrapper>
          <OrderInput
            onChangeText={form.handleChange("breast_length")}
            value={form.values.breast_length}
            placeholder="Breast length"
            label="Breast length"
            style={"mr-3"}
          />
          <OrderInput
            onChangeText={form.handleChange("shoulder_to_waist")}
            value={form.values.shoulder_to_waist}
            placeholder="Shoulder to waist"
            label="Shoulder to waist"
            style={"mr-3"}
          />
        </Wrapper>
        <Wrapper>
          <OrderInput
            onChangeText={form.handleChange("ankle")}
            value={form.values.ankle}
            placeholder="Ankle"
            label="Ankle"
            style={"mr-3"}
          />
          <OrderInput
            onChangeText={form.handleChange("dress_length")}
            value={form.values.dress_length}
            placeholder="Dress length"
            label="Dress length"
            style={"mr-3"}
          />
        </Wrapper>

        <Input placeholder="Notes" multiline={true} numberOfLines={3} />

        <Button
          onPress={form.submitForm}
          rounded
          style="bg-[#790e4c] mt-8 border-2 rounded-md border-[#b30269]"
          innerStyle="px-5 p-2 text-[#ffceeb] text-xl font-semibold"
        >
          Add Order
        </Button>
      </View>
    </ScrollView>
  );
}

function OrderInput({ label, placeholder, icon, onChangeText, value }) {
  return (
    <Input
      onChangeText={onChangeText}
      icon={icon}
      value={value}
      placeholder={placeholder}
      // label={label}
      containerStyle={" w-[48%]"}
    />
  );
}
function Wrapper({ style, children }) {
  return (
    <View style={"flex flex-row items-center justify-between mb-1"}>
      {children}
    </View>
  );
}
