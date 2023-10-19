import React, { useState } from "react";
import { FormControl, Button, Alert } from "react-bootstrap";
import { PostData, SignUp, login } from "../APIs/api-routes.util";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/Al-arham.png";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isOnLogin, setIsOnLogin] = useState(true);

  const [data, setData] = useState({
    user_name: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    SignUp(data).subscribe((res: any) => {
      const response = res.response;
      console.log(response)
      if ( res.status === "200") {
        console.log(res);
        
        localStorage.setItem("user_info", JSON.stringify(response));
        navigate("/dashboard");
      } else {
        setErrorMessage("Please enter correct password");
        setShow(true);
      }
    });
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(data).subscribe((res: any) => {
      const response = res.response;
      console.log(response)
      if (response.message === "success") {
        console.log(res);
        
        localStorage.setItem("user_info", JSON.stringify(response));
        navigate("/dashboard");
      } else {
        setErrorMessage("Please enter correct password");
        setShow(true);
      }
    });
  };

  return (
    <div style={{ height: "100vh" }} className="main-container">
      <div className="main-heading">
        <img width={"200px"} src={logo} alt="" />
        <h1>Al-Arham Wellfair</h1>
      </div>
      <div className="login-container">
        {!isOnLogin ? 
        <form className="login-content" onSubmit={handleSubmit}>
          <FormControl
            id="formControlsText"
            type="text"
            placeholder="Enter Name"
            value={data.user_name}
            onChange={(e) => {
              setData({ ...data, user_name: e.target.value });
            }}
          />

          <FormControl
            id="formControlsPassword"
            placeholder="Password"
            type="password"
            value={data.password}

            onChange={(e) => {
              setData({...data, password: e.target.value });
            }}
          />
          <FormControl
            id="formControlsPassword"
            placeholder="Phone"
            type="Phone"
            value={data.phone}
            onChange={(e) => {
              setData({...data, phone: e.target.value });
            }}
          />
          <div className="submit-button">
        <Button onClick={()=>setIsOnLogin(true)}>login</Button>

            <Button style={{ width: "200px" }} type="submit">
              Submit
            </Button>
          </div>
        </form>
      :  
      <form className="login-content" onSubmit={handleLogin}>
      <FormControl
        id="formControlsText"
        type="text"
        placeholder="phone"
        value={data.phone}
        onChange={(e) => {
          setData({ ...data, phone: e.target.value });
        }}
      />

      <FormControl
        id="formControlsPassword"
        placeholder="Password"
        type="password"
        value={data.password}

        onChange={(e) => {
          setData({...data, password: e.target.value });
        }}
      />
   
      <div className="submit-button">
        <Button onClick={()=>setIsOnLogin(false)}>Sign UP</Button>
        <Button style={{ width: "200px" }} type="submit">
          Submit
        </Button>
      </div>
    </form>
      }
      </div>
      <div className="alert-div">
        <Alert
          show={show}
          onClose={() => setShow(false)}
          dismissible
          variant="danger"
        >
          {errorMessage}
        </Alert>
      </div>
    </div>
  );
}

export default Login;
