import React from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ConfirmationDeleteStudent = ({
  student,
  onDelete,
  isVisible,
  onClose,
}) => {
  if (!student) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 p-4">
        <View
          className="mx-6 bg-white rounded-xl shadow-md p-4 w-11/12"
          style={{
            borderLeftWidth: 5,
            borderLeftColor: "#fbc02d",
            borderRightWidth: 5,
            borderRightColor: "#1b5e20",
          }}
        >
          {/* Header */}
          <View className="items-center mb-3 flex flex-row justify-between">
            <Image
              source={require("../../../assets/admin/viewwarden/idlogo.png")}
              className="w-14 h-14 rounded-full"
            />
            <Text className="text-xl font-extrabold text-[#1b5e20] ml-3 flex-1">
              STUDENT ID
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={28} color="#d32f2f" />
            </TouchableOpacity>
          </View>

          {/* Student Info */}
          <Text className="text-lg font-semibold text-gray-700">
            Name: {student.name || "N/A"}
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            Reg No: {student.reg || "N/A"}
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            Room ID: {student.roomid || "N/A"}
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            Block ID: {student.blockid || "N/A"}
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            Study Year: {student.year || "N/A"}
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            Department: {student.dept || "N/A"}
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            Section: {student.section || "N/A"}
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            Student Phone: {student.st_phone || "N/A"}
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            Parent Phone: {student.parent_phone || "N/A"}
          </Text>

          {/* Delete Button */}
          <TouchableOpacity onPress={onDelete} className="mt-5">
            <View className="rounded-lg p-3 items-center bg-[#d32f2f]">
              <Text className="text-white font-bold text-lg">
                Confirm Delete
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationDeleteStudent;
