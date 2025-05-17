import React, { useState } from "react";
import DeleteWardenModal from "../../components/deletewardenmodel"; // Adjust path if needed
import { useNavigation } from "expo-router";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import {deletewarden } from "../../../../services/admin/wardencredentials";
import showtoast from "../../../../components/Toastmessage";
import checknetwork from "../../../../components/checknetwork"
import Loader from "../../../../components/loader"
const Admindashboard = () => {
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [wardenId, setWardenId] = useState("");
  const[loading,setloading]=useState(false);
  const cards = [
    {
      icon: "person-add",
      text1: " Add Warden",
      text2: "Add new warden details",
      route: "Addwarden",
    },
    {
      icon: "create-outline",
      text1: " Edit Warden",
      text2: " Update basic warden details",
      route: "Editwarden",
    },
    {
      icon: "trash-outline",
      text1: " Delete Warden",
      text2: "  Remove warden details",
      route: null,
    },
    {
      icon: "eye-outline",
      text1: "  View Warden",
      text2: "  See all warden information",
      route: "Viewwarden",
    },
  ];

  const handleDelete = async() => {
    // Your delete logic using wardenId
    if(!wardenId)

      {
         showtoast("error","Invalid","Enter I'D🤧","Top");
        return;
      }
    console.log("Deleting Warden with ID:", wardenId);
  
          setloading(true);
       const response=await deletewarden (wardenId);

         if(response.success)
         {
            showtoast("success", "Sucessfully!", "Sucessfully Deleted 🥳", "Top");
         }
         else{
             showtoast("error",response.message,"Finds an Error🤧","Top");
         } 
      setloading(false);
    setModalVisible(false);
    setWardenId("");
  };

  return (
    <View className="bg-white flex-1 pt-12">
       <Loader visible={loading} text="Deleting Warden details..."/>
      <View className="flex items-center justify-center">
        <Text className="text-3xl text-purple-500 font-extrabold">
          👨‍💼 Admin Dashboard
        </Text>
        <Text className="mt-3 font-medium text-gray-500">
          Manage wardens efficiently
        </Text>
      </View>

      <View className="flex flex-col gap-12 px-6 pl-8 mt-2">
        {cards.map((obj, idx) => (
          <Animatable.View
            animation="flipInX"
            delay={idx * 100}
            duration={600}
            key={idx}
          >
            <TouchableOpacity
              onPress={() => {
                if (obj.text1 === " Delete Warden") {
                  setModalVisible(true);
                } else if (obj.route) {
                  navigation.navigate(obj.route);
                }
              }}
              className="flex flex-row gap-3 items-center rounded-xl bg-purple-200 p-4 shadow-sm"
            >
              <Ionicons name={obj.icon} size={40} color="#7C3AED" />
              <View>
                <Text className="text-purple-700 text-xl font-semibold">
                  {obj.text1}
                </Text>
                <Text className="text-purple-600 text-sm">{obj.text2}</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>

    {/* this is model */}
      <DeleteWardenModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={handleDelete}
        id={wardenId}
        setId={setWardenId}
      />
    </View>
  );
};

export default Admindashboard;
