import React, { useEffect } from 'react'
import styled from 'styled-components';
import logo from '../assets/logo.jpg';
import {useState} from 'react';
import {Button} from '../components';
import Api from '../api';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const[username,set_username] = useState('');
    const[password,set_password] = useState('');
    useEffect(()=>{
        let user = localStorage.getItem('user');
        if(user){
            navigate('/account/dashboard');
        }
    }),[]
    const handleForm =(e)=>{
        e.preventDefault();
        if(username && password){
            // if(!Api.check())return false;
            let url=`users?username=${username}&password=${password}`;
            Api.get(url)
            .then(data=>{
                if(data.err){
                    alert("Error occurred")
                    return
                }
                else if(data.length > 0){
                    alert("login successful");
                    let user = JSON.stringify(data[0]);
                    localStorage.setItem('user',user);
                    navigate('/account/dashboard');
                }
                else{
                    alert("Invalid username or password");
                }
            })
        }
    }
  return (
    <Wrapper>
        <div>
            <img src={logo}/>
            LOGO
        </div>
        <div>
            <h1>
               LOGIN
            </h1>
            <form onSubmit={handleForm}>
                <div>
                    <input type="text" placeholder="username"  value={username}
                   onChange={(e)=>set_username(e.target.value)}/>
                </div>
                <div>
                <input type="password" placeholder="password"  value={password}
                   onChange={(e)=>set_password(e.target.value)}/>
                </div>
                <Button>
                    Login
                </Button>
            </form>
        </div>
    </Wrapper>
  )
}

export default Login
const Wrapper = styled.section`
    width:100%;
    display: flex;
    height:100vh;
    &>div{
        height:100%;
        width:50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
        padding: 20px;
        &:first-of-type{
           background-color: rgb(25, 5, 35);
           color: white;
           font-size: 25px;  
           &>img{
                width:200px;
                height: auto;
                object-fit: contain;
            } 
        }
          

         &:last-child{
            &>h1{
                margin: 0;
                color: rgb(25, 5, 35);
                text-align: center;
            }
            &>form{
                width: 400px;
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 20px;
                border-radius: 10px;
                box-shadow: 1px 0 5px 2px rgba(0,0,0,0.2);
                & input{
                    width: 100%;
                    padding: 8px 20px;
                    outline: none;
                    border-radius: 5px;
                }
            }

        }     
    }
`