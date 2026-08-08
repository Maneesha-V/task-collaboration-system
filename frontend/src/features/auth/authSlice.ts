import { createSlice } from "@reduxjs/toolkit";
import { login, refreshToken } from "./authThunk";
import type { AuthState } from "./authTypes";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
  authChecked: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.authChecked = true;
      localStorage.removeItem("accessToken");
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        console.log("resp-log", action.payload);
        state.loading = false;

        state.user = action.payload.data.user;

        state.accessToken = action.payload.data.accessToken;

        localStorage.setItem("accessToken", action.payload.data.accessToken);
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.authChecked = false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        console.log("resp-ref", action.payload);
        state.loading = false;
        state.accessToken = action.payload.data.accessToken;
        state.user = action.payload.data.user;
        state.authChecked = true;
        localStorage.setItem(
          "accessToken",
          action.payload.data.accessToken
        );
      })
      .addCase(refreshToken.rejected, (state) => {
        state.loading = false;
        state.authChecked = true;
        state.accessToken = null;
        state.user = null;
        localStorage.removeItem("accessToken");
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
