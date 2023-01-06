import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        ranking: {type: Number},
        examples: [{type: String}],
        detail: {type: String, required: true},
        user_id: {type: mongoose.Types.ObjectId, ref: 'users', required: true}
    },{
        timestamps: true
    }
)

export const Category = mongoose.model('categories', schema)