import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Card from "./Card";
import { useNavigate } from 'react-router-dom'
import {
  Herodiv,
  Text,
  Text2,
  Text3,
  Ratediv,
  EachRate,
  TopRate,
  TopText,
  FooterText,
  Footer,
  Footerhead,
  Connectbtn,
  Cardbox
} from "./Assets/Css/Global";






const Carddata = [
  {
    plan: "Silver",
    color: "blue",
    pricebefore: 1299,
    pricenow: 799,
    mostpopular: false,
    cardbg: "white",
    textcolor: "blue",
    mdbgcolor: "rgba(207, 190, 240, 0.8)",
    borderc: "black",
    listdata: [
      "Unlimited Stock Adjustments",
      "GST Reports,Profit Loss Report",
      "Remove my billbook logo",
      "Only MObile deices Supported",
      "+5 more features",
    ],
  },
  {
    plan: "Gold",
    color: "rgba(198, 170, 10, 0.46)",
    pricebefore: 2599,
    pricenow: 1799,
    mostpopular: true,
    textcolor: "blue",
    mdbgcolor: "rgba(252, 236, 150, 0.9)",
    cardbg: "rgba(250, 235, 153, 0.46)",
    borderc: "orange",
    listdata: [
      `All silver features`,
      `Add upto 5 staff on my billbook`,
      "Unlimited mobile + desktop logins",
    ],
  },
  {
    plan: "Diamond",
    color: "orange",
    pricebefore: 4599,
    pricenow: 3500,
    mostpopular: false,
    cardbg: "white",
    borderc: "black",
    textcolor: "blue",
    mdbgcolor: "rgba(249, 150, 139, 0.46)",
    listdata: [
      "All silver and gold features",
      "Add unlimited stuff to my billbook",
    ],
  },
];
const Home = () => {
  const [phone, setphone] = useState();
  const [otp, setotp] = useState();
  const history= useNavigate()
  const [counter, setCounter] = useState(59);
  const [starttime,setstarttime]=useState(false)
  const clearall=()=>{
    setCounter(59);
    setstarttime(false)
  }

  useEffect(() => {
    
    // if(counter===0 && starttime===true)
    // {
    //   return()=>{
    //     setCounter(5);
    //     setstarttime(false)
    //   }
      
    // }

    if(starttime===false) return;
    
    const timer =
      counter > 0 ?setInterval(() => setCounter(counter - 1), 1000):clearall();
    return () => {clearInterval(timer)}

    
  }, [counter,starttime]);

  
  const getotp = async () => {
    console.log(phone)
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Client':'web'
      },
      body: JSON.stringify({ mobile_number: phone }),
    };
    await fetch("https://niobooks.in/api/web/request_otp", requestOptions)
      .then((res) => {
        console.log("sent otp");
        

      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  const verifyotp = async () => {
    console.log(phone)
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Client':'web'
      },
      body: JSON.stringify({ mobile_number: phone,otp_code:otp }),
    };
    await fetch("https://niobooks.in/api/web/authenticate", requestOptions)
    .then(res=>res.json())
      .then((data) => {
        console.log(data)
        localStorage.setItem("userdata", JSON.stringify(data));
        localStorage.setItem("usermobile", JSON.stringify(data.mobile_number));
        history('/form')
      })
      
  };




  return (
    <>
      <Navbar />
      <Herodiv>
        <div style={{ width: "65%", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              height: "35rem",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text>
              <b>Simple GST Billing</b> and <b>Stock Management</b> for your
              online Business
            </Text>
            <Text2>Atma Nirbhar Byapari Bane</Text2>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "40%",
              height: "5rem",
            }}
          >
            <Text3>Made with love in India</Text3>
            <Text3>ISO certified</Text3>
          </div>
        </div>
        <div
          style={{
            width: "35%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "60%",
              display: "flex",
              alignItems: "center",
              background: "white",
              border: "1px solid grey",
              flexDirection: "column",
              borderRadius: "12px",
              padding: "2rem 2rem",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                marginTop: "5%",
                marginBottom: "5%",
                width: "100%",
                textAlign: "left",
              }}
            >
              Login to my Billbook
            </div>
            <div
              style={{
                fontSize: "1rem",
                marginTop: "5%",
                marginBottom: "5%",
                width: "100%",
                textAlign: "left",
              }}
            >
              Enter mobile number
            </div>
            <div style={{ width: "100%", display: "flex" }}>
              <div
                style={{
                  width: "15%",
                  height: "100%",
                  background: "grey",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "6px 0 0 6px ",
                }}
              >
                +91
              </div>
              <div
                style={{
                  width: "85%",
                  height: "2.5rem",
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0 6px 6px 0",
                }}
              >
                <input
                  style={{
                    width: "90%",
                    height: "90%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                  }}
                  type="number"
                  onChange={(e) => setphone(e.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      getotp();
                     setstarttime(true)
                    } 
                  }}
                />
              </div>
            </div>
            <div
              style={{
                fontSize: "1rem",
                marginTop: "5%",
                marginBottom: "5%",
                width: "100%",
                textAlign: "left",
                
              }}
            >
              Enter Otp
            </div>
            <input
              style={{
                width: "97%",
                height: "3.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid black",
                borderRadius: "6px",
              }}
              type="number"
              onChange={(e) => setotp(e.target.value)}
              
            />
            <div style={{width:"100%",marginTop:"1rem"}}> <div style={{height:"2rem",width:"100%",textAlign:"left"}}>{ starttime&&`Otp will expire in 00: ${counter}s`}</div></div>
            <div
              style={{
                height: "3rem",
                borderRadius: "12px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2rem",
                background: "grey",
                color: "black",
                cursor:"pointer"
              }}
              onClick={verifyotp}
            >
              Login
            </div>
          </div>
        </div>  
      </Herodiv>
      <Ratediv>
        <EachRate>
          <TopRate>1,00,000+</TopRate>
          <TopText>Businesses Trust us</TopText>
        </EachRate>
        <EachRate>
          <TopRate>30,00,000</TopRate>
          <TopText>Invoices Created</TopText>
        </EachRate>
        <EachRate>
          <TopRate>5,000+</TopRate>
          <TopText>Cities and Towns in India</TopText>
        </EachRate>
        <EachRate>
          <TopRate>4.5 star</TopRate>
          <TopText>Rating on Google Play</TopText>
        </EachRate>
      </Ratediv>
      <Ratediv
        style={{
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <Text>Now try all benefit of My Billbook app</Text>
        <Text style={{ color: "orange", fontWeight: "bold" }}>
          Free for 14 days
        </Text>
      </Ratediv>
      <Cardbox>
        {Carddata.map((item) => {
          return <Card data={item} />;
        })}
      </Cardbox>
      <Footer>
        <div>
          <Footerhead>Get in Touch</Footerhead>
          <FooterText>help@flobiz.in</FooterText>
          <Text2 style={{ marginTop: "1rem" }}>+91 74004 17400</Text2>
          <div style={{ display: "flex", marginTop: "1rem" }}>
            <Connectbtn
              style={{ background: "rgba(152, 243, 220, 1)", color: "green" }}
            >
              Whatsapp us
            </Connectbtn>
            <Connectbtn
              style={{
                background: "rgba(116, 189, 213, 0.37)",
                color: "rgba(0, 145, 193, 1)",
                marginLeft: "1rem",
              }}
            >
              Chat with us
            </Connectbtn>
          </div>
        </div>

        <div>
          <Footerhead>Information</Footerhead>
          <FooterText>Refund</FooterText>
          <FooterText>Privacy Policy</FooterText>
          <FooterText>Terms and Conditions</FooterText>
        </div>
        <div>
          <Footerhead></Footerhead>
          <FooterText>FAQs</FooterText>
          <FooterText>Pricing</FooterText>
          <FooterText>Flobiz Business Group</FooterText>
          <FooterText>Blogs</FooterText>
        </div>
        <div>
          <Footerhead>Follow us</Footerhead>
          <FooterText>Flobook is a product of Flobiz group</FooterText>
        </div>
      </Footer>
    </>
  );
};

export default Home;
