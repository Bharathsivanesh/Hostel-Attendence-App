import Toast from "react-native-toast-message";

const Toastmessage=(type,text1,text2,position)=>{
  Toast.show({
    type,
    text1,
    text2,
    position
  });

}
export default Toastmessage;