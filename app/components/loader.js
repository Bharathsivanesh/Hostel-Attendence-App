import React, { useEffect, useRef } from "react";
import { View, Image, Animated, Easing, Modal } from "react-native";

const Loader = ({ visible }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation;
    if (visible) {
      animation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      rotateAnim.setValue(0);
      animation.start();
    } else {
      rotateAnim.stopAnimation();
    }

    return () => {
      if (animation) animation.stop();
    };
  }, [visible]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!visible) return null;

  return (
    <Modal transparent={true} visible={visible}>
      <View className="flex-1 bg-black/80 items-center justify-center">
        <Animated.View
          style={{
            transform: [{ rotate: spin }],
            width: 110,
            height: 110,
            borderRadius: 55,
            borderWidth: 12,
            borderTopColor: "#1b5e20",
            borderRightColor: "#1b5e20",
            borderBottomColor: "#fbc02d",
            borderLeftColor: "#fbc02d",
            position: "absolute",
          }}
        />

        <Image
          source={require("../assets/splash/logoo.jpg")}
          className="w-[100px] h-[100px] rounded-full"
          resizeMode="cover"
        />
      </View>
    </Modal>
  );
};

export default Loader;
