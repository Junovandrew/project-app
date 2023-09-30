import {createSlice} from '@reduxjs/toolkit'




export const userReducer = createSlice({
    name:'users',
    initialState:{users:[]},
    reducers:{
        set_users:(state,action)=>{
            return {users:action.payload};
        },
        add_user:(state,action) => {
            return{
                users:[action.payload,...state.users]
            }
        },
        delete_user:(state,action) => {
            let updatedUsers = state.users.filter((euser=>
                euser.id != action.payload.id));
            return{
                users: updatedUsers,
            }
        },
        edit_user:(state,action) => {
            const updatedUser = state.users.map((euser=>
                euser.id == action.payload.id?
                {...euser,...action.payload}:euser));
            return{
                users: updatedUser,
            }
        }
    }
});

export default userReducer.reducer;
export const {set_users,add_user,delete_user,edit_user} = userReducer.actions;