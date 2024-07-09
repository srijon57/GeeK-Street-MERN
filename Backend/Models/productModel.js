import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required: true
    },
    slug:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    category:{
        type:mongoose.objectId,
        ref:'category',
        required: true
    },
    quantity:{
        type:Number,
        required: true
    },
    photo:{
        type:buffer,
        contentType: String,
        required: true
    },
    shipping:{
        type:Boolean,
    },

},{timestamps:true}
)

export default mongoose.model('Products', productSchema)