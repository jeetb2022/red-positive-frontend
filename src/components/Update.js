import React, { useEffect } from "react";
import './Update.css'
import {useState } from "react";
import axios from "axios";
const Update = (props)=>{
]const [errorName,setErrorName]=useState(true);
const [errorEmail,setErrorEmail]=useState(true);
const [name,setName]= useState(`${props.prevdata[0].intern_name}`);
const HOME_URL = "https://red-positive-backend-3r9r.vercel.app/";
const nameChangeHandler = (ele) => {
  setName(ele.target.value);
  if(ele.target.value.trim().length === 0 ){
    setErrorEmail(false);
  }
  else{
    setErrorEmail(true);
  }
  
};
const [email,setEmail]= useState(`${props.prevdata[0].intern_email}`);
// const [phone,setPhone]= useState(`${props.prevdata[0].intern_email}`);
const [id,setId]= useState(`${props.id}`);
// setId(props.id)rs;
const emailChangeHandler = (ele) => {
  if(ele.target.value.includes('@')){
    setErrorName(true);
  }
  else{
    setErrorName(false);
  }
  setEmail(ele.target.value);
};
const [phone,setPhone]= useState(`${props.prevdata[0].intern_phone}`);
const phoneChangeHandler = (ele) => {
  setPhone(ele.target.value);
};
const [hobbies,setHobbies]= useState(`${props.prevdata[0].intern_hobbies}`);
const hobbiesChangeHandler =  (ele) => {
  console.log(ele.target.value);
   setHobbies(ele.target.value);
};
const refresh = () => window.location.reload(true)

const handleSubmit = async (event) => {
  event.preventDefault();
  // console.log(hobbies);
 await axios.post(`${HOME_URL}update`,{
      _id : id,
      intern_name : name,
      intern_email : email,
      intern_phone : phone,
      intern_hobbies : hobbies
    });
    refresh();
    clickHandler();
}

useEffect(()=>{
     
},[])
const clickHandler = ()=>{
    props.onCancel();
}
return (
    <div>
        <div className="backdrop" onClick={clickHandler}>
        </div>
        <div className="box">
            <h1>Update an intern</h1>
            <form  onSubmit={handleSubmit}>
        <label className="box-inside">
          Name:
          <input type="text" name="intern_name" value={name} onChange={nameChangeHandler} />
        </label>
        <br />
        <label className="box-inside">
          Email:
          <input type="email" name="intern_email" value={email} onChange={emailChangeHandler} />
        </label >
        <br />
        <label className="box-inside">
          Phone:
          <input type="text" name="intern_phone" value={phone} onChange={phoneChangeHandler} />
        </label >
        <br />
        <label className="box-inside">
          Hobbies :
          <input type="text" name="intern_hobbies" value={hobbies} onChange={hobbiesChangeHandler} />
        </label >
        <br />
      {(errorEmail && errorName) ? <button style={{margin:"8px"}} type='submit'>Update</button>   :  <h3>Name or Email is incorrect</h3> }
      </form>
        </div>
    </div>
);
};

export default Update;