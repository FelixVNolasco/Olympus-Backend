const Cart = require("../models/Cart");
const router = require("express").Router();

import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../middleware/verifyToken"

//CREATE CART
router.post("/", verifyToken, async (req: any, res: any) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, async (req: any, res: any) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, async (req: any, res: any) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req: any, res: any) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req: any, res: any) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;