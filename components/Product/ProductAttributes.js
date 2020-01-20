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

