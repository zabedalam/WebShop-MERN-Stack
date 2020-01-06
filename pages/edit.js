import React, { useState, useRef, useEffect } from 'react';//https://reactjs.org/docs/hooks-overview.html
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

//https://stackoverflow.com/questions/43441856/reactjs-how-to-scroll-to-an-element
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);   // General scroll to element function

function EditProduct({prod}){

    // console.log(prod)
    const prods = prod.product.productData;
    // console.log(prods)

  const [MediaPreview, setMediaPreview] = useState(prods.mediaUrl);  
  const [product, setProduct] = useState(prods);
  const [msg, setMsg] = useState({display: 'none', class: '', msg: '' });  
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);//scroll to a div
  
  //similar to componentDidUpdate, will check when ever the product obj values change,
  //we want all the product values to be not empty
  useEffect(() => {

    //in our case if we are not changing the product image it can be empty
    //so the mediaUrl is not mandatory
    const isProduct = Object.keys(product).forEach(el =>{
        if (product[el] !== 'mediaUrl'){
            Boolean(product[el])
        }   
    }); 

    //I am not sure why had to add isProduct for it to work, in add Product file it was the opposite
    isProduct ? setDisabled(false) : setDisabled(true);

  }, [product]);

  function displayError(errorMsg){
    setMsg({display: 'block', class: "msg msg-fail", msg: `Fail! ${errorMsg}.`});
  } 

  //upload the image to cloudinary and get the image url, using client side code with axios
  //there is a 2nd method of uploading that is with server side code.
  //https://support.cloudinary.com/hc/en-us/articles/202521222-What-is-the-difference-between-Fill-Fit-and-Limit-scaling-modes-
  //https://medium.com/@johnryancottam/image-uploading-with-node-cloudinary-6f7796c8277a
  //https://css-tricks.com/image-upload-manipulation-react/
  async function handleImageUpload(){
    try {
      const data = new FormData();
      data.append('file', product.media);//required by cloudinary
      data.append('upload_preset', 'mernstack');//required by cloudinary
      data.append('cloud_name', 'sjosephrw');//required by cloudinary
      const res = await axios.post(process.env.CLOUDINARY_URL, data);
      const mediaUrl = res.data.url;
      return mediaUrl;

    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(){
    const {name, value, files} = event.target;
    //this was causing only the target property state to be updated not the other properties  
    //setProduct({[name]: value});

    //but still the uploaded file was not being saved into the state var. this fixed it 
    if (name === 'media'){
      setProduct((prevState) => ({...prevState, media: files[0]}));//[name] - to tell js that name is a variable and not a string
      setMediaPreview(window.URL.createObjectURL(files[0]));//display the preview of the image to be uploaded
    } else {
      setProduct((prevState) => ({...prevState, [name]: value}));//[name] - to tell js that name is a variable and not a string
    }
    
    // console.log(product, files);
  }

  async function handleSubmit(e){

    try {
      
      e.preventDefault();
      setLoading(true);
      const mediaUrl = await handleImageUpload();  
      const url = `${baseUrl}/api/product`;
  
      const { _id, name, price, description } = product;
  
      let payload;
        
      if (mediaUrl){
        payload = { _id, name, price, description, mediaUrl }
      } else {
        payload = { _id, name, price, description } 
      }

      await axios.put(url, payload);
      // console.log(product);
      //initial state of success or fail div
      setMsg({display: 'block', class: "msg msg-success", msg: "Success! product uploaded."});
      // executeScroll();//scroll to the success or error msg div

    } catch (error) {
      console.error("handleSubmit", error, "This error!");
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
              <h2 className="title" ref={myRef} style={{marginTop: "150px"}}>EDIT PRODUCT</h2>
              
              {/* ref enables to scroll up to this div but it's not working */}
              <div className="div-msg">
                {message}
              </div>  
              
              <div className="form">
               
                  <form onSubmit={handleSubmit}>

                      <label htmlFor="name"><b>Name: </b></label>
                      <input type="text" placeholder="Enter Name" name="name" required
                      value={product.name || ''}// || '' or warning index.js:1 Warning: A component is changing an uncontrolled input of type text to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component
                      onChange={handleChange}
                      />

                      <label htmlFor="price"><b>Price</b></label>
                      <input type="number" placeholder="Enter Price" name="price" required
                      min="0.00"
                      step="0.01"
                      value={product.price || ''}// || '' or warning index.js:1 Warning: A component is changing an uncontrolled input of type text to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component                      
                      onChange={handleChange}
                      />

                      <label htmlFor="image"><b>Image</b></label>
                      {
                        //https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa
                      }
                      <input type="file" name="media" accept="image/*" 
                      onChange={handleChange}
                      />
                      <br/><br/>  
                      <img src={MediaPreview} 
                      style={{display: 'block', border: '1px solid green', borderRadius: '5px', padding: '20px', maxWidth: '100%'}}/>

                      <label htmlFor="description"><b>description</b></label>
                      <textarea cols="70" rows="10" name="description"
                      //index.js:1 Warning: Use the `defaultValue` or `value` props instead of setting children on <textarea>.
                      onChange={handleChange} defaultValue={product.description}
                      >
                        
                      </textarea>
                  
                      <button type="submit" className="btn btn-primary btn-full-width"
                      onClick={executeScroll}
                      style={{marginTop: '20px'}}
                      disabled={!disabled || loading}//disable btn and show spinner when submitting
                      > {isLoading} &nbsp;&nbsp;ADD PRODUCT</button>
                  </form>
            </div>
        </div>
    </section>  
  );
}

//we can use useRouter to get the query param inside getInitialProps but useRouter works only in functional components
// Product.getInitialProps = ({ctx}) => {//in App.js we passed the ctx parameter to getInitialProps, from this we can get the query params
EditProduct.getInitialProps = async ({query: { _id }}) => {
    //{query: { _id }} - destructuring 1 level deeper
    //console.log(query);
    //The method below is also valid
    // const url = `http://localhost:3000/api/product?_id=${_id}`
    // const response = await axios.get(url);
    // return {product: response.data};  
  
    const url = `${baseUrl}/api/product`;
    const payload = { params: { _id } };
    const response = await axios.get(url, payload);
    return {prod: response.data};    
}

export default EditProduct;
