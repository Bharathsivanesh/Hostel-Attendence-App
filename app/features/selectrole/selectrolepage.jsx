import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Video } from "expo-av";

import { useNavigation } from "@react-navigation/native";
import { Asset } from "expo-asset";
const Selectrole = () => {
  const navigation = useNavigation();
  // const videoAsset = Asset.fromModule(
  //   require("../../assets/splash/admin.mp4")
  // );
  return (
    <View className="bg-white h-full">
      <View className="w-full flex flex-col gap-4">
        <View className="bg-purple-400 flex items-center justify-center w-full h-16 rounded-bl-full rounded-br-full">
          <Image
            source={require("../../assets/splash/splash1.png")}
            className="h-12 w-12"
            style={{ tintColor: "white" }}
          />
        </View>

        <View className="flex flex-col gap-3">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Adminlogin");
            }}
          >
            <Video
              source={require("../../assets/splash/admin.mp4")}
              resizeMode="contain"
              style={{ width: 320, height: 250 }}
              shouldPlay
              isLooping
            />
            <Text className="text-center font-black">ADMIN</Text>
          </TouchableOpacity>

          <View className="mt-12">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Wardenlogin");
              }}
            >
              <Video
                source={require("../../assets/splash/warden.mp4")}
                resizeMode="contain"
                style={{ width: 320, height: 250 }}
                shouldPlay
                isLooping
              />
              <Text className="text-center font-black">WARDEN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Selectrole;
