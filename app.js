import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config/database/database';
import Products from './models/products';
import { handleError } from './utils/utils';
import localisable from './config/strings/localisable';

const { database } = config;

const makeConnection = () => {
    mongoose.connect(database, { useNewUrlParser: true }).then(() => console.log('Connected to MongoDB'));

    console.log('PASS ----------------', process.env.ATLAS_PASS || 'Nope');

    // const { connection } = mongoose;

    // connection.once('open', () => console.log('Connected to MongoDB'));

    // connection.on('error', (err) => console.log(err.message));
};

const closeConnection = () => {
    mongoose.disconnect().then(() => console.log('Connection closed'));
};

makeConnection();

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).send({
    status: 200,
    message: localisable.welcomeMessage,
    valid_endpoints: [
        {
            endpoint: '/products',
            method: 'GET',
            description: localisable.endpoint_1_description,
        },
        {
            endpoint: '/products/search',
            method: 'GET',
            description: localisable.endpoint_2_description,
        },
        {
            endpoint: '/products/add',
            method: 'POST',
            description: localisable.endpoint_3_description,
        },
    ],
}));

app.get('/products', (req, res) => {
    // makeConnection();
    Products.find({}, (err, products) => {
        if (err) {
            // closeConnection();
            const msg = localisable.somethingWentWrong;
            return handleError(res, err, msg);
        }
        // closeConnection();
        return res.status(200).send({ status: 200, data: { products } });
    });
});

app.get('/products/search', (req, res) => {
    // makeConnection();
    const { body: { query } = {} } = req;
    Products.find({ ...query }, (err, products) => {
        if (err) {
            // closeConnection();
            const msg = localisable.somethingWentWrong;
            return handleError(res, err, msg);
        }
        // closeConnection();
        return res.status(200).send({ status: 200, data: { products } });
    });
});

app.post('/products/add', (req, res) => {
    // makeConnection();
    const { body: { data = [] } = {} } = req;
    if (data && data.length) {
        Products.insertMany(data, (err, result) => {
            if (err) {
                // closeConnection();
                const msg = localisable.failed;
                return handleError(res, err, msg, 500);
            }
            // closeConnection();
            return res.status(200).send({
                status: 200,
                message: localisable.success,
                data: result,
            });
        });
    }
    // closeConnection();
    const msg = localisable.nothingToAdd;
    return handleError(res, {}, msg, 400);
});

app.delete('products/delete', (req, res) => {
    // makeConnection();
    Products.deleteMany({}, (err, result) => {
        if (err) {
            // closeConnection();
            const msg = localisable.failed;
            return handleError(res, err, msg, 500);
        }
        // closeConnection();
        return res.status(200).send({
            status: 200,
            message: localisable.success,
            data: result,
        });
    });
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
