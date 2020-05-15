const Category = require('../models/Category');
const { validationResult } = require('express-validator');

exports.allCategories =  async (req,res,next)=>{

    try {
        const categories = await Category.find({});
        if(categories.length==0) return res.status(404).json({message: 'Not Found Categories'});

        res.status(200).json(categories);

    } catch (error) {
        res.status(500).json({message: 'Faild to get Categories'});
    }

}

exports.getCategory =  async (req,res,next)=>{

    try {
        const id = req.params.id;
        if(!id) return res.status(500).json({message: 'Can not get Category'});

        const category =  await Category.findById(id);
        if(!category) return res.status(404).json({message: 'Not Found Category'});

        res.status(200).json(category);    
    } catch (error) {
        res.status(500).json({message: 'Faild to get Category'});
    }

}

