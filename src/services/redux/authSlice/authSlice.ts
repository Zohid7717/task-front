import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { LogInReqType, LogInResType, UserType } from './type';


const createSliceWithThinks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
})

type authStateType = {
  user: UserType | null,
  role: string,
  isLoading: boolean,
  token: string | null,
  message: string
}

const initialState: authStateType = {
  user: null,
  role: '',
  isLoading: false,
  token: null,
  message: ''
}

const authSlice = createSliceWithThinks({
  name: "auth",
  initialState,
  reducers: (create) => ({
    logOut: create.reducer((state) => {
      state.user = null
      state.isLoading = false
      state.role = ''
      state.token = null
      state.message = ''
      window.localStorage.removeItem('token')
    }),
    getMe: create.asyncThunk<UserType>(
      async (_, { rejectWithValue }) => {
        const token = window.localStorage.getItem('token')
        try {
          const res = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          const data = await res.json()
          if (!data) {
            throw new Error('Произошло ошибка')
          }
          return data
        } catch (error) {
          return rejectWithValue(error)
        }
      }, {
      pending: (state) => {
        state.isLoading = true
      },
      fulfilled: (state, action) => {
        state.isLoading = false
        state.role = action.payload.role
      },
      rejected: (state, action) => {
        state.isLoading = false
        console.log(action.error)
      }
    }
    ),
    logIn: create.asyncThunk<LogInResType, LogInReqType>(
      async ({ email, password }, { rejectWithValue }) => {
        try {
          const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          })
          const data = await res.json()
          if (!data) {
            throw new Error('Произошло ошибка')
          }
          return data
        } catch (error) {
          return rejectWithValue(error)
        }
      }, {
      pending: (state) => {
        state.isLoading = true
      },
      fulfilled: (state, action) => {
        state.isLoading = false
        state.token=action.payload.access_token
        window.localStorage.setItem('token', action.payload.access_token)
      },
      rejected: (state, action) => {
        state.isLoading = false
        console.log(action.error)
      }
    }
    )
  })
})

export const { logOut, logIn, getMe } = authSlice.actions

export default authSlice.reducer