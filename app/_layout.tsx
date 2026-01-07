import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import "@/global.css";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,

        // 🔥 AQUÍ ESTÁ LA CLAVE
        headerTitle: "Bonjour SWIPE",

        headerStyle: {
          backgroundColor: "#000000",
        },
        headerTitleStyle: {
          color: "#FF00A1",
          fontSize: 18,
          fontWeight: "bold",
        },

        tabBarStyle: {
          backgroundColor: "#000000",
        },
        tabBarActiveTintColor: "#FF00A1",
        tabBarInactiveTintColor: "#75004A",
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title: "SWIPE",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="yesScreen"
        options={{
          title: "Likes",
          tabBarIcon: ({ color, size }) => (
            <Feather name="check" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="noScreen"
        options={{
          title: "No likes",
          tabBarIcon: ({ color, size }) => (
            <Feather name="x" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
