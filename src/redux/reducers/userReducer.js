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
        edit_user:(state,action) => {
            return{
                users:[action.payload,...state.users]
            }
        }
    }
});

export default userReducer.reducer;
export const {set_users,add_user} = userReducer.actions;