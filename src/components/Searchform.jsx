import React,{useState} from 'react'
import styled from 'styled-components'
import {BsSearch as SearchIcon} from 'react-icons/bs'
import {IoReloadCircle as ResetIcon} from 'react-icons/io5'

const Searchform = ({onChange}) => {
    const handleForm =(e)=>{
        e.preventDefault();
    };
    const [search,set_search] = useState('');
    const handleInput = (e)=>{
        const {value}= e.target;
        set_search (value);
        onChange(value);
    }
  return (
    <Wrapper>
        <form onSubmit={handleForm}>
            <input type='text' placeholder='search' value={search} 
            onChange={handleInput}/>
            <button>
                <SearchIcon/>
            </button>
        </form>
        <span>
            <ResetIcon/>
        </span>
    </Wrapper>
    
  )
}

export default Searchform;
const Wrapper = styled.div`
    width:250px;
    display:flex;
    gap:5px;
    align-items:center;
    &>span{
        flex-shrink:0;
        width:30px;
        font-size:35px;
        color:rgb(150,200,160);
        display:flex;
        justify-content:center;
        align-items:center;
    }
    &>form{
        display:flex;
        flex:1;
        align-items: center;
        &>input{
            padding:8px 5px;
            border-radius:5px 0 0 5px;
            outline:none;
            border:1px solid var(--primary-color);
            flex:1;
        }
        &>button{
            background-color:var(--primary-color);
            color:var(--white-color);
            outline:none;
            border:1px solid var(--primary-color);
            border-radius:0 5px 5px 0;
            padding:8px 5px;
        }
    }
`