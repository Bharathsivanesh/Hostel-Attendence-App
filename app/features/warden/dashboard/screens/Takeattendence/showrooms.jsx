import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Wardencontext } from "../../../../../context/wardencontext";
import showtoast from "../../../../../components/Toastmessage";
import checknetwork from "../../../../../components/checknetwork";
import Loader from "../../../../../components/loader";
import { fetchRoomIdsForWarden } from "../../../../../services/students/students";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";

const Showrooms = () => {
  const navigation = useNavigation();
  const { wardeninfo } = useContext(Wardencontext);
  const blockName = wardeninfo.block_id;
  const [rooms, setRooms] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const loadRooms = async () => {
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
      const response = await fetchRoomIdsForWarden(wardeninfo);
      if (response.success) {
        setRooms(response.data);
      } else {
        showtoast("error", response.message, "Finds an Error 🤧", "top");
      }
      setloading(false);
    };

    loadRooms();
  }, []);

  return (
    <View className="bg-white flex-1">
      <Loader visible={loading} text="Fetching Room I'D..." />

      {/* Header Bar */}
      <View className="w-full h-12 bg-[#1b5e20] flex-row justify-center items-center rounded-bl-full rounded-br-full">
        <Text className="text-2xl font-bold text-[#fbc02d] text-center w-72 italic">
          Rooms
        </Text>
      </View>

      <ScrollView className="bg-white px-4 py-6">
        <Text className="text-lg text-[#fbc02d] font-extrabold mb-6 text-center">
          {blockName}
        </Text>

        {rooms.length == 0 && !loading ? (
          <Text className="text-center text-[#1b5e20] text-base italic mt-6">
            No rooms available in this block.
          </Text>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {rooms.map((roomid, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("TakeAttendence", {
                    roomid,
                    blockid: wardeninfo.block_id,
                  })
                }
                className="bg-[#fbc02d] w-[48%] border-l-4 border-r-4 border-[#1b5e20] mb-4 p-5 rounded-xl shadow-md"
              >
                <Text className="text-[#1b5e20] font-bold text-lg text-center">
                  {roomid}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Showrooms;
