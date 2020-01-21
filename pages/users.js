import React from 'react';
import AccountHeader from '../components/Account/AccountHeader';
import { parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import UsersList from '../components/Account/UsersList';

function Users({ user, users }) {

    const list = [];

    //https://stackoverflow.com/questions/56273038/how-to-implement-multiple-checkbox-using-react-hook
    
    users.map((el, i)  => {
        list.push(
          <UsersList user={el} key={i}/>
        );
    });

    const usersList = list.length > 0 ? list : null;

  return (
    <section className="section-my-account">
      <AccountHeader user={user} accountFeature={'MANAGE USERS'}/>             
        <div className="container">
            <ul className="orders">
                {usersList}
            </ul>             
        </div>
    </section>
  );
}

//https://stackoverflow.com/questions/54867560/getinitialprops-in-next-js-does-not-get-data-from-server
//Note: getInitialProps can not be used in children components. Only in pages.
Users.getInitialProps = async (ctx) => {
  // console.log(ctx);
  const { token } = parseCookies(ctx);
  if (!token) {
    return { users: [] };
  }
  const payload = { headers: { Authorization: token } };
  const url = `${baseUrl}/api/users`;
  const response = await axios.get(url, payload);
  // console.log(response)
  return response.data;
};


export default Users;
