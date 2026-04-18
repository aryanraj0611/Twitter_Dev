const {TweetRepository, HashtagRepository} = require('../repository/index')

class TweetService {
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data){
        const content = data.content;
        let tags = content.match(/#[a-zA-Z0-9_]+/g); //this regex extracts hashtag
        tags = tags.map((tag)=> tag.substring(1));
        const tweet = await this.tweetRepository.create(data);
        let alreadyPresentTags =await this.hashtagRepository.findByName(tags);
        let titleOfPresentTags = alreadyPresentTags.map(tag=> tag.title);
        let newTags = tags.filter(tag=> !titleOfPresentTags.includes(tag));
        newTags = newTags.map(tag=> {
            return {
                title: tag,
                tweets: [tweet.id]
            }
        });
        await this.hashtagRepository.bulkCreate(newTags);
        alreadyPresentTags.forEach((tag)=> {
            tag.tweets.push(tweet.id);
            tag.save();
        })
        return tweet;
    }
}

module.exports = TweetService;