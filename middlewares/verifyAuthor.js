import { Author } from "../models/Author";
import { Chapter } from "../models/Chapter";
import { Comic } from "../models/Comic";
import defaultResponse from "../config/response.js";

export const verifyAuthor = async (req, res, next) => {
    const user = req.user.id
    console.log(user)

    const { id } = req.params
    let chapter = await Chapter.findById(id)
        .populate({
            path: "comic_id", populate: {
                path: "author_id",
                model: "authors"
            }
        })
    const { user_id } = chapter.comic_id.author_id
    console.log(user_id)
    if (user.equals(user_id)) {
        console.log("entro")
        return next();
    }
    req.body.success = false;
    req.body.sc = 400;
    req.body.data =
        "You must to be the author of the comic to be able to modify or delete";
    return defaultResponse(req, res);

}