// import Order from "../../models/Order";
// import jwt from "jsonwebtoken";
// import connectDb from "../../utils/connectDb";

// connectDb();

// export default async (req, res) => {
//   try {
//     const { userId } = jwt.verify(
//       req.headers.authorization,
//       process.env.JWT_SECRET
//     );
//     const orders = await Order.find({ user: userId })
//       .sort({ createdAt: "desc" })
//       .populate({
//         path: "products.product",
//         model: "Product"
//       });
//     res.status(200).json({ orders });
//   } catch (error) {
//     console.error(error);
//     res.status(403).send("Please login again");
//   }
// };

import jwt from 'jsonwebtoken';
import Order from '../../models/Order';
import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
   
    const { myOrders } = req.query;
    let orders;
   
    try {

      const { userId, role } = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );

      if (myOrders){
                
        orders = await Order.find({ user: userId })
          .sort({ createdAt: "desc" })//can say -1 for desc also
          .populate({
            path: "products.product",
            model: Product
        });
      
      } else {
        //don't know why it had to be && below
        if (role !== 'root' && role !== 'admin') return res.status(403).send("You are not permitted to view this page");

        orders = await Order.find()
          .sort({ createdAt: "desc" })//can say -1 for desc also
          .populate({
            path: "products.product",
            model: Product
        });        
      }


      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(403).send("Please login again");
    }
};
  
