import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../components'
import Api from '../api/index'
import { add_user } from '../redux/reducers/UserReducer'
import { useDispatch } from 'react-redux'

const AddUser = () => {
const [first_name,set_first_name] = useState('');
const [last_name,set_last_name] = useState('');
const [username,set_username] = useState('');
const [password,set_password] = useState('');
const [gender,set_gender] = useState(true);
const [address,set_address] = useState('');
const [level,set_level] = useState('');
const [position,set_position] = useState('');
const dispatch = useDispatch();
const handleAdduser =(e)=>{
    e.preventDefault();
    const body={
        first_name,
        last_name,
        username,
        password,
        gender: gender?'female':'male',
        address,
        level,
        position
    };
    if(!first_name && !last_name && !username && !password && !address && !level && !position){
        alert("Fill all required fields");
        return;
    };
    // if(!Api.check())return;
    const url= 'users';
    Api.post({url,body:JSON.stringify(body)})
    .then(data=>{
        console.log(data,"data");
        if(data.err){

        }
        else if(data.id){
            alert("User added successfullly");
            dispatch(add_user(data))
        }else{

        }
    })
};
  return (
    <Wrapper>
        <form onSubmit={handleAdduser}>
            
                <label>User Details</label>
               
                    <label>Firstname: </label>
                    <input type='text' placeholder='first name' value={first_name}
                   onChange={(e)=>set_first_name(e.target.value)}/>
                                           
                    <label>Lastname: </label>
                    <input type='text' placeholder='last name'value={last_name}
                   onChange={(e)=>set_last_name(e.target.value)}/>
                
                    <label>Username: </label>
                    <input type='email' placeholder='username' value={username}
                   onChange={(e)=>set_username(e.target.value)}/>
                
                    <label>Password: </label>
                    <input type='password' placeholder='password' value={password}
                   onChange={(e)=>set_password(e.target.value)}/>
                
                <div>
                    <label>Gender: </label>
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

export default AddUser
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
    }`