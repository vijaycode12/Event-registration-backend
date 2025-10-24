import mongoose  from "mongoose";

const eventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:4,
    },
    description:{
        type:String,
        required:true,
        minLength:10,
    },
    eventType:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
        minLength:5,
    },
    image:{
        type:String,
    },
    
},{ timestamps: true });

const Event = mongoose.model('Event',eventSchema);

export default Event;