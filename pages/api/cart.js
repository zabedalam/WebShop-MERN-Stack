import mongoose from 'mongoose';
import connectDb from '../../utils/connectDb';
import Cart from '../../models/Cart';
import Product from '../../models/Product';
import jwt from 'jsonwebtoken';

connectDb();//************ */just execute it like this to connect to db

const { ObjectId } = mongoose.Types;

export default async (req, res) => {
    switch (req.method){
        case "GET":
        await handleGetRequest(req, res);
        break;
        case "PUT":
        await handlePutRequest(req, res);
        break;
        case "DELETE":
        await handleDeleteRequest(req, res);
        break;        
        default:
        res.status(405).sned(`Method ${req.method} not allowed.`)
        break;
    }
}

 async function handleGetRequest(req, res){

    if (!("authorization" in req.headers)){//if the authorization object does not exist in the req.headers
        return res.status(401).send(`No authorization token.`);

    } else {
        try {
            const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
            //https://spectrum.chat/zeit/now/500-internal-server-error-on-deployed-app-homepage~9a23cc15-0876-4187-8327-29ccf8812822
            const userCartData = await Cart.findOne({ user: userId}).populate({
                path: "products.product",
                model: Product
            });

            // console.log(userCartData);
            
            if (userCartData) {
                return res.status(200).json(userCartData);
            } else {
                return res.status(200).json({products: []});                
            }
        } catch (error) {
            console.error(error);
            return res.status(403).send(`Invalid token.`);  
        }
    }    
}

async function handlePutRequest(req, res){

    const { quantity, productId } = req.body; 

    if (!("authorization" in req.headers)){//if the authorization object does not exist in the req.headers
        return res.status(401).send(`No authorization token.`);

    } else {
        try {
            const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

            //get users cart based on userId
            const cart = await Cart.findOne({ user: userId});
            //check if product already exists in users cart
            // const productExists = cart.products.some(doc => {productId === doc.product});
            const productExists = cart.products.some(doc => ObjectId(productId).equals(doc.product));

            //if so increment number by amount provided in request
            if (productExists){

                // await Cart.findOneAndUpdate(
                //     { _id: cart._id, "products.product": productId },
                //     { $inc: { "products.$.quantity": quantity } }
                //   );
                //https://stackoverflow.com/questions/5646798/mongodb-updating-subdocument
                await Cart.findOneAndUpdate(
                    { _id: cart._id, "products.product": productId },
                    { $set: { "products.$.quantity": quantity } }
                  );
            } else {
                const newProduct = { quantity, product: productId }
                await Cart.findOneAndUpdate({ _id: cart._id }
                , { $addToSet: { products: newProduct } 
                })
            }
            //if not add product with given quantity
            return res.status(200).send(`Cart updated`);
        } catch (error) {
            console.error(error);
            return res.status(403).send(`Invalid token.`);  
        }
    }     
}

async function handleDeleteRequest(req, res){

    const { productId } = req.query;//because we specified the productId as a param in a query string

    if (!("authorization" in req.headers)){//if the authorization object does not exist in the req.headers
        return res.status(401).send(`No authorization token.`);

    } else {
        try {
            const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

            const cart = await Cart.findOneAndUpdate({ user: userId},
            { $pull: { products: { product: productId } } },//$pull is to delete
            { new: true//return the updated doc.
            }).populate({//then populate the products once again
                path: "products.product",
                model: Product
            });

            // console.log(cart)
            // console.log('------------------------')
            // console.log(cart.products)

            //if not add product with given quantity
            return res.status(200).json(cart.products);
        } catch (error) {
            console.error(error);
            return res.status(403).send(`Invalid token.`);  
        }
    }     
}
