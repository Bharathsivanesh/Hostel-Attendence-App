import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Selectrole = () => {
  const navigation = useNavigation();
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    require("../../assets/splash/slider1.jpg"),
    require("../../assets/splash/slider2.jpg"),
    require("../../assets/splash/slider3.jpg"),
  ];

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000); // every 3 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View className="bg-white h-full">
      {/* Header Bar */}
      <View className="w-full">
        <View className="bg-[#fbc02d] flex items-center justify-center w-full h-16">
          <Text className="italic font-bold text-2xl font-serif text-white">
            Attendance System
          </Text>
        </View>
      </View>

      {/* Image Slider */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        className="w-full mt-4 h-56"
      >
        {images.map((img, index) => (
          <Image
            key={index}
            source={img}
            style={{ width: width, height: 250 }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Role Section */}
      <View className="flex-1 items-center ">
        <Text className="font-bold text-2xl font-serif">Select Your Role</Text>

        <Text className="mt-8 font-semibold">
          Please choose how you'd like to sign in
        </Text>

        <View className="flex-col gap-4 mt-10 w-full px-10">
          {/* Admin Button */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Adminlogin");
            }}
            className="bg-[#1b5e20]  py-3 flex-row w-full flex justify-center rounded-2xl"
          >
            {/* Icon Left */}
            <MaterialIcons
              name="admin-panel-settings"
              size={24}
              color="white"
            />
            {/* Text Center */}
            <Text className="text-white ml-2 text-center font-bold text-lg">
              Admin
            </Text>
          </TouchableOpacity>

          {/* Warden Button */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Wardenlogin");
            }}
            className="bg-[#fbc02d]  w-full flex flex-row items-center justify-center py-3 rounded-2xl"
          >
            <MaterialIcons name="security" size={24} color="white" />
            <Text className="text-white text-center font-bold text-lg ml-2">
              Warden
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Selectrole;
