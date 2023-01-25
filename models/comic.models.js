import mongoose from 'mongoose'

const Comics = new mongoose.Schema({
    author_id: {type: mongoose.Types.ObjectId, ref: "authors", require: true},
    company_id: {type: mongoose.Types.ObjectId,  ref: "companies", require: false},
    title: {type: String,required: true},
    photo: {type: String,required: true},
    description: {type: String,required: true},
    category_id: {type: mongoose.Types.ObjectId,  ref: "categories", require: true}
},{
    timestamps: true
}
)

export const Comic = mongoose.model('comics', Comics)