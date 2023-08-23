import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import Styled from 'styled-components'
import { Searchform, OrderSection } from '../components'
import {BsPlusCircleFill as AddIcon} from 'react-icons/bs'
import {useModal} from '../hooks/useModal'
import { AddTask } from '../modals'
import Button from '../components/Button'

const order_list = [
  'TITLE',
  'PRIORITY',
  'DESCRIPTION',
  'COMPLETED',
  'ID'
]
const Tasks = () => {
  const {tasks} = useSelector(store=>store.tasks);
    const[search,set_search] = useState('');
    const [filtered_tasks,set_filtered_tasks] = useState(tasks);
    const[property,set_property] = useState('');
    const[order,set_order] = useState(-1); 
    const {handleShowModal,set_modal_content} = useModal();
    const addTask=()=>{
        set_modal_content(<AddTask/>)
        handleShowModal(true);
    };
    useEffect(()=>{
            set_filtered_tasks(tasks);
    },[tasks]);
    useEffect(()=>{
      if(!search){
          set_filtered_tasks(tasks);
      }
      else{
          const temp_search = search.toLowerCase();
          let temp_tasks;
          if(temp_search ==='FiNISHED' || temp_search==='ONGOING'){
              temp_tasks=tasks.filter(etask=>
                  euser.completed.toLowerCase()===temp_search);
              }
          else if (!isNaN (temp_search)){
              temp_tasks= tasks.filter(etask=>
                  etask.level == temp_search);
          }
          else{
          temp_tasks = tasks.filter(etask=>
              Object.values(etask).join('').toLowerCase().includes(
                  search.toLowerCase()));
          // console.log(temp_users,'temp_users')            
      }
      set_filtered_tasks(temp_tasks)
      }
  },[search]);
 
  useEffect(()=>{
    if(filtered_tasks.length > 0 && property ){
        const name = property.toLowerCase();
        // if(name !== 'level'){
            let temp_order = order;
            if(order == -1)temp_order = 0;
            let result;
            if(!temp_order){
                
                if(name == 'name'){
                    result = [...filtered_tasks].sort((a,b)=>{
                        if(a.first_name.concat(a.last_name).toLowerCase()<b.first_name.concat(b.last_name).toLowerCase())return -1;
                        if(a.first_name.concat(a.last_name).toLowerCase()>b.first_name.concat(b.last_name).toLowerCase())return 1;
                        return 0;
                    });
                }
                else{
                    result = [...filtered_tasks].sort((a,b)=>{
                        if(a[name].toString().toLowerCase()<b[name].toString().toLowerCase())return -1;
                        if(a[name].toString().toLowerCase()>b[name].toString().toLowerCase())return 1;
                        return 0;
                    });
                }
            }
            else{
                if(name == 'name'){
                    result = [...filtered_tasks].sort((a,b)=>{
                        if(a.first_name.concat(a.last_name).toLowerCase()<b.first_name.concat(b.last_name).toLowerCase())return 1;
                        if(a.first_name.concat(a.last_name).toLowerCase()>b.first_name.concat(b.last_name).toLowerCase())return -1;
                        return 0;
                    });
                }
                else{
                    result = [...filtered_tasks].sort((a,b)=>{
                        if(a[name].toString().toLowerCase()<b[name].toString().toLowerCase())return 1;
                        if(a[name].toString().toLowerCase()>b[name].toString().toLowerCase())return -1;
                        return 0;
                    });
                }
            } 
            set_filtered_tasks(result);   
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
            <Button onClick={addTask} bg="rgb(150,230,150)" color="#333" label={<><span>Task</span><AddIcon/></>}/>
        </div>
      </div>
         
      <Table>
        <div>
          <span>title</span>
          <span>priority</span>
          <span>description</span>
          <span>completed</span>
        </div>
        
        <div>
            {
                filtered_tasks && filtered_tasks.length > 0 ? filtered_tasks.map(
                    (etask)=><div key={etask.id}>
                        <div>{etask.title}</div>
                        <div>{etask.priority == 1?'low':etask.priority == 2?'medium':'high'}</div>
                        <div>{etask.description}</div>
                        <div>{etask.completed?'FINISHED':'ONGOING'}</div>
                    </div>)
                :<>NO TASK</>
            }
        </div>
      </Table>
    </Wrapper>
    
  )
}

export default Tasks
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
    grid-template-columns:1fr;
    background-color:var(--white-color);
    border-radius:10px;
    box-shadow:0 0 3px 1px rgba(0,0,0,0.05);
    padding:15px;
    &>div:first-of-type{
        display:grid;
        grid-template-columns:1fr 1fr 1fr 1fr;\
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
        grid-template-columns:1fr 1fr 1fr 1fr;
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