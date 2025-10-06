import React, { useState } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";

const DropdownSelect = ({ label, value, onChange, data }) => {
  return (
    <View className="my-3">

      {/* Dropdown */}
      <View className="border border-[#fbc02d] rounded-xl bg-white">
        <Dropdown
          className="px-3 py-3"
          maxHeight={300}
          placeholderStyle={{ color: "#9ca3af" }} // gray-400
          selectedTextStyle={{ fontSize: 16, color: "#1b5e20" }}
          data={data}
          search
          searchPlaceholder="Search..."
          labelField="label"
          valueField="value"
          placeholder="Select option"
          value={value}
          onChange={(item) => onChange(item.value)}
          renderLeftIcon={() => (
            <AntDesign name="Safety" size={20} color="#1b5e20" style={{ marginRight: 8 }} />
          )}
        />
      </View>
    </View>
  );
};

export default DropdownSelect;
