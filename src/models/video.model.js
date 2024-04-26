import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema({
    videoFile: {
        type: String,   //cloudinaer url
        reqired: true
    },
    thumbnail: {
        type: String,   //cloudinaer url
        reqired: true
    },
    title: {
        type: String,   
        reqired: true
    },
    duration: {
        type: String,   //cloudinaer url
        reqired: true
    },
    view: {
        type: Number,   
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Userg"
    }

}, {timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate )

export const Video = mongoose.model("Video",videoSchema)