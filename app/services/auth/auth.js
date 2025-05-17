import { auth, db } from "../../firebase/index";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";


export const AuthLogin = async (email, password) => {
  try {
    // Step 1: Sign in user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Step 2: Query the 'admin' collection for matching UID
    const q = query(collection(db, "admin"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    // Step 3: Check if UID exists in the collection
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();

      return {
        success: true,
        message: userData, // send user details
      };
    } else {
      return {
        success: false,
        message: "No user found in Firestore with this UID",
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "Login failed: " + err.message,
    };
  }
};


export const AuthWardenLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const q = query(collection(db, "wardens"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();

      // Important: Clean up role field if it has extra quotes
     

      if (userData.role === "warden") {
        return {
          success: true,
          message: userData,
        };
      } else {
        return {
          success: false,
          message: "Not a warden its a Admin",
        };
      }
    } else {
      return {
        success: false,
        message: "No matching warden record found",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

