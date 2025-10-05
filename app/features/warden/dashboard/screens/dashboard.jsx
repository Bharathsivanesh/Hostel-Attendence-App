import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Wardencontext } from "../../../../context/wardencontext";
import Layout from "../../../../layout/dashboardlayout";
import { fetchStudentCount } from "@/app/services/admin/wardencredentials";
import { useFocusEffect } from "@react-navigation/native";
const Dashboard = () => {
  const navigation = useNavigation();
  const { wardeninfo } = useContext(Wardencontext);
  const blockName = wardeninfo.block_id;
  const [studentCount, setStudentCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadStudents = async () => {
        const response = await fetchStudentCount(wardeninfo);
        if (response.success) {
          setStudentCount(response.count);
        } else {
          console.log("Error:", response.message);
        }
      };

      if (wardeninfo) {
        loadStudents();
      }
    }, [wardeninfo])
  );
  useEffect(()=>{
 console.log("the data",wardeninfo)
  },[])

  return (
    <>
      <Layout>
        <ScrollView className="flex-1 bg-white ">
          <View className="flex-row bg-[#1b5e20] h-16 px-8 rounded-br-3xl rounded-bl-3xl items-center mb-6 justify-between">
            <View className="flex-row justify-center items-center gap-3">
              <Image
                source={
                  wardeninfo?.profileImage
                    ? { uri: wardeninfo.profileImage }
                    : require("../../../../assets/admin/viewwarden/idlogo.png")
                }
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
              <View>
                <Text className="font-bold  text-xl  text-[#fbc02d]">
                  {wardeninfo?.name}
                </Text>
                <Text className="text-[#fbc02d] text-sm">College Warden</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Selectrole");
              }}
            >
              <Ionicons name="log-out-outline" size={24} color="#fbc02d" />
            </TouchableOpacity>
          </View>

          <Text className="text-2xl text-center font-bold mb-4 text-[#1b5e20]">
            Warden Dashboard
          </Text>
          <Text className="text-gray-500 text-center mb-6">
            Manage student attendance efficiently.
          </Text>

          <View className="flex-row p-4 justify-between mb-2">
            <View
              className="flex-1 rounded-xl p-4 mr-2 items-center"
              style={{ backgroundColor: "#fbc02d" }}
            >
              <Ionicons name="people-outline" size={30} color="#1b5e20" />
              <Text className="font-bold text-lg mt-2 text-[#1b5e20]">
                Total Students
              </Text>
              <Text className="text-xl font-bold mt-1 text-[#1b5e20]">
                {studentCount}
              </Text>
            </View>
            <View
              className="flex-1 rounded-xl p-4 ml-2 items-center"
              style={{ backgroundColor: "#1b5e20" }}
            >
              <Ionicons name="person-outline" size={30} color="#fbc02d" />
              <Text className="font-bold text-lg mt-2 text-[#fbc02d]">
                Block Name
              </Text>
              <Text className="text-xl font-bold mt-1 text-[#fbc02d]">
                {blockName}
              </Text>
            </View>
          </View>
          <View className="px-4">
            <TouchableOpacity
              style={{ backgroundColor: "#1b5e20" }}
              className="rounded-xl p-6 mb-4 items-center"
              onPress={() => navigation.navigate("Showrooms")}
            >
              <Ionicons name="camera-outline" size={40} color="#fbc02d" />
              <Text className="font-bold text-lg mt-2 text-[#fbc02d]">
                Take Attendance
              </Text>
              <Text className="text-sm text-[#fbc02d]">
                Mark daily student presence
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ backgroundColor: "#fbc02d" }}
              className="rounded-xl p-6 mb-4 items-center"
              onPress={() => navigation.navigate("Addeditdata")}
            >
              <Ionicons name="create-outline" size={30} color="#1b5e20" />
              <Text className="font-bold text-lg mt-2 text-[#1b5e20]">
                Edit Attendance
              </Text>
              <Text className="text-sm text-[#1b5e20]">
                Correct attendance records
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ backgroundColor: "#fbc02d" }}
              className="rounded-xl  p-6 mb-12 items-center"
              onPress={() => navigation.navigate("Exportexcel")}
            >
              <Ionicons name="download-outline" size={30} color="#1b5e20" />
              <Text className="font-bold text-lg mt-2 text-[#1b5e20]">
                Export Details
              </Text>
              <Text className="text-sm text-[#1b5e20]">
                Download attendance sheets
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Layout>
    </>
  );
};

export default Dashboard;
