import React, { useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Loginbutton from "../../components/loginbutton";
import { AuthLogin } from "../../services/auth/auth";
import showtoast from "../../components/Toastmessage";
import checknetwork from "../../components/checknetwork";
import Loader from "../../components/loader";

const Adminlogin = () => {
  const navigation = useNavigation();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const handlelogin = async () => {
    setloading(true);
    const isConnected = await checknetwork();
    if (!isConnected) {
      showtoast(
        "error",
        "No Internet Connection",
        "Check your network!",
        "Top"
      );
      setloading(false);
      return;
    }
    const response = await AuthLogin(email, password);
    if (response.success) {
      showtoast("success", "Login Successfully!", "Welcome chief😎", "top");
      navigation.navigate("Admindashboard");
    } else {
      showtoast("error", "Login Failed", "Invalid email or password🤧", "top");
    }
    setloading(false);
    setemail("");
    setpassword("");
  };

  return (
    <ScrollView className=" bg-white">
      <Loader visible={loading} text="Logging in..." />
      <View className="flex-1 items-center mt-8 justify-start">
        <Image
          source={require("../../assets/auth/adminlogin.png")}
          resizeMode="contain"
          style={{ width: "100%", height: 300 }}
        />

        {/* Login Section */}
        <View className="w-80 h-80 mt-8 rounded-3xl shadow-lg bg-white elevation-5">
          <Text className="font-extrabold text-2xl text-[#1b5e20] text-center mb-5 mt-3">
            🔐 Welcome Admin 👨‍💼
          </Text>
          <Text className="text-gray-500 text-center mb-6">
            Login to continue
          </Text>
          <View className="flex flex-col items-center gap-8">
            <View className="flex-row items-center border-b-2 border-[#1b5e20] w-72">
              <MaterialIcons
                name="email"
                size={24}
                color="#fbc02d"
                className="mr-2"
              />
              <TextInput
                placeholder="Email"
                className="flex-1 pl-2 text-[#1b5e20]"
                placeholderTextColor="#9ca3af"
                onChangeText={setemail}
                value={email}
              />
            </View>

            <View className="flex-row items-center border-b-2 border-[#1b5e20] w-72">
              <MaterialIcons
                name="lock"
                size={24}
                color="#fbc02d"
                className="mr-2"
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                className="flex-1 pl-2 text-[#1b5e20]"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setpassword}
              />
            </View>
            <View className="mt-6">
              <Loginbutton title="LOGIN" onPress={handlelogin} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Adminlogin;
