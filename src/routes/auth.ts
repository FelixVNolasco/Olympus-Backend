const router = require("express").Router();
const User = require("../models/User");
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"

//signup
router.post("/signup", async (req: any, res: any) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            (process.env.SEC_PASSJS as string)
        ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//login
router.post('/login', async (req: any, res: any) => {

    try {
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );

        !user && res.status(401).json("User or password is wrong");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            (process.env.SEC_PASSJS as string)
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;

        originalPassword != inputPassword &&
            res.status(401).json("User or password is wrong");

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            (process.env.SEC_PASSJWT as string),
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });

    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;