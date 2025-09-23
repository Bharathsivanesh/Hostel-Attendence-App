import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const BottomBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (screen) => route.name === screen;

  return (
    <View className="flex-row justify-around  rounded-tl-3xl rounded-tr-3xl items-center bg-[#1b5e20] h-16">
      <TouchableOpacity
        className="flex items-center justify-center"
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Ionicons
          name="home-outline"
          size={24}
          color={isActive("Dashboard") ? "#fbc02d" : "white"}
        />
        <Text
          className={`text-xs ${
            isActive("Dashboard") ? "text-[#fbc02d]" : "text-white"
          }`}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Attendance */}
      <TouchableOpacity
        className="flex items-center justify-center"
        onPress={() => navigation.navigate("Showrooms")}
      >
        <Ionicons
          name="camera-outline"
          size={24}
          color={isActive("Showrooms") ? "#fbc02d" : "white"}
        />
        <Text
          className={`text-xs ${
            isActive("Showrooms") ? "text-[#fbc02d]" : "text-white"
          }`}
        >
          Attendance
        </Text>
      </TouchableOpacity>

      {/* Manage */}
      <TouchableOpacity
        className="flex items-center justify-center"
        onPress={() => navigation.navigate("Addeditdata")}
      >
        <Ionicons
          name="create-outline"
          size={24}
          color={isActive("Addeditdata") ? "#fbc02d" : "white"}
        />
        <Text
          className={`text-xs ${
            isActive("Addeditdata") ? "text-[#fbc02d]" : "text-white"
          }`}
        >
          Manage
        </Text>
      </TouchableOpacity>

      {/* Export */}
      <TouchableOpacity
        className="flex items-center justify-center"
        onPress={() => navigation.navigate("Exportexcel")}
      >
        <Ionicons
          name="download-outline"
          size={24}
          color={isActive("Exportexcel") ? "#fbc02d" : "white"}
        />
        <Text
          className={`text-xs ${
            isActive("Exportexcel") ? "text-[#fbc02d]" : "text-white"
          }`}
        >
          Export
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
