import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileupload from 'express-fileupload';

//import route
import ProductRoute from './routes/ProductRoute.js';

// config

dotenv.config({path : '.env'});
let env = process.env;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(fileupload());

// routes
app.use(ProductRoute);
// routes END

mongoose.connect('mongodb+srv://pwangtampn:r3CLsw128RFD6UIz@flutterstore.xuggelu.mongodb.net/flutterstore?retryWrites=true&w=majority').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.listen(env.PORT, () => {
    console.log('Server is running on port localhost:5510');
});

export default app;

