// import connectDb from "../../utils/connectDb";
// import User from "../../models/User";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// connectDb();

// export default async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // 1) check to see if a user exists with the provided email
//     const user = await User.findOne({ email }).select("+password");
//     // 2) --if not, return error
//     if (!user) {
//       return res.status(404).send("No user exists with that email");
//     }
//     // 3) check to see if users' password matches the one in db
//     const passwordsMatch = await bcrypt.compare(password, user.password);
//     // 4) --if so, generate a token
//     if (passwordsMatch) {
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//         expiresIn: "7d"
//       });
//       // 5) send that token to the client
//       res.status(200).json(token);
//     } else {
//       res.status(401).send("Passwords do not match");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error logging in user");
//   }
// };

import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


connectDb();

export default async (req, res) => {
    try {
        const { email, password } = req.body;

        //We disable the submit btn if the form fields are empty so validation is not necessary.
        // if (!email || !password){
        //     return res.status(422).send(`Please fill in all fields.`)
        // }

        //1. Check if user already exists in the DB
        //in the model we set the password to select : false, that means we dont want it in the queries but this time we do
        //so .select('+password');
        const user = await User.findOne({ email: email }).select('+password');
        
        //2. If not error
        if (!user){
            return res.status(422).send(`Invalid Email or Password`);
        }

        //check if the passwords match
        const passwordsMatch = await bcrypt.compare(password, user.password);//user.password - DB password

        //3. Sign In the user
        if (passwordsMatch){
            //Create JWT token for the new user
            //this is synchronous so no need to await
            const token = jwt.sign({userId: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '7d'});//expiry 7 days
            //5. send the JWT back to the user
            res.status(200).json(token);
        } else {
            //Dont say in valid password that will make it easy for a hacker to find out that at least
            //the email was valid
            return res.status(401).send(`Invalid Email or Password`);

        }



    } catch (error) {
        console.log(error);
        res.status(500).send(`Server error! ${error}`);
    }

}
