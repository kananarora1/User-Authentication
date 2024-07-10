const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        const userExists = await User.findOne({ email: req.body.email });
        
        if(userExists) return res.status(400).json({ message: "User with that email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt); 
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();
        
        res.json({ message: "User created successfully" });
    } catch(error){
        res.json(error);
    }

});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if(!user) return res.status(400).json({ message: "User not found, please register" });
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) return res.status(400).send({ message: "Invalid password" });

    res.send({ message: "Login successful" });
});


module.exports = router;