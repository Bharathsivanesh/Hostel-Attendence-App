import { Text, TouchableOpacity, View } from "react-native";

import { ScrollView } from "react-native";

import Studentfrom from "../../../components/studentform";
import { useState } from "react";
import Loader from "../../../../../components/loader";
const Adddetails = ({ route }) => {
  const { title } = route.params;
  const [loading, setloading] = useState(false);
  return (
    <View className="bg-white flex-1 flex ">
      <Loader visible={loading} text="Storing the data..." />
      <View className="w-full h-12 bg-[#1b5e20] flex-row justify-center items-center rounded-bl-full rounded-br-full">
        <Text className="text-2xl font-bold text-[#fbc02d] text-center w-72 italic">
          {title}
        </Text>
      </View>
      <ScrollView className="p-4">
        <Studentfrom setloading={setloading} />
        {/* here iam using reusbale form  for both edit and add file*/}
      </ScrollView>
    </View>
  );
};
export default Adddetails;
