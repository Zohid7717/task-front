import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { ProductType } from './type';

const createSliceWithThinks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
})

type productStateType = {
  products: ProductType[] | null,
  isLoading: boolean | null,
  message: string | null
}

const initialState: productStateType = {
  products: null,
  isLoading: false,
  message: null
}

const productSlice = createSliceWithThinks({
  name: 'products',
  initialState,
  reducers: (create) => ({
    getAllProducts: create.asyncThunk< ProductType[], string>(
      async (url, { rejectWithValue }) => {
        try {
          const res = await fetch(url)
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
        state.products = action.payload
      },
      rejected: (state, action: any) => {
        state.isLoading = false
        state.message = action.error
      }
    }
    )
  })
})

export const { getAllProducts } = productSlice.actions
export default productSlice.reducer