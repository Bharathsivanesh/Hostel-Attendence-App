import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Loginbutton from "../../components/loginbutton";
import {AuthLogin} from "../../services/auth/auth";
import showtoast from "../../components/Toastmessage";
import Spinner from 'react-native-loading-spinner-overlay';
import Loader from "../../components/loader"


const Adminlogin = () => {
  const navigation = useNavigation();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading,setloading]=useState(false);
  const handlelogin = async () => {
    setloading(true);
    const response = await AuthLogin(email, password);
    console.log(email);
    console.log(password);
    if (response.success) {
      showtoast("success","Login Successfully!","Welcome chief😎","Top");
      //reusbale component
      navigation.navigate("Admindashboard");
    } else {
      showtoast("error","Login Failed","Invalid email or password🤧","Top");

    }
   setloading(false);
    setemail("");
    setpassword("");
  };

  return (
    <ScrollView className=" bg-white">
      <Loader visible={loading} text="Logging in..."/>
      <View className="flex-1 items-center mt-8 justify-start">
        <Video
          source={require("../../assets/auth/adminlogin.mp4")}
          isLooping
          resizeMode="contain"
          shouldPlay
          style={{ width: "100%", height: 300 }}
        />
        {/* Login Section */}
        <View className="w-80 h-80 mt-8  rounded-3xl shadow-lg bg-white elevation-5">
          <Text className="font-extrabold text-2xl text-purple-600 text-center mb-5 mt-3">
            🔐 Welcome Admin 👨‍💼
          </Text>
          <Text className="text-gray-500 text-center mb-6">
            Login to continue
          </Text>
          <View className="flex flex-col items-center gap-8">
            <View className="flex-row items-center border-b-2 border-purple-500 w-72">
              <MaterialIcons
                name="email"
                size={24}
                color="#7e22ce"
                className="mr-2"
              />
              <TextInput
                placeholder="Email"
                className="flex-1 pl-2"
                onChangeText={setemail}
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
