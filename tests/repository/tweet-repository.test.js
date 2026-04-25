import  TweetRepository  from "../../src/repository/tweet-repository.js";
import Tweet from "../../src/models/tweet.js";
jest.mock('../../src/models/tweet.js');

describe('Create tweet tests', () => {
    test('should create a new tweet and return it', async  () => {
    const data = {
        content: 'Testing',
    }
    const spy = jest.spyOn(Tweet, 'create').mockImplementation(() => {
        return {
            ...data, createdAt: new Date(), updatedAt: new Date()
        }
    })
    const tweetRepository = new TweetRepository();
    const tweet = await tweetRepository.create(data);

    expect(spy).toHaveBeenCalled();
    expect(tweet.content).toBe(data.content);
    expect(tweet.createdAt).toBeDefined();
})

test('should not create a new tweet and return an error', async () => {
    const data = {
        content: 'Testing',
    }
    const spy = jest.spyOn(Tweet, 'create').mockImplementation(() => {
        throw new Error('Something went wrong');
    })
    const tweetRepository = new TweetRepository();  
    const tweet = await tweetRepository.create(data).catch((err) => {
        expect(err).toBeInstanceOf(Error);
    });
})
})

describe('Get all tweets tests', () => {
    test('testing limit for get all', async () => {
        const data = {
            content: 'Testing',
        }
        const tweetsArray = [{
            ...data, createdAt: new Date(), updatedAt: new Date()
        },
    {
            ...data, createdAt: new Date(), updatedAt: new Date()
        },
    {
            ...data, createdAt: new Date(), updatedAt: new Date()
        }]
        const findResponse = {tweetsArray};
        findResponse.skip = jest.fn((offset)=> findResponse);
        findResponse.limit = jest.fn((limit) => findResponse.tweetsArray.slice(0, limit));
        const spy = jest.spyOn(Tweet, 'find').mockImplementation(() => {
        return findResponse ;
    })
        const tweetRepository = new TweetRepository();
        const tweets = await tweetRepository.getAll(0,2);
        console.log(tweets);
        expect(spy).toHaveBeenCalled();
        expect(tweets).toHaveLength(2);
    })
})

// test('actually calling model', async ()=>{
//     const data = {
//         content: 'Lorem'
//     }
//     const tweet =await Tweet.create(data);
//     expect(tweet).toBeUndefined(); 
// })