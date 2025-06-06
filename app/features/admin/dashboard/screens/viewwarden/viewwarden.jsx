import { useEffect, useState } from "react";
import { Text, Image, ScrollView, View } from "react-native";
import showtoast from "../../../../../components/Toastmessage";
import Loader from "../../../../../components/loader";
import { fetchwarden } from "../../../../../services/admin/wardencredentials";

const Viewwarden = () => {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);

  const handlefetch = async () => {
    setloading(true);
    const response = await fetchwarden();

    if (response.success) {
      console.log("Fetched data:", response.message);
      setdata(response.message);
    } else {
      showtoast("error", response.message, "Finds an Error🤧", "Top");
    }
    setloading(false);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  return (
    <ScrollView className="bg-gray-100 flex-1">
       <Loader visible={loading} text="Fetching Warden details..."/>
      <View className="w-full h-16 bg-purple-500 flex-row justify-center items-center rounded-bl-full rounded-br-full">
        <Text className="text-2xl font-bold text-white italic">Warden Details</Text>
      </View>
      {!loading && data.length === 0 && (
    <View className="flex items-center mt-10">
      <Text className="text-lg font-semibold text-gray-500">No warden data available</Text>
    </View>
  )}
      {data.map((warden, idx) => (
        <View key={idx} className="mt-8 mx-8 bg-white rounded-xl shadow-md p-3">
          <View className="items-center mb-4 flex flex-row justify-around">
            <Image
              source={require("../../../../../assets/admin/viewwarden/idlogo.png")}
              className="w-16 h-16 rounded-full "
            />
            <Text className=" text-xl text-purple-400 font-black w-full ml-6">WARDEN I'D</Text>
          </View>

          <Text className="text-lg font-semibold text-gray-700">Name: {warden.name}</Text>
          <Text className="text-base text-gray-700 mt-1">
             Joined Date: {warden.joined_date}
         </Text>
          <Text className="text-base text-gray-700 mt-1">Gender: {warden.gender}</Text>
          <Text className="text-base text-gray-700 mt-1">Block ID: {warden.block_id}</Text>
          <Text className="text-base text-gray-700 mt-1">Hostel Type: {warden.hostel_type}</Text>
          <Text className="text-base text-gray-700 mt-1">Warden Year: {warden.Year}</Text>
          <Text className="text-base text-gray-700 mt-1">Warden ID: {warden.warden_id}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Viewwarden;
