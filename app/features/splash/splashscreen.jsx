import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      //safer to use timer and return
      navigation.navigate("Selectrole");
    }, 4000);
    return () => clearTimeout(timer); //before 4 secons i close the app means it stop and return other wise background it runs untill 4 seconds
  }, []);
  return (
    <View className="flex-1 bg-white">
      <LottieView
        source={require("../../assets/splash/welcome.json")}
        speed={1}
        autoPlay
        loop
        style={{ flex: 1 }}
      />
    </View>
  );
};
export default Splash;
