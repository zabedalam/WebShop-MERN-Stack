// import Stripe from "stripe";
// import uuidv4 from "uuid/v4";
// import jwt from "jsonwebtoken";
// import Cart from "../../models/Cart";
// import Order from "../../models/Order";
// import calculateCartTotal from "../../utils/calculateCartTotal";

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// export default async (req, res) => {
//   const { paymentData } = req.body;

//   try {
//     // 1) Verify and get user id from token
//     const { userId } = jwt.verify(
//       req.headers.authorization,
//       process.env.JWT_SECRET
//     );
//     // 2) Find cart based on user id, populate it
//     const cart = await Cart.findOne({ user: userId }).populate({
//       path: "products.product",
//       model: "Product"
//     });
//     // 3) Calculate cart totals again from cart products
//     const { cartTotal, stripeTotal } = calculateCartTotal(cart.products);
//     // 4) Get email from payment data, see if email linked with existing Stripe customer
//     const prevCustomer = await stripe.customers.list({
//       email: paymentData.email,
//       limit: 1
//     });
//     const isExistingCustomer = prevCustomer.data.length > 0;
//     // 5) If not existing customer, create them based on their email
//     let newCustomer;
//     if (!isExistingCustomer) {
//       newCustomer = await stripe.customers.create({
//         email: paymentData.email,
//         source: paymentData.id
//       });
//     }
//     const customer =
//       (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;
//     // 6) Create charge with total, send receipt email
//     const charge = await stripe.charges.create(
//       {
//         currency: "usd",
//         amount: stripeTotal,
//         receipt_email: paymentData.email,
//         customer,
//         description: `Checkout | ${paymentData.email} | ${paymentData.id}`
//       },
//       {
//         idempotency_key: uuidv4()
//       }
//     );
//     // 7) Add order data to database
//     await new Order({
//       user: userId,
//       email: paymentData.email,
//       total: cartTotal,
//       products: cart.products
//     }).save();
//     // 8) Clear products in cart
//     await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { products: [] } });
//     // 9) Send back success (200) response
//     res.status(200).send("Checkout successful");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error processing charge");
//   }
// };

import Stripe from 'stripe';
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import Product from '../../models/Product';
import Cart from '../../models/Cart';
import Order from '../../models/Order';
import calculateCartTotal from '../../utils/calculateCartTotal';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { paymentData } = req.body;
    console.log('__________________________')
    console.log(paymentData);

    if (!("authorization" in req.headers)){//if the authorization object does not exist in the req.headers
        return res.status(401).send(`No authorization token.`);

    } else {

        try {
            //1. Verify and get user Id from token
            const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

            //2. find the cart based on user Id and populate it
            const cart = await Cart.findOne({ user: userId }).populate({//then populate the products once again
                path: "products.product",
                model: Product
            });
            //3. calculate cart totals again from cart products
            const totals = calculateCartTotal(cart.products);
            const cartTotal = totals[0];
            const stripeTotal = totals[1];
            //4. Get email for payment data, see if email is linked with existing stripe customer
            const prevCustomer = await stripe.customers.list({
                email: paymentData.email,
                limit: 1
            })

            console.log('-----------------------------')
            console.log(prevCustomer);

            //5. if they are not existing customers create them based on their email.
            const existingCustomer = prevCustomer.data.length > 0;
            // let newCustomer;

            // console.log(existingCustomer);
            
            // if (!existingCustomer){
            //     newCustomer = await stripe.customers.create({
            //         email: paymentData.email,
            //         source: paymentData.id
            //     })
            // }

            // const customer = (existingCustomer && prevCustomer.data[0].id) || newCustomer.id;
            
            let customer;

            if (existingCustomer) {
                customer = prevCustomer.data[0].id;
            } else {
                customer = await stripe.customers.create({
                    email: paymentData.email,
                    source: paymentData.id
                })
                customer = customer.id;
            }

            console.log('+++++++++++++++++++++++++++++')
            console.log(customer);
            //return;
            // console.log(prevCustomer.data[0].id);
            // console.log('???????????????????????????');
            // // console.log(newCustomer);
            // console.log(customer);
            //6. create charge with total, send receipt email
            const charge = await stripe.charges.create({
                currency: "usd",
                amount: stripeTotal,
                receipt_email: paymentData.email,
                customer,
                description: `Checkout from ${paymentData.email} || ${paymentData.id}`
            }, {
                idempotency_key: uuidv4()
            });
            //7. add order data to DB
            await new Order({
                user: userId,
                email: paymentData.email,
                total: cartTotal,
                products: cart.products
            }).save();
            //8. clear products in Cart
            const emptyCart = await Cart.findOneAndUpdate(
                { _id: cart._id },
                { $set: { products: [] } },
                { new: true//return the updated doc.
                }
            );

             console.log('++++++++++++++++++')
             console.log(emptyCart);   

            //9. send back status 200 response.
            // res.status(200).send(`Checkout Successful!`);
            res.status(200).json(emptyCart.products);

            
        } catch (error) {
            console.error(error);
            res.status(500).send(`Error processing Charge.`);
        }

    }
}

