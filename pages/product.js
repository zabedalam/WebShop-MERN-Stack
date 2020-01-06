// import axios from "axios";
// import ProductSummary from "../components/Product/ProductSummary";
// import ProductAttributes from "../components/Product/ProductAttributes";
// import baseUrl from "../utils/baseUrl";

// function Product({ product, user }) {
//   return (
//     <>
//       <ProductSummary user={user} {...product} />
//       <ProductAttributes user={user} {...product} />
//     </>
//   );
// }

// Product.getInitialProps = async ({ query: { _id } }) => {
//   const url = `${baseUrl}/api/product`;
//   const payload = { params: { _id } };
//   const response = await axios.get(url, payload);
//   return { product: response.data };
// };

// export default Product;

import axios from 'axios';
import ProductContainer from '../components/Product/ProductContainer';
import baseUrl from '../utils/baseUrl';

const list = [];

function Product({product, user}) {

  // console.log(user)
  // console.log(product.product.productData)
  const prodDetails = product.product.productData;
  // Object.keys(prodDetails).forEach(function(key) {
  //   list.push(prodDetails[key]);

  // })
  // // console.log(list[0].product.name)

  const prod = prodDetails;

  return (
    <ProductContainer {...prod} user={user}/>
  )
}

//we can use useRouter to get the query param inside getInitialProps but useRouter works only in functional components
// Product.getInitialProps = ({ctx}) => {//in App.js we passed the ctx parameter to getInitialProps, from this we can get the query params
Product.getInitialProps = async ({query: { _id }}) => {
  //{query: { _id }} - destructuring 1 level deeper
  //console.log(query);
  //The method below is also valid
  // const url = `http://localhost:3000/api/product?_id=${_id}`
  // const response = await axios.get(url);
  // return {product: response.data};  

  const url = `${baseUrl}/api/product`;
  const payload = { params: { _id } };
  const response = await axios.get(url, payload);
  return {product: response.data};  

} 

export default Product;

