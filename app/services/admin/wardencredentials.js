import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/index";
import { doc, setDoc, collection, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore";

export const handleAddWarden = async (warden) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      `${warden.warden_id}@gmail.com`,  // Firebase needs email format
      warden.password
    );

    const uid = userCredential.user.uid; //after authencticate for each authticate create a uid using this only we fetch any warden data after authticate

    await setDoc(doc(db, "wardens", uid), {
      uid: uid,
      name: warden.name,
      joined_date: warden.joined_date,
      gender: warden.gender,
      hostel_type: warden.hostel_type,
      block_id: warden.block_id,
      warden_id: warden.warden_id,
      role:"warden",
      Year:warden.Year,
      // Don't store password here!  
    });

    return{
        success:true,
        message:"Sucessfully Added",
    }
  } catch (error) {
       return{
        success:false,
       message:error.message
       }
  }
};


export const deletewarden = async (id) => {
  try {
    const wardenRef = collection(db, "wardens");
    const q = query(wardenRef, where("warden_id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "No Warden found with this ID" };
    }

    // Only one document expected
    const wardenDoc = querySnapshot.docs[0];
    await deleteDoc(doc(db, "wardens", wardenDoc.id));

    return { success: true };
  } catch (error) {
    console.error("Error deleting warden:", error);
    return { success: false, message: error.message };
  }
};


export const 
fetchwarden=async()=>{
  try{
      const wardenref=collection(db,"wardens");
      const doc=await getDocs(wardenref);

      if(doc.empty)
      {
        return{
          success:false,
          message:"NoData Entered"
        }
      }

    const warden=doc.docs.map((doc)=>doc.data());
      return {
      success: true,
      message: warden,
    };
  }
  catch(error)
  {
   return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}


export const fetchupdatewarden = async (id) => {
  try {
    const wardenRef = collection(db, "wardens");
    const q = query(wardenRef, where("warden_id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "No Warden found with this ID" };
    }

    // Assuming one warden per UID
    const studentDoc = querySnapshot.docs[0];
    return {
      success: true,
      data:studentDoc.data(),     
    };
  } catch (error) {
    console.error("Error fetching warden:", error);
    return {
      success: false,
      message: "Error fetching warden",
    };
  }
};

export const  updatewarden = async (id,formdata) => {
  try {
    const wardenRef = collection(db, "wardens");
    const q = query(wardenRef, where("warden_id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "No warden found with this ID" };
    }

    const wardenDoc = querySnapshot.docs[0];
     await updateDoc(wardenDoc.ref, formdata);
    return {
      success: true,
      message:"Successfully updated!"     
    };
  } catch (error) {
    console.error("Error fetching warden:", error);
    return {
      success: false,
      message: "Error fetching warden",
    };
  }
};
