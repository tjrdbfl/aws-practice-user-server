import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./counter-init";

export const counterSlice = createSlice({
  name: "counter",  // 슬라이스의 키값은 리듀서의 키값인 count이다. 이름이 counter
  initialState, // 속성
  reducers: {   // 기능
    handleClickPlus: (state) => {
      state.value += 1;
    },
    handleClickMinus: (state) => {
      state.value -= 1;
    },

  },
});

export const { handleClickPlus, handleClickMinus } = counterSlice.actions 

export const getCount = (state: any) => state.count.value;

export default counterSlice.reducer;