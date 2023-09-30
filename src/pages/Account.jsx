import React,{useEffect, useState} from 'react'
import { Routes,Route,useLocation } from 'react-router-dom'
import Styled from 'styled-components'
import Header from '../components/Header'
import {RiHome8Fill as DashboardIcon} from 'react-icons/ri'
import{SiTask as TaskIcon} from 'react-icons/si'
import{FaUserSecret as UserIcon} from 'react-icons/fa'
import{AiOutlineShoppingCart as ProductIcon} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {Dashboard,Tasks,Users,Products} from '.'
import Api from '../api';
import { set_users } from '../redux/reducers/UserReducer'
import { useDispatch, useSelector } from 'react-redux'
import { set_tasks } from '../redux/reducers/taskReducer'
import { set_products } from '../redux/reducers/productReducer'
import { Button } from '../components'
import {HiOutlineLogout as LogoutIcon} from 'react-icons/hi'

const link_list=[
  {
    name:"Dashboard",
    path:"dashboard",
    icon: <DashboardIcon/>,
  },
  {
    name:"Tasks",
    path:"tasks",
    icon: <TaskIcon/>,
  },
  {
    name:"Users",
    path:"users",
    icon: <UserIcon/>,
  },
  {
    name:"Products",
    path:"products",
    icon: <ProductIcon/>,
  }
]
const Account = () => {
  const[active_link,set_active_link] =useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(()=>{
    Api.get('users')
        .then(data=>{
            // console.log(data,"users");
            dispatch(set_users(data));
        });
        Api.get('tasks')
        .then(data=>{
            dispatch(set_tasks(data));
        });
        Api.get('products')
        .then(data=>{
            dispatch(set_products(data));
        })
    const path = location.pathname;
    // console.log(path,"path");
    const a_link = path.split('/')[2];
    set_active_link(a_link);
  },[]);
  useEffect(()=>{
    const path = location.pathname;
    const a_link = path.split('/')[2];
    set_active_link(a_link);
  },[location.pathname]);
  return (
    <>
      <Header/>
      <Wrapper>
         <section>
          {link_list.map((elink,index)=>
          <Link to = {elink.path} key={elink.name} 
          className={active_link==elink.path? 'active':''}>
            <span>{elink.icon}</span>
            <span>{elink.name}</span>
          </Link>
          )}
          <Button bg="var(--primary-color)" style={{marginTop:"auto"}}>
              <span>
                Logout
              </span>
              <LogoutIcon/>
          </Button>
         </section>
         <section>
            <Routes>
              <Route index element={<Dashboard/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/tasks" element={<Tasks/>}/>
              <Route path="/users" element={<Users/>}/>
              <Route path="/products" element={<Products/>}/>
            </Routes>
         </section>
      </Wrapper>
    </>
  )
}

export default Account
const Wrapper= Styled.main`
  position:fixed;
  overflow-y:auto;
  left:0;
  width:100%;
  top:61px;
  height:calc(100vh - 61px);
  display:flex;
  &>section:first-of-type{
    display:flex;
    flex-direction:column;
    padding:10px 3px;
    background-color:var(--sidebar-background);
    width:220px;
    flex-shrink:0;
    box-shadow:2px 0px 5px 2px rgba(0,0,0,0.15);
    &>a{
      display:flex;
      align-items:center;
      gap:20px;
      padding:10px;
      color:var(--dark-background);
      font-weight:500;
      text-decoration:none;
      &:hover{
        background-color:var(--white-color);
        color:var(--primary-color);
      }
      &.active{
        background-color:var(--white-color) !important;
        color:var(--primary-color) !important;
      }
    }
  }
  &>section:nth-of-type(2){
      padding:20px;
      background-color:#fafafa;
      width:100%;
      overflow-y:auto;
      height:100%;
    }
`