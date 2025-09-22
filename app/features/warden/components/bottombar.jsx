import React from "react";
import { Button, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Addedit from "../dashboard/screens/Addandedit/addedit";
import Showrooms from "../dashboard/screens/Takeattendence/showrooms";

const Tab = createBottomTabNavigator();

// Optional: Custom Tab Bar
function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => (
        <Button
          key={route.key}
          title={route.name}
          onPress={() => navigation.navigate(route.name)}
        />
      ))}
    </View>
  );
}

export default function MyTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Attendence" component={Addedit} />
      <Tab.Screen name="Showrooms" component={Showrooms} />
    </Tab.Navigator>
  );
}
