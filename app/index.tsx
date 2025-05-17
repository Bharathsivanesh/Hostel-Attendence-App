import React from "react";
import Toast from "react-native-toast-message";
import Mystack from "../app/navigation/rootnavigation";
import {WardenProvider} from "../app/context/wardencontext"
const App = () => {
  return (
    <>
    <WardenProvider>
      <Mystack />
      <Toast />
      </WardenProvider>
    </>
  );
};
export default App;
