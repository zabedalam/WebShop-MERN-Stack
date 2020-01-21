import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import Cart from '../../models/Cart';

connectDb();

export default async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // if (!name || !email || !password){
        //     return res.status(422).send(`Please fill in all fields.`)
        // }

        //Much better validation
        if(!isLength(name, { min: 3, max: 10 })){
            return res.status(422).send(`Name must be between 3 and 10 characters.`);
        } else if(!isLength(password, { min: 6 })){
            return res.status(422).send(`Password must be at least 6 characters.`);
        } else if (!isEmail(email)){
            return res.status(422).send(`Invalid email.`);
        }
        //1. Check if user already exists in the DB
        const userExists = await User.findOne({email: email});
        
        //2. If not hash their password
        if (userExists){
            return res.status(422).send(`The user with email ${email} already exists. You can login`)
        }

        const hashedPassword = await bcrypt.hash(password, 10);//2nd param is the salt value

        //3. Sign Up the user
        const newUser = await new User({ name, email, password: hashedPassword }).save();//*** */does n't actually return a promie to get a promise - Product.find.exec()    
        console.log(newUser);
        //4. Create JWT token for the new user
        //this is synchronous so no need to await
        const token = jwt.sign({userId: newUser._id, role: newUser.role}, process.env.JWT_SECRET, {expiresIn: '7d'});//expiry 7 days
        
        //5. Create cart for new user
        await new Cart({user: newUser._id }).save();

        //6. send the JWT back to the user
        res.status(201).json(token);

    } catch (error) {
        console.log(error);
        res.status(500).send(`Server error! ${error}`);
    }

}
