import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '$src/types';

export interface AppState {
  user: Partial<User>;
}

const initialState: AppState = {
  user: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = appSlice.actions;

export const appReducer = appSlice.reducer;
