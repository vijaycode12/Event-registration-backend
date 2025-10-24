import Event from "../models/event.model.js";

export const getEvents = async(req,res,next)=>{
    try{

        const filter = req.query.type ? {eventType:req.query.type} : {};

        const events = await Event.find(filter);
        
        res.status(200).json({
            success:true,
            data:events,
        });
    }catch(error){
        next(error);
    }
}

export const getEventsById = async(req,res,next)=>{
    try{
        const event = await Event.findById(req.params.id);

        if(!event){
            const error = new Error('Event not found');
            error.statusCode=404;
            throw error;
        }
        
        res.status(200).json({
            success:true,
            data:event,
        });
    }catch(error){
        next(error);
    }
}