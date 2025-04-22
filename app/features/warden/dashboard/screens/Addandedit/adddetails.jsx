import { Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { Button } from "react-native";
const Adddetails = () => {
  const validationschema = Yup.object().shape({
    roomid: Yup.string()
      .matches(/^\d+$/, "Room Id should be number")
      .required("Room Id is required"),
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

  const handlesubmit = (values) => {
    console.log("submitted data", values);
  };

  return (
    <View className="bg-white flex-1 flex ">
      <View className="w-full h-12 bg-purple-400 flex-row justify-center items-center rounded-bl-full rounded-br-full">
        <Text className="text-2xl font-bold text-white text-center w-72 italic">
          Add-Student-Details
        </Text>
      </View>
      <ScrollView className="p-4">
        <Formik
          initialValues={{
            roomid: "",
            name: "",
            reg: "",
            year: "",
            section: "",
            dept: "",
            st_phone: "",
            parent_phone: "",
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
            <View className="space-y-4 mt-2">
              <View>
                <Text className="text-purple-600 font-bold italic">
                  Room ID
                </Text>
                <TextInput
                  className="border border-purple-400 rounded-xl p-3"
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
                <Text className="text-purple-600 font-bold italic">Name</Text>
                <TextInput
                  className="border border-purple-400 rounded-xl p-3"
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
                <Text className="text-purple-600 font-bold italic mb-1">
                  Reg No
                </Text>
                <TextInput
                  className="border border-purple-400 rounded-xl p-3"
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
                <Text className="text-purple-600 font-bold italic mb-1">
                  Year
                </Text>
                <View className="border border-purple-400 rounded-xl">
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
                <Text className="text-purple-600 font-bold italic mb-1">
                  Section
                </Text>
                <View className="border border-purple-400 rounded-xl">
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
                <Text className="text-purple-600 font-bold italic mb-1">
                  Department
                </Text>
                <View className="border border-purple-400 rounded-xl">
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
                <Text className="text-purple-600 font-bold italic mb-1">
                  Student No
                </Text>
                <TextInput
                  className="border border-purple-400 rounded-xl p-3"
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
                <Text className="text-purple-600 font-bold italic mb-1">
                  Parent No
                </Text>
                <TextInput
                  className="border border-purple-400 rounded-xl p-3"
                  placeholder="Enter Parent Number"
                  keyboardType="phone-pad"
                  onChangeText={handleChange("parentno")}
                  onBlur={handleBlur("parentno")}
                  value={values.parentno}
                />
                {touched.parentno && errors.parentno && (
                  <Text className="text-red-500">{errors.parentno}</Text>
                )}
              </View>
            </View>
          )}
        </Formik>
        <View className="flex items-center justify-center ">
          <TouchableOpacity className="w-1/2 h-9 mt-8 rounded-md flex items-center justify-center  mb-6 bg-purple-500 ">
            <Text className="text-white text-center ">Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default Adddetails;
