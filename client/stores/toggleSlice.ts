import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ToggleState = {
  isPopup: boolean;
  isLoading: boolean;
  result: string;
  pathFile: string | null;
  fileContent: string | null;
};

const initialState: ToggleState = {
  isPopup: false,
  isLoading: false,
  result: "",
  pathFile: null,
  fileContent: null,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    popupAction: (state) => {
      state.isPopup = !state.isPopup;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setResult: (state, action: PayloadAction<string>) => {
      state.result = action.payload;
    },
    setPathFile: (state, action: PayloadAction<string>) => {
      state.pathFile = action.payload;
    },
    setFileContent: (state, action: PayloadAction<string>) => {
      state.fileContent = action.payload;
    },
  },
});

export const { popupAction, setIsLoading, setResult, setPathFile, setFileContent } =
  toggleSlice.actions;
export default toggleSlice.reducer;
