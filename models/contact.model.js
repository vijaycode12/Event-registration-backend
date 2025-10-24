import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'First name is required'],
        trim:true,
        minLength:3
    },
    lastName:{
        type:String,
        required:[true,'Last name is required'],
        trim:true,
        minLength:3
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        trim:true,
        lowercase:true,
        match:[/\S+@\S+\.\S+/,'Please fill a valid email address'],
    },
    phone:{
        type:String,
        required:[true,'Phone number is required'],
        match:[/^[6-9]\d{9}$/,'Phone number must be 10 digits'],
    },
    eventType:{
        type:String,
    },
     query: {
      type: String,
      required: [true, "Query is required"],
      trim: true,
    },
},{timestamps:true});

const Contact = mongoose.model('Contact',contactSchema);

export default Contact;