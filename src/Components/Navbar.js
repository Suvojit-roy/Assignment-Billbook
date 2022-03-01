import React from 'react'
import styled from 'styled-components'

const Mainnav=styled.div`
height:4rem;
display:flex;
align-items:center;
justify-content:space-between;

margin-left:2rem;
margin-right:2rem;
`

const Item=styled.div`
font-size:1rem;
font-style:bold;


`
const Navbar=()=>{

    return(
        <>
        <Mainnav>
            <div style={{width:"50%"}}></div>
            <div style={{width:"50%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <Item style={{color:"orange"}}>Why use My Billbook</Item>
            <Item>Who is it for?</Item>
            <Item>Online Store</Item>
            <Item>Pricing</Item>
            <Item>FAQs</Item> 
            </div>
              
        </Mainnav>
        </>
    )
}

export default Navbar