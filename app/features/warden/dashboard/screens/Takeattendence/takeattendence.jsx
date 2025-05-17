import { useRoute } from "@react-navigation/native";
import {View,Text} from "react-native"
const TakeAttendence=()=>{
      const route=useRoute();
    const{roomid,blockid}=route.params;
    return(
        <>
        <View>
            <Text>{roomid}</Text>
            <Text>{blockid}</Text>
        </View>
        </>
    )
}
export default TakeAttendence;