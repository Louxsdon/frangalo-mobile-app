import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import View from "../../../components/View";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { HStack, Radio, ScrollView, StatusBar } from "native-base";
import Text from "../../../components/Text";
import Loader from "../../../components/Loader";
import {
  useAddCustomer,
  useCustomer,
  useCustomerUpdate,
} from "../../../lib/services/customers";
import { useFormik } from "formik";
import tw from "../../../lib/tailwind";
import { Alert } from "react-native";

export default function Update() {
  const router = useRouter();

  const { customer } = useLocalSearchParams();

  const { data, isLoading, error, isError } = useCustomer(customer);

  if (isLoading) {
    return (
      <View style={"flex-1 justify-center items-center"}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <Text>
        Sorry an error occured: {error.message} -{" "}
        {error?.response?.data.message}
      </Text>
    );
  }

  return (
    <ScrollView style={tw`relative flex-1 bg-white`}>
      <View style={"bg-white p-4"}>
        <DataView label={"NAME"} value={data.name} />
        <DataView label={"PHONE"} value={data.phone} />
        <DataView label={"GENDER"} value={data.gender} />

        <View style={"px-3"}>
          <View style={"flex flex-row justify-between"}>
            <Button
              onPress={() => router.push(`/home/customers/edit/${data.id}`)}
              rounded
              style="bg-orange-600 px-4 py-[2px] mt-8 border- rounded-md border-[#b30269] mr-4"
              innerStyle="px-5 p-2 text-orange-200 text-xl font-semibold"
            >
              Edit Customer
            </Button>
            <Button
              onPress={() => Alert.prompt("Delete this item?")}
              rounded
              style="bg-red-700 px-4 py-[2px] mt-8  rounded-md border-red-200"
              innerStyle="px-8 p-2 text-red-200 text-xl font-semibold"
            >
              Delete
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function DataView({ label, placeholder, icon, onChangeText, value }) {
  return (
    <View style={"mb-4"}>
      {label && (
        <Text style="text-black pb-1 text-sm bg-slate-200 px-4 py-2">
          {label}
        </Text>
      )}
      <Text
        multiline={true}
        style={tw.style(
          " text-slate-500 text-base capitalize px-4 py-1.5 rounded-md"
        )}
      >
        {value}
      </Text>
    </View>
  );
}
