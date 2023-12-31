import { StatusBar } from "expo-status-bar";
import { TabItem } from "../../components/MainTabNav";

import { Tabs, useRouter } from "expo-router";
import { useAuth } from "../../lib/services/auth";
import { useEffect } from "react";

export default function BottomNav() {
  const { token, user } = useAuth((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (!token || !user) {
      router.replace("/");
    }
  }, [token, user]);

  return (
    <>
      <StatusBar style="light" backgroundColor="#790e4c" />
      <Tabs
        screenOptions={{
          // tabBarShowLabel: false,
          headerStyle: { backgroundColor: "#6d0142" },
          headerTintColor: "#ffceeb",
          tabBarActiveTintColor: "#f0139b",
        }}
      >
        {/* home screen */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarLabel: "Home",
            tabBarIcon: (props) => (
              <TabItem iconName="md-home-outline" {...props} />
            ),
          }}
        />
        {/* chats placeholder tab */}
        <Tabs.Screen
          name="orders"
          options={{
            tabBarLabel: "Orders",
            tabBarIcon: (props) => (
              <TabItem iconName="pricetags-outline" {...props} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="gallery"
          options={{
            title: "Gallery",
            headerShown: false,
            tabBarIcon: (props) => (
              <TabItem
                iconFamily={"MaterialIcons"}
                iconName="perm-media"
                {...props}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="customers"
          options={{
            headerShown: false,
            title: "Customers",
            tabBarIcon: (props) => (
              <TabItem iconName="ios-people-outline" {...props} />
            ),
          }}
        />
        <Tabs.Screen
          name="inventories"
          options={{
            title: "Inventory",
            headerShown: false,
            tabBarIcon: (props) => (
              <TabItem iconName="settings-outline" {...props} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
