const { query } = require('express')
const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).select('name price')
    res.status(200).json({products, numHits: products.length})
}

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields} = req.query //pull out only the property we need, to avoid bug
    
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

    //save the result, so we can chain .sort()
    let result = Product.find(queryObject) //WHY REMOVE AWAIT HERE?

    if (sort) {
        // name: a to z.  -name: z to a.    name -price: sort by name. if name is same, then sort by descending price
        const sortList = sort.split(',').join(' ') //remove comma and add space (format the param because it contains commas)
        result = result.sort(sortList)
    }
    else {
        //default sorting
        result = result.sort('createdAt')
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList )
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit 

    result = result.skip(skip).limit(limit)
    // 23
    // 4 pages: 7 7 7 2

    const products = await result
    res.status(200).json({products, numHits: products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}