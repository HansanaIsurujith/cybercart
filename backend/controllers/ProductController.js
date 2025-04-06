const Product = require("../models/Product");

const findProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
    console.log(req.body);

    Product.create(req.body)
        .then((newProduct) => {
            res.status(201).json({ message: "Product created successfully", Product: newProduct});
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};


const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const Products = await Product.findById(id);
      res.status(200).json({ success: true, Products });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getAllProductNames = async (req, res) => {
    try {
      const products = await Product.find({}, 'name'); // Fetch only the name field
      res.status(200).json({ success: true, products });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
};


const compareProducts = async (req, res) => {
    const { id1, id2 } = req.params; // Getting two product IDs from request parameters
  
    try {
      const product1 = await Product.findById(id1);
      const product2 = await Product.findById(id2);
  
      if (!product1 || !product2) {
        return res.status(404).json({ success: false, message: "One or both products not found" });
      }
  
      let score1 = 0, score2 = 0;
  
      // Compare Price (cheaper is better)
      if (product1.price < product2.price) {
        score1++;
      } else if (product2.price < product1.price) {
        score2++;
      }
  
      // Compare Ratings (higher is better)
      if (product1.ratings > product2.ratings) {
        score1++;
      } else if (product2.ratings > product1.ratings) {
        score2++;
      }
  
      // Compare Specifications (match gets a point)
      const specs = ['weight', 'dimensions', 'color'];
      specs.forEach(spec => {
        if (product1.specifications[spec] === product2.specifications[spec]) {
          score1++;
          score2++; // Both get points if they match
        }
      });
  
      // Determine Winner
      let winner;
      if (score1 > score2) {
        winner = product1;
      } else if (score2 > score1) {
        winner = product2;
      } else {
        winner = "Tie"; // If scores are equal
      }
  
      res.status(200).json({ 
        success: true, 
        product1: { name: product1.name, score: score1 }, 
        product2: { name: product2.name, score: score2 }, 
        winner: winner === "Tie" ? "It's a Tie!" : winner.name 
      });
  
    } catch (err) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };





module.exports = {findProduct, createProduct, getProduct, getAllProductNames, compareProducts};