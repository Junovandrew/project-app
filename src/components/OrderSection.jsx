import React, { useState } from 'react'
import styled from 'styled-components'
import {IoReloadCircle as ResetIcon} from 'react-icons/io5'

const OrderSection = ({data,onChange,onChange2}) => {
    const [order,set_order] = useState(-1);
    const [name,set_name] = useState('');
    const list = data || null;
    const temp_ch =()=>{};
    const temp_ch2 =()=>{};
    const change = onChange || temp_ch;
    const change2 = onChange2 || temp_ch2;
    const handleClick=(n)=>{
        if(name == n){
            set_name('');
            set_order(-1);
            change('');
            change2(-1);
        }
        else{
            set_name(n);
            change(n);
        }
    }
    const handleOrder=(o)=>{
        if(name){
        set_order(o);
        change2(o);
        }
    }
  return (
    <Wrapper>
        <div>
            {list && list.map(elist=>
                <span key={elist.toString()} 
                onClick={()=>handleClick(elist)}
                className={name==elist?'active':''}>
                    {elist}
                </span>)}
        </div>
        <div>
        <span onClick={()=>handleOrder(0)} 
        className={order == 0?'active':''}>
            ASC
        </span>
        <span onClick={()=>handleOrder(1)}
        className={order == 1?'active':''}>
            DESC
        </span>
        </div>
       
    </Wrapper>
    
  )
}

export default OrderSection;
const Wrapper = styled.section`
display:flex;
gap:30px;
justify-content: flex-end;
flex:1;
align-items:center;
&>div:first-of-type{
    display: flex;
    gap:3px;
    &>span{
        background-color: #eee;
        padding:6px 10px;
        font-size:13px;
        border-radius:3px;
        cursor:pointer;
        &.active{
            color:var(--white-color) !important;
            background-color: var(--primary-color) !important;
        }
    }
}
&>span{
    flex-shrink:0;
    width:30px;
    font-size:35px;
    color:rgb(150,200,160);
    display:flex;
    justify-content:center;
    align-items:center;
}
&>div:nth-of-type(2){
    display:flex;
    gap:3px;
    align-items: center;
    &>span{
    background-color: #ddd;
    padding:6px 10px;
    font-size:13px;
    border-radius:3px;    
    height:100%;
    cursor:pointer;
    &.active{
        color:var(--white-color) !important;
        background-color:var(--secondary-color) !important;
    }
}
}
`