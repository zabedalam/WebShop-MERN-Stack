import React, { useState, useEffect, useRef } from 'react';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import catchErrors from '../../utils/catchErrors';
import cookie from 'js-cookie';


function UsersList({ user }){

    // console.log(user);

    const [admin, setAdmin] = useState(user.role === 'admin');
    const [msg, setMsg] = useState({display: 'none', class: '', msg: '' });  

    const isFirstRun = useRef(true);

    useEffect(() => {
        //on component did mount this was being rendred twice
        //we don't want that we want this to run only when admin state changes and not when the component 1st mounts
        //we use the useRef hook for this

        //.current is the value true we set above
        if(isFirstRun.current){
            isFirstRun.current = false;
            return;
        }

        // console.log(`Role updated ${admin}`);
        updateUserPermission();
    }, [admin]);

    function handleChangePermission(){
        setAdmin(prevState => !prevState);
    }
  
    async function updateUserPermission(){

        try {
            const url = `${baseUrl}/api/account`;
            const role = admin ? 'admin' : 'user';
            const token = cookie.get('token');
            const headers = {headers: { Authorization: token } }
            const payload = {_id: user._id, role: role};
            await axios.put(url, payload, headers);
            setMsg({display: 'block', class: "msg-success-span", msg: "Success! User updated.."});
        } catch (error) {
            console.error(error);
            catchErrors(error, displayError);
        } 
    }    

    function displayError(errorMsg){
        setMsg({display: 'block', class: "msg-fail-span", msg: `Fail! ${errorMsg}.`});
    } 

    const message = msg.display === 'block' ? <div className={msg.class}>{msg.msg}</div> : null;

    return(
        <li style={{ padding: "10px 20px" }}>
            <label className="switch">
            <input type="checkbox" name={user.email} value={user._id} onChange={() => {handleChangePermission()}}  checked={admin}/>{/* if it is a admin checked will be true */}
            <span className="slider"></span>
            </label><span style={{ verticalAlign: 'bottom' }}>&nbsp;&nbsp;&nbsp;{user.email}&nbsp;&nbsp;&nbsp; - [{ admin ? 'admin' : 'user' }]</span>
            <span className="span-msg">
                {message}
            </span>        
        
        </li>         
    )

}

export default UsersList;