import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import './InternData.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Update from './Update'
const HOME_URL = 'https://red-positive-backend-y7xd.vercel.app/';
const InternData = (props) => {
  const [internData, setInternData] = useState([]);
  useEffect(() => {
    fetch(`${HOME_URL}`)
      .then((res) => res.json())
      .then((jsonres) => setInternData(jsonres));
  }, []);


  const [selectedDataId, setSelecteddataId] = useState([]);
  const [selectedDataIdToDelete, setSelecteddataIdToDelete] = useState([]);

  const checkboxHandler = (pl) => {
    if (!selectedDataId.includes(pl.target.id)) {
      setSelecteddataId(prev => [...prev, pl.target.id]);
    }
    else {
      const new_array = selectedDataId.filter((id) => {
        return (id !== pl.target.id);
      });
      setSelecteddataId(new_array);
    }
  }
  useEffect(()=>{
    props.getData(selectedDataId);
  },[selectedDataId])

  
  const checkboxDeleteHandler = (props) => {
    console.log(props.target.id);
    if (!selectedDataIdToDelete.includes(props.target.id)) {
      setSelecteddataIdToDelete(prev => [...prev, props.target.id]);
    }
    else {
      const new_array = selectedDataIdToDelete.filter((id) => {
        return (id !== props.target.id);
      });
      setSelecteddataIdToDelete(new_array);
    }
  }
  const [updateForm,setUpdateForm] = useState(false);
  const [id,setId] = useState("");
  const prevData = internData.filter((item)=>{
    return(item._id === id);
  });
console.log(prevData);

  const checkboxUpdateHandler = (props) => {
    setUpdateForm(!updateForm);
    setId(props.target.id);
  }
  useEffect(() => {
    axios.post(`https://red-positive-backend-y7xd.vercel.app/delete`, selectedDataIdToDelete);
  }, [selectedDataIdToDelete]);
function slic (){
  setUpdateForm(!updateForm);
}
  let i = 1;
  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: "400px", width: "66%", margin: "auto" }}>
        {updateForm && <Update prevdata={prevData} id={id} onCancel = {slic}/>}
        <table>
          <tbody>

          <tr>
            <th>Checkbox</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Hobbies</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
          {
            internData.map((data) => {
              return (
                <tr key={data._id}>
                  <td><input type="checkbox" id={data._id} onClick={checkboxHandler}></input></td>
                  <td>{i++}</td>
                  <td>{data.intern_name}</td>
                  <td>{data.intern_email}</td>
                  <td>{data.intern_phone}</td>
                  <td>{data.intern_hobbies}</td>
                  <td><button  id={data._id} onClick={checkboxUpdateHandler}>Update</button></td>
                  <td><button id={data._id} onClick={checkboxDeleteHandler}>Delete</button></td>
                </tr>
              )

            })
          }
                    </tbody>

        </table>

      </div>
    </div>
  )

}

export default InternData;