import axios from "axios";
import axiosClient from "./axios-client";

export function uploadFileToBE(file: File) {
  const data = new FormData();
  data.append("file", file);
  return axiosClient.post("/api/upload_file", data);
}

export function extractFeature() {
  return axiosClient.get("/api/run_extraction");
}

export function callBEToAnalysic() {
  return axiosClient.get("/api/analysic_result");
}

export function getLogTerminal() {
  return axiosClient.get("/api/getLogTerminal");
}
