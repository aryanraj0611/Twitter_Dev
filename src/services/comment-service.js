import {CommentRepository, TweetRepository} from "../repository/index.js";


class CommentService{
    constructor(){
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();   
    }

    async create(modelId, modelType, userId, content){
        //console.log(modelId, modelType, userId, content);
        if(modelType == 'Tweet'){
            var commentable = await this.tweetRepository.get(modelId)
        }
        else if(modelType == 'Comment'){
            var commentable = await this.commentRepository.get(modelId)
        }
        else{
            throw new Error("Unknown model type");
        }
        //console.log(commentable);
        const comment = await this.commentRepository.create({
            userId: userId,
            onModel: modelType,
            content: content,
            commentable: modelId,
            comments: []
        });
        commentable.comments.push(comment);
        await commentable.save();
        return comment;
    }
}

export default CommentService;