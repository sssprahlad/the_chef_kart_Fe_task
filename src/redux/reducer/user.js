import { createSlice } from "@reduxjs/toolkit";  

const userSlice = createSlice({
    name: "user",
    initialState: {
      selectedDishesListGlobal: [],
      count: 0,
      ingredients: [],
      users: [] ,
      userLoggedIn: false
    },
    reducers: {
       setSelectedDishesListGlobal: (state, action) => {
           state.selectedDishesListGlobal = action.payload;
       },
       setCount: (state, action) => {
           state.count = action.payload;
       },
      setIngredients: (state, action) => {
          state.ingredients = action.payload;
      },
      setUsers: (state, action) => {
        state.users.push(action.payload);
      },
      resetUsers: (state) => {
        state.users = [];
      },
      resetSelectedDishesListGlobal: (state) => {
        state.selectedDishesListGlobal = [];
      },
      setUserLoggedIn: (state, action) => {
        state.userLoggedIn = action.payload;
      }
    
    },
}); 

export default userSlice.reducer;
export const { 
  setSelectedDishesListGlobal, 
  setCount, 
  setIngredients, 
  setUsers, 
  resetUsers, 
  resetSelectedDishesListGlobal,
  setUserLoggedIn 
} = userSlice.actions;