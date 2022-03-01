import React from 'react'
import styled from 'styled-components'


const Cardiv=styled.div`
display:flex;
flex-direction:column;
jutisfy-content:center;
align-items:start;
height:23rem;
width:32%;
border:1px solid black;
border-radius:12px;
 padding:1.5rem 0;   
`

const Typepfplan=styled.div`
width:100%;
text-align:left;
font-weight:bold;
font-size:1.3rem;
height:10%;
padding:0 1.5rem;
`

const Items=styled.li`
margin-top:0.5rem;

color:rgba(149, 149, 149, 0.8)
`

// plan: "Silver",
//     color: "blue",
//     pricebefore: 1299,
//     pricenow: 799,
//     mostpopular: "no",
//     textcolor: "blue",
//     mdbgcolor: "rgba(207, 190, 240, 0.8)",
//     listdata: [
//       "Unlimited Stock Adjustments",
//       "GST Reports,Profit Loss Report",
//       "Remove my billbook logo",
//       "Only MObile deices Supported",
//       "+5 more features",
//     ],

const Card=({data})=>{

    return(
        <>
        <Cardiv style={{borderColor:data.borderc,background:data.cardbg}}>
            {data.mostpopular &&
            <div style={{display:"flex",flexDirection:"row-reverse",marginTop:"-9%",width:"100%"}}>
                <div style={{width:"20%",background:"red",color:"white",padding:".7rem .7rem",fontSize:"0.7rem",marginRight:"1rem",borderRadius:"15px"}}>Most Popular</div>
            </div>}
            <Typepfplan>{data.plan} Plan</Typepfplan>
            <div style={{display:"flex",width:"52%",alignItems:"center",justifyContent:"space-between",height:"20%",padding:"0 1.5rem"}}>
                <div style={{textDecoration:"line-through",fontSize:"1rem"}}>Rs {data.pricebefore}</div>
                <div style={{display:"flex",alignItems:"baseline"}}>
                <div style={{fontSize:"1.8rem",fontWeight:"bold",color:data.color}}>Rs {data.pricenow}</div>
                <div style={{fontSize:"1rem",fontWeight:"bold"}}>/year</div>
                </div>
            </div>
            <div style={{width:"100%",background:data.mdbgcolor ,height:"15%",display:"flex",alignItems:"center",justifyContent:"center",color:data.color,fontWeight:"bold"}}>Mobile+Desktop</div>
            <div style={{padding:"1rem 1.5rem"}}>
                <div style={{listStyle:"none",textAlign:"left",width:"100%",marginLeft:"0px"}}>
                    {data.listdata.map((item)=>{
                        return<Items>{item}</Items>
                    })}
                    
                </div>

            </div>
        </Cardiv>
        </>
    )
}

export default Card;