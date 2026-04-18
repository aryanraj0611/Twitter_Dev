const express = require('express')
const app = express();
const connect = require('./config/database')


app.listen(3000, async () => {
    console.log("Server started")
    await connect();
    console.log("MongoDB connected")
    let service = new TweetService();

});