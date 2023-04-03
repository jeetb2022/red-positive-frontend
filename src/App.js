import './App.css';
import { useState } from 'react';
import InternData from './components/InternData';
import ErrorModal from './components/AddForm';
import axios from 'axios';
function App() {
  const HOME_URL = "https://red-positive-backend-y7xd.vercel.app/";
  const [formIsVisible, setFormVisibitlity] = useState(false);
  const handleClick = () => {
    setFormVisibitlity(!formIsVisible);
  }
    const handleEmailClick = () => {
      axios.post(`${HOME_URL}email`, selectedDataId);
      refresh();
    };
    const [selectedDataId, setSelectedDataId] = useState([]);
    const handleGetData = (data) => {
      setSelectedDataId(data);
      // console.log(data);
    }
    const refresh = () => window.location.reload(true)

    return (
      <div className="App">
        <h1>Red Positive internship</h1>

        <InternData getData={handleGetData}  />
        <button className="button-1" role="button" onClick={handleClick}>Form</button>
        <button className="button-1" role="button" onClick={handleEmailClick}> Click to Send an Email</button>
        {formIsVisible && <ErrorModal onCancel={handleClick} />}
      </div>
    );
  }

  export default App;
