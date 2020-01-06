import React, { useState } from 'react';

function AccountActions({user}) {

  // console.log(user)

    const [showPanel, setShowPanel] = useState(false);

    function toggle(){
      showPanel ? setShowPanel(false) : setShowPanel(true);
    }
  
    // console.log(showPanel);    

    const actionLinks = (user.role === 'admin' || user.role === 'root') ? 
    <ul className="list-data">
      <li><a href="/create">Manage Products</a></li>
    </ul>
    :
    <ul className="list-data">
    <li>ADMIN AND ROOT ONLY</li>
    </ul>

    const panel = showPanel ?
    <div className="panel-data" id="actions">
    <ul className="list-data">
      {actionLinks}
    </ul>
    </div> 
      :
      null;

    return (
        <div className="panel" id="data-actions">
        <a onClick={toggle} className="panel-data-toggle">
            <h2><i className="fas fa-pizza-slice"></i>&nbsp;&nbsp;Actions</h2>
        </a>

        {panel}

    </div>  
    );
  }
  
  export default AccountActions;