// import React from "react";
// import { Header, Button, Modal } from "semantic-ui-react";
// import axios from "axios";
// import baseUrl from "../../utils/baseUrl";
// import { useRouter } from "next/router";

// function ProductAttributes({ description, _id, user }) {
//   const [modal, setModal] = React.useState(false);
//   const router = useRouter();
//   const isRoot = user && user.role === "root";
//   const isAdmin = user && user.role === "admin";
//   const isRootOrAdmin = isRoot || isAdmin;

//   async function handleDelete() {
//     const url = `${baseUrl}/api/product`;
//     const payload = { params: { _id } };
//     await axios.delete(url, payload);
//     router.push("/");
//   }

//   return (
//     <>
//       <Header as="h3">About this product</Header>
//       <p>{description}</p>
//       {isRootOrAdmin && (
//         <>
//           <Button
//             icon="trash alternate outline"
//             color="red"
//             content="Delete Product"
//             onClick={() => setModal(true)}
//           />
//           <Modal open={modal} dimmer="blurring">
//             <Modal.Header>Confirm Delete</Modal.Header>
//             <Modal.Content>
//               <p>Are you sure you want to delete this product?</p>
//             </Modal.Content>
//             <Modal.Actions>
//               <Button onClick={() => setModal(false)} content="Cancel" />
//               <Button
//                 negative
//                 icon="trash"
//                 labelPosition="right"
//                 content="Delete"
//                 onClick={handleDelete}
//               />
//             </Modal.Actions>
//           </Modal>
//         </>
//       )}
//     </>
//   );
// }

// export default ProductAttributes;

import React, { Component } from 'react';
import AddProductToCart from "./AddProductToCart";
import ProductSummary from './ProductSummary';
import NewModal from './NewModal';
import Router from "next/router";

// function ProductAttributes({name, price, mediaUrl, sku, description, _id}) {

//   return (

//     <section className="section-product-details">
//         <div className="container flex" style={{marginTop: '150px'}}>
//             <div className="col-2">
//                 <div className="img-product-details">
//                     <img src={mediaUrl} alt="product"/>
//                 </div>
//             </div>
//             <div className="col-2">
//                 <div className="info-product-details">
//                     <div className="name-product-details">
//                         <h1>{ name }.</h1>
//                     </div>
//                     <div className="price-product-details">
//                         <h2>$ { price }</h2>
//                     </div>

//                     <AddProductToCart productId={_id}/>

//                     <div className="code-and-shipping-product-details">
//                         <p style={{marginBottom: "20px"}}>Complimentary shipping with every order</p>
//                         <p>SKU: {sku}</p>
//                     </div> 

//                     <ProductSummary description={description}/>    
//                     <button style={{marginTop: '20px', width: '100%'}} className="btn btn-warning">DELETE PRODUCT&nbsp;&nbsp;&nbsp;<i class="fas fa-trash"></i></button>

//                 </div>
//             </div>
//         </div>
//     </section>
//   )
// }

class ProductAttributes extends Component {
    constructor(props){
        super(props);

        this.state = {
            showModal: false
        }
        // console.log(this.state.showModal)

    }

    // toggleModal(){
    //     const currentState = this.state.showModal;
    //     this.setState({ showModal: !currentState });
    //     console.log(this.state)
    //   }

    // handleChange(){
    //     console.log('OK')
    //     this.toggleModal()
    // }
    showModal = () => {
        this.setState({ showModal: true });
    };

    hideModal = () => {
        this.setState({ showModal: false });
    };

    render(){

        const { user } = this.props;
        // console.log(user);
        const isRoot = user && user.role === 'root';
        const isAdmin = user && user.role === 'admin';

        const isRootOrAdmin = (isRoot || isAdmin);

        // const deleteBtn = isRootOrAdmin ? 
        // <button onClick={ ()=> {this.showModal()} } style={{marginTop: '20px'}} className="btn btn-warning btn-full-width">DELETE PRODUCT&nbsp;&nbsp;&nbsp;<i className="fas fa-trash"></i></button> 
        // : 
        // null;

        //https://alligator.io/react/modal-component/
        return (
            <section className="section-product-details">
                <NewModal showModal={this.state.showModal} handleClose={this.hideModal} _id={this.props._id}>
                </NewModal>
                <div className="container flex" style={{marginTop: '150px'}}>
                    <div className="col-2">
                        <div className="img-product-details">
                            <img src={this.props.mediaUrl} alt="product"/>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="info-product-details">
                            <div className="name-product-details">
                                <h1>{ this.props.name }.</h1>
                            </div>
                            <div className="price-product-details">
                                <h2>$ { this.props.price }</h2>
                            </div>
        
                            <AddProductToCart productId={this.props._id} user={user}/>
        
                            <div className="code-and-shipping-product-details">
                                <p style={{marginBottom: "20px"}}>Complimentary shipping with every order</p>
                                <p>SKU: {this.props.sku}</p>
                            </div> 
        
                            <ProductSummary description={this.props.description}/>    
                            {isRootOrAdmin && <>
                                <button onClick={ ()=> {this.showModal()} } style={{marginTop: '20px'}} className="btn btn-warning btn-full-width">DELETE PRODUCT&nbsp;&nbsp;&nbsp;<i className="fas fa-trash"></i></button> 
                                <button onClick={ ()=> {Router.push(`/edit?_id=${this.props._id}`)} } style={{marginTop: '20px'}} className="btn btn-primary btn-full-width">EDIT PRODUCT&nbsp;&nbsp;&nbsp;<i class="fas fa-edit"></i></button> 

                            </>}
            
                        </div>
                    </div>
                </div>
            </section>
        )
          
    }

}

export default ProductAttributes;

