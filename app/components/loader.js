import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
const Loader=({visible,text})=>{

    return(

   <Spinner
   visible={visible}
   textContent={text}
     textStyle={{ color: "#fff" }}
      color="white"
      overlayColor="rgba(0,0,0,0.5)"
   
   />

    )
}
export default Loader;