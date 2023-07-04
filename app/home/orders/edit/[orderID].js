import React, { useState } from "react";
import View from "../../../../components/View";
import Text from "../../../../components/Text";
import Icon from "../../../../components/Icon";
import { Pressable, ScrollView } from "react-native";
import tw from "../../../../lib/tailwind";
import { useAuth } from "../../../../lib/services/auth";
import { StatusBar } from "expo-status-bar";
import Input from "../../../../components/Input";
import { useLocalSearchParams, useRouter } from "expo-router";
import Button from "../../../../components/Button";
import { useFormik } from "formik";
import { CheckIcon, Radio, Select } from "native-base";
import { useCustomers } from "../../../../lib/services/customers";
import {
  useAddOrder,
  useOrder,
  useOrderUpdate,
} from "../../../../lib/services/orders";
import Loader from "../../../../components/Loader";
import { dressStyles } from "../../../../lib/utils";

export default function Edit() {
  const router = useRouter();
  const { orderID } = useLocalSearchParams();
  const { updateOrder } = useOrderUpdate(orderID);
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: order, isLoading, error } = useOrder(orderID);

  const form = useFormik({
    initialValues: {
      ...order,
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      setIsUpdating(true);
      updateOrder(values, {
        onSuccess: (res) => {
          // console.log(res.data);
          setIsUpdating(false);
          alert(res.data.message);
          router.push("/home/orders");
        },
        onError: (err) => {
          setIsUpdating(false);
          const errors = err.response?.data?.errors;
          // alert(JSON.stringify(errors));
          form.setErrors(errors);
        },
      });
    },
  });

  if (isLoading) {
    return (
      <View style={"flex-1 justify-center items-center"}>
        <Text>Loading...</Text>
      </View>
    );
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
    <View style={"flex-1 bg-white"}>
      <Loader isOpen={isUpdating} />
      <ScrollView style={"relative "}>
        <StatusBar style="light" backgroundColor="#790e4c" />
        <View style={"bg-white p-4"}>
          <View style={"flex flex-row justify-between items-center pb-4"}>
            <Text style={"text-base"}>Status:</Text>
            <View style={"w-5/6"}>
              <Select
                selectedValue={form.values.status}
                minWidth="200"
                accessibilityLabel="Update Status"
                placeholder={isLoading ? "Loading..." : "Update Status"}
                isDisabled={isLoading}
                _selectedItem={{
                  bg: "#ffceeb",
                  endIcon: <CheckIcon size="2" />,
                }}
                mt={1}
                style={tw`w-full`}
                onValueChange={(val) => form.setFieldValue("status", val)}
              >
                <Select.Item label={"Pending"} value={"pending"} />
                <Select.Item label={"Started"} value={"started"} />
                <Select.Item label={"Done"} value={"done"} />
              </Select>
            </View>
          </View>
          <View style={"flex flex-row justify-between items-center pb-4"}>
            <Text style={"text-base"}>Style:</Text>
            <View style={"w-5/6"}>
              <Select
                selectedValue={form.values.style}
                minWidth="200"
                accessibilityLabel="Choose Style"
                placeholder={"Choose Style"}
                _selectedItem={{
                  bg: "#ffceeb",
                  endIcon: <CheckIcon size="2" />,
                }}
                mt={1}
                style={tw`w-[28%]`}
                onValueChange={(val) => form.setFieldValue("style", val)}
              >
                {dressStyles.map((dress, i) => (
                  <Select.Item key={i} label={dress.name} value={dress.name} />
                ))}
              </Select>
            </View>
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

          <Input
            placeholder="Notes"
            onChangeText={form.handleChange("notes")}
            value={form.values.notes}
            multiline={true}
            numberOfLines={3}
          />

          <Button
            onPress={form.submitForm}
            rounded
            style="bg-[#790e4c] mt-8 border-2 rounded-md border-[#b30269]"
            innerStyle="px-5 p-2 text-[#ffceeb] text-xl font-semibold"
          >
            Update Order
          </Button>
        </View>
      </ScrollView>
    </View>
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
