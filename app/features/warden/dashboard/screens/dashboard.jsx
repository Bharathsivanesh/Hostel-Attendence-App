import React, { useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import firebaseApp from "../../../../firebase/index";

const Dashboard = () => {
  const navigation = useNavigation();

  const cards = [
    {
      icon: "calendar-number-outline",
      title: "Take Attendance",
       navigate:"Showrooms",
      image: require("../../../../assets/dashboard/card1.jpg"),
    },
    {
      icon: "create-outline",
      title: "Add/Edit Details",
      navigate: "Addeditdata",
      image: require("../../../../assets/dashboard/card2.jpg"),
    },
    {
      icon: "download-outline",
      title: "Export Details",
      navigate: "Exportexcel",
      image: require("../../../../assets/dashboard/card3.png"),
    },
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="w-full h-16 bg-purple-400 flex-row justify-center items-center rounded-bl-full rounded-br-full">
        <Text className="text-2xl font-bold  text-white text-center w-72 italic">
          Warden Dashboard
        </Text>
      </View>

      {/* Cards */}
      <ScrollView>
        <View className="flex flex-col items-center">
          {cards.map((card, index) => (
            <TouchableOpacity
              key={index}
               onPress={() => {navigation.navigate(card.navigate)}}
            >
              <View className="h-40 w-72 mt-10 rounded-2xl overflow-hidden shadow-lg">
                <ImageBackground source={card.image} className="w-full h-full">
                  <View className="h-full w-full bg-purple-500/50 flex-row justify-start items-center p-10">
                    <Ionicons name={card.icon} size={50} color="white" />
                    <Text className="ml-2 text-xl font-black text-white">
                      {card.title}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
