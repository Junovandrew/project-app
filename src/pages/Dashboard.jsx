import React, { useEffect } from 'react'
import Styled from 'styled-components'
import{Link} from 'react-router-dom'
import tasksImg from '../assets/tasks.png'
import usersImg from '../assets/users.png'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const {users} = useSelector(store=>store.users);
    const {tasks} = useSelector(store=>store.tasks);
    // console.log(users,'store')
  return (
    <Wrapper>
        <Link to="../users">
            <div>
                <img src={usersImg}/>
                <span>
                    USERS
                </span>
            </div>
            <div>
                Total Users: <span>{users.length}</span>
            </div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt asperiores dolore autem corrupti quam, repudiandae tempora veniam accusamus aut deserunt velit reiciendis a rem pariatur quis reprehenderit molestias quo sit.
            </p>
        </Link>
        <Link to="tasks">
          <div>
          <img src={tasksImg}/>
          <span>
            TASKS
          </span>
          </div>
          <div>
            Total Tasks: <span>{tasks.length}</span>
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis facilis quasi voluptatem qui, sequi quae aliquid non dolorum unde? Libero maiores aliquam laudantium quam mollitia soluta incidunt culpa debitis adipisci.
            </p> 
        </Link>
    </Wrapper>
  )
}

export default Dashboard
const Wrapper = Styled.section`
display:grid;
grid-template-columns :1fr 1fr;
gap:30px;
&>a{
    padding:15px;
    border-radius:8px;
    background-color:var(--white-color);
    box-shadow:0px 2px 5px 1px rgba(0,0,0,0.1);
    display:grid;
    grid-template-columns:1fr;
    gap:10px;
    color:var(--dark-background);
    text-decoration:none;
    &>div:nth-of-type(2){
        font-weight:500;
    }
    &>div:first-of-type{
        display:flex;
        gap:20px;
        align-items:center;
        text-decoration:none;

        &>img{
        width:100px;
        height:100px;
        object-fit:contain;
        object-position:center;
        }
        &>span{
            font-size:30px;
            font-weight:bold;
        }
        

    }
    &>p{
        margin:0;
        font-size:18px;
        line-height:1.5;
    }
}
`