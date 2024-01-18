const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//@des Register user
//@route POST /api/users/register
//@acess public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password", hashedPassword);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    })
    console.log("User created", `${newUser}`);

    if (newUser) {
        res.status(201).json({ _id: newUser.id, email: newUser.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }

    res.json({ message: "Register the user" });
})

//@des Login user
//@route POST /api/users/login
//@acess public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    // compare hashed password and body password
    if (user && (await bcrypt.compare(password, user.password))) {
        const acessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "40m" }
        );
        res.status(200).json({ acessToken });
    } else {
        res.status(401)
        throw new Error("email or password is not verified")
    }

    res.json({ message: "login user" });
})

//@des current user info
//@route POST /api/users/current
//@acess private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})
module.exports = { registerUser, loginUser, currentUser };