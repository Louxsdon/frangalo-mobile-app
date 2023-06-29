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
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useOrders } from "../../../lib/services/orders";
import dayjs from "dayjs";

export default function index() {
  const router = useRouter();
  const { data, errors, isLoading } = useOrders();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Orders" },
    { key: "second", title: "In Progress" },
    { key: "completed", title: "Completed" },
  ]);

  const Pending = () => (
    <View style={"p-4"}>
      <FlatList data={data.pending} renderItem={renderOrders} />
    </View>
  );

  const Progress = () => (
    <View style={"p-4"}>
      <FlatList data={data.progress} renderItem={renderOrders} />
    </View>
  );

  const Completed = () => (
    <View style={"p-4"}>
      <FlatList data={data.completed} renderItem={renderOrders} />
    </View>
  );

  const renderScene = SceneMap({
    first: Pending,
    second: Progress,
    completed: Completed,
  });

  if (isLoading) {
    return (
      <View style={"flex-1 justify-center items-center"}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (errors) {
    console.log(errors);
  }

  const renderOrders = ({ item }) => {
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
          <Text style={"text-lg font-semibold text-primary"}>
            Order#{item.id} - {item.customer.name}
          </Text>
          <Text>{dayjs(item.created_at).format("DD MMMM YYYY")}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={"relative flex-1 bg-white "}>
      <StatusBar style="light" backgroundColor="#790e4c" />

      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />

      <Pressable
        onPress={() => router.push("home/orders/create")}
        style={tw`p-4 border bg-primary absolute right-5 justify-center items-center
        bottom-10 border-primary rounded-full mr-3 w-[60px] h-[60px]`}
      >
        <Icon name={"add"} size={24} style={"text-primary-100"} />
      </Pressable>
    </View>
  );
}

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#ffceeb" }}
    style={{ backgroundColor: "#790e4c" }}
  />
);
