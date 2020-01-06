import React from 'react';
import axios from 'axios'
import ProductList from '../components/Shop/ProductList';
import baseUrl from '../utils/baseUrl';
import ProductPagination from '../components/Shop/ProductPagination';

function Shop({products, totalPages, page}) {

  // console.log(products);

  // //when ever we want to interact with the outside world we use the useEffect hook
  // React.useEffect(() => {

  // }, [getProducts()]);

  // //function inside a function
  // async function getProducts(){
  //   //in this project the api is also running on the same port
  //   //the file names in the pages/api folder are the api end points
  //   const url = 'http://localhost:3000/api/products'
  //   const response = await axios.get(url);
  //   console.log(response.data);//.data to get back only product data
  // }



    return (
      <>
        <section className="section-shop" style={{marginTop: '20px'}}>
          <h2 className="title">SHOP.</h2>
          <ProductList products={products}/>
          <ProductPagination page={page} totalPages={totalPages}/>
        </section>
      </>
    );
  }
  
  //get the initial data that will be added to the props parameter
   Shop.getInitialProps = async (ctx) => {
    //fetch data on the server
    // return {hello: "world"};
    // console.log(ctx.query);
    const page = ctx.query.page ? ctx.query.page : "1";
    const size = 9;
    const url = `${baseUrl}/api/products`;
    const payload = { params: { page, size } }
    const response = await axios.get(url, payload);
    return response.data;
    //and return the data as an object

    //this obj. will be merged with existing props, it wont overide the other props

  };

  export default Shop;
  
