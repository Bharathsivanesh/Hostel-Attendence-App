import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Addedit = () => {
  const cards = [
    {
      image: require("../../../../../assets/dashboard/addedit/add.png"),
      titl1: "Add Data",
      titl2: "Add new student And room data",
      route: "Adddetails",
      height: 250,
      width: 250,
    },
    {
      image: require("../../../../../assets/dashboard/addedit/edit.png"),
      titl1: "Edit details",
      titl2: "Update existing records easily",
      route: "Editdetails",
      height: 200,
      width: 200,
    },
  ];
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <View className="flex flex-col">
        <View className="w-full h-12 bg-purple-400 flex-row justify-center items-center rounded-bl-full rounded-br-full">
          <Text className="text-2xl font-bold text-white text-center w-72 italic">
            Add/Edit
          </Text>
        </View>

        <View className="flex flex-col gap-16 justify-center items-center">
          {cards.map((obj, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                navigation.navigate(obj.route, {
                  title: obj.titl1,
                });
              }}
            >
              <Image
                source={obj.image}
                style={{ height: obj.height, width: obj.width }}
                className=""
              />
              <View className="ml-4 flex flec-col  items-center justify-center">
                <Text className="text-xl text-center font-semibold text-purple-700">
                  {obj.titl1}
                </Text>
                <Text className="text-sm text-purple-600">{obj.titl2}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Addedit;
