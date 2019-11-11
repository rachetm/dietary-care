const express = require("express");

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/database');

const Product = require('./models/product');

mongoose.connect(config.database);
let db = mongoose.connection;

db.once('open', () => console.log("Connected to MongoDB"));

db.on('error', (err) => console.log(err.message));

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({"message" : ["Usage /:name ", "Usage /ingredients/:name"]});
});

app.get('/ingredients', (req, res) => {
    res.send({"message" : ["Usage /:name ", "Usage /ingredients/:name"]});
});

app.get('/:name', (req, res) => {
//    console.log(req.params.name);
    // Product.find( (err, product) => console.log(product));
    Product.find({name : req.params.name}, (err, product) => {
        // console.log(product);
        if(err)
        {
            res.send({"status" : 404, "message" : "Something went wrong! Try again."});
        }
        if(product.length === 0)
        {
            res.send({ 
                status : 404,
                message: "Product not found"
            });
            return;
        }
        res.send({status: 200, product});
    });
});

app.get('/ingredients/:name', (req, res) => {
    Product.find({name : req.params.name}, (err, product) => {
        if(err)
        {
            res.send({"status" : 404, "message" : "Something went wrong! Try again."});
        }
        if(product.length === 0)
        {
            res.send({ 
                status : 404,
                message: "Product not found"
            });
            return;
        }
        res.send(
            {
                status: 200, 
                ingredients : product[0].ingredients
            }
            );
    });
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});