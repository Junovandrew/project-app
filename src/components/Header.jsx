import React from 'react'
import  Styled  from 'styled-components'
import {BsPersonFillGear as ProfileIcon} from 'react-icons/bs'

const Header = () => {
  return (
    <Wrapper>
        <span>
           User
        </span>
        <div>
            <span>
                <ProfileIcon/>
            </span>
            <div></div>
        </div>
    </Wrapper>
  )
}

export default Header
const Wrapper = Styled.header`
padding:20px 30px;
display:flex;
justify-content:flex-end;
background-color:var(--dark-background);
color:var(--white-color);
gap:30px;
align-items:center;
position:fixed;
width:100%;
left:0;
top:0;
`;