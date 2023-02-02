import defaultResponse from '../config/response.js'
import { Reaction } from '../models/Reaction.js'


async function reactionExists(req,res,next) {
    let { id } = req.user
    let { name,comic_id } = req.body //name tiene que ser like o dislike
    // si el usuario quiere dar like , tengo que check que no existe dislike
    // si existe borrarlo
    console.log(name)
    if(name === "like"){
        let dislike = await Reaction.findOne({
            name : "dislike",
            comic_id,
            user_id:id
        })
        console.log(dislike)
        if(dislike){
            await Reaction.findByIdAndDelete(dislike._id)
        }
    }else if(name === "dislike"){
        let like = await Reaction.findOne({
            name : "like",
            comic_id,
            user_id:id
        })
        if(like){
            await Reaction.findByIdAndDelete(like._id)
        }
    }
    //si el usuario quiere dar dislike , tengo que check que no existe like
    //si existe borrarla
    return next()
}

export default reactionExists
