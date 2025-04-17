import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../features/splash/splashscreen";
import Selectrole from "../features/selectrole/selectrolepage";
import Wardenlogin from "../features/auth/wardenlogin";
import Adminlogin from "../features/auth/adminlogin";
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
    </Stack.Navigator>
  );
};
export default Mystack;
