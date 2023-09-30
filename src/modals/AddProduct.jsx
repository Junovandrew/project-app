import React,{useState} from 'react'
import styled from 'styled-components'
import { Button } from '../components'
import Api from '../api/index'
import { add_product} from '../redux/reducers/productReducer'
import { useDispatch } from 'react-redux'

const AddProduct = () => {
    const [name,set_name] = useState('');
    const [category,set_category] = useState('');
    const [price,set_price] = useState('');
    const [quantity,set_quantity] = useState('');
    const dispatch = useDispatch();
    const handleAddproduct =(e)=>{
        e.preventDefault();
        const body={
            name,
            category,
            price,
            quantity,
        };
        if(!name && !category && !price && !quantity){
            alert("Fill all required fields");
            return;
        };
        // if(!Api.check())return;
        const url= 'products';
        Api.post({url,body:JSON.stringify(body)})
        .then(data=>{
            console.log(data,"data");
            if(data.err){
    
            }
            else if(data.id){
                alert("Product added successfullly");
                dispatch(add_product(data))
            }else{
    
            }
        })
    };
  return (
    <Wrapper>
    <form onSubmit={handleAddproduct}>
    <label>Product Details</label>
           
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

export default AddProduct
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