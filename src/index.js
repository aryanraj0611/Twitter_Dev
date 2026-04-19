import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
import {connect} from './config/database.js'

import apiRoutes from './routes/index.js'

import {UserRepository, TweetRepository} from './repository/index.js';
import LikeService from './services/like-service.js';

app.use('/api', apiRoutes);

import service from './services/tweet-service.js';

app.listen(3000, async () => {
    console.log("Server started")
    await connect();
    console.log("MongoDB connected")

    const tweetRepo = new TweetRepository();
    const userRepo = new UserRepository();
    const tweets = await tweetRepo.getAll(0,10);

    const users = await userRepo.getAll();
    const likeService = new LikeService();
    likeService.toggleLike(tweets[0].id, 'Tweet', users[0].id);

});