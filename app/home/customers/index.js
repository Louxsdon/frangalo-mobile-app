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
import { useCustomers } from "../../../lib/services/customers";
import { FlatList } from "native-base";

export default function index() {
  const router = useRouter();
  const { data, errors, isLoading } = useCustomers();
  if (isLoading) {
    return (
      <View style={"flex-1 justify-center items-center"}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={"relative flex-1 bg-white "}>
      <StatusBar style="light" backgroundColor="#790e4c" />
      <View style={"bg-white p-4"}>
        <Input
          // onChangeText={form.handleChange("email")}
          icon="person"
          // value={form.values.email}
          type="search"
          placeholder="Search Customer"
        />
      </View>
      <View style={tw`bg-white px-4`}>
        <Text style={"text-lg mb-3 text-primary uppercase"}>Customers</Text>

        <FlatList
          data={data.customers}
          renderItem={({ item }) => (
            <View
              style={
                "bg-blue-100 px-4 py-2 rounded-md mb-4 flex flex-row items-center"
              }
            >
              <View
                style={
                  "p-2 border border-primary rounded-full mr-3 w-[40px] h-[40px] justify-center items-center"
                }
              >
                <Icon
                  name={"ios-person-outline"}
                  size={20}
                  style={"text-primary"}
                />
              </View>
              <View>
                <Text style={"text-lg font-semibold text-primary"}>
                  {item.name}
                </Text>
                <Text>{item.phone}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <Pressable
        onPress={() => router.push("home/customers/create")}
        style={tw`p-4 border bg-primary absolute right-5 justify-center items-center
        bottom-10 border-primary rounded-full mr-3 w-[60px] h-[60px]`}
      >
        <Icon name={"add"} size={24} style={"text-primary-100"} />
      </Pressable>
    </View>
  );
}

function DashCard({ route, icon, text }) {
  const { logout } = useAuth();
  return (
    <Pressable
      //   onPress={logout}
      style={tw`bg-primary mr-2 p-3 rounded flex justify-center items-center`}
    >
      <Icon name={icon} size={20} style={"text-primary-100"} />
      <Text style={"text-primary-100 text-center"}>{text}</Text>
    </Pressable>
  );
}
