import React from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";

const DeleteWardenModal = ({ visible, onClose, role, onDelete, id, setId }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white flex flex-col gap-2 w-4/5 p-6 px-3 rounded-xl">
          {/* Title */}
          <Text className="text-xl font-bold mb-4" style={{ color: "#1b5e20" }}>
            {`Delete ${role}`}
          </Text>

          {/* Input field */}
          <Text className="text-gray-700">  {`Enter ${role} ID:`}</Text>
          <TextInput
            className="p-2 rounded mt-2 mb-4"
            style={{
              borderWidth: 1,
              borderColor: "#fbc02d",
            }}
            placeholder=  {`${role} ID`}
            value={id}
            onChangeText={setId}
          />

          {/* Buttons */}
          <View className="flex-row justify-between">
            <TouchableOpacity
              style={{
                backgroundColor: "#1b5e20",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
              }}
              onPress={onDelete}
            >
              <Text className="text-white font-bold">View</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#fbc02d",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
              }}
              onPress={onClose}
            >
              <Text className="text-black font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteWardenModal;
