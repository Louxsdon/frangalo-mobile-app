import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDeleteOrder, useOrder } from "../../../lib/services/orders";
import View from "../../../components/View";
import Input from "../../../components/Input";
import { Alert, FlatList, ScrollView, useWindowDimensions } from "react-native";
import tw from "../../../lib/tailwind";
import Button from "../../../components/Button";
import { HStack, Modal, StatusBar } from "native-base";
import { orderFields } from "../../../lib/utils";
import { SimpleGrid } from "react-native-super-grid";
import Text from "../../../components/Text";
import dayjs from "dayjs";
import Loader from "../../../components/Loader";

export default function Order() {
  const router = useRouter();
  const { deleteOrder } = useDeleteOrder();
  const { order } = useLocalSearchParams();
  const { data, isLoading, error } = useOrder(order);
  const [deleteRecord, setDeleteRecord] = useState(false);
  if (isLoading) {
    return (
      <View style={"flex-1 justify-center items-center"}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const excludedFields = ["customer_id", "notes", "customer", "id"];
  const measurements = Object.entries(data).filter(
    ([measurement]) => !excludedFields.includes(measurement)
  );

  return (
    <View style={"bg-white flex-1"}>
      <Modal isOpen={deleteRecord} onClose={() => setDeleteRecord(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Delete Order</Modal.Header>
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
                deleteOrder(order, {
                  onSuccess: (res) => {
                    router.replace("/home/orders");
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
      <ScrollView style={tw`p-4`}>
        <StatusBar style="light" backgroundColor="#790e4c" />
        <View style={"bg-white"}>
          <Text style={"px-3 text-xl text-slate-600"}>Measurements</Text>

          {
            <SimpleGrid
              itemDimension={100}
              data={measurements}
              //   adjustGridToStyles={true}
              //   itemContainerStyle={{ width: "50%" }}
              renderItem={({ item }) => {
                let [field, value] = item;
                if (field === "created_at" || field === "updated_at") {
                  value = dayjs(value).format("DD-MM-YYYY");
                }
                return (
                  <OrderInput
                    value={value}
                    placeholder={field}
                    label={field.split("_").join(" ").toUpperCase()}
                    style={"w-full"}
                  />
                );
              }}
            />
          }

          <View style={"px-3"}>
            <OrderInput label={"NOTES"} value={data.notes} />
            <View style={"flex flex-row justify-between"}>
              <Button
                onPress={() => router.push(`/home/orders/edit/${data.id}`)}
                rounded
                style="bg-orange-600 px-4 py-[2px] mt-8 border- rounded-md border-[#b30269] mr-4"
                innerStyle="px-5 p-2 text-orange-200 text-xl font-semibold"
              >
                Edit Order
              </Button>
              <Button
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
        <View style={"mb-20"} />
      </ScrollView>
    </View>
  );
}

function OrderInput({ label, placeholder, icon, onChangeText, value }) {
  return (
    <View>
      {label && <Text style="text-slate-500 pb-1 text-xs">{label}</Text>}
      <Text
        multiline={true}
        style={tw.style("border border-slate-300 px-4 py-2.5 rounded-md")}
      >
        {value}
      </Text>
    </View>
  );
}
