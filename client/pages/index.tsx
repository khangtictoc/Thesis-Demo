import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import React, { useRef, ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "@/stores/store";
import {
  popupAction,
  setPathFile,
  setIsLoading,
  setResult,
  setFileContent,
} from "@/stores/toggleSlice";
import {
  callBEToAnalysic,
  extractFeature,
  getLogTerminal,
  uploadFileToBE,
} from "@/api-client/upload_file";

const Home: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<any>(null);

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files && event.target.files[0]) {
        const image = event.target.files[0];
        setImage(image);

        console.log("image", image);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const submitFile = async () => {
    dispatch(setIsLoading(true));
    dispatch(popupAction());

    if (image) {
      const res1 = await uploadFileToBE(image);
      console.log("res1:", res1);
      const res2 = await extractFeature();
      let logTerminal = null;
      console.log("res2:", res2);
      let flag = false;
      while (!flag) {
        logTerminal = await getLogTerminal();
        console.log("logTerminal:", logTerminal.data.fileContent);
        dispatch(setFileContent(logTerminal.data.fileContent));
        if (
          logTerminal.data.fileContent &&
          logTerminal.data.fileContent.includes(
            "============== FINISH EVALUATE ================"
          )
        ) {
          flag = true;
          const res3 = await callBEToAnalysic();
          console.log("res3:", res3);
          if (res3.status===200){
            dispatch(setIsLoading(true));
            if (res3.data.conclusion === "malware"){
              dispatch((setResult("malware")));
            }else if (res3.data.conclusion === "benign"){
              dispatch((setResult("benign")));
            }
          }
        }
      }

    }

    dispatch(setIsLoading(false));

  };
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className="flex flex-col justify-items-start items-center w-full">
      <div className="flex flex-row my-4">
        <Image alt="Flowbite logo" height="100" src="/logo.svg" width="100" />
        <span className="self-center whitespace-nowrap pl-3 text-7xl font-semibold dark:text-white">
          AnalysicAPK
        </span>
      </div>
      <div className="w-[40%] text-center my-4">
        Analyse suspicious files, domains, IPs and URLs to detect malware and
        other breaches, automatically share them with the security community.
      </div>
      <div className="pb-2 w-[50%] border-b mb-4"></div>
      <Image alt="Flowbite logo" height="150" src="/security.png" width="150" />
      <div className="my-4">
        <input type="file" onChange={uploadFile} />
      </div>
      <Button onClick={submitFile} outline gradientDuoTone="greenToBlue">
        Analysic File
      </Button>
    </div>
  );
};

Home.Layout = MainLayout;

export default Home;