import { createSlice } from '@reduxjs/toolkit'
import { GET_ALL_COLLECTION_DATA } from "./ActionsTypes";


// const initialState = {
//     allData : []
// }

// export default function CollectionReducer(state = initialState,action){
//     switch(action.type) {
//         case GET_ALL_COLLECTION_DATA:
//             return {...state, allData: action.payload}
//         default :
//         return state    
//     }
// }

export const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
      allData: [],
    },
    reducers: {
      addAllCollectionListData: (state, action) => {
        console.log('actions',action);
        state.allData = action.payload
      },
    },
  })

  export const {addAllCollectionListData} = collectionSlice.actions

  export default collectionSlice.reducer