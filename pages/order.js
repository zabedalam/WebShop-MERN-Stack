import AccountHeader from '../components/Account/AccountHeader';
import { parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import formatDate from '../utils/formatDate';

function Order({ user, order }) {

    // console.log(order);

    const list = [];

      order.orders[0].products.map((el, i)  => {
        list.push(<ul key={i}><li>PRODUCT ID: {el.product._id} </li><li>QUANTITY: {el.quantity}</li><li><div className="img-order-product"><img src={el.product.mediaUrl} alt="product"/></div></li></ul>);
      });

    const orderDetails = list.length > 0 ? list : null;
   

  return (
    <section className="section-my-account">
      <AccountHeader user={user} accountFeature={'ORDERS'}/>

      <div className="container">
      <div className="order">
                <ul>
                    <li><i className="fas fa-user"></i> - {order.orders[0].user.name}</li>
                    <li><i className="fas fa-box-open"></i> - {order.orders[0]._id}</li>
                    <li><i className="fas fa-at"></i> - {order.orders[0].email}</li>
                    <li><i className="fas fa-dollar-sign"></i> - {order.orders[0].total}</li>
                    <li><i className="far fa-clock"></i> - {formatDate(order.orders[0].createdAt)}</li>                    
                    <li>
                        ORDER DETAILS
                     </li>
                     {orderDetails}
                </ul>
            </div>            
        </div>
    </section>
  );
}

//https://stackoverflow.com/questions/54867560/getinitialprops-in-next-js-does-not-get-data-from-server
//Note: getInitialProps can not be used in children components. Only in pages.
Order.getInitialProps = async (ctx) => {
  // console.log(ctx.query);
  const _id = ctx.query._id;
  const { token } = parseCookies(ctx);
  if (!token) {
    return { orders: {} };
  }
  const payload = { headers: { Authorization: token }, params: { _id } };
  const url = `${baseUrl}/api/order`;
  const response = await axios.get(url, payload);
  // console.log(response)
  return {order: response.data}; 
};

export default Order;
