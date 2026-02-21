import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";

/* ===============================
    GET ALL ORDERS (Admin Only)
=============================== */

const getAllOrders = async (req , res) => {

    try {
        const orders = await Order.find();

        res.status(200).json({
            message: 'Admin Get All Orders Successfully!',
            orders
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error" 
        });
    }

}

/* ===============================
    GET ORDER BY ID (Admin Only)
=============================== */

const getMyOrders = async (req , res) => {

    try {
        const order = await Order.find({ user: req.user._id });

        if (!order) {
            return res.status(404).json({ 
                message: "Order not found" 
            });
        }

        res.status(200).json({
            message: 'Admin Get Order By Id Successfully!',
            order
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error" 
        });
    }

}

/* ===============================
    CREATE ORDER (User + Admin)
=============================== */

const createOrder = async (req , res) => {

    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        const totalPrice = product.price * quantity

        const order = await Order.create({
            user: req.user._id,
            items: [
                {
                    productId: productId,
                    quantity: quantity
                }
            ],
            totalPrice,
        })

        res.status(201).json({
            message: "Order placed successfully!",
            order,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error" 
        });
    }

}

/* ===============================
    UPDATE ORDER (Admin)
=============================== */

const updateOrderStatus = async (req , res) => {

    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        )

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order updated successfully!",
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error" 
        });
    }

}

/* ===============================
    DELETE ORDER (User + Admin)
=============================== */

const deleteOrderById = async (req , res) => {
    
    try {
        const order = await Order.findByIdAndDelete(req.params.id)

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order deleted successfully!",
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error" 
        });
    }

}

export {
    getAllOrders,
    getMyOrders,
    createOrder,
    updateOrderStatus,
    deleteOrderById,
};
