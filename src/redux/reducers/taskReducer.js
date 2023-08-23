import {createSlice} from '@reduxjs/toolkit'




export const taskReducer = createSlice({
    name:'tasks',
    initialState:{tasks:[]},
    reducers:{
        set_tasks:(state,action)=>{
            return {tasks:action.payload};
        },
        add_task:(state,action) => {
            return{
                tasks:[action.payload,...state.tasks]
            }
        }
    }
});

export default taskReducer.reducer;
export const {set_tasks,add_task} = taskReducer.actions;