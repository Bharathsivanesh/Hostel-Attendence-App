import React, { useContext, useState } from "react";
import {
  Image,
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

      console.log(result.message);
    } else {
      showtoast("error", "Invalid!", result.message, "top");
    }
    setEmail("");
    setPassword("");
    setloading(false);
  };

  return (
    <ScrollView className="bg-white">
      <Loader visible={loading} text="Authenticating..." />
      <View className="flex-1 items-center mt-8 justify-start">
        <Image
          source={require("../../assets/auth/wardenlogin1.png")}
          resizeMode="contain"
          style={{ width: "200%", height: 300 }}
        />

        <View className="w-full mt-12 px-6">
          <Text className="font-black text-2xl text-[#1b5e20] text-center mb-8">
            👮‍♂️ Warden Access 🔑
          </Text>

          <View className="flex flex-col items-center gap-11">
            <View className="flex-row items-center border-b-2 border-[#1b5e20] w-72">
              <MaterialIcons
                name="email"
                size={24}
                color="#fbc02d"
                className="mr-2"
              />
              <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                className="flex-1 pl-2 text-[#1b5e20]"
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
