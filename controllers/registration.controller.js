import Registration from "../models/registration.model.js";
import Event from "../models/event.model.js";

import { sendConfirmationEmail } from "./conformation.controller.js";

export const registerEvent = async(req,res,next) =>{
    try{
        const userId = req.user._id;
        const {eventId} = req.params;
        const {phone} = req.body
        const username = req.user.username;
        const email = req.user.email;

        //creating a registration (The frontend sends the event id as api to backend when the user clicks register)
        const registration = await Registration.create({
            user:userId,
            event:eventId,
            phone:phone
        });

        //Fetch event details for conformation email
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({success:false,message:"Event not found"});
        }

        //send confirmation email
        await sendConfirmationEmail({
            body:{
                email:email,
                username,
                registrationId:registration._id,
                eventName:event.name,
                eventDate:event.date,
                eventTime:event.time,
                eventLocation:event.location
            }
        },{status:()=>({json:()=>{}})
    });

        res.status(201).json({
            success:true,
            message:"Registration is successfull",
            data:{registration}
        });
    }catch(error){
        next(error);
    }
}