import mongoose from "mongoose";
import { Products } from "../models/Products.js";
import path from "path";
import fs from "fs";

export const getProducts = async (req, res) => {
    try {
        const product = await Products.find();
        res.status(200).json({ products: product });
    } catch (error) {
        console.log(error);
    }

}

export const detailProduct = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(404).json({ message: 'Seems not valid id' });
        }

        const products = await Products.findById(req.params.id);

        if (!products) {
            res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (req, res) => {
    try {
        // console.log('ini logs awal create: ', req.files, req.body);
        if (req.files) {
            const file = req.files.file;

            const result = await handleFileUpload(req, res, file);
            console.log(result);
            req.body.image = result.newNameFile;
            req.body.url = result.url;

        }
        const products = await Products.create(req.body);
        res.status(200).json(products);
        console.log('ini logs akhir create:', products);
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(404).json({ message: 'Seems not valid id' });
        }

        const product = await Products.findByIdAndUpdate(req.params.id, req.body);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }

        if (req.files) {
            const file = req.files.file;
            const result = await handleFileUpload(req, res, file);
            product.image = result.newNameFile;
            product.url = result.url;

            const resultRemove = await handleRemovefile(req, res, product.image);
        }

        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }

}

export const deleteProduct = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(404).json({ message: 'Seems not valid id' });
        }

        const product = await Products.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.deleteOne();
        await handleRemovefile(req, res, product.image);
        res.status(200).json({ message: 'products was deleted' });
    } catch (error) {
        console.log(error);
    }

}


const handleFileUpload = async (req, res, file) => {
    let filename = file.name;
    let ext = path.extname(filename);
    let newNameFile = `${file.md5}${ext}`;
    let url = `${req.protocol}://${req.get('host')}/images/${newNameFile}`;

    file.mv(`./public/images/${newNameFile}`, function (err) {
        if (err) return res.status(500).json({ message: err });
        // res.status(200).json({ message: 'Uploaded' });
    });

    return { filename, url, newNameFile };

}

const handleRemovefile = async (req, res, filename) => {
    fs.unlink(`./public/images/${filename}`, function (err) {
        if (err) return res.status(500).json({ message: err });
        console.log('File removed');
    });
}