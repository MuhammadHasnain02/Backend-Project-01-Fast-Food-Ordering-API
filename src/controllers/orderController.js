import { Product } from "../models/productModel.js";

/* ===============================
    GET ALL PRODUCTS (Admin Only)
=============================== */

const getAllProducts = async (req , res) => {

    try {
        const products = await Product.find();
        res.status(200).json({
            message: 'Admin Get All Products Successfully!',
            products
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error" 
        });
    }

}

/* ===============================
    GET PRODUCT BY ID (Admin Only)
=============================== */

const getProductById = async (req , res) => {

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ 
                message: "Product not found" 
            });
        }

        res.status(200).json({
            message: 'Admin Get Product By Id Successfully!',
            product
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error" 
        });
    }

}

/* ===============================
    CREATE PRODUCT (User + Admin)
=============================== */

const createProduct = async (req , res) => {

    try {
        const { name, description, price, category } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            category,
        })

        res.status(201).json({
            message: "Product created successfully!",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error" 
        });
    }

}

/* ===============================
    UPDATE PRODUCT (User + Admin)
=============================== */

const updateProductById = async (req , res) => {
    
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully!",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error" 
        });
    }

}

/* ===============================
    DELETE PRODUCT (User + Admin)
=============================== */

const deleteProductById = async (req , res) => {
    
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully!",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error" 
        });
    }

}

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
};
