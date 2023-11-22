import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { getToken } from "./admin.models";
import { RootState } from "../../store/store";

export interface Session {
  id?: string;
  token?: string;
}

interface UserAuthState {
  session: Session,
}

const initialState: UserAuthState = {
  session: getToken(),
}

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
      logIn: (state) => {
         state.session = getToken();
      },
      logOut: (state) => {
          state.session = initialState.session;
      }
  }
})

export const {logIn, logOut} = userAuthSlice.actions

const userAuthState = (state: RootState) => state.userAuth

export const selectSession = createDraftSafeSelector(
  userAuthState,
  (state) => state.session
)

export const selectedUserId = createDraftSafeSelector(
  userAuthState,
  (state) => state.session.id ?? ''
)

export const selectedUserToken = createDraftSafeSelector(
  userAuthState,
  (state) => state.session.token
)