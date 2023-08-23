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
        <section>Task Details</section>
                <div>
                    <label>title: </label>
                    <input type='text' placeholder='title' value={title}
                   onChange={(e)=>set_title(e.target.value)}/>
                </div>
                <div>
                    <label>priority: </label>
                    <input type='text' placeholder='priority' value={priority}
                   onChange={(e)=>set_priority(e.target.value)}/>
                </div>
                <div>
                    <label>description: </label>
                    <input type='text' placeholder='description' value={description}
                   onChange={(e)=>set_description(e.target.value)}/>
                </div>
                <div>
                    <label>completed: </label>
                    <input type='text' placeholder='completed' value={completed}
                   onChange={(e)=>set_completed(e.target.value)}/>
                </div>
                <div>
                    <Button>
                        Submit
                    </Button>
                </div>
        </form>
    </Wrapper>
    
  )
}

export default AddTask
const Wrapper = styled.div`
`