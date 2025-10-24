const errorMiddleware = (err,req,res,next)=>{
    try{
        let error = {...err};

        error.message=err.message;

        console.log(err);

        //It is the error for mongoose bad objectID(/api/v1/event/1234)
        if(err.name === 'CastError'){
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode=404;
        }

        //For mongoose duplicate key(11000 this is the most occuring duplicate key error)
        if(err.code === 11000){
            const message = 'Duplicate key founded';
            error = new Error(message);
            error.statusCode=400;
        }

        //For mongoose Validation Error
        if(err.name==='ValidationError'){
            //Validation error may occur more than 1 at a time so we map all error
            const message = Object.values(err.errors).map(val=>val.message);
            error = new Error(message.join(', '));
            error.statusCode=400;
        }

        res.status(error.statusCode || 500).json({success:false,error:error.message || 'Server error'});
    }catch(error){
        next(error);
    }
};

export default errorMiddleware;