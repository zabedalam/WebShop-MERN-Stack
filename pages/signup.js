// import React from "react";
// import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";
// import Link from "next/link";
// import axios from "axios";
// import catchErrors from "../utils/catchErrors";
// import baseUrl from "../utils/baseUrl";
// import { handleLogin } from "../utils/auth";

// const INITIAL_USER = {
//   name: "",
//   email: "",
//   password: ""
// };

// function Signup() {
//   const [user, setUser] = React.useState(INITIAL_USER);
//   const [disabled, setDisabled] = React.useState(true);
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState("");

//   React.useEffect(() => {
//     const isUser = Object.values(user).every(el => Boolean(el));
//     isUser ? setDisabled(false) : setDisabled(true);
//   }, [user]);

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setUser(prevState => ({ ...prevState, [name]: value }));
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();

//     try {
//       setLoading(true);
//       setError("");
//       const url = `${baseUrl}/api/signup`;
//       const payload = { ...user };
//       const response = await axios.post(url, payload);
//       handleLogin(response.data);
//     } catch (error) {
//       catchErrors(error, setError);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       <Message
//         attached
//         icon="settings"
//         header="Get Started!"
//         content="Create a new account"
//         color="teal"
//       />
//       <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
//         <Message error header="Oops!" content={error} />
//         <Segment>
//           <Form.Input
//             fluid
//             icon="user"
//             iconPosition="left"
//             label="Name"
//             placeholder="Name"
//             name="name"
//             value={user.name}
//             onChange={handleChange}
//           />
//           <Form.Input
//             fluid
//             icon="envelope"
//             iconPosition="left"
//             label="Email"
//             placeholder="Email"
//             name="email"
//             type="email"
//             value={user.email}
//             onChange={handleChange}
//           />
//           <Form.Input
//             fluid
//             icon="lock"
//             iconPosition="left"
//             label="Password"
//             placeholder="Password"
//             name="password"
//             type="password"
//             value={user.password}
//             onChange={handleChange}
//           />
//           <Button
//             disabled={disabled || loading}
//             icon="signup"
//             type="submit"
//             color="orange"
//             content="Signup"
//           />
//         </Segment>
//       </Form>
//       <Message attached="bottom" warning>
//         <Icon name="help" />
//         Existing user?{" "}
//         <Link href="/login">
//           <a>Log in here</a>
//         </Link>{" "}
//         instead.
//       </Message>
//     </>
//   );
// }

// export default Signup;

import React, {useState, useRef, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';
import { handleLogin } from '../utils/auth';

//https://stackoverflow.com/questions/43441856/reactjs-how-to-scroll-to-an-element
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);   // General scroll to element function

const INITIAL_USER = {
  name: '',
  email: '',
  password: ''
}

function Signup() {

  const [user, setUser] = useState(INITIAL_USER);
  const [msg, setMsg] = useState({display: 'none', class: '', msg: '' });  
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);//scroll to a div

  //similar to componentDidUpdate, will check when ever the product obj values change,
  //we want all the product values to be not empty
  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))//returns true or false, it will return true only if all fiedls are not empty 
    //I am not sure why had to add !isProduct for it to work
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function displayError(errorMsg){
    setMsg({display: 'block', class: "msg msg-fail", msg: `Fail! ${errorMsg}.`});
  } 

  function handleChange(){
    const {name, value} = event.target;
    //this was causing only the target property state to be updated not the other properties  
    //setProduct({[name]: value});
    setUser((prevState) => ({...prevState, [name]: value}));//[name] - to tell js that name is a variable and not a string
    // console.log(user);
  }


  async function handleSubmit(e){

    try {
      
      e.preventDefault();
      setLoading(true);
      const url = `${baseUrl}/api/signup`;
  
      const payload = { ...user }
  
      const response = await axios.post(url, payload);//used in handleLogin() below
      // console.log(user);
      setUser(INITIAL_USER);//clear the form fields
      //initial state of success or fail div
      setMsg({display: 'block', class: "msg msg-success", msg: "Success! You can login."});
      // executeScroll();//scroll to the success or error msg div

      handleLogin(response.data);
    } catch (error) {
      console.error("handleSubmit", error, "signup view");
      catchErrors(error, displayError);
    } finally {
      setLoading(false);
    }
  }

  const message = msg.display === 'block' ? <div className={msg.class}>{msg.msg}</div> : null;
  const isLoading = loading === true ? <i className="fas fa-spinner fa-spin"></i> : null; 

  return (
    <section className="section-register-login">
        <div className="container">
                <h2 className="title" ref={myRef} style={{marginTop: '150px'}}>Register</h2>
           
              {/* ref enables to scroll up to this div but it's not working */}
              <div className="div-msg">
                {message}
              </div>  
           
            <div className="form">
                <form onSubmit={handleSubmit}>
                      <hr/>
                      <p>Please fill in this form to create an account.</p>

                      <label htmlFor="name"><b>Name: </b></label>
                      <input type="text" placeholder="Enter Name" name="name" required
                      onChange={handleChange}
                      value={user.name}
                      />

                      <label htmlFor="email"><b>Email</b></label>
                      <input type="email" placeholder="Enter Email" name="email" required
                      onChange={handleChange}
                      value={user.email}
                      />
                  
                      <label htmlFor="psw"><b>Password</b></label>
                      <input type="password" placeholder="Enter Password" name="password" required
                      onChange={handleChange}
                      value={user.password}
                      />
                
                      <hr/>
                      <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
                  
                      <button type="submit" className="btn btn-primary btn-full-width"
                      onClick={executeScroll}
                      disabled={disabled || loading}
                      >{isLoading} &nbsp;&nbsp;Register</button>
                    
                    <div className="div-signin">
                      <p>Already have an account? <a href="/login">Sign in</a>.</p>
                    </div>
                  </form>
            </div>
        </div>
    </section>  
  );
}

export default Signup;

