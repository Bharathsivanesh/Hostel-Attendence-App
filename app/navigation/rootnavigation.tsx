import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../features/splash/splashscreen";
import Selectrole from "../features/selectrole/selectrolepage";
import Wardenlogin from "../features/auth/wardenlogin";
import Adminlogin from "../features/auth/adminlogin";
import Dashboard from "../features/warden/dashboard/screens/dashboard";
import Exportexcel from "../features/warden/dashboard/screens/Exportdata/exportexcel";
import Addedit from "../features/warden/dashboard/screens/Addandedit/addedit";
import Admindashboard from "../features/admin/dashboard/screens/admindashboard";
import Adddetails from "../features/warden/dashboard/screens/Addandedit/adddetails";
import Editdetails from "../features/warden/dashboard/screens/Addandedit/editdetails";
import Addwarden from "../features/admin/dashboard/screens/addwarden/addwarden";
import Editwarden from "../features/admin/dashboard/screens/editwarden/editwarden";
import Viewwarden from "../features/admin/dashboard/screens/viewwarden/viewwarden";

import Showrooms from "../features/warden/dashboard/screens/Takeattendence/showrooms";
import TakeAttendence from "../features/warden/dashboard/screens/Takeattendence/takeattendence";
import {WardenProvider} from "../context/wardencontext"

const Stack = createNativeStackNavigator();
const Mystack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Selectrole"
        component={Selectrole}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Wardenlogin"
        options={{ headerShown: false }}
         component={Wardenlogin}
      />
      <Stack.Screen
        name="Adminlogin"
        component={Adminlogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Exportexcel"
        component={Exportexcel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Addeditdata"
        component={Addedit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Admindashboard"
        component={Admindashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Adddetails"
        component={Adddetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Editdetails"
        component={Editdetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Addwarden"
        component={Addwarden}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Editwarden"
        component={Editwarden}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Viewwarden"
        component={Viewwarden}
        options={{ headerShown: false }}
      />
      

      <Stack.Screen
        name="Showrooms"
         component={Showrooms}
        options={{ headerShown: false }}/>

      <Stack.Screen
        name="TakeAttendence"
         component={TakeAttendence}
        options={{ headerShown: false }}/>

    </Stack.Navigator>
  );
};
export default Mystack;
