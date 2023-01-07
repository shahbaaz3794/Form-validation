import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from "react";
import './App.css';

function App() {

  const [state, setState] = useState({
    email: "",
    password: ""
  })
  const submitted = useRef(false)
  const [error, setError] = useState({
    email: false,
    password: false
  })

  const handleChange = (key, value) => {
    setState({ ...state, [key]: value })
  }

  useEffect(() => {
    if (submitted.current) {
      handleValidate()
    }
  }, [state])

  const handleValidate = (callback) => {
    let Obj = {}
    for (let i in state) {
      if (state[i] === "") {
        Obj = { ...Obj, [i]: true }
      } else {
        Obj = { ...Obj, [i]: false }
      }
    }
    if (submitted.current) {
      setError(Obj)
      if (callback) {
        callback(Obj)
      }
    }
    return Obj
  }

  const handleSubmit = async () => {
    submitted.current = true
    handleValidate((errObj) => {
      if (!Object.values(errObj)?.includes(true)) {
        console.log(state, "submitted")
      }
    })
  }

  return (
    <div className="App">
      <div className='box'>
        <TextField className='input' error={error?.email} id={error?.email ? "outlined-error" : "outlined-basic"} label="Email" variant="outlined" onChange={(e) => handleChange("email", e.target.value)} />
        <TextField className='input' error={error?.password} id={error?.password ? "outlined-error" : "outlined-basic"} label="Password" variant="outlined" onChange={(e) => handleChange("password", e.target.value)} />
        <Button onClick={handleSubmit} variant="contained">Login</Button>
      </div>
    </div>
  );
}

export default App;
