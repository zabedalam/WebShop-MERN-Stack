import AccountHeader from '../components/Account/AccountHeader';
import { parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';


function Orders({ user, orders }) {

    // console.log(orders);

    const list = [];

    orders.map((el, i)  => {
        list.push(<li key={i}><a href={`/order?_id=${el._id}`}>ORDER ID: {el._id}&nbsp;&nbsp;&nbsp;<i className="far fa-eye"></i></a></li>);
    });

    const orderList = list.length > 0 ? list : null;

  return (
    <section className="section-my-account">
      <AccountHeader user={user} accountFeature={'ORDERS'}/>

      <div className="container">
            <ul className="orders">
                { orderList }
            </ul>            
        </div>
    </section>
  );
}

//https://stackoverflow.com/questions/54867560/getinitialprops-in-next-js-does-not-get-data-from-server
//Note: getInitialProps can not be used in children components. Only in pages.
Orders.getInitialProps = async (ctx) => {
  // console.log(ctx);
  const { token } = parseCookies(ctx);
  if (!token) {
    return { orders: [] };
  }
  const payload = { headers: { Authorization: token } };
  const url = `${baseUrl}/api/orders`;
  const response = await axios.get(url, payload);
  // console.log(response)
  return response.data;
};


export default Orders;
