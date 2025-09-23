import Layout from "@/app/layout/dashboardlayout";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Addedit = () => {
  const cards = [
    {
      image: require("../../../../../assets/dashboard/addedit/adddata.png"),
      titl1: "Add Data",
      titl2: "Add new student And room data",
      route: "Adddetails",
      height: 220,
      width: 220,
    },
    {
      image: require("../../../../../assets/dashboard/addedit/editdata.png"),
      titl1: "Edit details",
      titl2: "Update existing records easily",
      route: "Editdetails",
      height: 250,
      width: 250,
    },
  ];
  const navigation = useNavigation();

  return (
    <Layout>
      <View className="flex-1 bg-white">
        <View className="flex flex-col">
          <View className="w-full h-12 bg-[#1b5e20] flex-row justify-center items-center rounded-bl-full rounded-br-full">
            <Text className="text-2xl font-bold text-[#fbc02d] text-center w-72 italic">
              📋 Manage Records
            </Text>
          </View>

          <View className="flex flex-col   justify-center items-center">
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
                <View className="ml-4 flex flex-col  items-center justify-center">
                  <Text className="text-xl text-center font-semibold text-[#1b5e20]">
                    {obj.titl1}
                  </Text>
                  <Text className="text-md  text-[#fbc02d] mt-2">
                    {obj.titl2}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default Addedit;
