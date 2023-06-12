import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  authUser: {
    userId: string,
    accessToken: string,
    refreshToken: string,
    email: string,
    role: number,
    branchId: string,
  },
  profileUser: {
    age: number,
    dateOfBirth: string,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    moreInfo: string,
    phoneNumber: string,
    address: string,
  }
}

const initialState: UserState = {
    authUser: {
        userId: "",
        accessToken: "",
        refreshToken: "",
        email: "",
        role: 0,
        branchId: "",
    },
    profileUser: {
      age: 0,
      dateOfBirth: "",
      email: "",
      firstName: "",
      gender: "",
      id: "",
      lastName: "",
      moreInfo: "",
      phoneNumber: "",
      address: "",
    }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAuthUser: (state, action: PayloadAction<any>) => {
      state.authUser = action.payload
    },
    updateProfileUser: (state, action: PayloadAction<any>) => {
      state.profileUser = action.payload
    },
  },
})

export const { updateAuthUser, updateProfileUser } = userSlice.actions

export default userSlice.reducer