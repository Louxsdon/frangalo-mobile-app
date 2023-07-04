import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import View from "../../../components/View";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { HStack, Modal, Radio, ScrollView, StatusBar } from "native-base";
import Text from "../../../components/Text";
import Loader from "../../../components/Loader";
import {
  useAddCustomer,
  useCustomer,
  useCustomerUpdate,
  useDeleteCustomer,
} from "../../../lib/services/customers";
import { useFormik } from "formik";
import tw from "../../../lib/tailwind";
import { Alert } from "react-native";

export default function Update() {
  const router = useRouter();
  const { customer } = useLocalSearchParams();

  const { data, isLoading, error, isError } = useCustomer(customer);

  const [deleteRecord, setDeleteRecord] = useState(false);
  const { deleteCustomer } = useDeleteCustomer();

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
      <Modal isOpen={deleteRecord} onClose={() => setDeleteRecord(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Delete Customer</Modal.Header>
          <Modal.Body>
            <Text>Are you sure you want to delete this?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={"mr-5 px-4 py-2 rounded-md bg-blue-300 "}
              innerStyle={"text-blue-700"}
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setDeleteRecord(false);
              }}
            >
              Cancel
            </Button>
            <Button
              style={"bg-red-600 px-8 py-2 rounded-md"}
              innerStyle={"text-red-100"}
              onPress={() => {
                setDeleteRecord(false);
                deleteCustomer(customer, {
                  onSuccess: (res) => {
                    router.replace("/home/customers");
                    alert(res.data?.message);
                  },
                  onError: (err) => alert(JSON.stringify(err?.response?.data)),
                });
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <View style={"bg-white p-4"}>
        <DataView label={"NAME"} value={data.name} />
        <DataView label={"PHONE"} value={data.phone} />
        <DataView label={"GENDER"} value={data.gender} />

        <View style={"px-3"}>
          <View style={"flex flex-row justify-between"}>
            <Button
              onPress={() => router.push(`/home/customers/edit/${data.id}`)}
              rounded
              style="bg-blue-300 px-4 py-[2px] mt-8 rounded-md border-[#b30269] mr-4"
              innerStyle="px-5 p-2 text-blue-600 text-xl font-semibold"
            >
              Edit Customer
            </Button>
            <Button
              // onPress={() => Alert.prompt("Delete this item?")}
              onPress={() => setDeleteRecord(true)}
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
