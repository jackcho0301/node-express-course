const { query } = require('express')
const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({
        name: 'vast table'
    })
    res.status(200).json({products})
}

const getAllProducts = async (req, res) => {
    const {featured} = req.query //pull out only the property we need, to avoid bug
    
    const queryObject = {} //create new queryObject.

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    console.log(queryObject)
    const products = await Product.find(queryObject)
    res.status(200).json({products, numHits: products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}