import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  authUser: {
    userId: string,
    accessToken: string,
    refreshToken: string,
    email: string,
    role: number,
  },
  profileUser: any,
}

const initialState: UserState = {
    authUser: {
        userId: "",
        accessToken: "",
        refreshToken: "",
        email: "",
        role: 0,
    },
    profileUser: {},
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
    updateInfoDoctorStore: (state, action: PayloadAction<any>) => {
      state.profileUser.dob = action.payload?.dob;
      state.profileUser.firstName = action.payload?.firstName;
      state.profileUser.lastName = action.payload?.lastName;
      state.profileUser.phoneNumber = action.payload?.phoneNumber;
      state.profileUser.address = action.payload?.address;
      state.profileUser.specialistIn = action.payload?.specialistIn;
      state.profileUser.avatarUrl = action.payload?.avatarUrl;
    },
    updateProfileDoctorStore: (state, action: PayloadAction<any>) => {
      state.profileUser.profile.intro = action.payload?.introduction;
      state.profileUser.profile.experience = action.payload?.experience;
      state.profileUser.profile.awards = action.payload?.awards;
    },
  },
})

export const { updateAuthUser, updateProfileUser, updateInfoDoctorStore, updateProfileDoctorStore } = userSlice.actions

export default userSlice.reducer