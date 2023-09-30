import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import { Button } from '../components'
import Api from '../api/index'
import { delete_product } from '../redux/reducers/productReducer'
import { edit_product } from '../redux/reducers/productReducer'
import { useDispatch } from 'react-redux'
import {FaTrashCan as TrashIcon} from 'react-icons/fa6'
import { useModal } from '../hooks/useModal'

const EditProduct = ({product}) => {
const [name,set_name] = useState('');
const [category,set_category] = useState('');
const [price,set_price] = useState('');
const [quantity,set_quantity] = useState('');
const {handleShowModal} = useModal();
const dispatch = useDispatch();
const handleDelete =()=>{
    let url = `products/${product.id}`;
    Api.delete({url})
    .then(data=>{
        console.log(data,"data");
        dispatch(delete_product({id:product.id}));
        handleShowModal(false)
    });
};
const handleEditProduct= (e)=>{
    e.preventDefault();
    const body={
        id:product.id,
        name,
        category,
        price,
        quantity,
    };
    if(name && category && price && quantity){
        const url = `products/${product.id}`;
        Api.update({url,body:JSON.stringify(body)})
        .then(data=>{
            console.log(data,"data");
            dispatch(edit_product(body));
        })
    }
    
}


useEffect(()=>{
    if(product && product.id){
        set_name(product.name);
        set_category(product.category);
        set_price(product.price);
        set_quantity(product.quantity);
    }
},[product]);
  return (
    <Wrapper>
    <form onSubmit={handleEditProduct}>
    <label>Edit Product</label>
    <span><TrashIcon onClick={handleDelete}/></span>
           
                <label>Name: </label>
                <input type='text' placeholder='name' value={name}
               onChange={(e)=>set_name(e.target.value)}/>
           
                <label>Category: </label>
                <input type='text' placeholder='category' value={category}
               onChange={(e)=>set_category(e.target.value)}/>
          
                <label>Price: </label>
                <input type='text' placeholder='price' value={price}
               onChange={(e)=>set_price(e.target.value)}/>
            
                <label>Quantity: </label>
                <input type='text' placeholder='quantity' value={quantity}
               onChange={(e)=>set_quantity(e.target.value)}/>
            
                <Button>
                    Submit
                </Button>
            
    </form>
</Wrapper>

  )
}

export default EditProduct
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
        &>div{
            display: flex;
            justify-content: center;
        };
        &>span{
           margin-left:10px;
        }
    }`