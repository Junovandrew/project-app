import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import Styled from 'styled-components'
import { Searchform, OrderSection, Button } from '../components'
import {BiCartAdd as AddIcon} from 'react-icons/bi'
import {useModal} from '../hooks/useModal'
import { AddProduct } from '../modals'
import { EditProduct } from '../modals'

const order_list = [
    'Name',
    'Category',
    'Price',
    'quantity',
]
const Products = () => {
    const {products} = useSelector(store=>store.products);
    const[search,set_search] = useState('');
    const [filtered_products,set_filtered_products] = useState(products);
    const[property,set_property] = useState('');
    const[order,set_order] = useState(-1); 
    const {handleShowModal,set_modal_content} = useModal();
    const addProduct=()=>{
        set_modal_content(<AddProduct/>)
        handleShowModal(true);
    };
    const editProduct=(product)=>{
        set_modal_content(<EditProduct product={product}/>)
        handleShowModal(true);
        
    };
    useEffect(()=>{
            set_filtered_products(products);
    },[products]);
    useEffect(()=>{
        if(!search){
            set_filtered_products(products);
        }
        else{
            const temp_search = search.toLowerCase();
            let temp_products;
            if(temp_search ==='female' || temp_search==='male'){
                temp_products=products.filter(eproduct=>
                    eproduct.gender.toLowerCase()===temp_search);
                }
            else if (!isNaN (temp_search)){
                temp_products= products.filter(eproduct=>
                    euser.price == temp_search);
            }
            else{
            temp_products = products.filter(eproduct=>
                Object.values(eproduct).join('').toLowerCase().includes(
                    search.toLowerCase()));
            // console.log(temp_users,'temp_users')            
        }
        set_filtered_products(temp_products)
        }
    },[search]);
    useEffect(()=>{
        if(filtered_products.length > 0 && property ){
            const name = property.toLowerCase();
            // if(name !== 'level'){
                let temp_order = order;
                if(order == -1)temp_order = 0;
                let result;
                if(!temp_order){
                    
                  result = [...filtered_products].sort((a,b)=>{
                            if(a[name].toString().toLowerCase()<b[name].toString().toLowerCase())return -1;
                            if(a[name].toString().toLowerCase()>b[name].toString().toLowerCase())return 1;
                            return 0;
                        });
                    
                }
                else{
                  
                        result = [...filtered_products].sort((a,b)=>{
                            if(a[name].toString().toLowerCase()<b[name].toString().toLowerCase())return 1;
                            if(a[name].toString().toLowerCase()>b[name].toString().toLowerCase())return -1;
                            return 0;
                        });
                    
                } 
                set_filtered_products(result);   
            // }
            // else{

            // }
            
        }else{

        }
        
    },[order,property]);
  return (
    <Wrapper>
    <div>
        <Searchform onChange={set_search}/>
        <div>
            <OrderSection data={order_list} onChange={set_property} onChange2={set_order}/>
            <Button onClick={addProduct} bg="rgb(150,230,150)" color="#333" label={<><span>Product</span><AddIcon/></>}/>
        </div>
        
    </div>
    <Table>
        <div>
            <span>Name</span>            
            <span>Category</span>
            <span>Price</span>
            <span>Quantity</span>
        </div>
        <div>
                {
                    filtered_products && filtered_products.length > 0 ? filtered_products.map(
                        (eproduct)=><div key={eproduct.id} onClick={()=>editProduct(eproduct)}>
                            <div>{eproduct.name}</div>
                            <div>{eproduct.category}</div>
                            <div>{eproduct.price}</div>
                            <div>{eproduct.quantity}</div>                            
                        </div>)
                    :<>NO PRODUCT</>
                }
        </div>
    </Table>
</Wrapper>
)
}

export default Products
const Wrapper = Styled.section`
    display:grid;
    grid-template-columns:1fr;
    gap:10px;
    &>div:first-of-type{
        display:flex;
        gap:30px;
        align-items:center;
        &>div:nth-of-type(2){
            display:flex;
            align-items:center;
            flex:1;
            justify-content:flex-end;
            gap:10px;
        }
    }
`
const Table = Styled.div`
    display:grid;
    overflow-y:auto;
    grid-template-columns:1fr;
    background-color:var(--white-color);
    border-radius:10px;
    box-shadow:0 0 3px 1px rgba(0,0,0,0.05);
    padding:15px;
    &>div:first-of-type{
        display:grid;
        grid-template-columns:1fr 1fr 0.7fr 0.7fr;
        text-transform:uppercase;
        background-color:var(--primary-color);
        color:var(--white-color);
        font-weight:500;
        padding:10px 5px;
        gap:30px;        
        align-items:center;
    }
    &>div:nth-of-type(2){
        display:grid;
        grid-template-columns:1fr;
        &>div{
        display:grid;
        grid-template-columns:1fr 1fr 0.7fr 0.7fr ;
        padding:10px 5px;
        gap:5px;
        &:nth-child(even){
            background-color:#888;
            color:var(--white-color);
        }
        &:nth-child(odd){
            /* border:1px solid #888; */
        }
        &:hover{
            background-color:var(--table-highlight-background) !important;
            color:var(--table-highlight-color) !important;
        }
        }
    }
`