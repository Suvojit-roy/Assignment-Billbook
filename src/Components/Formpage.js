import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./Assets/Css/table.css";
import Select from "react-dropdown-select";
import { findDOMNode } from "react-dom";
import { useNavigate } from "react-router-dom";


// const options=["pcs","boxes","gms","kgs","ltr"]
const options = [
  {
    unitname: "pcs",
  },
  {
    unitname: "boxes",
  },
  {
    unitname: "gms",
  },
  {
    unitname: "kgs",
  },
  {
    unitname: "ltr",
  },
];

const Topdata = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom: 1px solid black;
`;
const Topheading = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom: 1px solid black;
`;
const Maindiv = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-left: 1rem;
  padding-right: 1rem;
`;

const Smalldiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 5rem;
  text-align: left;
`;
const Heading = styled.div`
  font-size: 1rem;
  height: 1rem;
  color: grey;
`;

const Input = styled.input`
  margin-top: 1rem;
  height: 2.5rem;
  width: 14vw;
  padding: 0 1rem;
`;
const Input1 = styled.select`
  margin-top: 1rem;
  height: 2.9rem;
  width: 16.5vw;
  padding: 0 1rem;
`;

const Formpage = () => {
  const [itemname, setName] = useState("");
  const [code, setCode] = useState("");
  const [saleprice, setsalePrice] = useState();
  const [purprice, setpurPrice] = useState();
  const [unit, setUnit] = useState("");
  const [date, setdate] = useState("");
  var [allentries, setallentries] = useState([]);
  const [selectid, setselectid] = useState(null);
  const [submitold, setsubmitold] = useState(false);
  const navigate=useNavigate()
  const [user,setUser]=useState()


  useEffect( () => {
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries !== null) setallentries(existingEntries);
    var userdata = JSON.parse(localStorage.getItem("usermobile"));
    if(!userdata) {
      navigate('/')
    }
    // console.log(userdata)
    setUser(userdata)
  }, []);

  const logout=()=>{
    localStorage.clear();
    navigate('/')
  }

  const Editdata = async (index) => {
    const findentry = await allentries.filter((entry) => {
      if (index === entry.id) return entry;
    });
    setselectid(index);
    setsubmitold(true);
    
    setName(findentry[0].itemname);
    setCode(findentry[0].code);
    setdate(findentry[0].date);
    setpurPrice(findentry[0].purprice);
    setsalePrice(findentry[0].saleprice);
    setUnit(findentry[0].unit);
    
  };



  const Addentry = () => {
    if (!itemname) return;
    else if (submitold) {
      setallentries(
        allentries.map((elem) => {
          if (elem.id === selectid) {
            return { ...elem, itemname, code, saleprice, purprice, unit, date };
          } else {
            return elem;
          }
        })
      );

      var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
      localStorage.setItem("allEntries", JSON.stringify(allentries));
      setName("");
      setCode("");
      setdate("");
      setpurPrice("");
      setsalePrice("");
      setUnit("");
      setsubmitold(!submitold);
    } else {
      var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
      if (existingEntries == null) existingEntries = [];
      console.log(unit);

      var entry = {
        id: new Date().getTime().toString(),
        itemname: itemname,
        code: code ? code : "NULL",
        saleprice: saleprice ? saleprice : "NULL",
        purprice: purprice ? purprice : "NULL",
        unit: unit ? unit : "NULL",
        date: date ? date : "NULL",
      };
      console.log(entry);
      localStorage.setItem("entry", JSON.stringify(entry));

      existingEntries.push(entry);
      setallentries(existingEntries);
      console.log(existingEntries);
      localStorage.setItem("allEntries", JSON.stringify(existingEntries));
      setName("");
      setCode("");
      setdate("");
      setpurPrice("");
      setsalePrice("");
      setUnit("");
    }
  };

  return (
    <>
      <Topdata>
        <div>{user?user:""}</div>
        <div onClick={logout} style={{cursor:"pointer"}}>Logout</div>
      </Topdata>
      <Topheading>
        <div
          style={{
            width: "60%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          Items
        </div>
        <div
          style={{
            width: "40%",
            borderLeft: "1px solid black",
            height: "100%",
            display: "flex",
            alignItems: "center",
            paddingLeft: "1rem",
          }}
        >
          <div style={{  }}>Create/Edit Items</div>
        </div>
      </Topheading>
      <Maindiv>
        <div
          style={{
            width: "60%",
            height: "100%",
            display: "flex",
            alignItems: "start",
          }}
        >
          <div class="container">
            <ul class="responsive-table">
              <li class="table-header">
                <div class="col col-1">Item Name</div>
                <div class="col col-2">Item code</div>
                <div class="col col-3">Selling Price</div>
                <div class="col col-4">Purchase Price </div>
                <div class="col col-4">Unit</div>
                <div class="col col-4">Date</div>
              </li>
              {allentries &&
                allentries.length > 0 &&
                allentries.map((entry) => {
                  return (
                    <li
                      class="table-row"
                      key={entry.id}
                      onClick={() => Editdata(entry.id)}
                    >
                      <div class="col col-1" data-label="Job Id">
                        {entry.itemname}
                      </div>
                      <div class="col col-2" data-label="Customer Name">
                        {entry.code}
                      </div>
                      <div class="col col-3" data-label="Amount">
                        {entry.saleprice}
                      </div>
                      <div class="col col-4" data-label="Payment Status">
                        {entry.purprice}
                      </div>
                      <div class="col col-4" data-label="Payment Status">
                        {entry.unit}
                      </div>
                      <div class="col col-4" data-label="Payment Status">
                        {entry.date}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div></div>
        <div
          style={{
            width: "40%",
            borderLeft: "1px solid black",
            height: "100%",
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
            paddingLeft: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
              alignItems: "center",
            }}
          >
            <Smalldiv
              style={{
                display: "flex",
                flexDirection: "column",
                height: "5rem",
                textAlign: "left",
              }}
            >
              <Heading>Item Name*</Heading>
              <Input
                placeholder="Enter item name"
                type="text"
                value={itemname}
                onChange={(e) => setName(e.target.value)}
              />
            </Smalldiv>
            <Smalldiv>
              <Heading>Item Code</Heading>
              <Input
                placeholder="Enter item code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Smalldiv>
          </div>
          <div
            style={{
              height: "3rem",
              fontSize: "1rem",
              display: "flex",
              width: "100%",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            Stock & Pricing Details(Optional)
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <Smalldiv
              style={{
                display: "flex",
                flexDirection: "column",
                height: "5rem",
                textAlign: "left",
              }}
            >
              <Heading>Sales Price</Heading>
              <Input
                placeholder="Rs 0"
                type="text"
                value={saleprice}
                onChange={(e) => setsalePrice(e.target.value)}
              />
            </Smalldiv>
            <Smalldiv
              style={{
                display: "flex",
                flexDirection: "column",
                height: "5rem",
                textAlign: "left",
              }}
            >
              <Heading>Purchase Price</Heading>
              <Input
                placeholder="Rs 0"
                type="text"
                value={purprice}
                onChange={(e) => setpurPrice(e.target.value)}
              />
            </Smalldiv>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <Smalldiv
              style={{
                display: "flex",
                flexDirection: "column",
                height: "5rem",
                textAlign: "left",
              }}
            >
              <Heading>Measuring UNIT</Heading>
              {/* <Input placeholder="Enter item name" /> */}
                {/* <Select
                  options={options}
                  onChange={(values) => setUnit(values[0].unitname)}
                  labelField="unitname"
                  style={{
                    marginTop: "1rem",
                    height: "2.8rem",
                    width: "16vw",
                    padding: "0 1rem",
                  }}
                /> */}
              <Input1
                
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="" disabled selected>Select your option</option>
                <option value="pcs">Pcs</option>
                <option value="gms">gms</option>
                <option value="Boxes">Boxes</option>
                <option value="kgs">kgs</option>
                <option value="ltr">ltr</option>
              </Input1>
            </Smalldiv>
            <Smalldiv
              style={{
                display: "flex",
                flexDirection: "column",
                height: "5rem",
                textAlign: "left",
              }}
            >
              <Heading>Opening Stock date</Heading>
              <Input
                value={date}
                placeholder="Enter item code"
                type="date"
                onChange={(e) => setdate(e.target.value)}
              />
            </Smalldiv>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                marginTop: "1rem",
                color: "white",
                background: "blue",
                cursor:"pointer"
              }}
              onClick={Addentry}
            >
              Save
            </div>
          </div>
        </div>
      </Maindiv>
    </>
  );
};

export default Formpage;
