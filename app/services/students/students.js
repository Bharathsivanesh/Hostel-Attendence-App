
import { Try } from "expo-router/build/views/Try";
import {db} from "../../firebase/index"
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";
export const addstudent=async(studentsform)=>{
    try{
        const mycolletcion=collection(db,"students_list");
        const addnewdoc=await addDoc(mycolletcion,studentsform);
        return{
            success:true,
            message:"Sucessfully Added!"
        }
    }
    catch(e)
    {
         return{
             success:false,
            message:"Failed To Add data"
         }
    }
}




export const deletestudent = async (id) => {
  try {
    const studentRef = collection(db, "students_list");
    const q = query(studentRef, where("reg", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "No student found with this ID" };
    }

    // Only one document expected
    const studentDoc = querySnapshot.docs[0];
    await deleteDoc(doc(db, "students_list", studentDoc.id));

    return { success: true };
  } catch (error) {
    console.error("Error deleting student:", error);
    return { success: false, message: error.message };
  }
};



export const fetchstudent = async (id) => {
  try {
    const studentRef = collection(db, "students_list");
    const q = query(studentRef, where("reg", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "No student found with this UID" };
    }

    // Assuming one student per UID
    const studentDoc = querySnapshot.docs[0];
    return {
      success: true,
      data:studentDoc.data(),     
    };
  } catch (error) {
    console.error("Error fetching student:", error);
    return {
      success: false,
      message: "Error fetching student",
    };
  }
};


export const  updatestudent = async (id,formdata) => {
  try {
    const studentRef = collection(db, "students_list");
    const q = query(studentRef, where("reg", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "No student found with this ID" };
    }

    const studentDoc = querySnapshot.docs[0];
     await updateDoc(studentDoc.ref, formdata);
    return {
      success: true,
      message:"Successfully updated!"     
    };
  } catch (error) {
    console.error("Error fetching student:", error);
    return {
      success: false,
      message: "Error fetching student",
    };
  }
};


export const fetchRoomIdsForWarden = async (wardenInfo) => {
  try {
    const studentRef = collection(db, "students_list");

    const q =
      wardenInfo.hostel_type === "Girls"
        ? query(
            studentRef,
            where("blockid", "==", wardenInfo.block_id),
            where("year", "==", wardenInfo.Year)
          )
        : query(studentRef, where("blockid", "==", wardenInfo.block_id));

    const querySnapshot = await getDocs(q);
      
    const roomIdsSet = new Set(); 

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.roomid) {
        roomIdsSet.add(data.roomid);
      }
    });

    const roomIds = Array.from(roomIdsSet);

    return { success: true, data: roomIds };
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return { success: false, message: "Failed to fetch rooms" };
  }
};
