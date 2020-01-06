// import AccountHeader from "../components/Account/AccountHeader";
// import AccountOrders from "../components/Account/AccountOrders";
// import AccountPermissions from "../components/Account/AccountPermissions";
// import { parseCookies } from "nookies";
// import baseUrl from "../utils/baseUrl";
// import axios from "axios";

// function Account({ user, orders }) {
//   return (
//     <>
//       <AccountHeader {...user} />
//       <AccountOrders orders={orders} />
//       {user.role === "root" && <AccountPermissions />}
//     </>
//   );
// }

// Account.getInitialProps = async ctx => {
//   const { token } = parseCookies(ctx);
//   if (!token) {
//     return { orders: [] };
//   }
//   const payload = { headers: { Authorization: token } };
//   const url = `${baseUrl}/api/orders`;
//   const response = await axios.get(url, payload);
//   return response.data;
// };

// export default Account;

import AccountHeader from '../components/Account/AccountHeader';
import AccountOrders from '../components/Account/AccountOrders';
import AccountPermissions from '../components/Account/AccountPermissions';
import AccountActions from '../components/Account/AccountActions';

function Account({ user }) {
  return (
    <section className="section-my-account">
      <AccountHeader user={user} accountFeature={'ORDERS'}/>

      <div className="container" id="event-bubbling">
        <AccountOrders user={user}/>
        <AccountPermissions user={user}/>
        <AccountActions user={user}/>
      </div>
    </section>
  );
}

export default Account;

