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
        },
        delete_task:(state,action) => {
            let updatedTasks = state.tasks.filter((etask=>
                etask.id != action.payload.id));
            return{
                tasks: updatedTasks,
            }
        },
        edit_task:(state,action) => {
            const updatedTask = state.tasks.map((etask=>
                etask.id == action.payload.id?
                {...etask,...action.payload}:etask));
            return{
                tasks: updatedTask,
            }
        }
    }
});

export default taskReducer.reducer;
export const {set_tasks,add_task,delete_task,edit_task} = taskReducer.actions;