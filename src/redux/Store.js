import { configureStore } from '@reduxjs/toolkit'
import collectionReducer from './Reducers'
export default configureStore({
  reducer: {
    collection : collectionReducer
  },
})