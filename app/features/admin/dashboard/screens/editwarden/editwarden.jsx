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
import CommonModal from "@/app/components/Confirmationactionmodal";

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
    Year: Yup.string().required("Warden Year is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Enter 10 digits")
      .required("Student number required"),
  });
  const blockOptions = {
    Boys: ["BB-1", "BB-2", "BB-3"],
    Girls: ["GB-1"],
  };

  const yearoptions = {
    Boys: ["All Year"],
    Girls: ["1", "2", "3", "4"],
  };
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
    phone: "",
    Year: "",
  });
  const [visisble, setvisible] = useState(false);
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
      setvisible(true);
      console.log(response.data);
    } else {
      showtoast("error", "Invalid", response.message, "top");
    }
    setloading(false);
  };
  const [modalVisible, setModalVisible] = useState(false);
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
      setModalVisible(false);
    } else {
      showtoast("error", "Invalid", response.message, "top");
    }
    setloading(false);
    setformdata("");
    setvisible(false);
    setid("");
  };

  return (
    <>
      <Loader visible={loading} text={loadertext} />
      <View className="bg-white h-screen  flex-1">
        <View className="w-full h-12 bg-[#1b5e20] flex-row justify-center items-center rounded-bl-full rounded-br-full">
          <Text className="text-2xl font-bold text-[#FBC02D] italic">
            Edit Warden
          </Text>
        </View>

        {!visisble && (
          <View className="flex flex-col w-full items-center justify-center gap-4 mt-8">
            <Text className="text-[#1b5e20] text-center w-full text-xl font-bold italic">
              Enter Warden ID
            </Text>
            <TextInput
              onChangeText={setid}
              className="w-2/3 border-2 border-[#1b5e20] rounded-lg p-2 text-[#1b5e20]"                                                   
              placeholder="Enter Warden ID"
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
        )}
        <ScrollView>
          {visisble && (
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
                <>
                  <View className="space-y-4 h-screen  bg-white px-3 mt-12">
                    <View>
                      <Text className="text-[#1b5e20] font-bold italic">
                        Name
                      </Text>
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
                      <Text className="text-[#1b5e20] font-bold italic">
                        Gender
                      </Text>
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
                      <Text className="text-[#1b5e20] font-bold italic mb-1">
                        Warden No
                      </Text>
                      <TextInput
                        className="border border-[#fbc02d] rounded-xl p-3"
                        placeholder="Enter Number"
                        keyboardType="phone-pad"
                        onChangeText={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        value={values.phone}
                      />
                      {touched.phone && errors.phone && (
                        <Text className="text-red-500">{errors.phone}</Text>
                      )}
                    </View>

                    <View>
                      <Text className="text-[#1b5e20] font-bold italic">
                        Hostel Type
                      </Text>
                      <View className="border border-[#fbc02d] rounded-xl">
                        <Picker
                          selectedValue={values.hostel_type}
                          onValueChange={(itemValue) => {
                            handleChange("hostel_type")(itemValue);
                            // Reset dependent fields when hostel type changes
                            handleChange("block_id")("");
                            handleChange("Year")("");
                          }}
                        >
                          <Picker.Item label="Select Hostel Type" value="" />
                          <Picker.Item label="Boys" value="Boys" />
                          <Picker.Item label="Girls" value="Girls" />
                        </Picker>
                      </View>
                      {touched.hostel_type && errors.hostel_type && (
                        <Text className="text-red-500">
                          {errors.hostel_type}
                        </Text>
                      )}
                    </View>

                    <View>
                      <Text className="text-[#1b5e20] font-bold italic">
                        Block ID
                      </Text>
                      <View className="border border-[#fbc02d] rounded-xl">
                        <Picker
                          selectedValue={values.block_id}
                          onValueChange={(itemValue) =>
                            handleChange("block_id")(itemValue)
                          }
                          onBlur={handleBlur("block_id")}
                          enabled={!!values.hostel_type} // Disable until hostel type is selected
                        >
                          <Picker.Item label="Select Block ID" value="" />
                          {values.hostel_type &&
                            blockOptions[values.hostel_type].map((block) => (
                              <Picker.Item
                                key={block}
                                label={block}
                                value={block}
                              />
                            ))}
                        </Picker>
                      </View>
                      {touched.block_id && errors.block_id && (
                        <Text className="text-red-500">{errors.block_id}</Text>
                      )}
                    </View>
                    <View>
                      <Text className="text-[#1b5e20] font-bold italic">
                        Year
                      </Text>
                      <View className="border border-[#fbc02d] rounded-xl">
                        <Picker
                          selectedValue={values.Year}
                          onValueChange={handleChange("Year")}
                          enabled={!!values.hostel_type}
                        >
                          <Picker.Item label="Select Year" value="" />
                          {values.hostel_type &&
                            yearoptions[values.hostel_type].map((year) => (
                              <Picker.Item
                                key={year}
                                label={year}
                                value={year}
                              />
                            ))}
                        </Picker>
                      </View>
                      {touched.Year && errors.Year && (
                        <Text className="text-red-500">{errors.Year}</Text>
                      )}
                    </View>

                    <View className="flex items-center justify-center mb-4">
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        className="w-1/2 h-10 mt-6 rounded-md bg-[#1b5e20] flex items-center justify-center"
                      >
                        <Text className="text-[#FBC02D] text-lg font-semibold">
                          Submit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <CommonModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onConfirm={handleSubmit}
                    message="Are you sure you want to submit this Edited Warden details?"
                  />
                </>
              )}
            </Formik>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default Editwarden;
