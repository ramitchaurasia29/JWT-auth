const asyncHandler = require("express-async-handler");
const Deal=require("../models/dealModel");
const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken");


//@des Get all contacts
//@route GET /api/contacts
//@acess public
const registerDeal = asyncHandler(async (req,res)=>{
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const dealAvailable = await Deal.findOne({ email });
    if (dealAvailable) {
        res.status(400);
        throw new Error("Deal already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password", hashedPassword);

    // const newDeal = await Deal.create({
    //     username,
    //     email,
    //     password: hashedPassword,
    // })
    // console.log("User created", `${newDeal}`);

    // if (newDeal) {
    //     res.status(201).json({ _id: newDeal.id, email: newDeal.email });
    // } else {
    //     res.status(400);
    //     throw new Error("User data is not valid");
    // }


    res.json({message:"register the Deal"});
})


//@des Get all contacts
//@route GET /api/contacts
//@acess public
const loginDeal = asyncHandler(async (req,res)=>{
    res.json({message:"login the user"});
})

//@des Get all contacts
//@route GET /api/contacts
//@acess public
const currentDeal = asyncHandler(async (req,res)=>{
    res.json({message:"Current user"});
})

module.exports={registerDeal,loginDeal,currentDeal}
