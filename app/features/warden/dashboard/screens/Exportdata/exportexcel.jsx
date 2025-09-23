import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import showtoast from "../../../../../components/Toastmessage";
import Loader from "../../../../../components/loader";
import { exportToExcel } from "../../../../../utils/exportToExcel";
import {
  fetchtsudents,
  fetchtattendence,
  fetchttdyattendence,
} from "../../../../../services/exportexcel/export";
import { Wardencontext } from "../../../../../context/wardencontext";
import Layout from "@/app/layout/dashboardlayout";

const Exportexcel = () => {
  const [loading, setloading] = useState(false);
  const { wardeninfo } = useContext(Wardencontext);

  const cards = [
    {
      image: require("../../../../../assets/dashboard/exportexcel/export1.png"),
      title1: "Export Student Details",
      title2: "Download detailed student record as an Excel file",
      onPress: async () => {
        try {
          setloading(true);
          const students = await fetchtsudents();
          await exportToExcel(students.message, "Students_List", "no mail");
          showtoast(
            "success",
            "Sucessfully",
            "Sucessfully Data Exported",
            "top"
          );
        } catch (e) {
          showtoast("error", "Failed", "Error while exporting 🤧", "top");
        }
        setloading(false);
      },
    },
    {
      image: require("../../../../../assets/dashboard/exportexcel/export2.png"),
      title1: "Export Attendance Details",
      title2: "Download attendance record as an Excel file",
      onPress: async () => {
        try {
          setloading(true);
          const attendance = await fetchtattendence();
          await exportToExcel(attendance.message, "Attendance_List", "no mail");
          showtoast(
            "success",
            "Sucessfully",
            "Sucessfully Data Exported",
            "top"
          );
        } catch (e) {
          showtoast("error", "Failed", "Error while exporting 🤧", "top");
        }
        setloading(false);
      },
    },
    {
      image: require("../../../../../assets/dashboard/exportexcel/export3.png"),
      title1: "Export Today's Attendance Details",
      title2: "Automatically email the attendance report to the Admin",
      onPress: async () => {
        const date = new Date();
        const format = date.toLocaleDateString();
        try {
          setloading(true);
          const tdylist = await fetchttdyattendence(
            format,
            wardeninfo.warden_id
          );
          await exportToExcel(
            tdylist.message,
            `${format.replace(/\//g, "-")}_AttendanceList`,
            "mail"
          );
          showtoast(
            "success",
            "Sucessfully",
            "Sucessfully Data Exported",
            "top"
          );
        } catch (e) {
          showtoast("error", "Failed", "Error while exporting 🤧", "top");
        }
        setloading(false);
      },
    },
  ];

  return (
    <Layout>
      <View className="flex-1 bg-white flex flex-col">
        <Loader visible={loading} text="Exporting..." />
        <View className="w-full h-12 bg-[#1b5e20] flex-row justify-center items-center rounded-bl-full rounded-br-full">
          <Text className="text-2xl font-bold text-[#fbc02d] text-center w-72 italic">
            Export Data
          </Text>
        </View>
        <View className="px-5 py-10 flex flex-col gap-8">
          {cards.map((obj, key) => (
            <TouchableOpacity
              key={key}
              onPress={obj.onPress}
              className="shadow-md rounded-lg h-40 bg-white p-4 flex flex-col justify-center items-center border-l-4 border-b-4"
              style={{
                borderLeftColor: "#fbc02d",
                borderBottomColor: "#1b5e20",
              }}
            >
              <View className="flex flex-row items-center justify-center">
                <Image source={obj.image} className="w-16 h-16 rounded-md" />
                <View className="flex-1 ml-4">
                  <Text className="text-lg font-bold italic text-gray-800">
                    {obj.title1}
                  </Text>
                  <Text className="text-sm text-gray-600 mt-1">
                    {obj.title2}
                  </Text>
                </View>
                <View className=" rounded-full p-1">
                  <Ionicons
                    name="arrow-forward-circle"
                    size={35}
                    color="#1b5e20"
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Layout>
  );
};

export default Exportexcel;
