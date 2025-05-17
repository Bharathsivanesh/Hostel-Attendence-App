import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Wardencontext } from "../../../../../context/wardencontext";
import showtoast from "../../../../../components/Toastmessage";
import checknetwork from "../../../../../components/checknetwork"
import Loader from "../../../../../components/loader"
import {fetchRoomIdsForWarden} from "../../../../../services/students/students"
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
      setloading(true);
      const response = await fetchRoomIdsForWarden(wardeninfo);
      if (response.success) {
        setRooms(response.data);
      } else {
        showtoast("error", response.message, "Finds an Error 🤧", "Top");
      }
      setloading(false);
    };

    loadRooms();
  }, []);

  return (
    <View className="bg-white flex-1">
      <Loader visible={loading} text="Fetching Room I'D..." />
      <View className="w-full h-12 bg-purple-400 flex-row justify-center items-center rounded-bl-full rounded-br-full">
        <Text className="text-2xl font-bold text-white text-center w-72 italic">
          ROOMS
        </Text>
      </View>
      <ScrollView className="bg-white px-4 py-6">
        <Text className="text-lg text-purple-400 font-extrabold mb-6 text-center">
          {blockName}
        </Text>

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
              className="bg-purple-100 w-[48%] border-l-4 border-r-4 border-purple-400 mb-4 p-5 rounded-xl shadow-md"
            >
              <Text className="text-purple-700 font-bold text-lg text-center">
                {roomid}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Showrooms;