import React, { useRef, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
    }, 2000); // change every 3s
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View className="bg-white h-full">
      {/* Header Bar */}
      <View className="w-full flex flex-col">
        <View className="bg-[#fbc02d] flex items-center justify-center w-full h-16 ">
          <Text className="italic font-bold text-2xl font-serif text-white">
            Attendance System
          </Text>
        </View>

        {/* Add some space */}
        <View className="h-4" />

        {/* Image Slider */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          className="w-full h-40"
        >
          {images.map((img, index) => (
            <Image
              key={index}
              source={img}
              className="w-screen h-40"
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      </View>
      <View className="flex-1 items-center  mt-12">
        <Text>Select Your Role</Text>
      </View>
    </View>
  );
};

export default Selectrole;
