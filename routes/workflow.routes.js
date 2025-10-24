import { Router } from "express";

import { scheduleRemainder,sendRemainder } from "../controllers/workflow.controller.js";

const workflowRouter =  Router();

workflowRouter.post('/scheduleReminder',scheduleRemainder);
workflowRouter.post('/sendReminder',sendRemainder);


export default workflowRouter;