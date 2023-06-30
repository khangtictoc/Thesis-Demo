import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("process.cwd()", process.cwd());
  let pathfile = process.cwd();
  let arr_temp = pathfile.split("/");
  arr_temp.pop();
  const filePath = path.join(
    "/",
    ...arr_temp,
    "flask-server/reports/temp.txt"
  ); // replace 'yourfile.txt' with your file path
  console.log("filePath:", filePath);
  const fileContent = fs.readFileSync(filePath, "utf8");

  res.status(200).json({ fileContent });
  //   res.status(200).json({ data: "ok" });
}
