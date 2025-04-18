import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Exportexcel = () => {
  const cards = [
    {
      image: require("../../../assets/dashboard/exportexcel/export1.png"),
      title1: "Export Student Details",
      title2: "Download detailed student record as an Excel file",
    },
    {
      image: require("../../../assets/dashboard/exportexcel/export2.png"),
      title1: "Export Student Details",
      title2: "Download detailed student record as an Excel file",
    },
    {
      image: require("../../../assets/dashboard/exportexcel/export3.png"),
      title1: "Export Student Details",
      title2: "Download detailed student record as an Excel file",
    },
  ];
  return (
    <View className="flex-1 bg-white flex flex-col">
      <View className="w-full h-16 bg-purple-400 flex-row justify-center items-center rounded-bl-full rounded-br-full">
        <Text className="text-2xl font-bold  text-white text-center w-72 italic">
          Warden Dashboard
        </Text>
      </View>
      <View className=" px-5 py-10 flex flex-col gap-8">
        {cards.map((obj, key) => (
          <TouchableOpacity
            key={key}
            className="shadow-md rounded-lg h-40 bg-white p-4 flex flex-col justify-center items-center border-l-4  border-b-4  border-purple-400"
          >
            <View className="flex flex-row items-center justify-center">
              <Image source={obj.image} className="w-16 h-16 rounded-md" />

              <View className="flex-1 ml-4">
                <Text className="text-lg font-bold italic text-gray-800">
                  {obj.title1}
                </Text>
                <Text className="text-sm text-gray-600 mt-1">{obj.title2}</Text>
              </View>
              <View className="bg-purple-400  rounded-full">
                <Ionicons name="arrow-forward-circle" size={35} color="white" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Exportexcel;
