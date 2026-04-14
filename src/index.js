const express = require('express')
const app = express();
const connect = require('./config/database')

const TweetRepository = require('./repository/tweet-repository')
const Comment = require('./models/comment')

app.listen(3000, async () => {
    console.log("Server started")
    await connect();
    console.log("MongoDB connected")
    // const tweet = await Tweet.create({
    //     content: 'Third tweet'
    // });

    //const tweets = await Tweet.find({userEmail:'a@b.com'});

    const tweetRepo = new TweetRepository();
    const tweet = await tweetRepo.getWithComments('69de8e60d11a31c79789dbc3');

    console.log(tweet);
})