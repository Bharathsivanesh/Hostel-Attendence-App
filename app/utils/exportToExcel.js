import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as XLSX from "xlsx";
import * as MailComposer from "expo-mail-composer";

import { Alert } from "react-native";

export const exportToExcel = async (data, fileName, ismail) => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data); //convert json to excel formate (header)
    const workbook = XLSX.utils.book_new(); //create empty excel
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName); //append datao into excel

    const wbout = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });
    const uri = FileSystem.cacheDirectory + `${fileName}.xlsx`; //It will be saved temporarily in the app’s cache folder.

    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    if (ismail == "mail") {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (!isAvailable) {
        alert("Mail service is not available on this device.");
        return;
      }

      await MailComposer.composeAsync({
        recipients: ["bharathsivanesh@gmail.com"],
        subject: "Attendance Report",
        body: `Dear Admin,\n\nHere is the attendance report for today.\n\nRegards,\nHostel Warden`,
        attachments: [uri],
      });
    } else {
      if (await Sharing.isAvailableAsync()) {
        //sharing the excell thriugh online media
        await Sharing.shareAsync(uri, {
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          dialogTitle: "Share Excel File",
          UTI: "com.microsoft.excel.xlsx",
        });
      } else {
        Alert.alert("Info", "Sharing is not available on this device.");
      }
    }
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    Alert.alert("Error", "Failed to export Excel file.");
  }
};
