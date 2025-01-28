import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isUser: boolean;
}

const initialState: UserState = {
  isUser: false, 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsUser: (state, action: PayloadAction<boolean>) => {
      state.isUser = action.payload;
    },
  },
});

export const { setIsUser } = userSlice.actions;

export default userSlice.reducer;
