import React, { useEffect } from "react";
import './AddForm.css'
import { useState } from "react";
import axios from "axios";
const ErrorModal = (props) => {
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [name, setName] = useState("");
  const HOME_URL = "https://red-positive-backend-y7xd.vercel.app/";
  const nameChangeHandler = (ele) => {
    setName(ele.target.value);
    if (ele.target.value.trim().length === 0) {
      setErrorEmail(false);
    }
    else {
      setErrorEmail(true);
    }

  };
  const [email, setEmail] = useState("");
  const emailChangeHandler = (ele) => {
    if (ele.target.value.includes('@')) {
      setErrorName(true);
    }
    else {
      setErrorName(false);
    }
    setEmail(ele.target.value);
  };
  const [phone, setPhone] = useState("");
  const phoneChangeHandler = (ele) => {
    setPhone(ele.target.value);
  };
  const [hobbies, setHobbies] = useState("");
  const hobbiesChangeHandler = (ele) => {
    setHobbies(ele.target.value);
  };
  const refresh = () => window.location.reload(true)

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(name);
   await axios.post(`${HOME_URL}add`,{
      intern_name: name,
      intern_email: email,
      intern_phone: phone,
      intern_hobbies: hobbies
    });
      clickHandler();
      refresh();
  }
  const clickHandler = () => {
    props.onCancel();
  }
  return (
    <div>
      <div className="backdrop" onClick={clickHandler}>
      </div>
      <div className="box">
        <h1>Add an intern</h1>
        <form onSubmit={handleSubmit}>
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
            <input type="number" name="intern_phone" value={phone} onChange={phoneChangeHandler} />
          </label >
          <br />
          <label className="box-inside">
            Hobbies :
            <input type="text" name="intern_hobbies" value={hobbies} onChange={hobbiesChangeHandler} />
          </label >
          <br />
          {(errorEmail && errorName) ? <button style={{ margin: "8px" }} type='submit' >ADD</button> : <h3>Name or Email is incorrect</h3>}
        </form>
      </div>
    </div>
  );
};

export default ErrorModal;