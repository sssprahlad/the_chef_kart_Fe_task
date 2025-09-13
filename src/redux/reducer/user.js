import { createSlice } from "@reduxjs/toolkit";  

const userSlice = createSlice({
    name: "user",
    initialState: {
      selectedDishesListGlobal: []
       
    },
    reducers: {
       setSelectedDishesListGlobal: (state, action) => {
           state.selectedDishesListGlobal = action.payload;
       }
    
    },
}); 

export default userSlice.reducer;
export const { setSelectedDishesListGlobal } = userSlice.actions;