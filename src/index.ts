import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";
import cors from "cors"

const authRouter = require("./routes/auth");
const productsRouter = require("./routes/product");
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const checkoutRouter = require('./routes/checkout');

const app = express();

dotenv.config();

mongoose
    .connect((process.env.MONGO_URI as string))
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", checkoutRouter);

app.get('/favicon.ico', (req, res) => res.send("Hello World"));

app.listen(process.env.PORT || 5000, () => {
    console.log('Backend Server is running!');
})

