import WorkflowClient from "../config/upstash.js";

import { EMAIL_USER } from "../config/env.js";
import { BACKEND_URL } from "../config/env.js";
import { transporter } from "../config/nodemailer.js"; 

//Schedule remiander after registering for event
export const scheduleRemainder = async(req,res) => {
    try{
        const {email,eventName,eventDate} = req.body;

        if(!email || !eventName || !eventDate){
            return res.status(400).json({message:'Missing required fields'});
        }

        //Schedule remainder 1 day before event
        const eventTime = new Date(eventDate).getTime();
        const remainderTime = eventTime - 24*60*60*1000;//1 day before

        await WorkflowClient.publishJSON({
            url:`${BACKEND_URL}/api/workflow/sendRemainder`,
            body:{email,eventName,eventDate},
            notBefore:remainderTime,
        });

        res.status(200).json({
            message:"Reaminder scheduled successfully",
            suheduledAt: new Date(remainderTime).toLocaleString(),
        });
    }catch(error){
        console.error("Error scheduling reminder:",error);
        res.status(500).json({message:"Failed to schedule remainder"});
    }
};

//Send remainder automatically by UPSTASH
export const sendRemainder = async(req,res)=>{
    try{
        const {email,eventName,eventDate} = req.body;

        const mailOptions = {
            from:EMAIL_USER,
            to:email,
            subject:`Reminder : ${eventName}`,
            text:`Hi there! Just a reminder that "${eventName}" is happening on ${new Date(eventDate).toLocaleString()}.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({message:"Reamonder email sent successfully"});
    }catch(error){
        console.error("Error sending remiander:",error);
        res.status(500).json({message:"Failed to send Reaminder"});
    }
};

