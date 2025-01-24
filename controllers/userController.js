const user = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log({ email, password });
        const existingUser = await user.findOne({email});
        // console.log(existingUser)
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hasedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({ email, password: hasedPassword });

        await newUser.save();
        res.status(201).json({ result: newUser });

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log({ email, password });
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({email:existingUser.email},
            "secret",
            {expiresIn: "1h"}
        )
        res.status(200).send({token, user : existingUser})

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { signup, login };