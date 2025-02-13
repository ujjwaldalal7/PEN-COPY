import express from "express"
import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, image } = req.body;
    if (!name || !description || !price || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({ name, description, price, stock, image });
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};


