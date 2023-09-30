import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import { Button } from '../components'
import Api from '../api/index'
import { delete_user } from '../redux/reducers/UserReducer'
import { edit_user } from '../redux/reducers/UserReducer'
import { useDispatch } from 'react-redux'
import {FaTrashCan as TrashIcon} from 'react-icons/fa6'
import { useModal } from '../hooks/useModal'

const EditUser = ({user}) => {
const [first_name,set_first_name] = useState('');
const [last_name,set_last_name] = useState('');
const [gender,set_gender] = useState(false);
const [address,set_address] = useState('');
const [level,set_level] = useState('');
const [position,set_position] = useState('');
const {handleShowModal} = useModal();
const dispatch = useDispatch();
const handleDelete =(id)=>{
    let url = `users/${user.id}`;
    Api.delete({url})
    .then(data=>{
        console.log(data,"data");
        dispatch(delete_user({id:user.id}));
        handleShowModal(false)
    });
};
const handleEditUser= (e)=>{
    e.preventDefault();
    const body={
        id:user.id,
        first_name,
        last_name,
        gender: gender?'female':'male',
        address,
        level,
        position
    };
    if(first_name && last_name && address && level && position){
        const url = `users/${user.id}`;
        Api.update({url,body:JSON.stringify(body)})
        .then(data=>{
            console.log(data,"data");
            dispatch(edit_user(body));
        })
    }
    
}


useEffect(()=>{
    if(user && user.id){
        set_first_name(user.first_name);
        set_last_name(user.last_name);
        set_level(user.level);
        set_address(user.address);
        set_position(user.position);
        set_gender(user.gender=='male'?false:true);
    }
},[user]);
  return (
    <Wrapper>
        <form onSubmit={handleEditUser}>
                     <label>Edit User</label>
                     <TrashIcon className='trash' onClick={handleDelete}/>

                    <label>Firstname: </label>
                    <input type='text' placeholder='first name' value={first_name}
                   onChange={(e)=>set_first_name(e.target.value)}/>

                    <label>Lastname: </label>
                    <input type='text' placeholder='last name'value={last_name}
                   onChange={(e)=>set_last_name(e.target.value)}/>
               
                    <label>Gender: </label>
                    <div>
                        <label>M</label>
                        <input type='radio' id='gender' name='gender' checked={!gender}
                        onChange={()=>set_gender(false)}/>
                        <label>F</label>
                        <input type='radio' id='gender' name='gender' checked={gender}
                        onChange={()=>set_gender(true)}/>
                   </div>
               
                    <label>Address: </label>
                    <input type='text' placeholder='address' value={address}
                   onChange={(e)=>set_address(e.target.value)}/>
                
                    <label>Level: </label>
                    <input type='number' placeholder='level' value={level}
                   onChange={(e)=>set_level(e.target.value)}/>
                
                    <label>Position: </label>
                    <input type='text' placeholder='position' value={position}
                   onChange={(e)=>set_position(e.target.value)}/>
               
                    <Button>
                        Submit
                    </Button>
              
        </form>
        
    </Wrapper>
  )
}

export default EditUser
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
        /* justify-content: center; */
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