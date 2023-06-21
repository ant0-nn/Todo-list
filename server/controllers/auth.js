import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req, res) => {
    try {
        const {username, password} = req.body;
        const isUser = await User.findOne({username});
        if(isUser) {
            return res.json({
                message: "Such a user already exists"
            });
        }
    
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash,
        });

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            {expiresIn: "30d"},
        );

        await newUser.save();

        res.json({
            newUser,
            token,
            message: "Registration was successful."
        })


    } catch(e) {
        console.log(e);
        res.json({message: "Error during registration"})
    }
}

export const login = async(req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user) {
            return res.json({
                message: "No such user exists."
            });
        };

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        
        if(!isPasswordCorrect) {
            return res.json({
                message: "Invalid password"
            });
        };

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "30d"}
        )

        res.json({
            token,
            user,
            message: "You are logged in"
        })

    } catch(e) {
        console.log(e);
        res.json({message: "Authorization error"})
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.json({
                message: "No such user exists"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.json({
            user,
            token
        });

    } catch (e) {
        res.json({ message: "Does not have access" });
    }
};