"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/product");
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const checkoutRouter = require('./routes/checkout');
const app = (0, express_1.default)();
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
    console.log(err);
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", checkoutRouter);
app.get('/favicon.ico', (req, res) => res.status(204));
app.listen(process.env.PORT || 5000, () => {
    console.log('Backend Server is running!');
});
//# sourceMappingURL=index.js.map