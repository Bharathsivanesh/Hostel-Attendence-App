import React from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";

const DeleteWardenModal = ({ visible, onClose, onDelete, id, setId }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white flex flex-col gap-2  w-4/5 p-6 px-3 rounded-xl">
          <Text className="text-xl font-bold text-purple-700 mb-4">Delete Warden</Text>

          <Text className="text-gray-700">Enter Warden ID:</Text>
          <TextInput
            className="border border-purple-400 p-2 rounded mt-2 mb-4"
            placeholder="Warden ID"
            value={id}
            onChangeText={setId}
          />

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="bg-purple-500 px-4 py-2 rounded"
              onPress={onDelete}
            >
              <Text className="text-white font-bold">Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-purple-500 px-4 py-2 rounded"
              onPress={onClose}
            >
              <Text className="text-white font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default DeleteWardenModal;
