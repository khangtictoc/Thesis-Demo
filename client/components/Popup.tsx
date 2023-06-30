import { useAppDispatch, RootState } from "@/stores/store";
import { popupAction } from "@/stores/toggleSlice";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import axios from "axios";

const ENDPOINT = "http://127.0.0.1:5000";

interface propPopup {
  result: string;
  isLoading: boolean;
  fileContent: string | null;
}

const Popup = (prop: propPopup) => {
  const dispatch = useAppDispatch();
  const handleCloseToggle = () => {
    dispatch(popupAction());
  };

  return (
    <div className="absolute top-0 z-[999] bg-[rgba(0,0,0,0.5)] h-screen w-screen">
      {prop.isLoading ? (
        <div className="py-[10px] w-3/5 sm:w-2/4 rounded-[16px] h-min left-1/2 fixed top-[20%] translate-x-[-50%] bg-white flex flex-col justify-center items-center">
          {/* Loading */}
          <div className="loader"></div>
          <div className="my-[15px]">Loading...</div>
          <div className="w-[95%] bg-black h-[300px] py-[10px] flex flex-col drop-shadow-xl">
            <div className="flex flex-col overflow-auto hide-scrollbar">
              {prop.fileContent &&
                prop.fileContent.split("\n").map((value, index) => (
                  <div key={index} className="text-white px-[10px]">
                    {value}
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {prop.result === "benign" ? (
            <div className=" w-1/5 sm:w-1/4 rounded-[16px] h-min left-1/2 fixed top-[40%] translate-x-[-50%] bg-white border-[2px] border-[#009A22]">
              <div className="flex flex-col items-center">
                <div className="mt-[17px] ml-[16px] text-[18px] font-normal text-[#181818] text-center mb-2">
                  Benign
                </div>
                <button
                  onClick={handleCloseToggle}
                  className="h-[35px] w-[150px] bg-gradient-to-r from-[#4ACC35] to-[#009A22] rounded-t-xl drop-shadow-xl text-white font-bold"
                >
                  OK
                </button>
              </div>
            </div>
          ) : (
            <div className=" w-1/5 sm:w-1/4 rounded-[16px] h-min left-1/2 fixed top-[40%] translate-x-[-50%] bg-white border-[2px] border-[#b72839]">
              <div className="flex flex-col items-center">
                <div className="mt-[17px] ml-[16px] text-[18px] font-normal text-[#181818] text-center mb-2">
                  Malware
                </div>
                <button
                  onClick={handleCloseToggle}
                  className="h-[35px] w-[150px] bg-gradient-to-r from-[#f45b44] to-[#b72839] rounded-t-xl drop-shadow-xl text-white font-bold"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Popup;
