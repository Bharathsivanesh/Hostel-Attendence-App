import React from "react";
import { View, Text } from "react-native";
import { Image } from "react-native";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Confirmationdelete = ({ warden, onDelete, isvisible, onClose }) => {
  return (
    <>
      <Modal
        transparent
        animationType="fade"
        visible={isvisible}
        onRequestClose={onClose}
        className="flex  items-center mt-8 justify-center"
      >
        <View className="flex-1  justify-center items-center bg-black/50 p-4">
          <View
            className="mx-12 relative bg-white mb-8 rounded-xl shadow-md p-3"
            style={{
              borderLeftWidth: 5,
              borderLeftColor: "#fbc02d",
              borderRightWidth: 5,
              borderRightColor: "#1b5e20",
            }}
          >
            <View className="items-center mb-4 flex flex-row justify-around">
              <Image
                source={require("../../../assets/admin/viewwarden/idlogo.png")}
                className="w-16 h-16 rounded-full"
              />
              <Text
                className="text-xl font-black w-full ml-6"
                style={{ color: "#1b5e20" }}
              >
                WARDEN ID
              </Text>
              <TouchableOpacity
                className="absolute top-2 right-0 "
                onPress={onClose}
              >
                <Ionicons name="close-circle" size={28} color="#d32f2f" />
              </TouchableOpacity>
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
            <Text className="text-base text-gray-700 mt-1 " numberOfLines={1}>
              Warden Phone: {warden.phone}
            </Text>
            <Text className="text-base  text-gray-700 mt-1">
              Hostel Type: {warden.hostel_type}
            </Text>
            <Text className="text-base text-gray-700 mt-1">
              Warden Year: {warden.Year}
            </Text>

            <Text className="text-base  mt-1">
              Warden ID: {warden.warden_id}
            </Text>
            <TouchableOpacity onPress={onDelete} className="mt-4">
              <View
                className="rounded-lg p-3 items-center"
                style={{ backgroundColor: "#d32f2f" }}
              >
                <Text className="text-white font-bold text-lg">
                  Confirm Delete
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Confirmationdelete;
