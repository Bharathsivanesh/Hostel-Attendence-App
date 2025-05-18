import { db } from "../../firebase/index";
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

export const fetchtsudents = async () => {
  try {
    const studentref = collection(db, "students_list");
    const getdocs = await getDocs(studentref);
    const result = [];

    getdocs.forEach((doc) => {
      result.push(doc.data());
    });

    return {
      success: true,
      message: result,
    };
  } catch (e) {
    return {
      success: false,
      message: "Erro In Fetching Students Db",
    };
  }
};

export const fetchtattendence = async () => {
  try {
    const studentref = collection(db, "attendence");
    const getdocs = await getDocs(studentref);
    const result = [];

    getdocs.forEach((doc) => {
      result.push(doc.data());
    });

    return {
      success: true,
      message: result,
    };
  } catch (e) {
    return {
      success: false,
      message: "Erro In Fetching Attendence Db",
    };
  }
};

export const fetchttdyattendence = async (date, wardenid) => {
  try {
    const studentRef = collection(db, "attendence");

    // 🔍 Query with both `date` and `wardenid`
    const q = query(
      studentRef,
      where("date", "==", date),
      where("warden_id", "==", wardenid)
    );

    const snapshot = await getDocs(q);
    const result = [];

    snapshot.forEach((doc) => {
      result.push(doc.data());
    });

    return {
      success: true,
      message: result,
    };
  } catch (e) {
    console.error("Error fetching filtered attendance:", e);
    return {
      success: false,
      message: "Error in fetching filtered attendance data from DB",
    };
  }
};
