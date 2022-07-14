const { query } = require('express')
const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const search = 'ab'
    const products = await Product.find({
        name: {$regex: search, $options: 'i'}
    })
    res.status(200).json({products, numHits: products.length})
}

const getAllProducts = async (req, res) => {
    const {featured, company, name} = req.query //pull out only the property we need, to avoid bug
    
    const queryObject = {} //create new queryObject.

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if (company) {
        queryObject.company = company
    }

    if (name) {
        queryObject.name = {$regex: name, $options: 'i'} // i means 'case insensitive
    }

    console.log(queryObject)
    const products = await Product.find(queryObject)
    res.status(200).json({products, numHits: products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}