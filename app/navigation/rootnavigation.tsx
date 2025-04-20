import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../features/splash/splashscreen";
import Selectrole from "../features/selectrole/selectrolepage";
import Wardenlogin from "../features/auth/wardenlogin";
import Adminlogin from "../features/auth/adminlogin";
import Dashboard from "../features/warden/dashboard/screens/dashboard";
import Exportexcel from "../features/warden/dashboard/screens/Exportdata/exportexcel";
import Addedit from "../features/warden/dashboard/screens/Addandedit/addedit";
import Admindashboard from "../features/admin/dashboard/screens/admindashboard";
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
        component={Wardenlogin}
        options={{ headerShown: false }}
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
    </Stack.Navigator>
  );
};
export default Mystack;
