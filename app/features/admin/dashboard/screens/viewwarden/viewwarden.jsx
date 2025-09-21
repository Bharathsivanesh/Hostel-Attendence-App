import { useEffect, useState } from "react";
import { Text, Image, ScrollView, View } from "react-native";
import showtoast from "../../../../../components/Toastmessage";
import Loader from "../../../../../components/loader";
import { fetchwarden } from "../../../../../services/admin/wardencredentials";
import checknetwork from "../../../../../components/checknetwork";

const Viewwarden = () => {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);

  const handlefetch = async () => {
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
    const response = await fetchwarden();

    if (response.success) {
      console.log("Fetched data:", response.message);
      setdata(response.message);
    } else {
      showtoast("error", response.message, "Finds an Error🤧", "top");
    }
    setloading(false);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  return (
    <ScrollView className="bg-gray-100 flex-1 ">
      <Loader visible={loading} text="Fetching Warden details..." />

      <View
        className="w-full h-12 mb-6 flex-row justify-center items-center rounded-bl-full rounded-br-full"
        style={{ backgroundColor: "#1b5e20" }}
      >
        <Text className="text-2xl font-bold text-[#fbc02d] italic">
          Warden Details
        </Text>
      </View>

      {!loading && data.length === 0 && (
        <View className="flex items-center mt-6">
          <Text className="text-lg font-semibold text-gray-500">
            No warden data available
          </Text>
        </View>
      )}

      {data.map((warden, idx) => (
        <View
          key={idx}
          className="mx-8 bg-white mb-8 rounded-xl shadow-md p-3"
          style={{
            borderLeftWidth: 5,
            borderLeftColor: "#fbc02d",
            borderRightWidth: 5,
            borderRightColor: "#1b5e20",
          }}
        >
          <View className="items-center mb-4 flex flex-row justify-around">
            <Image
              source={require("../../../../../assets/admin/viewwarden/idlogo.png")}
              className="w-16 h-16 rounded-full"
            />
            <Text
              className="text-xl font-black w-full ml-6"
              style={{ color: "#1b5e20" }}
            >
              WARDEN ID
            </Text>
          </View>

          <Text className="text-lg font-semibold text-gray-700">
            Name: {warden.name}
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            Joined Date: {warden.joined_date}
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            Gender: {warden.gender}
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            Block ID: {warden.block_id}
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            Hostel Type: {warden.hostel_type}
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            Warden Year: {warden.Year}
          </Text>
          <Text
            className="text-base font-semibold mt-1"
            style={{ color: "#fbc02d" }}
          >
            Warden ID: {warden.warden_id}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Viewwarden;
