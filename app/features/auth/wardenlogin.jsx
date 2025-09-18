import React, { useContext, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthWardenLogin } from "../../services/auth/auth";
import Loginbutton from "../../components/loginbutton";
import showtoast from "../../components/Toastmessage";
import checknetwork from "../../components/checknetwork";
import Loader from "../../components/loader";
import { Wardencontext } from "../../context/wardencontext";
const Wardenlogin = () => {
  const navigation = useNavigation();
  const { setWardenifo } = useContext(Wardencontext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const handleLogin = async () => {
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
    setloading(true);
    const result = await AuthWardenLogin(email, password);
    if (result.success) {
      setWardenifo(result.message);
      showtoast("success", "Sucessfully!", "Sucessfully Logged 🥳", "top");

      navigation.navigate("Dashboard");

      // ✅ warden dashboard
      console.log(result.message);
    } else {
      showtoast("error", "Invalid!", result.message, "top");
    }
    setEmail("");
    setPassword("");
    setloading(false);
  };
  return (
    <ScrollView className=" bg-white">
      <Loader visible={loading} text="Authenticating..." />
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

          <View className="flex flex-col items-center gap-11">
            <View className="flex-row items-center border-b-2 border-purple-500 w-72">
              <MaterialIcons
                name="email"
                size={24}
                color="#7e22ce"
                className="mr-2"
              />
              <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                className="flex-1 pl-2"
                value={email}
              />
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
                onChangeText={setPassword}
                value={password}
              />
            </View>

            <View className="mt-6">
              <Loginbutton title="LOGIN" onPress={handleLogin} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Wardenlogin;
