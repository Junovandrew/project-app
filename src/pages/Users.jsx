import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import Styled from 'styled-components'
import { Searchform, OrderSection, Button } from '../components'
import {GoPersonAdd as AddIcon} from 'react-icons/go'
import {useModal} from '../hooks/useModal'
import { AddUser } from '../modals'
import { EditUser } from '../modals'
import {TbUserEdit as EditIcon} from 'react-icons/tb'

const order_list = [
    'Name',
    'Username',
    'Gender',
    'Level',
    'Position',
]
const Users = () => {   
    const {users} = useSelector(store=>store.users);
    const[search,set_search] = useState('');
    const [filtered_users,set_filtered_users] = useState(users);
    const[property,set_property] = useState('');
    const[order,set_order] = useState(-1); 
    const {handleShowModal,set_modal_content} = useModal();
    const addUser=()=>{
        set_modal_content(<AddUser/>)
        handleShowModal(true);
    };
    const editUser=()=>{
        set_modal_content(<EditUser/>)
        handleShowModal(true);
    };
    useEffect(()=>{
            set_filtered_users(users);
    },[users]);
    useEffect(()=>{
        if(!search){
            set_filtered_users(users);
        }
        else{
            const temp_search = search.toLowerCase();
            let temp_users;
            if(temp_search ==='female' || temp_search==='male'){
                temp_users=users.filter(euser=>
                    euser.gender.toLowerCase()===temp_search);
                }
            else if (!isNaN (temp_search)){
                temp_users= users.filter(euser=>
                    euser.level == temp_search);
            }
            else{
            temp_users = users.filter(euser=>
                Object.values(euser).join('').toLowerCase().includes(
                    search.toLowerCase()));
            // console.log(temp_users,'temp_users')            
        }
        set_filtered_users(temp_users)
        }
    },[search]);
    useEffect(()=>{
        if(filtered_users.length > 0 && property ){
            const name = property.toLowerCase();
            // if(name !== 'level'){
                let temp_order = order;
                if(order == -1)temp_order = 0;
                let result;
                if(!temp_order){
                    
                    if(name == 'name'){
                        result = [...filtered_users].sort((a,b)=>{
                            if(a.first_name.concat(a.last_name).toLowerCase()<b.first_name.concat(b.last_name).toLowerCase())return -1;
                            if(a.first_name.concat(a.last_name).toLowerCase()>b.first_name.concat(b.last_name).toLowerCase())return 1;
                            return 0;
                        });
                    }
                    else{
                        result = [...filtered_users].sort((a,b)=>{
                            if(a[name].toString().toLowerCase()<b[name].toString().toLowerCase())return -1;
                            if(a[name].toString().toLowerCase()>b[name].toString().toLowerCase())return 1;
                            return 0;
                        });
                    }
                }
                else{
                    if(name == 'name'){
                        result = [...filtered_users].sort((a,b)=>{
                            if(a.first_name.concat(a.last_name).toLowerCase()<b.first_name.concat(b.last_name).toLowerCase())return 1;
                            if(a.first_name.concat(a.last_name).toLowerCase()>b.first_name.concat(b.last_name).toLowerCase())return -1;
                            return 0;
                        });
                    }
                    else{
                        result = [...filtered_users].sort((a,b)=>{
                            if(a[name].toString().toLowerCase()<b[name].toString().toLowerCase())return 1;
                            if(a[name].toString().toLowerCase()>b[name].toString().toLowerCase())return -1;
                            return 0;
                        });
                    }
                } 
                set_filtered_users(result);   
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
                <Button onClick={addUser} bg="rgb(150,230,150)" color="#333" label={<><span>User</span><AddIcon/></>}/>
                <Button onClick={editUser} bg="rgb(150,230,150)" color="#333" label={<><span>Edit</span><EditIcon/></>}/>
            </div>
            
        </div>
        <Table>
            <div>
                <span>{`first name`.toUpperCase()}</span>
                <span>{`last name`.toUpperCase()}</span>
                <span>username</span>
                <span>gender</span>
                <span>level</span>
                <span>position</span>
            </div>
            <div>
                    {
                        filtered_users && filtered_users.length > 0 ? filtered_users.map(
                            (euser)=><div key={euser.id}>
                                <div>{euser.first_name}</div>
                                <div>{euser.last_name}</div>
                                <div>{euser.username}</div>
                                <div>{euser.gender}</div>
                                <div>{euser.level}</div>
                                <div>{euser.position}</div>
                            </div>)
                        :<>NO USER</>
                    }
            </div>
        </Table>
    </Wrapper>
  )
}

export default Users
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
        grid-template-columns:1fr 1fr 1fr 0.7fr 0.5fr 0.8fr;\
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
        grid-template-columns:1fr 1fr 1fr 0.7fr 0.5fr 0.8fr;
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