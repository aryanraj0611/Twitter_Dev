import express from 'express';
const app = express();
import {connect} from './config/database.js'

import service from './services/tweet-service.js';

app.listen(3000, async () => {
    console.log("Server started")
    await connect();
    console.log("MongoDB connected")
    let ser = new service();
    await ser.create({
        content: 'capital #ARYAN'
    })
});