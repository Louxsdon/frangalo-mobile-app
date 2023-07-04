import React, { useState } from "react";
import Button from "../../../components/Button";
import { Link, Stack, useRouter } from "expo-router";
import View from "../../../components/View";
import Text from "../../../components/Text";
import { useAuth } from "../../../lib/services/auth";
import { Pressable, TouchableOpacity } from "react-native";
import tw from "../../../lib/tailwind";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-reanimated-table";
import Icon from "../../../components/Icon";
import {
  useDeleteInventory,
  useInventories,
} from "../../../lib/services/inventories";
import { Modal } from "native-base";

export default function settings() {
  const { user } = useAuth((state) => state);
  const { logout } = useAuth((state) => state);
  const router = useRouter();
  const [deleteRecord, setDeleteRecord] = useState(false);

  const [inventory, setInventory] = useState(null);

  const { data = [], isLoading, isError, error } = useInventories();
  const { deleteInventory } = useDeleteInventory();

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

  const actions = (id, index) => (
    <View style={"flex-row"}>
      <Pressable
        onPress={() => router.push(`/home/inventories/edit/${id}`)}
        style={tw`px-2 py-2 rounded-md bg-blue-400 mr-1.5`}
      >
        <Icon name={"pencil"} size={14} style={"text-blue-100"} />
      </Pressable>
      <Pressable
        onPress={() => {
          setInventory(id);
          setDeleteRecord(true);
        }}
        style={tw`px-2 py-2 rounded-md bg-red-600`}
      >
        <Icon name={"trash"} size={14} style={"text-red-100"} />
      </Pressable>
    </View>
  );

  return (
    <>
      <Modal isOpen={deleteRecord} onClose={() => setDeleteRecord(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Delete Inventory</Modal.Header>
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
                deleteInventory(inventory, {
                  onSuccess: (res) => {
                    router.replace("/home/inventories");
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
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={tw`bg-primary-100 px-4 py-1.5 rounded-full`}
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

      {/* Invetory */}
      <View style={"p-5"}>
        <View style={"w-full"}>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row
              data={["Name", "Quantity", "Action"]}
              style={tw`bg-blue-100 p-2`}
              textStyle={styles.text}
            />
            <ScrollView style={styles.dataWrapper}>
              {data?.inventories?.map((inventory, index) => {
                return (
                  <TableWrapper key={index} style={tw`p-2 flex-row`}>
                    <Cell data={inventory.name} textStyle={styles.text} />
                    <Cell data={inventory.quantity} textStyle={styles.text} />
                    <Cell
                      data={actions(inventory.id, index)}
                      textStyle={styles.text}
                    />
                  </TableWrapper>
                );
              })}
            </ScrollView>
          </Table>
        </View>
      </View>
      <Pressable
        onPress={() => router.push("home/inventories/create")}
        style={tw`p-4 border bg-primary absolute right-5 justify-center items-center
        bottom-10 border-primary rounded-full mr-3 w-[60px] h-[60px]`}
      >
        <Icon name={"add"} size={24} style={"text-primary-100"} />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
});
