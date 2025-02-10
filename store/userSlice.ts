import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

const initialState: UserState = {
  uid: '',
  email: null,
  displayName: null,
  photoURL: null,
  emailVerified: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<UserState>) => action.payload, // Directly return the new user state
    clearUser: () => initialState, // Reset to initial state when user logs out
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
