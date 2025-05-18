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

export const fetchgirlsstudents = async (blockid, year, roomid) => {
  try {
    const q = query(
      collection(db, "students_list"),
      where("blockid", "==", blockid),
      where("year", "==", year),
      where("roomid", "==", roomid)
    );
    const getdocs = await getDocs(q);
    if (getdocs.empty) {
      return {
        success: false,
        message: "Nostudents Yet",
      };
    }

    const data = getdocs.docs.map((doc) => doc.data());
    return {
      success: true,
      message: data,
    };
  } catch (e) {
    return {
      success: false,
      message: "Falied To Fetch Data",
    };
  }
};
export const fetchboysstudents = async (blockid, roomid) => {
  try {
    const q = query(
      collection(db, "students_list"),
      where("blockid", "==", blockid),
      where("roomid", "==", roomid)
    );
    const getdocs = await getDocs(q);
    if (getdocs.empty) {
      return {
        success: false,
        message: "Nostudents Yet",
      };
    }

    const data = getdocs.docs.map((doc) => doc.data());
    return {
      success: true,
      message: data,
    };
  } catch (e) {
    return {
      success: false,
      message: "Falied To Fetch Data",
    };
  }
};

export const addattendence = async (studentsform) => {
  try {
    const mycolletcion = collection(db, "attendence");
    for (const student of studentsform) {
      await addDoc(mycolletcion, student);
    }
    return {
      success: true,
      message: "Sucessfully Added!",
    };
  } catch (e) {
    return {
      success: false,
      message: "Failed To Add data",
    };
  }
};
