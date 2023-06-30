import { LayoutProps } from "../../models/index";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import Popup from "@/components/Popup";
import { RootState, useAppDispatch, useAppSelector } from "@/stores/store";

const NavBar = dynamic(() => import("../navbar"), {
  ssr: false,
});

export function MainLayout({ children }: LayoutProps) {
  const { isPopup, isLoading, result, fileContent } = useSelector(
    (state: RootState) => state.toggle
  );
  useEffect(() => {
    console.log("isPopup", isPopup);
  }, [isPopup]);
  return (
    <div className="w-screen relative">
      <div className="border-b">
        <NavBar />
      </div>
      <div>{children}</div>
      {isPopup && (
        <Popup
          result={result}
          isLoading={isLoading}
          fileContent={fileContent}
        />
      )}
    </div>
  );
}
