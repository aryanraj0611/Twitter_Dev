import LikeService from "../services/like-service.js";

const likeService = new LikeService();

export const toggleLike = async (req, res) => {
    try {
        const reponse = await likeService.toggleLike(req.query.modelId, req.query.modelType, req.body.userId); 
        return res.status(200).json({
            success: true,
            data: reponse,
            err: {},
            message: "Toggled like successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
        })
    }
}