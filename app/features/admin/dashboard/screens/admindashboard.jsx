import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

const Admindashboard = () => {
  const cards = [
    {
      icon: "person-add",
      text1: " Add Warden",
      text2: "Add new warden details",
    },
    {
      icon: "create-outline",
      text1: " Edit Warden",
      text2: " Update basic warden details",
    },
    {
      icon: "trash-outline",
      text1: " Delete Warden",
      text2: "  Remove warden details",
    },
    {
      icon: "eye-outline",
      text1: "  View Warden",
      text2: "  See all warden information",
    },
  ];
  return (
    <View className="bg-white flex-1 flex flex-col pt-12 ">
      <View className="flex items-center justify-center">
        <Text className="text-3xl text-purple-500 font-extrabold">
          👨‍💼 Admin Dashboard
        </Text>
        <Text className="mt-3 font-medium text-gray-500">
          Manage wardens efficiently
        </Text>
      </View>

      <View className="flex flex-col  gap-12 px-6 pl-8  mt-2 ">
        {cards.map((obj, idx) => (
          <Animatable.View
            animation="flipInX"
            delay={idx * 100}
            duration={600}
            key={idx}
          >
            <TouchableOpacity
              key={idx}
              className="flex flex-row gap-3  items-center rounded-xl bg-purple-200  p-4 shadow-sm"
            >
              <Ionicons name={obj.icon} size={40} color="#7C3AED" />
              <View className="flex flex-col">
                <Text className="text-purple-700 text-xl font-semibold">
                  {obj.text1}
                </Text>
                <Text className="text-purple-600 text-sm">{obj.text2}</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>
    </View>
  );
};
export default Admindashboard;
