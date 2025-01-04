import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLogIn: boolean;
  user: { email: string; name: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLogIn: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ email: string; name: string }>) {
      state.loading = false;
      state.isLogIn = true;
      state.user = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLogIn = false;
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
