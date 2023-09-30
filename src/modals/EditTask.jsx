import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import { Button } from '../components'
import Api from '../api/index'
import { delete_task } from '../redux/reducers/taskReducer'
import { edit_task } from '../redux/reducers/taskReducer'
import { useDispatch } from 'react-redux'
import {FaTrashCan as TrashIcon} from 'react-icons/fa6'
import { useModal } from '../hooks/useModal'

const EditTask = ({task}) => {
const [title,set_title] = useState('');
const [priority,set_priority] = useState('');
const [description,set_description] = useState('');
const [completed,set_completed] = useState('');
const {handleShowModal} = useModal();
const dispatch = useDispatch();
const handleDelete =(id)=>{
    let url = `tasks/${task.id}`;
    Api.delete({url})
    .then(data=>{
        console.log(data,"data");
        dispatch(delete_task({id:task.id}));
        handleShowModal(false)
    });
};
const handleEditTask= (e)=>{
    e.preventDefault();
    const body={
        id:task.id,
        title,
        priority,
        description,
        completed,
    };
    if(title && priority && description && completed){
        const url = `tasks/${task.id}`;
        Api.update({url,body:JSON.stringify(body)})
        .then(data=>{
            console.log(data,"data");
            dispatch(edit_task(body));
        })
    }
    
}


useEffect(()=>{
    if(task && task.id){
        set_title(task.title);
        set_priority(task.priority);
        set_description(task.description);
        set_completed(task.completed);
    }
},[task]);
  return (
    <Wrapper>
        <form onSubmit={handleEditTask}>
            <label>EditTask</label>
            <span><TrashIcon onClick={handleDelete}/></span>
            
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

export default EditTask
const Wrapper = styled.div`
  width: ;
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
        &>div{
            display: flex;
            justify-content: center;
        };
        &>span:first-child{
            left:0px;
            display: flex;
            align-items: center;
            color:blue;
        }
    }`