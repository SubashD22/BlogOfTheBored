const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const SubtextSchema = new Schema (
    {
        title: {
            type:String,
        },
        image: String,
        imageId: String,
        text: {
            type:String,
        },
    },
);

SubText = mongoose.model('Subtext', SubtextSchema);
module.exports= SubText