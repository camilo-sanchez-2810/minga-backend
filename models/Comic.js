import mongoose from 'mongoose'

const Comics = new mongoose.Schema({
    author_id: {type: mongoose.Types.ObjectId, require: true},
    company_id: {type: mongoose.Types.ObjectId, require: false},
    title: {type: String,required: true},
    photo: {type: String,required: true},
    description: {type: String,required: true},
    category: {type: mongoose.Types.ObjectId, require: true}
},{
    timestamps: true
}
)

export const Comic = mongoose.model('comics', Comics)