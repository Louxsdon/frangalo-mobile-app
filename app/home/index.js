import React from "react";
import View from "../../components/View";
import Text from "../../components/Text";
import Icon from "../../components/Icon";
import { FlatList, Pressable, ScrollView } from "react-native";
import tw from "../../lib/tailwind";
import { useAuth } from "../../lib/services/auth";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useOrders } from "../../lib/services/orders";
import dayjs from "dayjs";
export default function index() {
  const { user } = useAuth((state) => state);
  const router = useRouter();
  const { data, isLoading, error } = useOrders();

  const RenderOrders = ({ item }) => {
    return (
      <Pressable
        onPress={() => router.push(`/home/orders/${item.id}`)}
        style={tw`bg-purple-100 border border-purple-400 px-4 py-2 rounded-md mb-4 flex flex-row items-center`}
      >
        <View
          style={
            "p-2 border border-primary rounded-full mr-3 w-[40px] h-[40px] justify-center items-center"
          }
        >
          <Icon name={"md-cart-outline"} size={24} style={"text-primary"} />
        </View>
        <View>
          <Text style={"text-base font-semibold text-primary"}>
            Order#{item.id} - {item.customer.name}
          </Text>
          <Text>{dayjs(item.created_at).format("DD MMMM YYYY")}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={"flex-1 bg-white"}>
      <View style={"bg-primary flex-1"}>
        <Text style={"text-primary-100 p-5 pb-16"}>
          Good afternoon, {user?.name}
        </Text>
        <View style={"bg-white h-full flex-1 rounded-t-3xl p-5"}>
          <Text style={"text-2xl mb-3 text-primary"}>Explore</Text>
          <View style={"flex flex-row mb-5"}>
            <DashCard
              route={"/home/orders/create"}
              text="New Order"
              icon="ios-add-circle-outline"
            />
            <DashCard
              route={"/home/customers/create"}
              text="Add Customer"
              icon="ios-person-add-outline"
            />
            <DashCard
              route={"/home/orders"}
              text="View Orders"
              icon="ios-cube-outline"
            />
          </View>
          <Text style={"text-xl mb-3 text-primary"}>Ongoing Orders</Text>
          <FlatList data={data?.progress} renderItem={RenderOrders} />
        </View>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

function DashCard({ route, icon, text }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(route)}
      style={tw`bg-primary mr-2 p-3 rounded flex justify-center items-center`}
    >
      <Icon name={icon} size={20} style={"text-primary-100"} />
      <Text style={"text-primary-100 text-center"}>{text}</Text>
    </Pressable>
  );
}
