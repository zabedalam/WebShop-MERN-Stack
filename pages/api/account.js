// import User from "../../models/User";
// import jwt from "jsonwebtoken";
// import connectDb from "../../utils/connectDb";

// connectDb();

// export default async (req, res) => {
//   switch (req.method) {
//     case "GET":
//       await handleGetRequest(req, res);
//       break;
//     case "PUT":
//       await handlePutRequest(req, res);
//       break;
//     default:
//       res.status(405).send(`Method ${req.method} not allowed`);
//       break;
//   }
// };

// async function handleGetRequest(req, res) {
//   if (!("authorization" in req.headers)) {
//     return res.status(401).send("No authorization token");
//   }

//   try {
//     const { userId } = jwt.verify(
//       req.headers.authorization,
//       process.env.JWT_SECRET
//     );
//     const user = await User.findOne({ _id: userId });
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).send("User not found");
//     }
//   } catch (error) {
//     res.status(403).send("Invalid token");
//   }
// }

// async function handlePutRequest(req, res) {
//   const { _id, role } = req.body;
//   await User.findOneAndUpdate({ _id }, { role });
//   res.status(203).send("User updated");
// }

import User from '../../models/User';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
    switch(req.method){
        case "GET":
        handleGetRequest(req, res);
        break;
        case "PUT":
        handlePutRequest(req, res);
        break;
        default:
        res.status(405).send(`Request method not allowed`);
        break;
    }
}

async function handleGetRequest(req, res){
    if (!("authorization" in req.headers)){//if the authorization object does not exist in the req.headers
        return res.status(401).send(`No authorization token.`);

    } else {
        try {
            const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
            const userData = await User.findOne({ _id: userId});
            if (userData) {
                return res.status(200).json(userData);
            } else {
                return res.status(404).send(`User not found.`);                
            }
        } catch (error) {
            console.error(error);
            return res.status(403).send(`Invalid token.`);  
        }
    }
}


async function handlePutRequest(req, res){
    if (!("authorization" in req.headers)){//if the authorization object does not exist in the req.headers
        return res.status(401).send(`No authorization token.`);

    } else {

        const {_id, role } = req.body;

        try {
            await User.findOneAndUpdate({ _id: _id}, { role: role});//we are not returning the updated doc because we are not providing that info to the user
            return res.status(203).json(`User updated!`);

        } catch (error) {
            console.error(error);
            return res.status(403).send(`Invalid token.`);  
        }
    }
}
