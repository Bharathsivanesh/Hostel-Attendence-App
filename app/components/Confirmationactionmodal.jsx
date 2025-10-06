import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

const CommonModal = ({ visible, onClose, onConfirm, message }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white w-11/12 rounded-2xl p-5">
          <Text className="text-lg font-semibold text-center text-[#1b5e20] mb-3">
            Confirmation
          </Text>
          <Text className="text-center text-gray-700 mb-5">{message}</Text>

          <View className="flex-row justify-around">
            <TouchableOpacity
              onPress={onClose}
              className="bg-gray-300 px-5 py-2 rounded-lg"
            >
              <Text className="text-black font-semibold">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              className="bg-[#1b5e20] px-5 py-2 rounded-lg"
            >
              <Text className="text-[#fbc02d] font-semibold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CommonModal;
