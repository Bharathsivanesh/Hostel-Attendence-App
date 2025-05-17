import { Text, TouchableOpacity, View, TextInput, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import showtoast from "../../../../../components/Toastmessage";
import checknetwork from "../../../../../components/checknetwork"
import Loader from "../../../../../components/loader"
import {fetchupdatewarden,updatewarden} from "../../../../../services/admin/wardencredentials"
import { useState } from "react";

const Editwarden = () => {
  const validationschema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "Name should be alphabetic")
      .required("Name is required"),
    joined_date: Yup.string().required("Joined Date is required"),
    gender: Yup.string().required("Gender is required"),
    hostel_type: Yup.string().required("Hostel Type is required"),
    block_id: Yup.string().required("Block ID is required"),
    floor: Yup.string().required("Floor is required"),
    warden_id: Yup.string().required("Warden ID is required"),
   
  });

    const[id,setid]=useState("");
     const [loading,setloading]=useState(false);
    const[internet,setinternet]=useState(true);
    const[loadertext,setloadertext]=useState("");
      const[formdata,setformdata]=useState({
        
          name: "",
          joined_date:"",
          gender: "",
          hostel_type: "",
          block_id: "",
          floor: "",
          warden_id: "",
         
        })


   const handlefetch=async()=>{
    setloadertext("Fetching details...");
    if(!id)
    {
       showtoast("error", "No Id Entered", "Enter Id Of Deleted Student 🌐", "Top");
       return;
    }
    setloading(true);
        if(!internet)
        {
            showtoast("error", "Offline", "Please check your internet connection 🌐", "Top");
             setloading(false);
            return;
        }

        const response=await fetchupdatewarden(id);
        if(response.success)
        {
          setformdata(response.data);
          console.log(response.data);
        }
        else{
            showtoast("error", "Invalid", response.message, "Top");
        }
        setloading(false);
         
   }


  const handleupdate=async(values)=>{
      setformdata(values);//instead of formdata im storing "values" latest update from formik 
    setloadertext("Updating details...");
    console.log(formdata);
    if(!id)
    {
       showtoast("error", "No Id Entered", "Enter Id Of Deleted Student 🌐", "Top");
       return;
    }
    setloading(true);
        if(!internet)
        {
            showtoast("error", "Offline", "Please check your internet connection 🌐", "Top");
             setloading(false);
            return;
        }

        const response=await updatewarden(id,values);
        if(response.success)
        {
         
        showtoast("success", "Sucessfully Updated", response.message, "Top")
        }
        else{
            showtoast("error", "Invalid", response.message, "Top");
        }
        setloading(false);
        setformdata("");
        setid("");
         
   }

  return (
     <ScrollView>
        <Loader visible={loading} text={loadertext}/>
    <View className="bg-white flex-1">
       
      <View className="w-full h-12 bg-purple-400 flex-row justify-center items-center rounded-bl-full rounded-br-full">
        <Text className="text-2xl font-bold text-white italic">Edit Warden</Text>
      </View>

     
                 <View className="flex flex-col w-full items-center justify-center gap-4 mt-5">
                   <Text className="text-purple-500  text-center  w-full text-xl font-bold italic">
                     Enter Student I'D
                   </Text>
                   <TextInput onChangeText={setid} className="border-purple-500 border rounded-md w-2/3" />
                   <View className="flex flex-row  space-x-12 ">
                     <TouchableOpacity onPress={handlefetch} className="bg-purple-400 p-2 px-8 border rounded-lg  " >
                       <View className="flex-row justify-center items-center">
                         <Ionicons name="create-outline" size={20} color="white" />
                         <Text className="ml-1 text-white font-bold ">Edit</Text>
                       </View>
                     </TouchableOpacity>
     
                    
                   </View>
                 </View>

      
        <Formik
          initialValues={formdata}
                       enableReinitialize={true}
                      validationSchema={validationschema}
                      onSubmit={(values)=>{
                        console.log("correct",values)
                        handleupdate(values);//latest update form formik
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
              {/* Name */}
              <View>
                <Text className="text-purple-600 font-bold italic">Name</Text>
                <TextInput
                  className="border border-purple-400 rounded-xl p-3"
                  placeholder="Enter Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <Text className="text-red-500">{errors.name}</Text>
                )}
              </View>

              {/* Joined Date */}
              <View>
                <Text className="text-purple-600 font-bold italic">Joined Date</Text>
                <TextInput
                  className="border border-purple-400 rounded-xl p-3"
                  editable={false}
                  onChangeText={handleChange("joined_date")}
                  onBlur={handleBlur("joined_date")}
                   value={values.joined_date}
                />
                
            
              </View>

              {/* Gender */}
              <View>
                <Text className="text-purple-600 font-bold italic">Gender</Text>
                <View className="border border-purple-400 rounded-xl">
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

              {/* Hostel Type */}
              <View>
                <Text className="text-purple-600 font-bold   italic">Hostel Type</Text>
                <View className="border border-purple-400 rounded-xl">
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

              {/* Block ID */}
              <View>
                <Text className="text-purple-600 font-bold italic">Block ID</Text>
                <TextInput
                  className="border border-purple-400 rounded-xl p-3"
                  placeholder="Enter Block ID"
                  onChangeText={handleChange("block_id")}
                  onBlur={handleBlur("block_id")}
                  value={values.block_id}
                />
                {touched.block_id && errors.block_id && (
                  <Text className="text-red-500">{errors.block_id}</Text>
                )}
              </View>

              {/* Floor */}
              <View>
                <Text className="text-purple-600 font-bold italic">Floor</Text>
                <TextInput
                  className="border border-purple-400 rounded-xl p-3"
                  placeholder="Enter Floor"
                  onChangeText={handleChange("floor")}
                  onBlur={handleBlur("floor")}
                  value={values.floor}
                />
                {touched.floor && errors.floor && (
                  <Text className="text-red-500">{errors.floor}</Text>
                )}
              </View>

           

         

              {/* Submit Button */}
              <View className="flex items-center justify-center mb-4">
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="w-1/2 h-10 mt-6 rounded-md bg-purple-500 flex items-center justify-center"
                >
                  <Text className="text-white text-lg font-semibold">Submit</Text>
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
