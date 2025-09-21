import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import showtoast from "../../../../../components/Toastmessage";
import checknetwork from "../../../../../components/checknetwork";
import Loader from "../../../../../components/loader";
import {
  fetchupdatewarden,
  updatewarden,
} from "../../../../../services/admin/wardencredentials";
import { useState } from "react";

const Editwarden = () => {
  const screenWidth = Dimensions.get("window").width;
  const validationschema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "Name should be alphabetic")
      .required("Name is required"),
    joined_date: Yup.string().required("Joined Date is required"),
    gender: Yup.string().required("Gender is required"),
    hostel_type: Yup.string().required("Hostel Type is required"),
    block_id: Yup.string().required("Block ID is required"),
    warden_id: Yup.string().required("Warden ID is required"),
  });

  const [id, setid] = useState("");
  const [loading, setloading] = useState(false);
  const [internet, setinternet] = useState(true);
  const [loadertext, setloadertext] = useState("");
  const [formdata, setformdata] = useState({
    name: "",
    joined_date: "",
    gender: "",
    hostel_type: "",
    block_id: "",
    floor: "",
    warden_id: "",
  });

  const handlefetch = async () => {
    const isConnected = await checknetwork();
    if (!isConnected) {
      showtoast(
        "error",
        "No Internet Connection",
        "Check your network!",
        "Top"
      );
      setloading(false);
      return;
    }
    setloadertext("Fetching details...");
    if (!id) {
      showtoast("error", "No Id Entered", "Enter Id Of Warden 🌐", "Top");
      return;
    }
    setloading(true);

    const response = await fetchupdatewarden(id);
    if (response.success) {
      setformdata(response.data);
      console.log(response.data);
    } else {
      showtoast("error", "Invalid", response.message, "top");
    }
    setloading(false);
  };

  const handleupdate = async (values) => {
    if (!internet) {
      showtoast(
        "error",
        "Offline",
        "Please check your internet connection 🌐",
        "Top"
      );
      setloading(false);
      return;
    }
    setformdata(values);
    setloadertext("Updating details...");
    console.log(formdata);
    if (!id) {
      showtoast("error", "No Id Entered", "Enter Id Of Warden 🌐", "Top");
      return;
    }
    setloading(true);

    const response = await updatewarden(id, values);
    if (response.success) {
      showtoast("success", "Sucessfully Updated", response.message, "top");
    } else {
      showtoast("error", "Invalid", response.message, "top");
    }
    setloading(false);
    setformdata("");
    setid("");
  };

  return (
    <ScrollView>
      <Loader visible={loading} text={loadertext} />
      <View className="bg-white flex-1">
        {/* Header */}
        <View className="w-full h-12 bg-[#1b5e20] flex-row justify-center items-center rounded-bl-full rounded-br-full">
          <Text className="text-2xl font-bold text-[#FBC02D] italic">
            Edit Warden
          </Text>
        </View>

        {/* Input for Warden ID */}
        <View className="flex flex-col w-full items-center justify-center gap-4 mt-5">
          <Text className="text-[#1b5e20] text-center w-full text-xl font-bold italic">
            Enter Warden ID
          </Text>
          <TextInput
            onChangeText={setid}
            style={{
              width: Math.min(screenWidth * 0.9, 208),
              borderColor: "#1b5e20",
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 10,
            }}
          />
          <View className="flex flex-row space-x-12">
            <TouchableOpacity
              onPress={handlefetch}
              className="bg-[#1b5e20] p-2 px-8 border rounded-lg"
            >
              <View className="flex-row justify-center items-center">
                <Ionicons name="create-outline" size={20} color="#fbc02d" />
                <Text className="ml-1 text-[#fbc02d] font-bold">Edit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Formik
          initialValues={formdata}
          enableReinitialize={true}
          validationSchema={validationschema}
          onSubmit={(values) => {
            console.log("correct", values);
            handleupdate(values);
          }}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <View className="space-y-4 px-3 mt-6">
              <View>
                <Text className="text-[#1b5e20] font-bold italic">Name</Text>
                <TextInput
                  className="border border-[#fbc02d] rounded-xl p-3"
                  placeholder="Enter Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <Text className="text-red-500">{errors.name}</Text>
                )}
              </View>

              <View>
                <Text className="text-[#1b5e20] font-bold italic">
                  Joined Date
                </Text>
                <TextInput
                  className="border border-[#fbc02d] rounded-xl p-3"
                  editable={false}
                  value={values.joined_date}
                />
              </View>

              <View>
                <Text className="text-[#1b5e20] font-bold italic">Gender</Text>
                <View className="border border-[#fbc02d] rounded-xl">
                  <Picker
                    selectedValue={values.gender}
                    onValueChange={handleChange("gender")}
                  >
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                  </Picker>
                </View>
                {touched.gender && errors.gender && (
                  <Text className="text-red-500">{errors.gender}</Text>
                )}
              </View>

              <View>
                <Text className="text-[#1b5e20] font-bold italic">
                  Hostel Type
                </Text>
                <View className="border border-[#fbc02d] rounded-xl">
                  <Picker
                    selectedValue={values.hostel_type}
                    onValueChange={handleChange("hostel_type")}
                  >
                    <Picker.Item label="Select Hostel Type" value="" />
                    <Picker.Item label="Boys" value="Boys" />
                    <Picker.Item label="Girls" value="Girls" />
                  </Picker>
                </View>
                {touched.hostel_type && errors.hostel_type && (
                  <Text className="text-red-500">{errors.hostel_type}</Text>
                )}
              </View>

              <View>
                <Text className="text-[#1b5e20] font-bold italic">
                  Block ID
                </Text>
                <View className="border border-[#fbc02d] rounded-xl">
                  <Picker
                    selectedValue={values.block_id}
                    onValueChange={(itemValue) => {
                      handleChange("block_id")(itemValue);
                    }}
                    onBlur={handleBlur("block_id")}
                  >
                    <Picker.Item label="Select Block ID" value="" />
                    <Picker.Item label="BB-1" value="BB-1" />
                    <Picker.Item label="BB-2" value="BB-2" />
                    <Picker.Item label="BB-3" value="BB-3" />
                    <Picker.Item label="GB-1" value="GB-1" />
                  </Picker>
                </View>
                {touched.block_id && errors.block_id && (
                  <Text className="text-red-500">{errors.block_id}</Text>
                )}
              </View>

              <View className="flex items-center justify-center mb-4">
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="w-1/2 h-10 mt-6 rounded-md bg-[#1b5e20] flex items-center justify-center"
                >
                  <Text className="text-[#FBC02D] text-lg font-semibold">
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default Editwarden;
