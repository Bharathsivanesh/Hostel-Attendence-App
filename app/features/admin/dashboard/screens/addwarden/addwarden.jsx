import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as Yup from "yup";
import showtoast from "../../../../../components/Toastmessage";
import checknetwork from "../../../../../components/checknetwork";
import Loader from "../../../../../components/loader";
import { useState } from "react";
import { handleAddWarden } from "../../../../../services/admin/wardencredentials";

const Addwarden = () => {
  const validationschema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "Name should be alphabetic")
      .required("Name is required"),
    joined_date: Yup.string().required("Joined Date is required"),
    gender: Yup.string().required("Gender is required"),
    hostel_type: Yup.string().required("Hostel Type is required"),
    block_id: Yup.string().required("Block ID is required"),
    Year: Yup.string().required("Year is required"),
    warden_id: Yup.string().required("Warden ID is required"),
    password: Yup.string().required("Password is required"),
  });

  const [loading, setloading] = useState(false);

  const handlesubmit = async (values, { resetForm }) => {
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
    setloading(true);
    const response = await handleAddWarden(values);

    if (response.success) {
      showtoast("success", "Sucessfully!", "Sucessfully Added 🥳", "top");
    } else {
      showtoast("error", response.message, "Finds an Error🤧", "top");
    }
    setloading(false);
    resetForm();
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <ScrollView>
      <Loader visible={loading} text="Adding Warden details..." />
      <View className="bg-white flex-1">
        <View className="w-full h-12 bg-[#1B5E20] flex-row justify-center items-center rounded-bl-full rounded-br-full">
          <Text className="text-2xl font-bold text-[#FBC02D] italic">
            Add Warden
          </Text>
        </View>

        <Formik
          initialValues={{
            name: "",
            joined_date: formatDate(new Date()),
            gender: "",
            hostel_type: "",
            block_id: "",
            Year: "",
            warden_id: "",
            password: "",
          }}
          validationSchema={validationschema}
          onSubmit={handlesubmit}
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
                <Text className="text-[#1B5E20] font-bold italic">Name</Text>
                <TextInput
                  className="border border-[#FBC02D] rounded-xl p-3"
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
                <Text className="text-[#1B5E20] font-bold italic">
                  Joined Date
                </Text>
                <TextInput
                  className="border border-[#FBC02D] rounded-xl p-3"
                  editable={false}
                  onChangeText={handleChange("joined_date")}
                  onBlur={handleBlur("joined_date")}
                  value={values.joined_date}
                />
              </View>

              <View>
                <Text className="text-[#1B5E20] font-bold italic">Gender</Text>
                <View className="border border-[#FBC02D] rounded-xl">
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
                <Text className="text-[#1B5E20] font-bold italic">
                  Hostel Type
                </Text>
                <View className="border border-[#FBC02D] rounded-xl">
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
                <Text className="text-[#1B5E20] font-bold italic">
                  Block ID
                </Text>
                <View className="border border-[#FBC02D] rounded-xl">
                  <Picker
                    selectedValue={values.block_id}
                    onValueChange={(itemValue) =>
                      handleChange("block_id")(itemValue)
                    }
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

              <View>
                <Text className="text-[#1B5E20] font-bold italic">Year</Text>
                <View className="border border-[#FBC02D] rounded-xl">
                  <Picker
                    selectedValue={values.Year}
                    onValueChange={handleChange("Year")}
                  >
                    <Picker.Item label="Select Year" value="" />
                    <Picker.Item label="1st" value="1" />
                    <Picker.Item label="2nd" value="2" />
                    <Picker.Item label="3rd" value="3" />
                    <Picker.Item label="4th" value="4" />
                    <Picker.Item label="All Year" value="All Year" />
                  </Picker>
                </View>
                {touched.Year && errors.Year && (
                  <Text className="text-red-500">{errors.Year}</Text>
                )}
              </View>

              <View>
                <Text className="text-[#1B5E20] font-bold italic">
                  Warden ID
                </Text>
                <TextInput
                  className="border border-[#FBC02D] rounded-xl p-3"
                  placeholder="Enter Warden ID"
                  onChangeText={handleChange("warden_id")}
                  onBlur={handleBlur("warden_id")}
                  value={values.warden_id}
                />
                {touched.warden_id && errors.warden_id && (
                  <Text className="text-red-500">{errors.warden_id}</Text>
                )}
              </View>

              <View>
                <Text className="text-[#1B5E20] font-bold italic">
                  Password
                </Text>
                <TextInput
                  className="border border-[#FBC02D] rounded-xl p-3"
                  placeholder="Enter Password"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <Text className="text-red-500">{errors.password}</Text>
                )}
              </View>

              <View className="flex items-center justify-center mb-4">
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="w-1/2 h-10 mt-6 rounded-md bg-[#1B5E20] flex items-center justify-center"
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

export default Addwarden;
