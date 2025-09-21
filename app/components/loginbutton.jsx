import { Text, TouchableOpacity, View } from "react-native";

const Loginbutton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-[#1b5e20] w-36 h-12 rounded-lg justify-center items-center"
    >
      <Text className="text-[#fbc02d] font-black text-xl">{title}</Text>
    </TouchableOpacity>
  );
};
export default Loginbutton;
