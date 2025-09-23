import React from "react";
import { View } from "react-native";
import BottomBar from "../features/warden/components/bottombar";

const Layout = ({ children }) => {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">{children}</View>

      <BottomBar />
    </View>
  );
};

export default Layout;
