import { useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Wardencontext } from "../../../../../context/wardencontext";
import checknetwork from "../../../../../components/checknetwork";
import Loader from "../../../../../components/loader";
import showtoast from "../../../../../components/Toastmessage";
import {
  fetchgirlsstudents,
  fetchboysstudents,
  addattendence,
} from "../../../../../services/attendence/attendence";
import { Linking } from "react-native";

const TakeAttendence = () => {
  const { wardeninfo } = useContext(Wardencontext); //context api
  const route = useRoute(); //while navigating iam passed props
  const { roomid, blockid } = route.params;

  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [students, setstudents] = useState([]);
  const [attendanceStatus, setattendanceStatus] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingtext, setloadingtext] = useState("");
  useEffect(() => {
    const currentDate = new Date();
    const format = currentDate.toLocaleDateString("en-GB");
    const formattedTime = currentDate.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    setdate(format);
    settime(formattedTime);

    const fetchstudents = async () => {
      setloading(true);
      setloadingtext("Fetching students...");
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

      let response;
      if (wardeninfo.hostel_type === "Girls") {
        response = await fetchgirlsstudents(blockid, wardeninfo.Year, roomid); //fetch girls block
      } else {
        response = await fetchboysstudents(blockid, roomid); //fetch boys block
      }

      if (response.success) {
        setstudents(response.message);
        setattendanceStatus(response.message.map(() => "PRESENT")); //two student means depfault ;["present","present"] like this
        console.log("Students:", response.message);
      } else {
        showtoast("error", response.message, "Error fetching students", "Top");
      }

      setloading(false);
    };

    fetchstudents();
  }, []);

  const handleStatusChange = (idx, status) => {
    const updated = [...attendanceStatus];
    updated[idx] = status; //updating status
    setattendanceStatus(updated);
  };

  const handlesubmit = async () => {
    const result = students.map((stu, idx) => ({
      date,
      time,
      name: stu.name,
      blockid: stu.blockid,
      roomid: stu.roomid,
      warden_id: wardeninfo.warden_id,
      status: attendanceStatus[idx],
      student_id: stu.reg,
      parent_phone: stu.parent_phone,
    }));
    setloading(true);
    setloadingtext("Marking attendance. Please wait...");
    const response = await addattendence(result);
    if (response.success) {
      showtoast(
        "success",
        response.message,
        "Succesfully Attendence Noted",
        "Top"
      );
    } else {
      showtoast(
        "error",
        response.message,
        "Error while Noting Attendence",
        "Top"
      );
    }
    setloading(false);
  };
  const sendWhatsAppMessage = (phoneNumber, studentName, date, time) => {
    const message = `Dear Parent,\nThis is to inform you that your child, ${studentName}, was absent from college on ${date} at ${time}.\n\nRegards,\nSIET College Hostel Warden`;
    const formattedPhone = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+91${phoneNumber}`; // change +91 to your default country code

    const url = `whatsapp://send?phone=${formattedPhone}&text=${encodeURIComponent(
      message
    )}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          showtoast("error", "WhatsApp not installed", "", "Top");
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <>
      <ScrollView className="bg-white flex-1">
        <Loader visible={loading} text={loadingtext} />
        <View className="flex-1 bg-white flex-col gap-6">
          {/* Header */}
          <View className="bg-purple-400 flex justify-center items-center h-12 rounded-bl-full rounded-br-full">
            <Text className="text-white font-black text-2xl">
              Attendance Track
            </Text>
          </View>

          {/* Date and Time */}
          <View className="flex flex-row justify-around">
            <View className="flex flex-row justify-center items-center gap-1">
              <Image
                source={require("../../../../../assets/attendence/calender.png")}
              />
              <Text>{date}</Text>
            </View>
            <View className="flex flex-row justify-center items-center gap-1">
              <Image
                source={require("../../../../../assets/attendence/Clock.png")}
              />
              <Text>{time}</Text>
            </View>
          </View>

          {/* Room ID */}
          <View>
            <Text className="text-center text-lg font-black text-purple-400">
              ROOM I'D : {roomid}
            </Text>
          </View>

          {/* Student Cards */}
          <View className="flex flex-col p-3">
            {students.map((data, idx) => (
              <View className="bg-purple-400 rounded-lg h-40 mb-5" key={idx}>
                <View className="flex flex-col gap-6 w-full p-3">
                  <View className="flex flex-row justify-between w-full p-2">
                    <Text className="text-white font-black text-lg">
                      {data.name}
                    </Text>
                    <Text className="text-white font-black text-lg">
                      {data.dept}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        sendWhatsAppMessage(
                          data.parent_phone,
                          data.name,
                          date,
                          time
                        )
                      }
                    >
                      <Image
                        source={require("../../../../../assets/attendence/WhatsApp.png")}
                        className="h-8 w-8"
                      />
                    </TouchableOpacity>
                  </View>

                  <View className="flex flex-row justify-between w-full">
                    {["PRESENT", "ABSENT", "PERMISSION"].map((status) => (
                      <TouchableOpacity
                        key={status}
                        className={`p-2 rounded-lg ${
                          attendanceStatus[idx] === status
                            ? status === "PRESENT"
                              ? "bg-[#4ACC92]"
                              : status === "ABSENT"
                              ? "bg-[#FF080C]"
                              : "bg-[#D2CA3E]"
                            : `border ${
                                status === "PRESENT"
                                  ? "border-[#4ACC92]"
                                  : status === "ABSENT"
                                  ? "border-[#FF080C]"
                                  : "border-[#D2CA3E]"
                              }`
                        }`}
                        onPress={() => handleStatusChange(idx, status)}
                      >
                        <Text
                          className={`${
                            attendanceStatus[idx] === status
                              ? "text-white"
                              : "text-black"
                          }`}
                        >
                          {status}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Submit Button */}
          <View className="flex justify-center items-center mb-6">
            <TouchableOpacity
              className="bg-purple-500 w-40 h-10 rounded-lg flex justify-center items-center"
              onPress={handlesubmit}
            >
              <Text className="text-white font-black text-center">SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TakeAttendence;
