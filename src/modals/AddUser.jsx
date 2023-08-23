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
const [gender,set_gender] = useState(false);
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
        gender: gender?'male':'female',
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
            <div>
                <section>User Details</section>
                <br/>
                <div>
                    <label>Firstname: </label>
                    <input type='text' placeholder='first name' value={first_name}
                   onChange={(e)=>set_first_name(e.target.value)}/>
                </div>
                <br/>
                
                <div>
                    <label>Lastname: </label>
                    <input type='text' placeholder='last name'value={last_name}
                   onChange={(e)=>set_last_name(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <label>Username: </label>
                    <input type='email' placeholder='username' value={username}
                   onChange={(e)=>set_username(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <label>Password: </label>
                    <input type='password' placeholder='password' value={password}
                   onChange={(e)=>set_password(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <label>Gender: </label>
                    <label>M</label>
                    <input type='radio' id='gender' name='gender' checked={!gender}
                   onChange={()=>set_gender(false)}/>
                    <label>F</label>
                    <input type='radio' id='gender' name='gender' checked={gender}
                   onChange={()=>set_gender(true)}/>
                </div>
                <br/>
                <div>
                    <label>Address: </label>
                    <input type='text' placeholder='address' value={address}
                   onChange={(e)=>set_address(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <label>Level: </label>
                    <input type='number' placeholder='level' value={level}
                   onChange={(e)=>set_level(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <label>Position: </label>
                    <input type='text' placeholder='position' value={position}
                   onChange={(e)=>set_position(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <Button>
                        Submit
                    </Button>
                </div>
            </div>
        </form>
        
    </Wrapper>
  )
}

export default AddUser
const Wrapper = styled.div`
display:flex;
align-items: center;
justify-content: center;
&>form{
    display:flex;
    gap:5px;
    align-items: center;
    justify-content: center;
    
    &>div{
        color:darkcyan;
        display:grid;
        align-items: center;
        justify-content: center;
        &>input{
            padding:5px;
        }
        &>section{
            text-align: center;
            margin-top: 0px;
            justify-content: center;
        }
    }
}


`