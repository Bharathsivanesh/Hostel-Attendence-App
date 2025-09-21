import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { ScrollView } from "react-native";
import Studentfrom from "../../../components/studentform";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import showtoast from "../../../../../components/Toastmessage";
import checknetwork from "../../../../../components/checknetwork";
import Loader from "../../../../../components/loader";
import { Dimensions } from "react-native";

import {
  deletestudent,
  fetchstudent,
  updatestudent,
} from "../../../../../services/students/students";
const Editdetails = ({ route }) => {
  const screenWidth = Dimensions.get("window").width;
  const { title } = route.params;
  const validationschema = Yup.object().shape({
    roomid: Yup.string()
      .matches(/^\d+$/, "Room Id should be number")
      .required("Room Id is required"),
    //   blockid: Yup.string()
    // .matches(/^\d+$/, "Room Id should be number")
    // .required("Room Id is required"),
    name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "Name should be string")
      .required("Name is required"),
    reg: Yup.string()
      .matches(/^\d+$/, "reg num should be number")
      .required("Register number is required"),
    year: Yup.string().required("Year is required"),
    section: Yup.string().required("Section is required"),
    dept: Yup.string().required("Department is required"),
    st_phone: Yup.string()
      .matches(/^\d{10}$/, "Enter 10 digits")
      .required("Student number required"),
    parent_phone: Yup.string()
      .matches(/^\d{10}$/, "Enter 10 digits")
      .required("Parent number required"),
  });

  const [id, setid] = useState("");
  const [loading, setloading] = useState(false);
  const [internet, setinternet] = useState(true);
  const [loadertext, setloadertext] = useState("");

  const [formdata, setformdata] = useState({
    roomid: "",
    blockid: "",
    name: "",
    reg: "",
    year: "",
    section: "",
    dept: "",
    st_phone: "",
    parent_phone: "",
  });

  useEffect(() => {
    const checkconnection = async () => {
      const isconnected = await checknetwork();
      setinternet(isconnected);
    };

    checkconnection();
  }, []);

  const handledelete = async () => {
    setloadertext("deleting details...");
    if (!id) {
      showtoast(
        "error",
        "No Id Entered",
        "Enter Id Of Deleted Student 🌐",
        "top"
      );
      return;
    }
    setloading(true);

    if (!internet) {
      showtoast(
        "error",
        "Offline",
        "Please check your internet connection 🌐",
        "top"
      );
      setloading(false);
      return;
    }
    const response = await deletestudent(id);

    if (response.success) {
      showtoast("success", "Sucessfully!", "Sucessfully deleted 🥳", "top");
    } else {
      showtoast("error", response.message, "Finds an Error🤧", "top");
    }
    setloading(false);
    setid("");
  };

  const handlefetch = async () => {
    setloadertext("Fetching details...");
    if (!id) {
      showtoast(
        "error",
        "No Id Entered",
        "Enter Id Of Deleted Student 🌐",
        "top"
      );
      return;
    }
    setloading(true);
    if (!internet) {
      showtoast(
        "error",
        "Offline",
        "Please check your internet connection 🌐",
        "top"
      );
      setloading(false);
      return;
    }

    const response = await fetchstudent(id);
    if (response.success) {
      setformdata(response.data);
      console.log(response.data);
    } else {
      showtoast("error", "Invalid", response.message, "top");
    }
    setloading(false);
  };

  const handleupdate = async (values) => {
    setformdata(values); //instead of formdata im storing "values" latest update from formik
    setloadertext("Updating details...");
    console.log(formdata);
    if (!id) {
      showtoast(
        "error",
        "No Id Entered",
        "Enter Id Of Deleted Student 🌐",
        "top"
      );
      return;
    }
    setloading(true);
    if (!internet) {
      showtoast(
        "error",
        "Offline",
        "Please check your internet connection 🌐",
        "top"
      );
      setloading(false);
      return;
    }

    const response = await updatestudent(id, values);
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
    <>
      <ScrollView>
        <Loader visible={loading} text={loadertext} />
        <View className="bg-white flex-1">
          <View className="flex flex-col ">
            <View className="w-full h-12 bg-[#1b5e20] flex-row justify-center items-center rounded-bl-full rounded-br-full">
              <Text className="text-2xl font-bold text-[#fbc02d] text-center w-72 italic">
                {title}
              </Text>
            </View>

            <View className="flex flex-col w-full items-center justify-center gap-4 mt-5">
              <Text className="text-[#1b5e20]  text-center  w-full text-xl font-bold italic">
                Enter Student I'D
              </Text>
              <TextInput
                onChangeText={setid}
                value={id}
                style={{
                  width: Math.min(screenWidth * 0.9, 208),
                  borderColor: "#fbc02d",
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                }}
              />
              <View className="flex flex-row  space-x-12 ">
                <TouchableOpacity onPress={handlefetch}>
                  <View className="flex-row items-center">
                    <Ionicons name="create-outline" size={20} color="#1b5e20" />
                    <Text className="ml-1 text-[#1b5e20]">Edit</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handledelete}>
                  <View className="flex-row items-center">
                    <Ionicons name="trash-outline" size={20} color="#1b5e20" />
                    <Text className="ml-1 text-[#1b5e20]">Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View className="p-4 mt-5">
              <Formik
                initialValues={formdata}
                enableReinitialize={true}
                validationSchema={validationschema}
                onSubmit={(values) => {
                  console.log("correct", values);
                  handleupdate(values); //latest update form formik
                }} // ✅ Logs form data
                //this will be tregear by handleSubmit automaticlay after clicking submit btn
              >
                {({
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  values,
                  errors,
                  touched,
                }) => (
                  <View className="space-y-4 mt-2">
                    <View>
                      <Text className="text-[#1b5e20] font-bold italic">
                        Room ID
                      </Text>
                      <TextInput
                        className="border border-[#fbc02d] rounded-xl p-3"
                        placeholder="Enter Room ID"
                        onChangeText={handleChange("roomid")} //this roomid sholud match with initialvalues
                        onBlur={handleBlur("roomid")}
                        value={values.roomid}
                      />
                      {touched.roomid && errors.roomid && (
                        <Text className="text-red-500">{errors.roomid}</Text>
                      )}
                    </View>
                    <View>
                      <Text className="text-[#1b5e20] font-bold italic">
                        Block-ID
                      </Text>

                      <View className="border border-[#fbc02d] rounded-xl">
                        <Picker
                          selectedValue={values.blockid}
                          onValueChange={(itemValue) =>
                            handleChange("blockid")(itemValue)
                          }
                          onBlur={handleBlur("blockid")}
                        >
                          <Picker.Item label="Select Block ID" value="" />
                          <Picker.Item label="BB-1" value="BB-1" />
                          <Picker.Item label="BB-2" value="BB-2" />
                          <Picker.Item label="BB-3" value="BB-3" />
                          <Picker.Item label="GB-1" value="GB-1" />
                        </Picker>
                      </View>

                      {touched.blockid && errors.blockid && (
                        <Text className="text-red-500">{errors.blockid}</Text>
                      )}
                    </View>

                    <View>
                      <Text className="text-[#1b5e20] font-bold italic">
                        Name
                      </Text>
                      <TextInput
                        className="border border-[#fbc02d] rounded-xl p-3"
                        placeholder="Enter Name"
                        onChangeText={handleChange("name")} //this roomid sholud match with initialvalues
                        onBlur={handleBlur("name")}
                        value={values.name}
                      />
                      {touched.name && errors.name && (
                        <Text className="text-red-500">{errors.name}</Text>
                      )}
                    </View>

                    <View>
                      <Text className="text-[#1b5e20] font-bold italic mb-1">
                        Reg No
                      </Text>
                      <TextInput
                        className="border border-[#fbc02d] rounded-xl p-3"
                        keyboardType="number-pad"
                        placeholder="Enter Reg No"
                        onChangeText={handleChange("reg")}
                        onBlur={handleBlur("reg")}
                        value={values.reg}
                      />
                      {touched.reg && errors.reg && (
                        <Text className="text-red-500">{errors.reg}</Text>
                      )}
                    </View>
                    <View>
                      <Text className="text-[#1b5e20] font-bold italic mb-1">
                        Year
                      </Text>
                      <View className="border border-[#fbc02d] rounded-xl">
                        <Picker
                          selectedValue={values.year}
                          onValueChange={handleChange("year")}
                        >
                          <Picker.Item label="select Year" value="" />
                          <Picker.Item label="1st Year" value="1" />
                          <Picker.Item label="2nd Year" value="2" />
                          <Picker.Item label="3rd Year" value="3" />
                          <Picker.Item label="4th Year" value="4" />
                        </Picker>
                      </View>

                      {touched.year && errors.year && (
                        <Text className="text-red-500">{errors.year}</Text>
                      )}
                    </View>

                    <View>
                      <Text className="text-[#1b5e20] font-bold italic mb-1">
                        Department
                      </Text>
                      <View className="border border-[#fbc02d] rounded-xl">
                        <Picker
                          selectedValue={values.dept}
                          onValueChange={handleChange("dept")}
                        >
                          <Picker.Item label="select Department" value="" />
                          <Picker.Item label="CSE" value="CSE" />
                          <Picker.Item label="ECE" value="ECE" />
                          <Picker.Item label="EEE" value="EEE" />
                          <Picker.Item label="IT" value="IT" />
                        </Picker>
                      </View>

                      {touched.year && errors.year && (
                        <Text className="text-red-500">{errors.year}</Text>
                      )}
                    </View>
                    <View>
                      <Text className="text-[#1b5e20] font-bold italic mb-1">
                        Section
                      </Text>
                      <View className="border border-[#fbc02d] rounded-xl">
                        <Picker
                          selectedValue={values.section}
                          onValueChange={handleChange("section")}
                        >
                          <Picker.Item label="select section" value="" />
                          <Picker.Item label="A" value="A" />
                          <Picker.Item label="B" value="B" />
                          <Picker.Item label="C" value="C" />
                          <Picker.Item label="D" value="D" />
                        </Picker>
                      </View>

                      {touched.year && errors.year && (
                        <Text className="text-red-500">{errors.year}</Text>
                      )}
                    </View>
                    <View>
                      <Text className="text-[#1b5e20] font-bold italic mb-1">
                        Student No
                      </Text>
                      <TextInput
                        className="border border-[#fbc02d] rounded-xl p-3"
                        placeholder="Enter Student Number"
                        keyboardType="phone-pad"
                        onChangeText={handleChange("st_phone")}
                        onBlur={handleBlur("st_phone")}
                        value={values.st_phone}
                      />
                      {touched.st_phone && errors.st_phone && (
                        <Text className="text-red-500">{errors.st_phone}</Text>
                      )}
                    </View>
                    <View>
                      <Text className="text-[#1b5e20] font-bold italic mb-1">
                        Parent No
                      </Text>
                      <TextInput
                        className="border border-[#fbc02d] rounded-xl p-3"
                        placeholder="Enter Parent Number"
                        keyboardType="phone-pad"
                        onChangeText={handleChange("parent_phone")}
                        onBlur={handleBlur("parent_phone")}
                        value={values.parent_phone}
                      />
                      {touched.parent_phone && errors.parent_phone && (
                        <Text className="text-red-500">
                          {errors.parent_phone}
                        </Text>
                      )}
                    </View>
                    <View className="flex items-center justify-center ">
                      <TouchableOpacity
                        onPress={handleSubmit}
                        className="w-1/2 h-9 mt-8 rounded-md flex items-center justify-center  mb-6 bg-[#1b5e20] "
                      >
                        <Text className="text-[#fbc02d] text-center ">
                          Submit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default Editdetails;
