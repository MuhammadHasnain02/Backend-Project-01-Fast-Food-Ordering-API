import { Order } from "../models/orderModel.js";

/* ===============================
    GET ALL ORDERS (Admin Only)
=============================== */

const getAllOrders = async (req , res) => {

    try {
        const order = await Order.find();
        res.status(200).json({
            message: 'Admin Get All Orders Successfully!',
            order
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

const getOrderById = async (req , res) => {

    try {
        const order = await Order.findById(req.params.id);

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
        const { name, description, price, category } = req.body;

        const order = await Order.create({
            name,
            description,
            price,
            category,
        })

        res.status(201).json({
            message: "Order created successfully!",
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error" 
        });
    }

}

/* ===============================
    UPDATE ORDER (User + Admin)
=============================== */

const updateOrderById = async (req , res) => {
    
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
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
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById,
};
