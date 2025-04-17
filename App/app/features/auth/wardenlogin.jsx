import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";

const Wardenlogin = () => {
  return (
    <ScrollView className=" bg-white">
      <View className="flex-1 items-center mt-8 justify-start">
        <Video
          source={require("../../assets/auth/Login.mp4")}
          isLooping
          resizeMode="contain"
          shouldPlay
          style={{ width: "100%", height: 300 }}
        />

        {/* Login Section */}
        <View className="w-full mt-16 px-6">
          <Text className="font-black text-2xl text-purple-500 text-center mb-8">
            Let's Get Started
          </Text>

          <View className="flex flex-col items-center gap-8">
            <View className="flex-row items-center border-b-2 border-purple-500 w-72">
              <MaterialIcons
                name="email"
                size={24}
                color="#7e22ce"
                className="mr-2"
              />
              <TextInput placeholder="Email" className="flex-1 pl-2" />
            </View>

            <View className="flex-row items-center border-b-2 border-purple-500 w-72">
              <MaterialIcons
                name="lock"
                size={24}
                color="#7e22ce"
                className="mr-2"
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                className="flex-1 pl-2"
              />
            </View>

            <TouchableOpacity className="bg-purple-500 w-36 h-12 rounded-lg justify-center items-center">
              <Text className="text-white font-black text-xl">LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Wardenlogin;
