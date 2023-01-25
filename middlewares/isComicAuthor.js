import defaultResponse from "../config/response.js";
import { Chapter } from "../models/Chapter.js";

export const isComicAuthor = async (req, res, next) => {
    const user = req.user.id;
    const isCompany = req.user.is_company;
    const { id } = req.params;
    let chapter = await Chapter.findById(id).populate({
        path: "comic_id",
        populate: { path: "author_id", model: "authors" },
        });
    const {user_id} = chapter.comic_id.author_id
    if(user.equals(isCompany)){
        return next()
    }
    if (user.equals(user_id)) {
        return next();
        }
        req.body.success = false;
        req.body.sc = 401;
        req.body.data =
        "You must to be the author of the comic to be able to modify or delete";
        return defaultResponse(req, res);
    };
