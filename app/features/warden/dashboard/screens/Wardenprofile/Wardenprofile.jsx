import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Layout from "@/app/layout/dashboardlayout";
import checknetwork from "@/app/components/checknetwork";
import {
  fetchupdatewarden,
  updatewarden,
} from "@/app/services/admin/wardencredentials";
import { Wardencontext } from "@/app/context/wardencontext";
import showtoast from "../../../../../components/Toastmessage";
import Loader from "@/app/components/loader";
const WardenProfile = () => {
  const navigation = useNavigation();

  const { wardeninfo, setWardenifo } = useContext(Wardencontext);
  const id = wardeninfo.warden_id;
  const [modalVisible, setModalVisible] = useState(false);

  const [error, setError] = useState(null);

  const [formdata, setformdata] = useState({
    name: "",
    joined_date: "",
    gender: "",
    hostel_type: "",
    block_id: "",
    floor: "",
    warden_id: "",
    profileImage: "",
    phone: "",
  });
  const [loading, setloading] = useState(false);
  const [image, setimage] = useState(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        var imgUri = {
          localUri: result.assets[0].uri,
        };
        setimage({
          localUri: result.assets[0].uri,
        });
      }
      handleSave(imgUri, true);
    } catch (error) {
      console.log("Error picking image: ", error);
      showtoast("error", "Image Pick Failed", error.message, "Top");
    }
  };

  const handlefetch = async () => {
    setloading(true);
    setError(null); // reset old error

    const isConnected = await checknetwork();
    if (!isConnected) {
      setloading(false);
      setError("No Internet Connection 🌐");
      showtoast("error", "No Internet", "Check your network!", "top");
      return;
    }

    if (!id) {
      setloading(false);
      setError("No ID entered. Please enter the Warden ID.");
      showtoast("error", "No ID Entered", "Enter ID of Warden 🌐", "top");
      return;
    }

    try {
      const response = await fetchupdatewarden(id);

      if (response.success) {
        console.log("✅ Data fetched:", response.data);
        setformdata(response.data);

        setWardenifo(response.data); //updating local context for diplaying name and image in dashboard page
        console.log("✅ wardenfetched:", wardeninfo);
        setError(null);
      } else {
        setError(response.message || "Failed to fetch data ❌");
        showtoast("error", "Invalid", response.message, "top");
      }
    } catch (err) {
      console.error("API error:", err);
      setError("Something went wrong. Please try again later.");
      showtoast("error", "Server Error", "Please try again later.", "top");
    } finally {
      setloading(false);
    }
  };
  const [name, setName] = useState(formdata?.name || "");
  const [mobile, setMobile] = useState(formdata?.phone || "");
  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
  });

  const validateFields = () => {
    let valid = true;
    const newErrors = { name: "", mobile: "" };

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Mobile validation
    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      valid = false;
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      newErrors.mobile = "Invalid mobile number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = async (imagurl, isimageadd = false) => {
    //"isimage" added for image upload
    if (!validateFields()) return;
    setloading(true);
    const updateData = {
      name: name,
      phone: mobile,
    };
    if (isimageadd) {
      if (!imagurl) {
        setloading(false);
        return;
      }
      var response = await updatewarden(id, imagurl, true);
    } else {
      var response = await updatewarden(id, updateData, false);
    }
    console.log("Response from updatewarden:", response);
    if (response.success) {
      setformdata((prev) => ({ ...prev, ...updateData }));
      showtoast("success", "Sucessfull!", "Sucessfully Updated", "top");
      handlefetch();
      setModalVisible(false);
    } else {
      showtoast("error", "Failed", response.message, "top");
    }
    setloading(false);
  };

  useEffect(() => {
    handlefetch();
  }, []);
  useEffect(() => {
    setName(formdata.name || "");
    setMobile(formdata.phone || "");
  }, [formdata]);

  return (
    <Layout>
      {loading ? (
        <Loader visible={loading} text="Fetching Warden details..." />
      ) : error ? (
        <View className="flex-1 justify-center items-center bg-white px-6">
          <Ionicons name="alert-circle-outline" size={50} color="#fbc02d" />
          <Text className="text-lg text-[#1b5e20] font-semibold mt-3 text-center">
            {error}
          </Text>
          <TouchableOpacity
            className="mt-4 bg-[#1b5e20] px-6 py-2 rounded-lg"
            onPress={handlefetch}
          >
            <Text className="text-white font-semibold">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row  rounded-br-3xl rounded-bl-3xl items-center justify-between bg-[#1b5e20] px-8 py-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fbc02d" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-[#fbc02d] text-center  italic">
              Profile
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="create-outline" size={24} color="#fbc02d" />
            </TouchableOpacity>
          </View>

          {/* Profile Section */}
          <View className="items-center mt-6">
            <View className="relative">
              <Image
                source={
                  formdata?.profileImage
                    ? { uri: formdata?.profileImage }
                    : require("../../../../../assets/admin/viewwarden/idlogo.png")
                }
                className="w-28 h-28 rounded-full border-4 border-[#fbc02d]"
              />
              <TouchableOpacity
                onPress={pickImage}
                className="absolute bottom-0 right-0 bg-white rounded-full p-1"
              >
                <Ionicons name="add-circle" size={28} color="#fbc02d" />
              </TouchableOpacity>
            </View>

            <Text className="text-xl font-bold text-[#1b5e20] mt-3">
              {formdata?.name}
            </Text>
            <Text className="text-gray-500 text-sm mb-4">Warden</Text>
          </View>

          {/* Basic Details */}
          <View className="mx-6 mb-8">
            <View className="flex-row items-center border-b border-gray-200 py-3">
              <Ionicons name="person-outline" size={20} color="#1b5e20" />
              <Text className="ml-3 text-base text-gray-800 flex-1">
                {formdata?.name}
              </Text>
            </View>

            <View className="flex-row items-center border-b border-gray-200 py-3">
              <Ionicons name="calendar-outline" size={20} color="#1b5e20" />
              <Text className="ml-3 text-base text-gray-800 flex-1">
                {formdata?.joined_date}
              </Text>
            </View>

            <View className="flex-row items-center border-b border-gray-200 py-3">
              <Ionicons name="male-female-outline" size={20} color="#1b5e20" />
              <Text className="ml-3 text-base text-gray-800 flex-1">
                {formdata?.gender}
              </Text>
            </View>
            <View className="flex-row items-center border-b border-gray-200 py-3">
              <Ionicons name="business-outline" size={20} color="#1b5e20" />
              <Text className="ml-3 text-base text-gray-800 flex-1">
                {formdata?.block_id}
              </Text>
            </View>
            <View className="flex-row items-center border-b border-gray-200 py-3">
              <Ionicons name="home-outline" size={20} color="#1b5e20" />
              <Text className="ml-3 text-base text-gray-800 flex-1">
                {formdata?.gender == "Male" ? "Boys Hostel" : "Girls Hostel"}
              </Text>
            </View>

            <View className="flex-row items-center border-b border-gray-200 py-3">
              <Ionicons name="call-outline" size={20} color="#1b5e20" />
              <Text className="ml-3 text-base text-gray-800 flex-1">
                {formdata?.phone}
              </Text>
            </View>

            <View className="flex-row items-center py-3">
              <Ionicons name="id-card-outline" size={20} color="#1b5e20" />
              <Text className="ml-3 text-base text-gray-800 flex-1">
                {" "}
                {formdata?.warden_id}
              </Text>
            </View>
          </View>

          {/* Modal for Editing */}
          <Modal visible={modalVisible} transparent animationType="slide">
            <View className="flex-1 bg-black/50 justify-center items-center">
              <View className="bg-white w-11/12 rounded-2xl p-5">
                <Text className="text-lg font-bold text-[#1b5e20] mb-4">
                  Edit Profile
                </Text>

                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
                  placeholder="Enter Name"
                  value={name}
                  onChangeText={setName}
                />
                {errors.name ? (
                  <Text className="text-red-500 text-sm mb-2">
                    {errors.name}
                  </Text>
                ) : null}
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-5"
                  placeholder="Enter Mobile Number"
                  value={mobile}
                  onChangeText={setMobile}
                  keyboardType="phone-pad"
                />
                {errors.mobile ? (
                  <Text className="text-red-500 text-sm mb-2">
                    {errors.mobile}
                  </Text>
                ) : null}

                <View className="flex-row justify-between">
                  <TouchableOpacity
                    className="flex-1 bg-[#1b5e20] py-2 rounded-lg mr-2"
                    onPress={handleSave}
                  >
                    <Text className="text-white text-center font-semibold">
                      Save
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-1 bg-gray-400 py-2 rounded-lg ml-2"
                    onPress={() => setModalVisible(false)}
                  >
                    <Text className="text-white text-center font-semibold">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      )}
    </Layout>
  );
};

export default WardenProfile;
