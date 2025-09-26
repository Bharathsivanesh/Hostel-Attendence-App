import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/index";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { supabase } from "../../subabase/supabaseClient";
import * as FileSystem from "expo-file-system";

export const uploadWardenImage = async (imageFile, wardenId) => {
  try {
    // Read file as Base64
    const base64 = await FileSystem.readAsStringAsync(imageFile.localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert Base64 to Uint8Array for Supabase upload
    const uint8Array = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    const fileName = `wardens/${wardenId}_${Date.now()}.jpg`;

    // Upload to Supabase
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("Hostep-attendence") // exact bucket name
      .upload(fileName, uint8Array, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return null;
    }

    // Get public URL
    const { data: urlData, error: urlError } = supabase.storage
      .from("Hostep-attendence")
      .getPublicUrl(fileName);

    if (urlError) {
      console.error("Error getting public URL:", urlError);
      return null;
    }

    console.log("Upload successful! URL:", urlData?.publicUrl);
    return urlData.publicUrl;
  } catch (err) {
    console.error("Exception during upload:", err);
    return null;
  }
};

export const handleAddWarden = async (warden, imageFile) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      `${warden.warden_id}@gmail.com`, // Firebase needs email format
      warden.password
    );

    const uid = userCredential.user.uid; //after authencticate for each authticate create a uid using this only we fetch any warden data after authticate
    // Upload image to Supabase and get URL
    const imageUrl = await uploadWardenImage(imageFile, warden.warden_id);
    await setDoc(doc(db, "wardens", uid), {
      //this setDoc set a auto id as "UID"
      uid: uid,
      name: warden.name,
      joined_date: warden.joined_date,
      gender: warden.gender,
      hostel_type: warden.hostel_type,
      block_id: warden.block_id,
      warden_id: warden.warden_id,
      role: "warden",
      Year: warden.Year,
      profileImage: imageUrl || "",
      // Don't store password here!
    });

    return {
      success: true,
      message: "Sucessfully Added",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deletewarden = async (warden_id) => {
  try {
    const wardenRef = collection(db, "wardens");
    const q = query(wardenRef, where("warden_id", "==", warden_id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "No Warden found with this ID" };
    }

    const wardenDoc = querySnapshot.docs[0];
    const wardenData = wardenDoc.data();
    const uid = wardenData.uid;

    await deleteDoc(doc(db, "wardens", wardenDoc.id)); //auton id that only iam stting uid both are same

    return {
      success: true,
      message: "Warden deleted successfully from Auth and Firestore",
    };
  } catch (error) {
    console.error("Error deleting warden:", error);
    return { success: false, message: error.message };
  }
};

export const fetchwarden = async () => {
  try {
    const wardenref = collection(db, "wardens");
    const doc = await getDocs(wardenref);

    if (doc.empty) {
      return {
        success: false,
        message: "NoData Entered",
      };
    }

    const warden = doc.docs.map((doc) => doc.data());
    return {
      success: true,
      message: warden,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

export const fetchStudentCount = async (wardeninfo) => {
  try {
    const studentsRef = collection(db, "students_list");
    let q;

    if (wardeninfo.hostel_type === "Boys") {
      // Boys → same block only
      q = query(studentsRef, where("blockid", "==", wardeninfo.block_id));
    } else {
      // Girls → GB-1 and match year
      q = query(
        studentsRef,
        where("blockid", "==", "GB-1"),
        where("year", "==", wardeninfo.Year)
      );
    }

    const snapshot = await getDocs(q);
    console.log("..............", snapshot.size);
    return {
      success: true,
      count: snapshot.size, // number of matched students
    };
  } catch (error) {
    console.error("Error fetching students:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch students",
    };
  }
};

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
      data: studentDoc.data(),
    };
  } catch (error) {
    console.error("Error fetching warden:", error);
    return {
      success: false,
      message: "Error fetching warden",
    };
  }
};

export const updatewarden = async (id, formdata) => {
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
      message: "Successfully updated!",
    };
  } catch (error) {
    console.error("Error fetching warden:", error);
    return {
      success: false,
      message: "Error fetching warden",
    };
  }
};
