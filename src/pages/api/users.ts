import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { User } from "@/utils/types";
import { groupByDepartment } from "@/lib/dataProcessing";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get("https://dummyjson.com/users");
    const users: User[] = response.data.users;

    // ค้นหาแผนกผู้ใช้ (ต้องมีการเพิ่ม field สำหรับแผนกในข้อมูล API)
    const groupedData = groupByDepartment(users);
    res.status(200).json(groupedData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data", error });
  }
}
