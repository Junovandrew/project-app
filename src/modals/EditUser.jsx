import React,{useState} from 'react'
import styled from 'styled-components'
import { Button } from '../components'
import Api from '../api/index'
import { add_user } from '../redux/reducers/UserReducer'
import { useDispatch } from 'react-redux'
import {FaTrashCan as TrashIcon} from 'react-icons/fa6'

const EditUser = () => {
const [first_name,set_first_name] = useState('');
const [last_name,set_last_name] = useState('');
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
        gender: gender?'male':'female',
        address,
        level,
        position
    };
    if(!first_name && !last_name && !address && !level && !position){
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
            alert("User edited successfullly");
            dispatch(add_user(data))
        }else{

        }
    })
};
  return (
    <Wrapper>
        <form onSubmit={handleAdduser}>
            <div>
                <div>
                     <section>Edit User</section>
                     <TrashIcon/>
                </div>              
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
    & > section{
        text-align: center;
        margin-top: 0px;
        color: rgb(0,0,0);
      
    }
    & > button{
      width: 100%;
      padding: 8px 10px;
      background-color:skyblue;
      border: none;
      color: white;
      &:hover{
        background-color: violet;
        color: black;
      }
    }
`