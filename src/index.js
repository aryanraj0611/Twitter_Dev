const express = require('express')
const app = express();
const connect = require('./config/database')

const Tweet = require('./models/tweet')


app.listen(3000, async () => {
    console.log("Server started")
    await connect();
    console.log("MongoDB connected")
    const tweets= await Tweet.find({
        content: ["First tweet", "My tweet", "12m3 4"]
        
    })
    console.log(tweets); 
     
})