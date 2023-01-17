import mongoose from 'mongoose'

const Reactions = new mongoose.Schema(
    {
        name: {type: String, require: true},
        comic_id: {type: mongoose.Types.ObjectId, require: true},
        user_id: {type: mongoose.Types.ObjectId, require: true},
    },{
        timestamps: true
    }
)

export const Reaction = mongoose.model('reaction', Reactions)