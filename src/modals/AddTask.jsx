import React,{useState} from 'react'
import styled from 'styled-components'
import { Button } from '../components'
import Api from '../api/index'
import { add_task } from '../redux/reducers/taskReducer'
import { useDispatch } from 'react-redux'


const AddTask = () => {
    const [title,set_title] = useState('');
    const [priority,set_priority] = useState('');
    const [description,set_description] = useState('');
    const [completed,set_completed] = useState('');
    const dispatch = useDispatch();
    const handleAddtask =(e)=>{
        e.preventDefault();
        const body={
            title,
            priority,
            description,
            completed,
        };
        if(!title && !priority && !description && !completed){
            alert("Fill all required fields");
            return;
        };
        // if(!Api.check())return;
        const url= 'tasks';
        Api.post({url,body:JSON.stringify(body)})
        .then(data=>{
            console.log(data,"data");
            if(data.err){
    
            }
            else if(data.id){
                alert("Task added successfullly");
                dispatch(add_task(data))
            }else{
    
            }
        })
    };
  return (
    <Wrapper>
        <form onSubmit={handleAddtask}>
        <label>Task Details</label>
               
                    <label>Title: </label>
                    <input type='text' placeholder='title' value={title}
                   onChange={(e)=>set_title(e.target.value)}/>
               
                    <label>Priority: </label>
                    <input type='text' placeholder='priority' value={priority}
                   onChange={(e)=>set_priority(e.target.value)}/>
              
                    <label>Description: </label>
                    <input type='text' placeholder='description' value={description}
                   onChange={(e)=>set_description(e.target.value)}/>
                
                    <label>Completed: </label>
                    <input type='text' placeholder='completed' value={completed}
                   onChange={(e)=>set_completed(e.target.value)}/>
                
                    <Button>
                        Submit
                    </Button>
                
        </form>
    </Wrapper>
    
  )
}

export default AddTask
const Wrapper = styled.div`
 width: 100%;
    margin: 30px auto;
    border: 1px solid red;
    background-color: #3e4f55;
    color: white;
    padding: 20px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
    &>form{
        width: 350px;
        gap: 10px;
        display: grid;
        align-items: center;
        & > label:first-child{
            font-size: 20px;
            color: white;
        };
        & > label{
            text-align: center;
            margin-top: 0px;
            color: rgb(0,0,0);
            width: 100%;
        };
        &.trash{
            right: 0;
            color: white;
        };
        &>div{
            display: flex;
            justify-content: center;
        }
    }
`