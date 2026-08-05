import {
 createSlice
} from "@reduxjs/toolkit";

import {
 getUsers,
 createUser,
 deleteUser,
 updateUser,
 getUser
} from "./userThunk";
import type { User } from "./userTypes";

interface UserState {

 users: User[];
 loading: boolean;
 error: string | null;
 user: User | null;
}

const initialState: UserState = {

 users:[],
 loading:false,
 error:null,
 user: null,
};



const userSlice=createSlice({

 name:"users",

 initialState,

 reducers:{},


 extraReducers:(builder)=>{


 builder
 .addCase(
  getUsers.pending,
  (state)=>{
    state.loading=true;
  }
 )


 .addCase(
  getUsers.fulfilled,
  (state,action)=>{

    state.loading=false;

    state.users =
      action.payload.data;

  }
 )


 .addCase(
  createUser.fulfilled,
  (state,action)=>{

    state.users.push(
      action.payload
    );

  }
 )


 .addCase(
  deleteUser.fulfilled,
  (state,action)=>{

    state.users =
      state.users.filter(
        (user:any)=>
          user._id !== action.payload
      );

  }
 )

 .addCase(
 updateUser.fulfilled,
 (state,action)=>{

   const updatedUser =
     action.payload;


   const index =
    state.users.findIndex(
      user =>
      user._id === updatedUser.id
    );


   if(index !== -1){

    state.users[index] =
      updatedUser;

   }

 }
)


 .addCase(
  getUser.pending,
  (state)=>{
    state.loading=true;
  }
 )


 .addCase(
  getUser.fulfilled,
  (state,action)=>{

    state.loading=false;

    state.user =
      action.payload.data;

  }
 )
 }

});


export default userSlice.reducer;